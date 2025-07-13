import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard } from "lucide-react";

// Load Stripe (use your publishable key)
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "pk_test_51...", // Replace with your actual publishable key
);

interface PricingPlan {
  id: string;
  name: string;
  price: number | null;
  priceId: string | null;
  features: string[];
}

interface StripePaymentFormProps {
  plan: PricingPlan;
  customerId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

function StripePaymentForm({
  plan,
  customerId,
  onSuccess,
  onCancel,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found");
      setIsLoading(false);
      return;
    }

    try {
      // Create subscription
      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          priceId: plan.priceId,
        }),
      });

      const { clientSecret, subscriptionId } = await response.json();

      // Confirm payment
      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        },
      );

      if (confirmError) {
        setError(confirmError.message || "Payment failed");
      } else {
        // Payment succeeded
        localStorage.setItem("subscriptionId", subscriptionId);
        localStorage.setItem("currentPlan", plan.id);
        onSuccess();
      }
    } catch (err) {
      setError("An error occurred while processing payment");
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Subscribe to {plan.name}</span>
        </CardTitle>
        <CardDescription>
          Complete your subscription to start generating professional quotes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{plan.name}</h3>
              <Badge>
                {plan.price ? `$${plan.price / 100}/month` : "Custom"}
              </Badge>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {plan.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-christmas-green" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Method</label>
            <div className="border rounded-md p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              type="submit"
              className="flex-1 bg-christmas-green hover:bg-christmas-green/90"
              disabled={!stripe || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </>
              ) : (
                `Subscribe for $${plan.price ? plan.price / 100 : "Custom"}/month`
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Your subscription will automatically renew monthly. Cancel anytime
            from your dashboard.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

interface StripePaymentProps {
  plan: PricingPlan;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function StripePayment({
  plan,
  onSuccess,
  onCancel,
}: StripePaymentProps) {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(true);

  useEffect(() => {
    createCustomer();
  }, []);

  const createCustomer = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const userName = localStorage.getItem("userName");
      const userCompany = localStorage.getItem("userCompany");

      const response = await fetch("/api/stripe/create-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          company: userCompany,
        }),
      });

      const { customerId } = await response.json();
      setCustomerId(customerId);
      localStorage.setItem("stripeCustomerId", customerId);
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setIsCreatingCustomer(false);
    }
  };

  if (isCreatingCustomer) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-christmas-green border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Setting up your account...</p>
        </CardContent>
      </Card>
    );
  }

  if (!customerId) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-red-600">
            Failed to set up payment. Please try again.
          </p>
          <Button onClick={createCustomer} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        plan={plan}
        customerId={customerId}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
}
