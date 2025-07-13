import { RequestHandler } from "express";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_...", {
  apiVersion: "2025-06-30.basil",
});

// Create subscription
export const createSubscription: RequestHandler = async (req, res) => {
  try {
    const { customerId, priceId } = req.body;

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    const invoice = subscription.latest_invoice as any;
    const paymentIntent = invoice?.payment_intent;

    res.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent?.client_secret,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
};

// Create customer
export const createCustomer: RequestHandler = async (req, res) => {
  try {
    const { email, name, company } = req.body;

    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        company,
      },
    });

    res.json({ customerId: customer.id });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

// Create setup intent for payment method
export const createSetupIntent: RequestHandler = async (req, res) => {
  try {
    const { customerId } = req.body;

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("Error creating setup intent:", error);
    res.status(500).json({ error: "Failed to create setup intent" });
  }
};

// Get customer subscriptions
export const getCustomerSubscriptions: RequestHandler = async (req, res) => {
  try {
    const { customerId } = req.params;

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });

    res.json({ subscriptions: subscriptions.data });
  } catch (error) {
    console.error("Error getting subscriptions:", error);
    res.status(500).json({ error: "Failed to get subscriptions" });
  }
};

// Cancel subscription
export const cancelSubscription: RequestHandler = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    res.json({ subscription });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).json({ error: "Failed to cancel subscription" });
  }
};

// Webhook handler
export const handleWebhook: RequestHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      console.log("Subscription created:", event.data.object);
      // Update user account status to active
      break;
    case "customer.subscription.updated":
      console.log("Subscription updated:", event.data.object);
      // Update user subscription status
      break;
    case "customer.subscription.deleted":
      console.log("Subscription deleted:", event.data.object);
      // Downgrade user account
      break;
    case "invoice.payment_succeeded":
      console.log("Payment succeeded:", event.data.object);
      // Extend subscription period
      break;
    case "invoice.payment_failed":
      console.log("Payment failed:", event.data.object);
      // Send payment failure notification
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Get pricing plans
export const getPricingPlans: RequestHandler = async (req, res) => {
  try {
    // Define your pricing plans (create these in Stripe Dashboard)
    const plans = [
      {
        id: "basic",
        name: "Basic Business",
        price: 4900, // $49.00 in cents
        priceId: process.env.STRIPE_BASIC_PRICE_ID || "price_basic",
        features: [
          "50 quote generations per month",
          "AI roofline measurement",
          "3D design mockups",
          "Professional quote templates",
          "Customer-ready presentations",
        ],
      },
      {
        id: "professional",
        name: "Professional",
        price: 12900, // $129.00 in cents
        priceId:
          process.env.STRIPE_PROFESSIONAL_PRICE_ID || "price_professional",
        features: [
          "Unlimited quote generations",
          "Advanced AI property analysis",
          "Custom pricing & markup tools",
          "CRM integration",
          "White-label presentations",
          "Automated material calculations",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: null, // Custom pricing
        priceId: null,
        features: [
          "Everything in Professional",
          "Multi-location management",
          "Team collaboration tools",
          "Advanced analytics & reporting",
          "API access & integrations",
          "Dedicated account manager",
        ],
      },
    ];

    res.json({ plans });
  } catch (error) {
    console.error("Error getting pricing plans:", error);
    res.status(500).json({ error: "Failed to get pricing plans" });
  }
};
