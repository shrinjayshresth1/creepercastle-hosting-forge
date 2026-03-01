
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Server, Shield, Cloud } from "lucide-react";

const Plans = () => {
  const navigate = useNavigate();
  
  // JSON-LD structured data for better SEO
  const plansStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "CreeperCastle Hosting Plans",
    "description": "Complete range of Minecraft and VPS hosting solutions with DDoS protection",
    "url": "https://creepercastle.cloud/plans",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Minecraft Server Hosting",
          "description": "High-performance Minecraft servers with instant setup, one-click plugin installation, and 24/7 expert support. Perfect for Java and Bedrock editions.",
          "url": "https://creepercastle.cloud/plans/minecraft",
          "provider": {
            "@type": "Organization",
            "name": "CreeperCastle.cloud"
          },
          "offers": {
            "@type": "Offer",
            "price": "99",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Performance VPS Hosting",
          "description": "Premium Ryzen 7 5700G Performance VPS with DDR5 RAM, NVMe Gen 4 SSD, and Unhittable 50+ Tbps DDoS shield for extreme Minecraft and game servers.",
          "url": "https://creepercastle.cloud/plans/performance-vps",
          "provider": {
            "@type": "Organization",
            "name": "CreeperCastle.cloud"
          },
          "offers": {
            "@type": "Offer",
            "price": "399",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "VPS Hosting Solutions",
          "description": "Enterprise-grade VPS solutions with dedicated resources, complete root access, and premium hardware in India.",
          "url": "https://creepercastle.cloud/plans/other",
          "provider": {
            "@type": "Organization",
            "name": "CreeperCastle.cloud"
          },
          "offers": {
            "@type": "Offer",
            "price": "3300",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          }
        }
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
        "name": "Hosting Plans",
        "item": "https://creepercastle.cloud/plans"
      }
    ]
  };
  
  return (
    <>
      <Helmet>
        <title>Hosting Plans & Pricing | Minecraft & VPS Hosting | CreeperCastle.cloud</title>
        <meta 
          name="description" 
          content="Compare all CreeperCastle hosting plans: Minecraft servers from ₹99/mo and VPS hosting from ₹3,300/mo with advanced DDoS protection included. Choose the perfect plan for your needs."
        />
        <meta
          name="keywords"
          content="minecraft hosting plans india, minecraft server pricing, vps hosting plans india, ddos protection pricing, cheap minecraft hosting, budget vps hosting, gaming server plans, minecraft server costs, india hosting comparison, creeper castle pricing, affordable game hosting, minecraft bedrock hosting plans, java server hosting plans"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/plans" />
        <meta property="og:title" content="Hosting Plans & Pricing | Minecraft VPS & DDoS Protection" />
        <meta property="og:description" content="Compare all CreeperCastle hosting plans: Minecraft servers from ₹99/mo, VPS hosting from ₹3,300/mo, and DDoS protection from ₹99/mo." />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        <meta property="og:image:alt" content="CreeperCastle Hosting Plans Comparison" />
        <meta property="og:site_name" content="CreeperCastle.cloud" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hosting Plans & Pricing | CreeperCastle.cloud 🎮" />
        <meta name="twitter:description" content="Compare Minecraft hosting, VPS plans, and DDoS protection. Starting from ₹99/month with premium Indian servers." />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="publisher" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Mumbai, Delhi" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/plans" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(plansStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white">
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
                  className="text-4xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Choose Your Perfect <span className="text-creeper">Hosting Plan</span>
                </motion.h1>
                <motion.h2 
                  className="text-2xl md:text-3xl text-gray-300 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Premium Gaming Solutions Starting at ₹99/Month
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  From budget-friendly Minecraft servers to enterprise VPS hosting - find the ideal solution for your gaming community in India.
                </motion.p>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div 
                  className="flex flex-col items-center text-center p-8 bg-navy-light rounded-xl border border-gray-800 hover:border-creeper cursor-pointer transition-all hover:-translate-y-2"
                  onClick={() => navigate("/plans/minecraft")}
                  whileHover={{ scale: 1.02 }}
                >
                  <Server className="h-20 w-20 text-creeper mb-6" />
                  <h2 className="text-2xl font-bold mb-4">Minecraft Hosting</h2>
                  <p className="text-gray-400 mb-8">
                    High-performance Minecraft servers with instant setup, one-click plugin installation,
                    and 24/7 expert support. Perfect for any size community.
                  </p>
                  <div className="mt-auto">
                    <Button className="minecraft-btn" onClick={() => navigate("/plans/minecraft")}>
                      View Minecraft Plans
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center text-center p-8 bg-navy-light rounded-xl border border-gray-800 hover:border-creeper cursor-pointer transition-all hover:-translate-y-2"
                  onClick={() => navigate("/plans/performance-vps")}
                  whileHover={{ scale: 1.02 }}
                >
                  <Shield className="h-20 w-20 text-creeper mb-6" />
                  <h2 className="text-2xl font-bold mb-4">Performance VPS Hosting</h2>
                  <p className="text-gray-400 mb-8">
                    AMD Ryzen 7 5700G Performance VPS with DDR5 RAM, NVMe Gen 4 SSD and Unhittable 50+ Tbps DDoS shield. Designed for massive Minecraft networks and demanding workloads.
                  </p>
                  <div className="mt-auto">
                    <Button className="minecraft-btn" onClick={() => navigate("/plans/performance-vps")}>
                      View Performance VPS Plans
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center text-center p-8 bg-navy-light rounded-xl border border-gray-800 hover:border-creeper cursor-pointer transition-all hover:-translate-y-2"
                  onClick={() => navigate("/plans/other")}
                  whileHover={{ scale: 1.02 }}
                >
                  <Cloud className="h-20 w-20 text-creeper mb-6" />
                  <h2 className="text-2xl font-bold mb-4">VPS Hosting</h2>
                  <p className="text-gray-400 mb-8">
                    High-performance VPS solutions with dedicated resources, 
                    complete control, and enterprise-grade hardware.
                  </p>
                  <div className="mt-auto">
                    <Button className="minecraft-btn" onClick={() => navigate("/plans/other")}>
                      View Other Hosting
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
              
              <div className="mt-16 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Need a <span className="text-creeper">Custom Enterprise Solution</span>?
                </h3>
                <h4 className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Talk to Our Experts for Tailored Hosting Solutions
                </h4>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Contact our team for a custom hosting solution tailored to your specific needs.
                </p>
                <Button className="minecraft-btn" asChild>
                  <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
                    Contact for Custom Solutions
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Plans;
