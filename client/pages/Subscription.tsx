import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import StripePayment from "@/components/StripePayment";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

interface PricingPlan {
  id: string;
  name: string;
  price: number | null;
  priceId: string | null;
  features: string[];
}

export default function Subscription() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    loadPricingPlans();
    loadCurrentSubscription();
  }, [navigate]);

  useEffect(() => {
    if (plans.length > 0 && planId) {
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
        setShowPayment(true);
      }
    }
  }, [plans, planId]);

  const loadPricingPlans = async () => {
    try {
      const response = await fetch("/api/stripe/pricing-plans");
      const { plans } = await response.json();
      setPlans(plans);
    } catch (error) {
      console.error("Error loading pricing plans:", error);
    }
  };

  const loadCurrentSubscription = async () => {
    try {
      const customerId = localStorage.getItem("stripeCustomerId");
      if (customerId) {
        const response = await fetch(`/api/stripe/subscriptions/${customerId}`);
        const { subscriptions } = await response.json();
        if (subscriptions.length > 0) {
          setCurrentSubscription(subscriptions[0]);
        }
      }
    } catch (error) {
      console.error("Error loading subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    navigate("/dashboard");
  };

  const handleCancelPayment = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return;

    try {
      await fetch(`/api/stripe/cancel-subscription/${currentSubscription.id}`, {
        method: "POST",
      });

      // Refresh subscription data
      loadCurrentSubscription();
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  if (showPayment && selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-christmas-snow to-secondary">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <Link to="/subscription" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <Sparkles className="h-8 w-8 text-christmas-red" />
            <span className="text-2xl font-bold text-foreground">
              LightCraft
            </span>
          </Link>
        </nav>

        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto">
            <StripePayment
              plan={selectedPlan}
              onSuccess={handlePaymentSuccess}
              onCancel={handleCancelPayment}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-christmas-snow to-secondary">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          <Sparkles className="h-8 w-8 text-christmas-red" />
          <span className="text-2xl font-bold text-foreground">LightCraft</span>
        </Link>
      </nav>

      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Subscription Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your Christmas lighting business subscription
            </p>
          </div>

          {/* Current Subscription */}
          {!isLoading && currentSubscription && (
            <Card className="mb-8 border-christmas-green/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-christmas-green" />
                  <span>Current Subscription</span>
                </CardTitle>
                <CardDescription>
                  Your active subscription details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-christmas-green">
                      {currentSubscription.status === "active"
                        ? "Active"
                        : currentSubscription.status}
                    </div>
                    <p className="text-sm text-muted-foreground">Status</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-christmas-red">
                      $
                      {(
                        currentSubscription.items.data[0].price.unit_amount /
                        100
                      ).toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">Monthly</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-christmas-gold">
                      {new Date(
                        currentSubscription.current_period_end * 1000,
                      ).toLocaleDateString()}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Next Billing
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      {currentSubscription.items.data[0].price.nickname ||
                        "Current Plan"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentSubscription.cancel_at_period_end
                        ? "Cancels at period end"
                        : "Automatically renews"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleCancelSubscription}
                    disabled={currentSubscription.cancel_at_period_end}
                  >
                    {currentSubscription.cancel_at_period_end
                      ? "Cancelled"
                      : "Cancel Subscription"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  plan.id === "professional"
                    ? "border-christmas-red/30"
                    : "border-none"
                }`}
              >
                <CardHeader>
                  {plan.id === "professional" && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-christmas-red text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-christmas-green">
                    {plan.price ? `$${plan.price / 100}` : "Custom"}
                    {plan.price && (
                      <span className="text-base font-normal text-muted-foreground ml-1">
                        /month
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-christmas-green" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.id === "basic"
                        ? "bg-christmas-green hover:bg-christmas-green/90"
                        : plan.id === "professional"
                          ? "bg-christmas-red hover:bg-christmas-red/90 text-white"
                          : "bg-christmas-gold hover:bg-christmas-gold/90 text-christmas-gold-foreground"
                    }`}
                    onClick={() => {
                      if (plan.priceId) {
                        setSelectedPlan(plan);
                        setShowPayment(true);
                      } else {
                        // Handle enterprise contact
                        window.location.href = "mailto:sales@lightcraft.com";
                      }
                    }}
                  >
                    {plan.id === "enterprise" ? "Contact Sales" : "Subscribe"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
