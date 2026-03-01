import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Zap, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Locations = () => {
  const locationsStructuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "CreeperCastle Server Locations",
    "description": "Premium Minecraft server hosting locations across India",
    "url": "https://creepercastle.cloud/locations",
    "containsPlace": [
      {
        "@type": "Place",
        "name": "Mumbai Data Center",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "addressCountry": "India"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.0760",
          "longitude": "72.8777"
        },
        "description": "High-performance Minecraft hosting servers in Mumbai with ultra-low latency"
      },
      {
        "@type": "Place",
        "name": "Delhi NCR Data Center",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi NCR (Noida)",
          "addressRegion": "Uttar Pradesh", 
          "addressCountry": "India"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "28.7041",
          "longitude": "77.1025"
        },
        "description": "Premium gaming servers in Delhi NCR with enterprise-grade infrastructure"
      }
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
        "name": "Server Locations",
        "item": "https://creepercastle.cloud/locations"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>India Server Locations - Mumbai & Delhi | 3ms Ping Minecraft Hosting</title>
        <meta 
          name="description" 
          content="🇮🇳 Ultra-low 3-15ms ping Minecraft hosting in Mumbai & Delhi NCR. Tier 3 datacenters, NVMe SSD, 50 Tbps DDoS protection. Best Indian server locations for gaming."
        />
        <meta
          name="keywords"
          content="minecraft server mumbai location, minecraft server delhi location, low ping server india, 3ms minecraft hosting, mumbai datacenter gaming, delhi ncr minecraft, indian server locations, tier 3 datacenter india, yotta datacenter minecraft, mumbai delhi minecraft hosting, local indian servers, india minecraft infrastructure, best indian server location, mumbai server hosting, delhi server hosting, low latency india gaming"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/locations" />
        <meta property="og:title" content="Server Locations - Mumbai & Delhi NCR | Low Latency Gaming" />
        <meta property="og:description" content="Premium Minecraft servers in Mumbai & Delhi NCR with ultra-low latency and enterprise hardware for the best Indian gaming experience." />
        <meta property="og:image" content="https://creepercastle.cloud/og-images/india-locations.jpg" />
        <meta property="og:image:alt" content="CreeperCastle Server Locations Map" />
        <meta property="og:site_name" content="CreeperCastle.cloud" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Server Locations - Mumbai & Delhi 🇮🇳" />
        <meta name="twitter:description" content="Premium Minecraft servers across India with ultra-low latency. Mumbai & Delhi NCR locations available." />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Mumbai, Delhi" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/locations" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(locationsStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white relative">
        {/* Enhanced background with underwater Minecraft scene */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 bg-scene-img"></div>
          
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
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Premium Indian <span className="text-creeper">Server Locations</span>
                </motion.h1>
                <motion.h2 
                  className="text-2xl md:text-3xl text-gray-300 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Mumbai & Delhi NCR Data Centers | 3-15ms Latency
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Strategic server locations across India delivering ultra-low latency gaming experience with enterprise-grade Tier 3 data centers and 99.9% uptime guarantee.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                {/* Mumbai Location */}
                <Card className="bg-navy-light border-gray-800 hover:border-creeper transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-creeper/20 rounded-full">
                        <MapPin className="h-6 w-6 text-creeper" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Mumbai</CardTitle>
                        <CardDescription className="text-gray-400">
                          Western India Hub
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-creeper" />
                        <span className="text-sm">Low Latency</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-creeper" />
                        <span className="text-sm">DDoS Protected</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-creeper" />
                        <span className="text-sm">99.9% Uptime</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-creeper" />
                        <span className="text-sm">Tier 3 DC</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-semibold mb-2">Coverage Areas:</h4>
                      <p className="text-gray-400 text-sm">
                        Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Goa
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Average Ping:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Mumbai:</span>
                          <span className="text-creeper">5-15ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Gujarat:</span>
                          <span className="text-creeper">20-35ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rajasthan:</span>
                          <span className="text-creeper">30-45ms</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delhi NCR Location */}
                <Card className="bg-navy-light border-gray-800 hover:border-creeper transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-creeper/20 rounded-full">
                        <MapPin className="h-6 w-6 text-creeper" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Delhi NCR (Noida)</CardTitle>
                        <CardDescription className="text-gray-400">
                          Northern India Hub
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-creeper" />
                        <span className="text-sm">Ultra-Low Latency</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-creeper" />
                        <span className="text-sm">Advanced DDoS</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-creeper" />
                        <span className="text-sm">99.9% Uptime</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-creeper" />
                        <span className="text-sm">Tier 3 DC</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-semibold mb-2">Coverage Areas:</h4>
                      <p className="text-gray-400 text-sm">
                        Delhi, Uttar Pradesh, Punjab, Haryana, Himachal Pradesh
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Average Ping:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Delhi NCR:</span>
                          <span className="text-creeper">3-12ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Punjab:</span>
                          <span className="text-creeper">15-25ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Uttar Pradesh:</span>
                          <span className="text-creeper">20-35ms</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Network Features */}
              <div className="max-w-4xl mx-auto">
                <Card className="bg-navy-light border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">
                      Enterprise-Grade <span className="text-creeper">Infrastructure</span>
                    </CardTitle>
                    <CardDescription className="text-center text-gray-400">
                      Tier 3 data centers with redundant power, cooling, and connectivity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="p-4 bg-creeper/20 rounded-full w-fit mx-auto mb-4">
                          <Zap className="h-8 w-8 text-creeper" />
                        </div>
                        <h3 className="font-semibold mb-2">High Performance</h3>
                        <p className="text-gray-400 text-sm">
                          Latest generation hardware with NVMe SSDs and high-frequency CPUs
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="p-4 bg-creeper/20 rounded-full w-fit mx-auto mb-4">
                          <Shield className="h-8 w-8 text-creeper" />
                        </div>
                        <h3 className="font-semibold mb-2">DDoS Protection</h3>
                        <p className="text-gray-400 text-sm">
                          Multi-layer DDoS protection with 1 Tbps+ mitigation capacity
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="p-4 bg-creeper/20 rounded-full w-fit mx-auto mb-4">
                          <Clock className="h-8 w-8 text-creeper" />
                        </div>
                        <h3 className="font-semibold mb-2">99.9% Uptime</h3>
                        <p className="text-gray-400 text-sm">
                          Redundant power, cooling, and network connectivity for maximum reliability
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Locations;
