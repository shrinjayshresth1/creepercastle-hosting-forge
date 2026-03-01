import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Settings, 
  BarChart3, 
  FileText, 
  Users, 
  Database, 
  Terminal, 
  Clock,
  Zap,
  Lock,
  Eye,
  Upload,
  Maximize2
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const CreeperPanel = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const panelStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CreeperPanel - Advanced Pterodactyl Game Server Management Panel",
    "description": "Professional Pterodactyl-based game server management panel with enhanced features, real-time monitoring, and intuitive controls for Minecraft hosting in India",
    "url": "https://creepercastle.cloud/creeperpanel",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "CreeperCastle.cloud"
    },
    "featureList": [
      "Real-time server monitoring and analytics",
      "Advanced file management system",
      "Granular user permission controls",
      "Automated backup solutions",
      "Resource usage tracking",
      "Console access with command history",
      "Plugin and modpack management",
      "Database management with phpMyAdmin"
    ]
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://creepercastle.cloud/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "CreeperPanel - Game Server Management",
        "item": "https://creepercastle.cloud/creeperpanel"
      }
    ]
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Advanced Security",
      description: "Multi-layer security with SSL encryption, secure file uploads, and permission-based access control."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "Live server statistics, resource usage tracking, and performance metrics at your fingertips."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "File Manager",
      description: "Intuitive web-based file management with syntax highlighting, bulk operations, and instant editing."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User Management",
      description: "Granular permission system allowing you to control user access and server privileges."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Control",
      description: "Built-in MySQL database management with phpMyAdmin integration for easy database operations."
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "Console Access",
      description: "Full console access with command history, auto-completion, and real-time log viewing."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Scheduled Tasks",
      description: "Automate server restarts, backups, and maintenance tasks with flexible scheduling options."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "One-Click Actions",
      description: "Quick server controls for start, stop, restart, and kill operations with instant response."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Backup System",
      description: "Automated and manual backup solutions with easy restore functionality and cloud storage."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Activity Logs",
      description: "Comprehensive logging system tracking all user actions and server events for security auditing."
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Bulk Operations",
      description: "Upload, download, and manage multiple files simultaneously with drag-and-drop support."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Custom Configuration",
      description: "Advanced server configuration options with template support and environment variable management."
    }
  ];

  const galleryImages = [
    {
      src: "/lovable-uploads/1aa7c40e-4b4e-4f71-aece-422bbb83c44d.png",
      title: "Main Dashboard Overview",
      description: "Clean and intuitive dashboard showing all your servers at a glance with real-time status indicators and performance metrics."
    },
    {
      src: "/lovable-uploads/5227a018-136b-44df-97e1-2299f341dc9a.png",
      title: "Server Software Selection",
      description: "Easy installation of popular Minecraft server software including Vanilla, Paper, Fabric, Forge, and more with one-click setup."
    },
    {
      src: "/lovable-uploads/2438992b-d6f7-4d94-a322-4177eea49af9.png",
      title: "Modpack Browser & Installation",
      description: "Integrated modpack browser with one-click installation from CurseForge, Modrinth, and other popular modpack platforms."
    },
    {
      src: "/lovable-uploads/615da461-6dbe-465d-9c80-a4112fed531a.png",
      title: "Network Traffic Monitoring",
      description: "Real-time network traffic monitoring with detailed bandwidth usage graphs, analytics, and performance insights."
    },
    {
      src: "/lovable-uploads/0bd82873-59a0-4bfd-8373-94d6cbd284e5.png",
      title: "Advanced Player Management",
      description: "Comprehensive player management system with operator controls, whitelist management, and ban administration tools."
    },
    {
      src: "/lovable-uploads/736b328a-74c2-44d6-b343-c91a2100b2ac.png",
      title: "Secure SFTP File Transfer",
      description: "Built-in SFTP client for secure file transfers with saved connection profiles and drag-and-drop functionality."
    },
    {
      src: "/lovable-uploads/75b0eb97-90c3-4f01-b2f6-e0e9a6976091.png",
      title: "Backup & Recovery System",
      description: "Comprehensive backup and file recovery system with automated scheduled backups and easy one-click restoration."
    },
    {
      src: "/lovable-uploads/111200d7-6a70-4095-8413-a02d0509e4ee.png",
      title: "Plugin Management Hub",
      description: "Browse, install, and manage plugins directly from the panel with automatic updates and version control."
    },
    {
      src: "/lovable-uploads/c6d5c634-dfe2-45d2-b4f9-c261d99d7558.png",
      title: "Custom Subdomain Management",
      description: "Create and manage custom subdomains for your servers with integrated DNS management and SSL certificates."
    }
  ];

  return (
    <>
      <Helmet>
        <title>CreeperPanel - Best Pterodactyl Minecraft Control Panel India 2025</title>
        <meta 
          name="description" 
          content="🎮 Advanced Pterodactyl panel for Minecraft hosting in India. One-click modpacks, real-time stats, automated backups, FTP, SSH, MySQL. Best server management panel 2025."
        />
        <meta
          name="keywords"
          content="pterodactyl panel india, best minecraft control panel, minecraft server panel 2025, creeperpanel dashboard, advanced server management india, one click modpack installer, minecraft panel with ftp, pterodactyl hosting india, game server control panel, professional minecraft dashboard, server monitoring panel, automated backup panel, minecraft admin panel india, best hosting control panel, pterodactyl alternative india"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/creeperpanel" />
        <meta property="og:title" content="CreeperPanel - Advanced Game Server Management Panel | CreeperCastle India" />
        <meta property="og:description" content="Discover India's most advanced Pterodactyl-based game server management system with real-time monitoring, automated backups, and professional-grade features." />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/5ec47ff0-f939-4968-8b39-ad88e0f3b7d6.png" />
        <meta property="og:image:alt" content="CreeperCastle Logo - Advanced Game Server Management Panel" />
        <meta property="og:site_name" content="CreeperCastle.cloud" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CreeperPanel - Professional Game Server Management 🎮🚀" />
        <meta name="twitter:description" content="Experience India's most advanced Pterodactyl panel with real-time monitoring, automated backups, and professional-grade server management features." />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/5ec47ff0-f939-4968-8b39-ad88e0f3b7d6.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud - India's Premier Minecraft Hosting" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Mumbai, Delhi NCR, India" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/creeperpanel" />
        
        {/* Favicon */}
        <link rel="icon" href="/lovable-uploads/5ec47ff0-f939-4968-8b39-ad88e0f3b7d6.png" type="image/png" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(panelStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white">
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Background image overlay with underwater Minecraft scene */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 bg-scene-img"
          ></div>
          
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 via-navy/80 to-navy-light/70"></div>
          
          {/* Animated particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-creeper/20 rounded-full"
              initial={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5,
              }}
              animate={{
                y: ["-10%", "110%"],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
        
        <Navbar />
        
        <main className="flex-grow pt-24 relative z-10">
          {/* Hero Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-creeper">Creeper</span>Panel
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl text-gray-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                India's Most Advanced Pterodactyl Panel
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Professional game server management system with enhanced security, real-time monitoring, automated backups, and intuitive controls designed specifically for Minecraft hosting excellence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button className="minecraft-btn text-lg px-8 py-3" asChild>
                  <a href="https://billing.creepercastle.in/" target="_blank" rel="noopener noreferrer">
                    Try CreeperPanel Now
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Interface Gallery */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Professional Interface <span className="text-creeper">Gallery</span>
                </h3>
                <h4 className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Explore the intuitive and powerful interface of CreeperPanel - click any image to view in full size
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-navy-light border-gray-800 hover:border-creeper transition-all duration-300 hover:shadow-lg hover:shadow-creeper/20 overflow-hidden group cursor-pointer">
                      <div 
                        className="relative overflow-hidden h-64"
                        onClick={() => setSelectedImage(image.src)}
                      >
                        <img 
                          src={image.src} 
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Maximize2 className="h-8 w-8 text-creeper" />
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-creeper">{image.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-gray-400 text-sm">
                          {image.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Image Modal Overlay */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-6xl max-h-full">
                <img 
                  src={selectedImage} 
                  alt="Gallery Image"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-navy-dark/80 hover:bg-navy-dark text-white p-2 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Powerful <span className="text-creeper">Features</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Every feature designed to make server management effortless and efficient
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-navy-light border-gray-800 hover:border-creeper transition-all duration-300 hover:shadow-lg hover:shadow-creeper/20 h-full">
                      <CardHeader>
                        <div className="mb-4 p-3 bg-creeper/20 rounded-lg w-fit text-creeper">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-400">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-navy-light border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-3xl text-center mb-6">
                      Why Choose <span className="text-creeper">CreeperPanel</span>?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-creeper">User-Friendly Interface</h3>
                          <p className="text-gray-400">
                            Intuitive design that makes server management accessible to both beginners and experts.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-creeper">Lightning Fast</h3>
                          <p className="text-gray-400">
                            Optimized for speed with instant response times and minimal resource usage.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-creeper">Mobile Responsive</h3>
                          <p className="text-gray-400">
                            Manage your servers on-the-go with our fully responsive mobile interface.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-creeper">Regular Updates</h3>
                          <p className="text-gray-400">
                            Continuous improvements and new features based on community feedback.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-creeper">24/7 Support</h3>
                          <p className="text-gray-400">
                            Expert support team ready to help you with any panel-related questions.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-creeper">Free with Hosting</h3>
                          <p className="text-gray-400">
                            Included free with all CreeperCastle hosting plans - no additional cost.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <Card className="bg-gradient-to-r from-creeper/20 to-navy-light border-creeper/30 max-w-4xl mx-auto">
                <CardContent className="py-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Experience <span className="text-creeper">CreeperPanel</span>?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Get started with our Minecraft hosting plans and access CreeperPanel instantly
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="minecraft-btn text-lg px-8 py-3" asChild>
                      <a href="https://billing.creepercastle.in/index.php?rp=/store/minecraft-performance-servers" target="_blank" rel="noopener noreferrer">
                        View Minecraft Plans
                      </a>
                    </Button>
                    <Button variant="outline" className="text-lg px-8 py-3 border-creeper text-creeper hover:bg-creeper hover:text-navy" asChild>
                      <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
                        Ask Questions
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CreeperPanel;
