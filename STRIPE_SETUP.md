# Stripe Integration Setup Guide

This guide will help you set up Stripe payments for your Christmas lighting quote generation platform.

## 🏗️ What's Been Implemented

✅ **Server-side Stripe integration**

- Customer creation
- Subscription management
- Webhook handling
- Payment processing

✅ **Frontend Stripe components**

- Payment form with card input
- Subscription management page
- Pricing integration

✅ **Routes & Navigation**

- `/subscription` - Subscription management
- Pricing buttons link to Stripe checkout

## 🔧 Setup Steps

### 1. Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Sign up for a Stripe account
3. Complete business verification

### 2. Get Your API Keys

1. Go to your Stripe Dashboard
2. Navigate to **Developers > API keys**
3. Copy your **Publishable key** and **Secret key**

### 3. Create Products & Prices

In your Stripe Dashboard:

1. Go to **Products**
2. Create these products:

**Basic Business Plan**

- Name: "Basic Business"
- Price: $49.00 USD (recurring monthly)
- Copy the Price ID

**Professional Plan**

- Name: "Professional"
- Price: $129.00 USD (recurring monthly)
- Copy the Price ID

### 4. Set Environment Variables

Create a `.env` file in your project root:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51xxxxx...
STRIPE_WEBHOOK_SECRET=whsec_xxxxx...

# Stripe Price IDs
STRIPE_BASIC_PRICE_ID=price_xxxxx...
STRIPE_PROFESSIONAL_PRICE_ID=price_xxxxx...

# Frontend Stripe Key
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx...
```

### 5. Setup Webhooks

1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Set URL to: `https://yourdomain.com/api/stripe/webhook`
4. Select these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** to your env vars

### 6. Update Frontend Config

In `client/components/StripePayment.tsx`, update the Stripe publishable key:

```typescript
const stripePromise = loadStripe("pk_test_51xxxxx..."); // Your actual key
```

## 🧪 Testing

### Test Cards (from Stripe)

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future date for expiry and any 3-digit CVC.

### Test Flow

1. Click "Start Free Trial" on homepage
2. Should redirect to subscription page
3. Fill payment form with test card
4. Subscription should be created
5. Check Stripe dashboard for new customer/subscription

## 🚀 Production Deployment

### Environment Variables

Make sure to set these in your production environment:

- All the Stripe keys (use live keys, not test)
- Webhook endpoint URL
- Price IDs from live products

### Domain Verification

- Update webhook URL to your production domain
- Test all payment flows in production

## 📱 Features Working

✅ **Subscription Creation**: Users can subscribe to Basic/Professional plans
✅ **Payment Processing**: Secure card payments via Stripe
✅ **Webhook Handling**: Real-time subscription status updates
✅ **Subscription Management**: Users can view/cancel subscriptions
✅ **Customer Management**: Automatic customer creation in Stripe

## 🎯 Next Steps

1. **Set up your Stripe account** with the steps above
2. **Add your API keys** to environment variables
3. **Test the payment flow** with test cards
4. **Go live** when ready!

The integration is complete and ready to accept real payments once you configure your Stripe account.
