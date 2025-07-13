import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  createSubscription,
  createCustomer,
  createSetupIntent,
  getCustomerSubscriptions,
  cancelSubscription,
  handleWebhook,
  getPricingPlans,
} from "./routes/stripe";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());

  // Webhook endpoint needs raw body
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    handleWebhook,
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Stripe API routes
  app.post("/api/stripe/create-customer", createCustomer);
  app.post("/api/stripe/create-subscription", createSubscription);
  app.post("/api/stripe/create-setup-intent", createSetupIntent);
  app.get("/api/stripe/subscriptions/:customerId", getCustomerSubscriptions);
  app.post(
    "/api/stripe/cancel-subscription/:subscriptionId",
    cancelSubscription,
  );
  app.get("/api/stripe/pricing-plans", getPricingPlans);

  return app;
}
