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
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Camera,
  MapPin,
  Upload,
  ArrowLeft,
  ArrowRight,
  Zap,
  Home,
  TreePine,
  CircleDot,
  Star,
  Palette,
  Download,
  Share,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Design() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMockup, setShowMockup] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [selectedDesign, setSelectedDesign] = useState("classic");
  const [currentStep, setCurrentStep] = useState("upload"); // upload, analyzing, results, quote
  const [generatingQuote, setGeneratingQuote] = useState(false);
  const [quoteGenerated, setQuoteGenerated] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        startAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressSubmit = () => {
    if (address.trim()) {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep("analyzing");

    // Simulate realistic AI analysis with detailed progress
    const analysisSteps = [
      {
        progress: 15,
        message: "Detecting front roofline and facade...",
      },
      {
        progress: 30,
        message: "Measuring front-facing roofline dimensions...",
      },
      { progress: 45, message: "Identifying front windows and entryway..." },
      { progress: 60, message: "Calculating front facade light placement..." },
      {
        progress: 75,
        message: "Analyzing front porch and entrance features...",
      },
      {
        progress: 90,
        message: "Generating front-facing design recommendations...",
      },
      { progress: 100, message: "Front facade analysis complete!" },
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < analysisSteps.length) {
        setAnalysisProgress(analysisSteps[stepIndex].progress);
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);

        // Generate realistic analysis results focused on front facade
        // Determine local pricing based on income level ($7-$10 per foot)
        const incomeLevel = ["low", "medium", "high"][
          Math.floor(Math.random() * 3)
        ];
        const pricePerFoot =
          incomeLevel === "low" ? 7 : incomeLevel === "medium" ? 8.5 : 10;

        const results = {
          rooflineLength: Math.floor(Math.random() * 100) + 120, // 120-220 ft (front only)
          windows: Math.floor(Math.random() * 5) + 3, // 3-8 front windows
          doors: 1, // Front door only
          garageDoors: Math.floor(Math.random() * 3), // 0-2 garage doors
          porchLength: Math.floor(Math.random() * 30) + 10, // 10-40 ft porch
          entryFeatures: Math.floor(Math.random() * 3) + 1, // 1-3 entry features
          pricePerFoot, // $7-$10 per foot based on local income
          incomeLevel, // For display purposes
          difficulty: ["Easy", "Moderate", "Complex"][
            Math.floor(Math.random() * 3)
          ],
          estimatedTime: Math.floor(Math.random() * 3) + 2, // 2-5 hours (front only)
          recommendations: [
            "Outline front roofline with warm white LEDs",
            "Frame all front-facing windows with lights",
            "Add wreath to front door and garage doors",
            "Accent front porch columns and railings",
            "Consider mini lights on front landscaping",
          ],
        };

        setAnalysisResults(results);
        setShowMockup(true);
        setCurrentStep("results");
      }
    }, 800);
  };

  const generateQuote = (designType: string) => {
    setGeneratingQuote(true);
    setSelectedDesign(designType);

    // Simulate quote generation
    setTimeout(() => {
      setGeneratingQuote(false);
      setQuoteGenerated(true);
      setCurrentStep("quote");

      // Save to localStorage for demo
      const quote = {
        id: Date.now(),
        designType,
        analysisResults,
        address: address || "Photo Upload",
        date: new Date().toLocaleDateString(),
        status: "Generated",
      };

      const existingQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
      existingQuotes.push(quote);
      localStorage.setItem("quotes", JSON.stringify(existingQuotes));
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
        <div className="flex items-center space-x-4">
          <Badge
            variant="outline"
            className="border-christmas-green text-christmas-green"
          >
            Free Design Tool
          </Badge>
          <Button size="sm" variant="ghost">
            Help
          </Button>
        </div>
      </nav>

      <div className="px-6 lg:px-8 py-8">
        {!showMockup ? (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                Design Your Holiday Display
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload a photo of your home or enter your address to get
                started. Our AI will analyze your property and create stunning
                design options.
              </p>
            </div>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <Card className="mb-8 border-christmas-gold/20 bg-christmas-gold/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-6 w-6 text-christmas-gold animate-pulse" />
                    <div>
                      <CardTitle className="text-lg">
                        Analyzing Your Property
                      </CardTitle>
                      <CardDescription>
                        Our AI is measuring rooflines and identifying key
                        features...
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={analysisProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {analysisProgress < 15 && "Initializing AI analysis..."}
                    {analysisProgress >= 15 &&
                      analysisProgress < 30 &&
                      "Detecting rooflines and architectural features..."}
                    {analysisProgress >= 30 &&
                      analysisProgress < 45 &&
                      "Measuring roofline dimensions..."}
                    {analysisProgress >= 45 &&
                      analysisProgress < 60 &&
                      "Identifying window and door locations..."}
                    {analysisProgress >= 60 &&
                      analysisProgress < 75 &&
                      "Calculating optimal light placement zones..."}
                    {analysisProgress >= 75 &&
                      analysisProgress < 90 &&
                      "Analyzing landscape features..."}
                    {analysisProgress >= 90 &&
                      analysisProgress < 100 &&
                      "Generating design recommendations..."}
                    {analysisProgress >= 100 && "Analysis complete!"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Upload/Address Input */}
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="upload"
                  className="flex items-center space-x-2"
                >
                  <Camera className="h-4 w-4" />
                  <span>Upload Photo</span>
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  className="flex items-center space-x-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Enter Address</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <Card className="border-dashed border-2 border-christmas-green/30">
                  <CardContent className="p-12 text-center">
                    {uploadedImage ? (
                      <div className="space-y-6">
                        <img
                          src={uploadedImage}
                          alt="Uploaded house"
                          className="max-w-full h-64 object-cover rounded-lg mx-auto shadow-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Great Photo!
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            We can see your home clearly. Ready to analyze?
                          </p>
                          <Button
                            onClick={startAnalysis}
                            className="bg-christmas-green hover:bg-christmas-green/90"
                            disabled={isAnalyzing}
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="w-20 h-20 bg-christmas-green/10 rounded-full flex items-center justify-center mx-auto">
                          <Upload className="h-10 w-10 text-christmas-green" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Upload a Front View Photo
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Take a photo from the street showing only the front
                            facade of the house. Focus on the front roofline,
                            windows, doors, and porch area that will be
                            decorated with Christmas lights.
                          </p>
                          <Label
                            htmlFor="photo-upload"
                            className="cursor-pointer"
                          >
                            <Button
                              asChild
                              className="bg-christmas-red hover:bg-christmas-red/90"
                            >
                              <span>
                                <Camera className="mr-2 h-4 w-4" />
                                Choose Photo
                              </span>
                            </Button>
                          </Label>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                          <div className="text-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              ✓
                            </div>
                            Front roofline
                          </div>
                          <div className="text-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              ✓
                            </div>
                            Street view angle
                          </div>
                          <div className="text-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              ✓
                            </div>
                            Porch & windows
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="address">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-christmas-green" />
                      <span>Enter Your Address</span>
                    </CardTitle>
                    <CardDescription>
                      We'll use satellite imagery and street view data to
                      analyze the front facade and create accurate measurements
                      for Christmas light installation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St, City, State ZIP"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <Button
                      onClick={handleAddressSubmit}
                      className="w-full bg-christmas-green hover:bg-christmas-green/90"
                      disabled={!address.trim() || isAnalyzing}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {isAnalyzing ? "Analyzing..." : "Analyze Address"}
                    </Button>
                    <div className="text-sm text-muted-foreground text-center">
                      Don't worry - we only use your address to find your
                      property. We never store or share your personal
                      information.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          /* Mockup Results */
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => setShowMockup(false)}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Upload
              </Button>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Your Holiday Design Preview
              </h1>
              <p className="text-lg text-muted-foreground">
                Here's how your home will look with professional Christmas
                lighting. Choose your favorite design or customize further.
              </p>
            </div>

            {/* Analysis Results */}
            {analysisResults && (
              <Card className="mb-8 bg-gradient-to-r from-christmas-green/5 to-christmas-red/5">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-christmas-gold" />
                    <span>AI Analysis Results</span>
                  </CardTitle>
                  <CardDescription>
                    Here's what our AI detected about your front facade
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-christmas-green">
                        {analysisResults.rooflineLength}ft
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Front Roofline
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-christmas-red">
                        {analysisResults.windows}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Front Windows
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-christmas-gold">
                        {analysisResults.porchLength}ft
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Porch/Entry
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-christmas-green">
                        {analysisResults.estimatedTime}hrs
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Install Time
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Local Pricing:</h4>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">
                            Base rate per foot:
                          </span>
                          <span className="font-semibold text-christmas-green">
                            ${analysisResults.pricePerFoot}/ft
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Market level:
                          </span>
                          <span className="text-xs uppercase font-medium text-christmas-gold">
                            {analysisResults.incomeLevel} income area
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">
                        AI Recommendations:
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {analysisResults.recommendations
                          .slice(0, 3)
                          .map((rec: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-1.5 h-1.5 bg-christmas-green rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {rec}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Original Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Original</CardTitle>
                  <CardDescription>Your home as it is now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Original house"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Home className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Property View</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Mockup with Lights */}
              <Card className="border-christmas-red/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-christmas-red">
                        With Christmas Lights
                      </CardTitle>
                      <CardDescription>
                        Professional holiday transformation
                      </CardDescription>
                    </div>
                    <Badge className="bg-christmas-red text-white">
                      Recommended
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Simulated Christmas lights effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-christmas-red/20 to-christmas-green/20 rounded-lg"></div>
                    <div className="text-center text-white relative z-10">
                      <Sparkles className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                      <p className="text-lg font-semibold">
                        Magical Transformation
                      </p>
                      <p className="text-sm opacity-80">
                        Roofline lights • Window wreaths • Tree lighting
                      </p>
                    </div>
                    {/* Animated light dots */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-christmas-red rounded-full animate-pulse"></div>
                    <div className="absolute top-6 left-12 w-2 h-2 bg-christmas-gold rounded-full animate-pulse delay-100"></div>
                    <div className="absolute top-4 left-20 w-2 h-2 bg-christmas-green rounded-full animate-pulse delay-200"></div>
                    <div className="absolute bottom-8 right-8 w-2 h-2 bg-christmas-red rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-12 right-16 w-2 h-2 bg-christmas-gold rounded-full animate-pulse delay-400"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Design Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-christmas-red/30">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-christmas-red/10 rounded-lg flex items-center justify-center">
                      <Home className="h-5 w-5 text-christmas-red" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Classic Elegance
                      </CardTitle>
                      <CardDescription>
                        Warm white roofline lights
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Roofline lights:</span>
                      <span className="font-medium">
                        {analysisResults?.rooflineLength || 350} ft
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Materials:</span>
                      <span className="font-medium">LED warm white</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Install time:</span>
                      <span className="font-medium">
                        {analysisResults?.estimatedTime || 4} hours
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-semibold">Total cost:</span>
                      <span className="font-bold text-christmas-green">
                        $
                        {analysisResults
                          ? Math.floor(
                              analysisResults.rooflineLength *
                                analysisResults.pricePerFoot +
                                50,
                            )
                          : 840}
                      </span>
                    </div>
                    {analysisResults && (
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        Based on ${analysisResults.pricePerFoot}/ft local rate
                      </div>
                    )}
                  </div>
                  <Button
                    className="w-full mt-4 bg-christmas-red hover:bg-christmas-red/90"
                    onClick={() => generateQuote("classic")}
                    disabled={generatingQuote}
                  >
                    {generatingQuote && selectedDesign === "classic" ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                        Generating Quote...
                      </>
                    ) : (
                      "Generate Quote"
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-christmas-green/30">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-christmas-green/10 rounded-lg flex items-center justify-center">
                      <TreePine className="h-5 w-5 text-christmas-green" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Front Facade Premium
                      </CardTitle>
                      <CardDescription>
                        Complete front display package
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Front roofline + porch:</span>
                      <span className="font-medium">
                        {analysisResults?.rooflineLength || 180}ft +{" "}
                        {analysisResults?.porchLength || 20}ft
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wreaths & garland:</span>
                      <span className="font-medium">
                        {analysisResults?.windows || 5} wreaths + porch garland
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Install time:</span>
                      <span className="font-medium">
                        {analysisResults
                          ? analysisResults.estimatedTime + 1
                          : 4}{" "}
                        hours
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-semibold">Total cost:</span>
                      <span className="font-bold text-christmas-green">
                        $
                        {analysisResults
                          ? Math.floor(
                              (analysisResults.rooflineLength +
                                analysisResults.porchLength) *
                                analysisResults.pricePerFoot *
                                1.5 +
                                analysisResults.windows * 45 +
                                100,
                            )
                          : 1150}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-christmas-green hover:bg-christmas-green/90"
                    onClick={() => generateQuote("wonderland")}
                    disabled={generatingQuote}
                  >
                    {generatingQuote && selectedDesign === "wonderland" ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                        Generating Quote...
                      </>
                    ) : (
                      "Generate Quote"
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-christmas-gold/30">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-christmas-gold/10 rounded-lg flex items-center justify-center">
                      <Palette className="h-5 w-5 text-christmas-gold" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Custom Design</CardTitle>
                      <CardDescription>
                        Personalized colors & patterns
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Consultation:</span>
                      <span className="font-medium">Free design call</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Starting at:</span>
                      <span className="font-medium text-christmas-green">
                        $650
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-christmas-red hover:bg-christmas-red/90 text-white"
              >
                <Star className="mr-2 h-5 w-5" />
                Book Installation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-5 w-5" />
                Download Preview
              </Button>
              <Button size="lg" variant="outline">
                <Share className="mr-2 h-5 w-5" />
                Share Design
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
