import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Camera,
  MapPin,
  Palette,
  Star,
  ArrowRight,
  CheckCircle,
  TreePine,
  Home,
  CircleDot,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-christmas-snow to-secondary">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-christmas-red" />
          <span className="text-2xl font-bold text-foreground">LightCraft</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <Button size="sm">Get Started</Button>
        </div>
        <Button size="sm" className="md:hidden">
          Menu
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-8 py-20 text-center">
        <Badge className="mb-6 bg-christmas-red/10 text-christmas-red border-christmas-red/20">
          ✨ Holiday Magic Awaits
        </Badge>
        <h1 className="text-4xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Transform Your Home Into a
          <span className="text-transparent bg-gradient-to-r from-christmas-red to-christmas-gold bg-clip-text block">
            Winter Wonderland
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Professional Christmas light installation with AI-powered design.
          Upload a photo of your home or enter your address to see a stunning
          preview of your holiday transformation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-christmas-red hover:bg-christmas-red/90 text-white"
          >
            <Camera className="mr-2 h-5 w-5" />
            Upload Photo & Design
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-christmas-green text-christmas-green hover:bg-christmas-green hover:text-white"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Enter Address
          </Button>
        </div>
        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-christmas-green" />
            <span>Free Design Preview</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-christmas-green" />
            <span>Professional Installation</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-christmas-green" />
            <span>Take Down Service</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 lg:px-8 py-20 bg-card/50">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-christmas-green/10 text-christmas-green border-christmas-green/20">
            Features
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need for Perfect Holiday Lighting
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered design to professional installation, we handle every
            detail of your holiday lighting transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-christmas-red/10 rounded-lg flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-christmas-red" />
              </div>
              <CardTitle>Smart Photo Analysis</CardTitle>
              <CardDescription>
                Upload a photo of your home and our AI accurately measures
                rooflines, windows, and architectural features for perfect light
                placement.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-christmas-green/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-christmas-green" />
              </div>
              <CardTitle>Address Lookup</CardTitle>
              <CardDescription>
                Simply enter your address and we'll use satellite imagery and
                street view data to create accurate measurements and design
                proposals.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-christmas-gold/10 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-christmas-gold" />
              </div>
              <CardTitle>3D Design Preview</CardTitle>
              <CardDescription>
                See exactly how your home will look with realistic 3D mockups
                featuring lights, wreaths, garland, and other holiday
                decorations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-christmas-red/10 rounded-lg flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-christmas-red" />
              </div>
              <CardTitle>Roofline Lights</CardTitle>
              <CardDescription>
                Professional installation of LED lights along gutters,
                rooflines, and architectural details for stunning curb appeal.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-christmas-green/10 rounded-lg flex items-center justify-center mb-4">
                <CircleDot className="h-6 w-6 text-christmas-green" />
              </div>
              <CardTitle>Wreaths & Garland</CardTitle>
              <CardDescription>
                Beautiful wreaths for windows and doors, plus garland
                installation for porches, railings, and entryways.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-christmas-gold/10 rounded-lg flex items-center justify-center mb-4">
                <TreePine className="h-6 w-6 text-christmas-gold" />
              </div>
              <CardTitle>Landscape Lighting</CardTitle>
              <CardDescription>
                Transform your yard with lights on trees, bushes, and walkways.
                Create a magical outdoor winter wonderland.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-christmas-gold/10 text-christmas-gold border-christmas-gold/20">
            How It Works
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            From Photo to Perfect in 3 Simple Steps
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-christmas-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload & Measure</h3>
              <p className="text-muted-foreground">
                Upload a photo of your home or enter your address. Our AI
                analyzes the image to create precise measurements of your
                roofline and features.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-christmas-green rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Design & Preview</h3>
              <p className="text-muted-foreground">
                Choose from our curated designs or customize your own. See
                realistic 3D previews of how your home will look with lights,
                wreaths, and decorations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-christmas-gold rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Professional Install
              </h3>
              <p className="text-muted-foreground">
                Our certified technicians handle everything from installation to
                take-down. Sit back and enjoy your magical holiday
                transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 lg:px-8 py-20 bg-card/50">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-christmas-red/10 text-christmas-red border-christmas-red/20">
            For Business Partners
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Professional Quote Generator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empower your Christmas lighting business with AI-powered measurement
            and instant quote generation. Create professional estimates in
            minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
            <CardHeader>
              <CardTitle className="text-xl mb-2">Basic Business</CardTitle>
              <div className="text-3xl font-bold text-christmas-green mb-2">
                $49
                <span className="text-base font-normal text-muted-foreground ml-1">
                  /month
                </span>
              </div>
              <CardDescription>
                Perfect for small Christmas lighting businesses getting started
                with professional quotes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">
                    50 quote generations per month
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">AI roofline measurement</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">3D design mockups</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Professional quote templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Customer-ready presentations</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-christmas-green hover:bg-christmas-green/90">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          {/* Professional Plan */}
          <Card className="border-christmas-red/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-christmas-red text-white">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle className="text-xl mb-2">Professional</CardTitle>
              <div className="text-3xl font-bold text-christmas-red mb-2">
                $129
                <span className="text-base font-normal text-muted-foreground ml-1">
                  /month
                </span>
              </div>
              <CardDescription>
                Complete solution for established Christmas lighting contractors
                and installers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Unlimited quote generations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Advanced AI property analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Custom pricing & markup tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">CRM integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">White-label presentations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">
                    Automated material calculations
                  </span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-christmas-red hover:bg-christmas-red/90 text-white">
                Start Professional
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
            <CardHeader>
              <CardTitle className="text-xl mb-2">Enterprise</CardTitle>
              <div className="text-3xl font-bold text-christmas-gold mb-2">
                Custom
                <span className="text-base font-normal text-muted-foreground ml-1">
                  pricing
                </span>
              </div>
              <CardDescription>
                Tailored solution for large Christmas lighting companies and
                franchises.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Everything in Professional</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Multi-location management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Team collaboration tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">
                    Advanced analytics & reporting
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">API access & integrations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-christmas-green" />
                  <span className="text-sm">Dedicated account manager</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-christmas-gold hover:bg-christmas-gold/90 text-christmas-gold-foreground">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Business Info */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">
            Powerful Tools for Your Business
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-christmas-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-christmas-green" />
              </div>
              <h4 className="font-medium mb-1">Instant Measurements</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered roofline analysis
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-christmas-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Palette className="h-6 w-6 text-christmas-green" />
              </div>
              <h4 className="font-medium mb-1">Visual Proposals</h4>
              <p className="text-sm text-muted-foreground">
                3D mockups for clients
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-christmas-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-christmas-green" />
              </div>
              <h4 className="font-medium mb-1">Professional Quotes</h4>
              <p className="text-sm text-muted-foreground">Win more business</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-christmas-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-christmas-green" />
              </div>
              <h4 className="font-medium mb-1">Time Savings</h4>
              <p className="text-sm text-muted-foreground">
                5x faster than manual quotes
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-8 italic">
            Trusted by over 500+ Christmas lighting contractors nationwide.
            Start with a 14-day free trial.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8 py-20 bg-gradient-to-r from-christmas-red to-christmas-green text-white">
        <div className="text-center max-w-3xl mx-auto">
          <Sparkles className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of homeowners who trust LightCraft for their holiday
            lighting. Get your free design preview today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/design">
              <Button
                size="lg"
                className="bg-white text-christmas-red hover:bg-gray-100"
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Your Design
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12 border-t bg-card/30">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Sparkles className="h-6 w-6 text-christmas-red" />
            <span className="text-xl font-bold">LightCraft</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2024 LightCraft. Making holidays brighter, one home at a time.
        </div>
      </footer>
    </div>
  );
}
