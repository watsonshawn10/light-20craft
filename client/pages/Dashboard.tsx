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
  Plus,
  Camera,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    company: "",
  });

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    // Load user data
    setUser({
      name: localStorage.getItem("userName") || "Business User",
      email: localStorage.getItem("userEmail") || "",
      company: localStorage.getItem("userCompany") || "Your Company",
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userCompany");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const stats = [
    {
      title: "Quotes Generated",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-christmas-green",
    },
    {
      title: "Revenue This Month",
      value: "$18,420",
      change: "+23%",
      icon: DollarSign,
      color: "text-christmas-gold",
    },
    {
      title: "Active Projects",
      value: "8",
      change: "+2",
      icon: Users,
      color: "text-christmas-red",
    },
    {
      title: "Conversion Rate",
      value: "68%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-christmas-green",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      address: "123 Maple Street, Anytown",
      status: "Quote Sent",
      value: "$1,245",
      date: "2 days ago",
      type: "Winter Wonderland",
    },
    {
      id: 2,
      address: "456 Oak Drive, Hometown",
      status: "In Progress",
      value: "$2,180",
      date: "1 week ago",
      type: "Custom Design",
    },
    {
      id: 3,
      address: "789 Pine Avenue, Cityville",
      status: "Completed",
      value: "$875",
      date: "2 weeks ago",
      type: "Roofline Classic",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-christmas-snow to-secondary">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b bg-card/50">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-christmas-red" />
          <span className="text-2xl font-bold text-foreground">LightCraft</span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.company}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      <div className="px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your Christmas lighting business today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link to="/design">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-christmas-green/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-christmas-green/10 rounded-lg flex items-center justify-center">
                    <Camera className="h-6 w-6 text-christmas-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Create New Quote</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload photo or enter address
                    </p>
                  </div>
                  <Plus className="h-5 w-5 text-muted-foreground ml-auto" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-christmas-red/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-christmas-red/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-christmas-red" />
                </div>
                <div>
                  <h3 className="font-semibold">Browse Projects</h3>
                  <p className="text-sm text-muted-foreground">
                    View all quotes and installations
                  </p>
                </div>
                <Plus className="h-5 w-5 text-muted-foreground ml-auto" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>
                  Your latest Christmas lighting quotes and installations
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-christmas-green/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-christmas-green" />
                    </div>
                    <div>
                      <p className="font-medium">{project.address}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge
                          variant={
                            project.status === "Completed"
                              ? "default"
                              : project.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {project.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-christmas-green">
                      {project.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
