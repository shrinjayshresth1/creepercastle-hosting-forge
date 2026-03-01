import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, Zap, Eye, Lock, MapPin, Clock, TrendingUp, ExternalLink, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Plan data for CreeperShield Anycasted
const anycastedPlans = [
  {
    name: "Starter",
    price: "₹99",
    features: [
      { text: "3 Proxies (TCP + UDP)", highlighted: true },
      { text: "2 Origin Servers", highlighted: true },
      { text: "100 Max Connections", highlighted: false },
      { text: "Advanced Protection", highlighted: true },
      { text: "Load Balancing", highlighted: false },
      { text: "Priority Support", highlighted: false }
    ],
    highlighted: false,
    buyLink: "https://billing.creepercastle.in/products/creepershield/starter"
  },
  {
    name: "Pro",
    price: "₹299",
    features: [
      { text: "10 Proxies (TCP + UDP)", highlighted: true },
      { text: "5 Origin Servers", highlighted: true },
      { text: "500 Max Connections", highlighted: true },
      { text: "Premium Protection", highlighted: true },
      { text: "Fallback Servers", highlighted: false },
      { text: "Real-time Analytics", highlighted: true },
      { text: "24/7 Premium Support", highlighted: false }
    ],
    highlighted: true,
    buyLink: "https://billing.creepercastle.in/products/creepershield/pro"
  },
  {
    name: "Network",
    price: "₹599",
    features: [
      { text: "25 Proxies (TCP + UDP)", highlighted: true },
      { text: "10 Origin Servers", highlighted: true },
      { text: "1000 Max Connections", highlighted: true },
      { text: "Enterprise Protection", highlighted: true },
      { text: "Custom Port Ranges", highlighted: true },
      { text: "Advanced Analytics", highlighted: true },
      { text: "Dedicated Support", highlighted: false },
      { text: "SLA Guarantee", highlighted: true }
    ],
    highlighted: false,
    buyLink: "https://billing.creepercastle.in/products/creepershield/network"
  },
  {
    name: "Business",
    price: "₹999",
    features: [
      { text: "100 Proxies (TCP + UDP)", highlighted: true },
      { text: "Unlimited Origins", highlighted: true },
      { text: "5000 Max Connections", highlighted: true },
      { text: "White-label Support", highlighted: true },
      { text: "API Access", highlighted: true },
      { text: "Bulk Management", highlighted: true },
      { text: "Priority Network", highlighted: true },
      { text: "99.9% SLA", highlighted: true }
    ],
    highlighted: false,
    buyLink: "https://billing.creepercastle.in/products/creepershield/business"
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      { text: "Unlimited Proxies (TCP + UDP)", highlighted: true },
      { text: "Unlimited Origins", highlighted: true },
      { text: "Unlimited Connections", highlighted: true },
      { text: "Custom Protection Rules", highlighted: true },
      { text: "Dedicated Account Manager", highlighted: true },
      { text: "Custom API Integration", highlighted: true },
      { text: "Multi-Region Deployment", highlighted: true },
      { text: "Custom SLA", highlighted: true },
      { text: "Priority 24/7 Support", highlighted: true },
      { text: "Everything Unlimited", highlighted: true }
    ],
    highlighted: false,
    buyLink: "enterprise",
    isEnterprise: true
  }
];

