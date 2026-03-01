import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Shield, Zap, Clock, Server, Thermometer, Battery, Wifi } from "lucide-react";
import { motion } from "framer-motion";

const Datacenter = () => {
  const datacenterStructuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "CreeperCastle Yotta Datacenter",
    "description": "Enterprise-grade Tier 3 datacenter facility in Noida housing CreeperCastle's premium gaming infrastructure",
    "url": "https://creepercastle.cloud/datacenter",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.7041",
      "longitude": "77.1025"
    }
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
        "name": "Infrastructure",
        "item": "https://creepercastle.cloud/infrastructure"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Datacenter",
        "item": "https://creepercastle.cloud/datacenter"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Yotta Datacenter Noida | Tier 3+ Infrastructure | CreeperCastle Hosting</title>
        <meta 
          name="description" 
          content="🏢 Powered by Yotta NM1 Tier 3+ datacenter Noida. Intel Xeon servers, NVMe SSD, 99.99% uptime, N+1 redundancy, OVH DDoS protection. Enterprise-grade infrastructure."
        />
        <meta
          name="keywords"
          content="yotta datacenter noida, tier 3 datacenter india, yotta nm1 datacenter, best datacenter india, enterprise datacenter india, minecraft datacenter infrastructure, gaming server infrastructure india, redundant datacenter india, uptime datacenter india, noida datacenter hosting, premium server infrastructure, yotta minecraft hosting"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/datacenter" />
        <meta property="og:title" content="Yotta Datacenter - Enterprise Gaming Infrastructure" />
        <meta property="og:description" content="Inside CreeperCastle's Tier 3 datacenter facility in Noida, India. Advanced enterprise infrastructure powering premium gaming experiences." />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/fcd6d59e-43cc-4517-8bf3-1475588f6a4d.png" />
        <meta property="og:image:alt" content="CreeperCastle Datacenter Infrastructure" />
        <meta property="og:site_name" content="CreeperCastle.cloud" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yotta Datacenter - Enterprise Gaming Infrastructure 🏢" />
        <meta name="twitter:description" content="Inside our Tier 3 datacenter facility in Noida, India. Advanced infrastructure powering premium gaming experiences." />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/fcd6d59e-43cc-4517-8bf3-1475588f6a4d.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Noida" />
        <meta name="geo.position" content="28.7041;77.1025" />
        <meta name="ICBM" content="28.7041, 77.1025" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/datacenter" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(datacenterStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white relative">
        {/* Enhanced background with underwater Minecraft scene */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Background image overlay with underwater Minecraft scene */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 bg-scene-img"></div>
          
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
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-creeper">Yotta Datacenter</span> Noida
                </motion.h1>
                <motion.h2 
                  className="text-2xl md:text-3xl text-gray-300 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Enterprise-Grade Gaming Infrastructure
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  CreeperCastle proudly operates from Yotta's state-of-the-art Tier 3 datacenter facility in Noida, India. 
                  Our advanced infrastructure ensures unmatched performance, reliability, and security for your gaming experience.
                </motion.p>
              </div>

              {/* Datacenter Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <motion.div 
                  className="relative group overflow-hidden rounded-xl border border-creeper/30 shadow-2xl shadow-creeper/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="/lovable-uploads/fcd6d59e-43cc-4517-8bf3-1475588f6a4d.png" 
                    alt="Server rack hardware at Yotta Datacenter" 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent group-hover:from-navy-dark/60 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-lg text-white mb-1">Server Hardware</h3>
                    <p className="text-gray-300 text-sm">Latest generation enterprise hardware</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative group overflow-hidden rounded-xl border border-creeper/30 shadow-2xl shadow-creeper/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <img 
                    src="/lovable-uploads/ef674e3b-c56e-4f8f-8457-8947bf94c34d.png" 
                    alt="Server racks at Yotta Datacenter facility" 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent group-hover:from-navy-dark/60 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-lg text-white mb-1">Rack Infrastructure</h3>
                    <p className="text-gray-300 text-sm">Organized server deployment</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative group overflow-hidden rounded-xl border border-creeper/30 shadow-2xl shadow-creeper/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <img 
                    src="/lovable-uploads/40f505fb-7a6e-4fcf-a81a-53c220177e69.png" 
                    alt="Networking infrastructure at datacenter" 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent group-hover:from-navy-dark/60 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-lg text-white mb-1">Network Operations</h3>
                    <p className="text-gray-300 text-sm">Advanced networking systems</p>
                  </div>
                </motion.div>
              </div>

              {/* Datacenter Features */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                <Card className="bg-navy-light/80 backdrop-blur-lg border-creeper/30 hover:border-creeper/50 transition-all duration-300 shadow-xl shadow-creeper/10">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-creeper/20 rounded-full">
                        <Building2 className="h-8 w-8 text-creeper" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Tier 3 Facility</CardTitle>
                        <CardDescription className="text-gray-400">
                          Enterprise-grade infrastructure standards
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-green-400" />
                        <span className="text-sm">N+1 Redundancy</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">Precision Cooling</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-creeper" />
                        <span className="text-sm">24/7 Security</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">Multiple ISPs</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• 99.982% Uptime SLA</li>
                        <li>• Concurrent maintainability</li>
                        <li>• Multiple power & cooling paths</li>
                        <li>• Fault-tolerant design</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-navy-light/80 backdrop-blur-lg border-creeper/30 hover:border-creeper/50 transition-all duration-300 shadow-xl shadow-creeper/10">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-creeper/20 rounded-full">
                        <Server className="h-8 w-8 text-creeper" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Gaming Optimized</CardTitle>
                        <CardDescription className="text-gray-400">
                          Built for high-performance gaming
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">NVMe SSDs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Server className="h-4 w-4 text-creeper" />
                        <span className="text-sm">Latest CPUs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">Low Latency</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm">DDoS Protection</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-semibold mb-2">Performance Specs:</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• Intel Xeon & AMD EPYC processors</li>
                        <li>• DDR4/DDR5 ECC memory</li>
                        <li>• 10Gbps+ network connectivity</li>
                        <li>• Sub-1ms local network latency</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Why CreeperCastle Chose Yotta */}
              <div className="max-w-5xl mx-auto">
                <Card className="bg-gradient-to-br from-navy-light/90 to-navy-dark/90 backdrop-blur-lg border-creeper/30 shadow-2xl shadow-creeper/20">
                  <CardHeader>
                    <CardTitle className="text-3xl text-center">
                      Why <span className="text-creeper">CreeperCastle</span> Chose Yotta
                    </CardTitle>
                    <CardDescription className="text-center text-gray-400 text-lg">
                      Advanced infrastructure powering the future of gaming
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-creeper">🏢 Enterprise Excellence</h3>
                      <p className="text-gray-300 mb-4">
                        Yotta Infrastructure is India's leading datacenter provider, offering world-class Tier 3 
                        facilities that meet the highest international standards. Their Noida facility provides 
                        the perfect foundation for our premium gaming services.
                      </p>
                      <ul className="text-gray-400 space-y-2">
                        <li>• ISO 27001 certified security</li>
                        <li>• 99.982% uptime guarantee</li>
                        <li>• Carrier-neutral connectivity</li>
                        <li>• 24/7 technical support</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-creeper">⚡ Gaming Performance</h3>
                      <p className="text-gray-300 mb-4">
                        Our partnership with Yotta ensures that CreeperCastle delivers unmatched gaming 
                        performance across India. From ultra-low latency to enterprise-grade reliability, 
                        every aspect is optimized for the ultimate gaming experience.
                      </p>
                      <ul className="text-gray-400 space-y-2">
                        <li>• Sub-5ms ping to Delhi NCR</li>
                        <li>• Multi-layered DDoS protection</li>
                        <li>• Redundant power systems</li>
                        <li>• Advanced monitoring & alerting</li>
                      </ul>
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

export default Datacenter;