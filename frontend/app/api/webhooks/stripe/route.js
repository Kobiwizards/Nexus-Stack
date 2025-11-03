import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { 
        success: false, 
        message: `Webhook Error: ${err.message}` 
      },
      { status: 400 }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
      
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Webhook processing failed' 
      },
      { status: 500 }
    );
  }
}

// Handle successful payment
async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    console.log('PaymentIntent was successful:', paymentIntent.id);
    
    // Update service booking status in backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/bookings/payment-success`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripePaymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'paid'
      }),
    });

    if (backendResponse.ok) {
      console.log('Service booking updated successfully for payment:', paymentIntent.id);
    } else {
      console.error('Failed to update service booking for payment:', paymentIntent.id);
    }

    // TODO: Send confirmation email to client
    // TODO: Send notification to admin

  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

// Handle failed payment
async function handlePaymentIntentFailed(paymentIntent) {
  try {
    console.log('PaymentIntent failed:', paymentIntent.id);
    
    // Update service booking status in backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/bookings/payment-failed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripePaymentId: paymentIntent.id,
        status: 'failed',
        error: paymentIntent.last_payment_error?.message || 'Payment failed'
      }),
    });

    if (backendResponse.ok) {
      console.log('Service booking marked as failed for payment:', paymentIntent.id);
    } else {
      console.error('Failed to update service booking for failed payment:', paymentIntent.id);
    }

    // TODO: Send failure notification to client
    // TODO: Send alert to admin

  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

// Handle completed checkout session
async function handleCheckoutSessionCompleted(session) {
  try {
    console.log('Checkout session completed:', session.id);
    
    // Retrieve the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    
    if (paymentIntent.status === 'succeeded') {
      await handlePaymentIntentSucceeded(paymentIntent);
    }

  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

// Handle successful invoice payment (for subscriptions)
async function handleInvoicePaymentSucceeded(invoice) {
  try {
    console.log('Invoice payment succeeded:', invoice.id);
    
    // Update subscription status in backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/payment-success`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeInvoiceId: invoice.id,
        subscriptionId: invoice.subscription,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        periodStart: new Date(invoice.period_start * 1000),
        periodEnd: new Date(invoice.period_end * 1000)
      }),
    });

    if (backendResponse.ok) {
      console.log('Subscription updated successfully for invoice:', invoice.id);
    }

  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

// Handle subscription creation
async function handleSubscriptionCreated(subscription) {
  try {
    console.log('Subscription created:', subscription.id);
    
    // Update subscription status in backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/created`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        customerId: subscription.customer,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
      }),
    });

    if (backendResponse.ok) {
      console.log('Subscription created in backend:', subscription.id);
    }

  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

// Handle subscription deletion
async function handleSubscriptionDeleted(subscription) {
  try {
    console.log('Subscription deleted:', subscription.id);
    
    // Update subscription status in backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/deleted`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeSubscriptionId: subscription.id,
        status: 'canceled'
      }),
    });

    if (backendResponse.ok) {
      console.log('Subscription canceled in backend:', subscription.id);
    }

  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

// Configure for raw body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};