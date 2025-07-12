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
  Wreath,
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

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowMockup(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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
                    {analysisProgress < 30 &&
                      "Detecting rooflines and architectural features..."}
                    {analysisProgress >= 30 &&
                      analysisProgress < 60 &&
                      "Calculating measurements and angles..."}
                    {analysisProgress >= 60 &&
                      analysisProgress < 90 &&
                      "Identifying optimal light placement zones..."}
                    {analysisProgress >= 90 &&
                      "Generating design recommendations..."}
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
                            Upload a Photo of Your Home
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            For best results, take a photo from the street
                            showing the front of your house clearly. Include the
                            roofline and any trees or landscaping you'd like to
                            light up.
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
                            Clear roofline
                          </div>
                          <div className="text-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              ✓
                            </div>
                            Good lighting
                          </div>
                          <div className="text-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              ��
                            </div>
                            Front view
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
                      analyze your property and create accurate measurements.
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
                      <span className="font-medium">350 ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated cost:</span>
                      <span className="font-medium text-christmas-green">
                        $485
                      </span>
                    </div>
                  </div>
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
                        Winter Wonderland
                      </CardTitle>
                      <CardDescription>Full property lighting</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Full package:</span>
                      <span className="font-medium">House + trees</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated cost:</span>
                      <span className="font-medium text-christmas-green">
                        $785
                      </span>
                    </div>
                  </div>
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
