const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const ServiceBooking = require('../models/ServiceBooking');

// Stripe webhook handler
router.post('/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handlePaymentSuccess(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      await handlePaymentFailure(failedPayment);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Handle successful payment
const handlePaymentSuccess = async (paymentIntent) => {
  try {
    const booking = await ServiceBooking.findOne({ 
      'payment.stripePaymentId': paymentIntent.id 
    });

    if (booking) {
      booking.payment.status = 'paid';
      booking.status = 'approved';
      await booking.save();
      
      console.log(`Payment successful for booking: ${booking._id}`);
      
      // TODO: Send confirmation email
      // TODO: Notify admin team
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
};

// Handle failed payment
const handlePaymentFailure = async (paymentIntent) => {
  try {
    const booking = await ServiceBooking.findOne({ 
      'payment.stripePaymentId': paymentIntent.id 
    });

    if (booking) {
      booking.payment.status = 'failed';
      await booking.save();
      
      console.log(`Payment failed for booking: ${booking._id}`);
      
      // TODO: Send failure notification email
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
};

module.exports = router;