const CreeperShieldAnycasted = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "CreeperShield - Advanced DDoS Protection | CreeperCastle.cloud";
    window.scrollTo(0, 0);
  }, []);

  const handleEnterpriseClick = () => {
    toast({
      title: "Enterprise Plan - Custom Solution",
      description: (
        <div className="space-y-2">
          <p>For custom enterprise solutions, please open a ticket on our Discord server to discuss your specific requirements.</p>
          <Button 
            className="mt-2 w-full bg-discord hover:bg-discord/90"
            asChild
          >
            <a 
              href="https://discord.gg/RuQ9neH56S" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Open Discord Ticket
            </a>
          </Button>
        </div>
      ),
      duration: 10000,
    });
  };

  // Structured data for SEO
  const shieldStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "CreeperShield DDoS Protection",
    "description": "Advanced DDoS protection for Minecraft servers with up to 50 Tbps capacity, Mumbai location, and comprehensive security features.",
    "provider": {
      "@type": "Organization", 
      "name": "CreeperCastle.cloud"
    },
    "areaServed": "India",
    "offers": anycastedPlans.map(plan => ({
      "@type": "Offer",
      "name": plan.name,
      "price": plan.price.replace('₹', ''),
      "priceCurrency": "INR",
      "description": `${plan.name} - Advanced DDoS protection network`
    }))
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage", 
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes CreeperShield special?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CreeperShield provides up to 50 Tbps DDoS protection capacity with Mumbai location deployment, ensuring your Minecraft server stays protected against even the largest attacks."
        }
      },
      {
        "@type": "Question",
        "name": "How does the protection work?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Our protection distributes traffic across multiple servers globally, allowing us to absorb and mitigate DDoS attacks before they reach your Minecraft server."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this with non-Minecraft servers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, CreeperShield is optimized specifically for Minecraft TCP connections only."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Minecraft DDoS Protection India 2025 | 50 Tbps CreeperShield | ₹99 | Anti-Bot</title>
        <meta 
          name="description" 
          content="🛡️ #1 Minecraft DDoS protection India! 50 Tbps mitigation capacity from ₹99/mo. Anycasted network, bot filtering, IP firewall, Mumbai. Stop attacks instantly. Trusted by 1000+ servers. Enterprise-grade security."
        />
        <meta
          name="keywords"
          content="best minecraft ddos protection india 2025, 50 tbps ddos shield, creepershield minecraft, minecraft server security india, ddos mitigation india, bot attack protection minecraft, ip firewall minecraft, minecraft proxy protection, anycasted ddos protection, tcp udp ddos protection, minecraft network security, anti ddos minecraft india, ddos protected minecraft hosting, server protection mumbai, minecraft attack prevention, cheap ddos protection india, ovh ddos shield, enterprise ddos protection, minecraft firewall india, tcp protection minecraft"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/plans/creepershield" />
        <meta property="og:title" content="CreeperShield | 50 Tbps Minecraft DDoS Protection | #1 Anti-DDoS India" />
        <meta property="og:description" content="🛡️ Ultimate Minecraft server protection - 50 Tbps capacity, anycasted network, bot filtering, IP firewall. Mumbai datacenter. From ₹99/mo. Stop all attacks!" />
        <meta property="og:image" content="https://creepercastle.cloud/og-images/creepershield-ddos.jpg" />
        <meta property="og:image:alt" content="CreeperShield DDoS Protection by CreeperCastle" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CreeperCastle" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CreeperShield 🛡️ 50 Tbps Minecraft DDoS Protection" />
        <meta name="twitter:description" content="Ultimate DDoS protection with 50 Tbps capacity. Anycasted network, bot filtering, IP firewall. Mumbai. ₹99/mo." />
        <meta name="twitter:image" content="https://creepercastle.cloud/og-images/creepershield-ddos.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/plans/creepershield" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(shieldStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-navy text-white relative">
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
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-20 h-20 bg-creeper/20 rounded-full mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Globe className="h-10 w-10 text-creeper" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                CreeperShield <span className="text-creeper">Protection</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Revolutionary DDoS protection for Minecraft servers with <span className="text-creeper font-bold">50 Tbps capacity</span>. 
                Mumbai location deployment ensures maximum protection for your gaming community.
              </p>
              
              {/* Dashboard Button - Prominent CTA */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button 
                  className="bg-gradient-to-r from-creeper to-creeper-light hover:from-creeper-light hover:to-creeper text-navy-dark font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-creeper/50 hover:shadow-creeper/70 transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <a 
                    href="https://shield.creepercastle.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Shield className="h-6 w-6" />
                    Visit CreeperShield Dashboard
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="bg-creeper/20 text-creeper border-creeper/50 px-4 py-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  Mumbai Location
                </Badge>
                <Badge variant="secondary" className="bg-creeper/20 text-creeper border-creeper/50 px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  50 Tbps Capacity
                </Badge>
                <Badge variant="secondary" className="bg-creeper/20 text-creeper border-creeper/50 px-4 py-2">
                  <Zap className="h-4 w-4 mr-2" />
                  Instant Deployment
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-navy-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Anycasted Protection?</h2>
              <p className="text-gray-300 text-lg">Advanced technology meets uncompromising security</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                className="bg-navy rounded-xl p-6 border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Globe className="h-12 w-12 text-creeper mb-4" />
                <h3 className="text-xl font-bold mb-3">Global Network</h3>
                <p className="text-gray-300">Traffic distributed across multiple nodes worldwide for maximum resilience against attacks.</p>
              </motion.div>

              <motion.div 
                className="bg-navy rounded-xl p-6 border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="h-12 w-12 text-creeper mb-4" />
                <h3 className="text-xl font-bold mb-3">Hidden Backend IP</h3>
                <p className="text-gray-300">Your Minecraft server's real IP stays completely hidden from potential attackers.</p>
              </motion.div>

              <motion.div 
                className="bg-navy rounded-xl p-6 border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Lock className="h-12 w-12 text-creeper mb-4" />
                <h3 className="text-xl font-bold mb-3">Advanced Firewall</h3>
                <p className="text-gray-300">Intelligent IP filtering and bot protection to keep malicious traffic at bay.</p>
              </motion.div>

              <motion.div 
                className="bg-navy rounded-xl p-6 border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <MapPin className="h-12 w-12 text-creeper mb-4" />
                <h3 className="text-xl font-bold mb-3">Mumbai Location</h3>
                <p className="text-gray-300">Optimized for Indian players with low latency and high performance connectivity.</p>
              </motion.div>

              <motion.div 
                className="bg-navy rounded-xl p-6 border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <TrendingUp className="h-12 w-12 text-creeper mb-4" />
                <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
                <p className="text-gray-300">Comprehensive DDoS attack reports and monitoring sent directly to your dashboard.</p>
              </motion.div>

              <motion.div 
                className="bg-navy rounded-xl p-6 border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Clock className="h-12 w-12 text-creeper mb-4" />
                <h3 className="text-xl font-bold mb-3">Zero Ping Spikes</h3>
                <p className="text-gray-300">Maintain smooth gameplay even during active DDoS attacks with our advanced mitigation.</p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-creeper/20 to-creeper/5 rounded-xl p-6 border-2 border-creeper/50 hover:border-creeper transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Shield className="h-12 w-12 text-creeper mb-4" />
                <h3 className="text-xl font-bold mb-3 text-creeper">Beautiful Control Panel</h3>
                <p className="text-gray-300">Separate, intuitive DDoS protection control panel to manage all your servers and proxies effortlessly.</p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-creeper/20 to-creeper/5 rounded-xl p-6 border-2 border-creeper/50 hover:border-creeper transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-12 w-12 text-creeper mb-4" />
                <h3 className="text-xl font-bold mb-3 text-creeper">50 Tbps Capacity</h3>
                <p className="text-gray-300">Industry-leading DDoS mitigation capacity ensures your server stays online during even the most massive attacks.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20 bg-navy">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Protection Level</h2>
              <p className="text-gray-300 text-lg">Professional DDoS protection tailored for Minecraft servers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {anycastedPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`relative ${plan.highlighted ? 'lg:scale-105' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className={`h-full ${plan.highlighted ? 'border-2 border-creeper bg-gradient-to-br from-creeper/10 to-navy-light shadow-lg shadow-creeper/20' : 'border border-gray-800 bg-navy-light hover:border-creeper/30 transition-all duration-300'}`}>
                    {plan.highlighted && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Badge className="bg-creeper text-navy-dark font-bold px-4 py-1 shadow-lg shadow-creeper/50">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                        <div className="mb-2">
                          <span className="text-4xl font-bold text-creeper">{plan.price}</span>
                          {plan.price !== "Custom" && (
                            <span className="text-gray-400 text-sm ml-1">/month</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                          >
                            <div className="w-5 h-5 rounded-full bg-creeper/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 bg-creeper rounded-full"></div>
                            </div>
                            <span className={`text-sm ${feature.highlighted ? 'text-creeper font-semibold' : 'text-gray-300'}`}>
                              {feature.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      
                      {plan.isEnterprise ? (
                        <Button 
                          className="w-full bg-gradient-to-r from-creeper to-creeper-light hover:from-creeper-light hover:to-creeper text-navy-dark font-bold shadow-lg shadow-creeper/30 transition-all duration-300"
                          onClick={handleEnterpriseClick}
                        >
                          Contact Us
                        </Button>
                      ) : (
                        <Button 
                          className={`w-full ${plan.highlighted ? 'bg-creeper hover:bg-creeper/90 text-navy-dark font-bold shadow-lg shadow-creeper/30' : 'bg-gradient-to-r from-creeper/80 to-creeper hover:from-creeper hover:to-creeper/90 text-navy-dark font-semibold border border-creeper/50 shadow-md shadow-creeper/20'} transition-all duration-300`}
                          asChild
                        >
                          <a href={plan.buyLink} target="_blank" rel="noopener noreferrer">
                            Get Started
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-navy-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Specifications</h2>
              <p className="text-gray-300 text-lg">Built for performance and reliability</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="bg-gradient-to-br from-creeper/20 to-navy rounded-xl p-6 text-center border-2 border-creeper/50 hover:border-creeper transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-3xl font-bold text-creeper mb-2">50 Tbps</h3>
                <p className="text-gray-300 font-semibold">Maximum Protection Capacity</p>
              </motion.div>
              <div className="bg-navy rounded-xl p-6 text-center border border-gray-800">
                <h3 className="text-2xl font-bold text-creeper mb-2">&lt; 1ms</h3>
                <p className="text-gray-300">Additional Latency</p>
              </div>
              <div className="bg-navy rounded-xl p-6 text-center border border-gray-800">
                <h3 className="text-2xl font-bold text-creeper mb-2">24/7</h3>
                <p className="text-gray-300">Monitoring & Protection</p>
              </div>
              <div className="bg-navy rounded-xl p-6 text-center border border-gray-800">
                <h3 className="text-2xl font-bold text-creeper mb-2">TCP Only</h3>
                <p className="text-gray-300">Minecraft Protocol Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-navy-dark to-navy">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Secure Your Server?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of server owners who trust CreeperShield Anycasted for their DDoS protection needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="minecraft-btn" asChild>
                  <a href="https://billing.creepercastle.in/products/creepershield-anycasted/" target="_blank" rel="noopener noreferrer">
                    Get Protection Now
                  </a>
                </Button>
                <Button variant="outline" className="border-creeper text-creeper hover:bg-creeper/10" asChild>
                  <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
                    Ask Questions on Discord
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CreeperShieldAnycasted;