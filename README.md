# 🚀 Nexus Stack - Modern Tech Solutions

A cutting-edge technology agency website built with Next.js, featuring AI automation services, project showcases, and client management.

![Nexus Stack](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop)

## ✨ Features

### Frontend
- **Modern Design**: Dark blue theme with glass morphism effects
- **Responsive**: Fully responsive across all devices
- **Animations**: Smooth animations with Framer Motion
- **Dynamic Content**: Rotating hero sections and interactive components
- **Project Gallery**: Horizontal scrolling featured projects
- **AI Automation**: Dedicated AI services section
- **Contact Forms**: Multi-step forms with validation

### Backend
- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT-based auth system
- **Payment Integration**: Stripe payment processing
- **Email Service**: Automated email notifications
- **File Upload**: Support for images and documents
- **Database**: MongoDB with optimized queries
- **Security**: Rate limiting, input validation, CORS

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **State Management**: React Context

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Payments**: Stripe
- **Email**: Nodemailer
- **File Upload**: Multer

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 5.0+
- Stripe Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nexus-stack.git
   cd nexus-stack

1. Frontend Setup

bash
cd frontend
npm install
cp .env.example .env.local
# Update environment variables
npm run dev

2. Backend Setup

bash
cd backend
npm install
cp .env.example .env
# Update environment variables
npm run dev


4. Database Setup

bash
# Seed initial data
npm run seed

# Create admin user
npm run create-admin
Environment Variables
Frontend (.env.local)
env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
Backend (.env)
env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexus-stack
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_...
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
📁 Project Structure
text
nexus-stack/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities and config
│   └── public/              # Static assets
├── backend/                 # Express.js API
│   ├── controllers/         # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── utils/              # Helper functions
└── docs/                   # Documentation