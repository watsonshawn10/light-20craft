import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  ArrowLeft,
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userType", "business");
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem(
        "userName",
        `${formData.firstName} ${formData.lastName}`,
      );
      localStorage.setItem("userCompany", formData.company);
      localStorage.setItem("userType", "business");
      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-christmas-snow to-secondary">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          <Sparkles className="h-8 w-8 text-christmas-red" />
          <span className="text-2xl font-bold text-foreground">LightCraft</span>
        </Link>
        <Badge
          variant="outline"
          className="border-christmas-gold text-christmas-gold"
        >
          Professional Tools
        </Badge>
      </nav>

      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Join LightCraft
            </h1>
            <p className="text-muted-foreground">
              Start generating professional Christmas lighting quotes today
            </p>
          </div>

          {/* Auth Tabs */}
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Building2 className="h-5 w-5 text-christmas-green" />
                    <span>Business Account</span>
                  </CardTitle>
                  <CardDescription>
                    Create your professional Christmas lighting business account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Christmas Lights Pro"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-christmas-green hover:bg-christmas-green/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <User className="mr-2 h-4 w-4" />
                          Create Business Account
                        </>
                      )}
                    </Button>
                  </form>

                  <Separator className="my-6" />

                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Start with a 14-day free trial
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-christmas-green" />
                        <span>No credit card required</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-christmas-green" />
                        <span>Cancel anytime</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to your Christmas lighting business account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">Email</Label>
                      <Input
                        id="loginEmail"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loginPassword">Password</Label>
                      <Input
                        id="loginPassword"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-muted-foreground">
                          Remember me
                        </span>
                      </label>
                      <a
                        href="#"
                        className="text-christmas-green hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-christmas-red hover:bg-christmas-red/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </form>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Demo Credentials (for testing):
                    </p>
                    <div className="bg-muted/50 p-3 rounded text-xs space-y-1">
                      <div>
                        <strong>Email:</strong> demo@lightcraft.com
                      </div>
                      <div>
                        <strong>Password:</strong> demo123
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Trust Signals */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by over 500+ Christmas lighting professionals
            </p>
            <div className="flex items-center justify-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-christmas-gold text-christmas-gold"
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                4.9/5 from 1,200+ reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
