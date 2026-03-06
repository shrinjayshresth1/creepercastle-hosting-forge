import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HelpCircle, Server, Infinity as InfinityIcon, MessageCircle, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCart } from "@/contexts/CartContext";

const minecraftPlans = [
  {
    name: "Redstone Power Plan",
    price: 99,
    ram: "2GB",
    cpu: "100% CPU",
    storage: "10GB SSD",
    additionalPorts: "2 Additional Ports",
    databaseSpace: "2 Database Space",
    backupsLimit: "2 Backups Limit",
    locations: ["India, Mumbai", "India, Delhi"],
    ddosProtection: "Basic Protection",
    features: [
      "Instant Setup",
      "All Minecraft Versions",
      "24/7 Support",
      "Automatic Backups",
      "One-Click Plugin Installer",
      "Custom Domain",
      "99.9% Uptime",
      "SFTP Access",
    ],
    highlighted: false,
  },
  {
    name: "Diamond Core Plan",
    price: 249,
    ram: "4GB",
    cpu: "100% CPU",
    storage: "40GB SSD",
    additionalPorts: "4 Additional Ports",
    databaseSpace: "4 Database Space",
    backupsLimit: "4 Backups Limit",
    locations: ["India, Mumbai", "India, Delhi"],
    ddosProtection: "Standard Protection",
    features: [
      "Instant Setup",
      "All Minecraft Versions",
      "24/7 Support",
      "Automatic Backups",
      "One-Click Plugin Installer",
      "Custom Domain",
      "99.9% Uptime",
      "SFTP Access",
      "Free Subdomain",
    ],
    highlighted: false,
  },
  {
    name: "Nether Storm Plan",
    price: 372,
    ram: "6GB",
    cpu: "200% CPU",
    storage: "60GB SSD",
    additionalPorts: "6 Additional Ports",
    databaseSpace: "6 Database Space",
    backupsLimit: "6 Backups Limit",
    locations: ["India, Mumbai", "India, Delhi"],
    ddosProtection: "Standard Protection",
    features: [
      "Instant Setup",
      "All Minecraft Versions",
      "24/7 Priority Support",
      "2x Daily Backups",
      "One-Click Plugin Installer",
      "Custom Domain",
      "99.9% Uptime",
      "Full Modpack Support",
      "Free Subdomain",
      "SFTP Access",
    ],
    highlighted: true,
  },
  {
    name: "End Storm Plan",
    price: 499,
    ram: "8GB",
    cpu: "250% CPU",
    storage: "80GB SSD",
    additionalPorts: "8 Additional Ports",
    databaseSpace: "8 Database Space",
    backupsLimit: "8 Backups Limit",
    locations: ["India, Mumbai", "India, Delhi"],
    ddosProtection: "Advanced Protection",
    features: [
      "Instant Setup",
      "All Minecraft Versions",
      "24/7 Priority Support",
      "3x Daily Backups",
      "One-Click Plugin Installer",
      "Custom Domain",
      "99.9% Uptime",
      "Full Modpack Support",
      "Free Subdomain",
      "Dedicated Resources",
      "SFTP Access",
    ],
    highlighted: false,
  },
  {
    name: "Wither Storm Plan",
    price: 582,
    ram: "10GB",
    cpu: "300% CPU",
    storage: "100GB SSD",
    additionalPorts: "10 Additional Ports",
    databaseSpace: "10 Database Space",
    backupsLimit: "10 Backups Limit",
    locations: ["India, Mumbai", "India, Delhi"],
    ddosProtection: "Advanced Protection",
    features: [
      "Instant Setup",
      "All Minecraft Versions",
      "24/7 Priority Support",
      "3x Daily Backups",
      "One-Click Plugin Installer",
      "Custom Domain",
      "99.9% Uptime",
      "Full Modpack Support",
      "Free Subdomain",
      "Dedicated Resources",
      "SFTP Access",
    ],
    highlighted: false,
  },
  {
    name: "Dragon Buff Plan",
    price: 672,
    ram: "12GB",
    cpu: "350% CPU",
    storage: "120GB SSD",
    additionalPorts: "12 Additional Ports",
    databaseSpace: "12 Database Space",
    backupsLimit: "12 Backups Limit",
    locations: ["India, Mumbai", "India, Delhi"],
    ddosProtection: "Premium Protection",
    features: [
      "Instant Setup",
      "All Minecraft Versions",
      "24/7 Priority Support",
      "4x Daily Backups",
      "One-Click Plugin Installer",
      "Custom Domain",
      "99.99% Uptime",
      "Full Modpack Support",
      "Free Subdomain",
      "Dedicated Resources",
      "SFTP Access",
      "Premium Support",
    ],
    highlighted: false,
  },
  {
    name: "Custom Plan",
    price: null,
    ram: "∞ GB",
    cpu: "∞ CPU",
    storage: "∞ SSD",
    additionalPorts: "Unlimited Ports",
    databaseSpace: "Unlimited Database Space",
    backupsLimit: "Unlimited Backups",
    locations: ["India, Mumbai", "India, Delhi"],
    ddosProtection: "Ultimate Protection",
    features: [
      "Instant Setup",
      "All Minecraft Versions",
      "24/7 VIP Support",
      "Unlimited Daily Backups",
      "One-Click Plugin Installer",
      "Custom Domain",
      "99.999% Uptime",
      "Full Modpack Support",
      "Free Subdomain",
      "Dedicated Resources",
      "SFTP Access",
      "VIP Support",
      "Custom Development",
      "Custom Mods",
      "Custom Plugins",
    ],
    isCustom: true,
    highlighted: false,
  },
];

const MinecraftPlans = () => {
  const { addItem, items } = useCart();
  // Enhanced JSON-LD structured data for better SEO
  const minecraftHostingStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Minecraft Server Hosting",
    "description": "High-performance Minecraft server hosting in India with NVMe SSD storage, DDoS protection, instant setup, and 24/7 support. Perfect for Java & Bedrock editions.",
    "provider": {
      "@type": "Organization",
      "name": "CreeperCastle.cloud",
      "url": "https://creepercastle.cloud",
      "logo": "https://creepercastle.cloud/lovable-uploads/1a97b5fc-a24e-43f7-9a8a-2b87db8ad1b6.png",
      "sameAs": [
        "https://discord.gg/RuQ9neH56S"
      ]
    },
    "serviceType": "Game Server Hosting",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "offers": minecraftPlans.filter(plan => plan.price).map((plan, index) => ({
      "@type": "Offer",
      "name": plan.name,
      "description": `${plan.ram} RAM, ${plan.cpu}, ${plan.storage} storage Minecraft hosting plan with ${plan.ddosProtection}`,
      "price": plan.price.toString(),
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
      "priceValidUntil": "2025-12-31",
      "itemOffered": {
        "@type": "Service",
        "name": plan.name,
        "description": `Minecraft server hosting with ${plan.ram} RAM and ${plan.storage} storage`
      }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Minecraft Hosting Plans",
      "itemListElement": minecraftPlans.filter(plan => plan.price).map((plan, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": plan.name,
          "description": `${plan.ram} RAM Minecraft hosting plan`
        },
        "price": plan.price.toString(),
        "priceCurrency": "INR"
      }))
    }
  };

  // FAQ structured data for rich snippets
  const minecraftFaqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What Minecraft versions are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support all Minecraft versions including Java Edition, Bedrock Edition, and all modded versions. Our one-click installer makes it easy to switch between versions."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide DDoS protection for Minecraft servers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our Minecraft hosting plans include CreeperShield DDoS protection to keep your server online even during attacks. Advanced protection is available for higher-tier plans."
        }
      },
      {
        "@type": "Question",
        "name": "Can I install plugins and mods on my Minecraft server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our control panel includes a one-click plugin installer for popular plugins, and you have full access to install custom plugins and mods via SFTP."
        }
      },
      {
        "@type": "Question",
        "name": "What locations are available for Minecraft hosting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer Minecraft server hosting in Mumbai and Delhi, India, providing low latency for players across the Indian subcontinent."
        }
      }
    ]
  };

  // Animation variants for smoother animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 30px rgba(80, 200, 120, 0.2)",
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Minecraft Server Hosting India Plans | CreeperCastle</title>
        <meta 
          name="description" 
          content="🎮 India's #1 Minecraft server hosting from ₹99/month! Instant setup, NVMe SSD, 50 Tbps DDoS protection, 24/7 support. Perfect for Java, Bedrock, SMP, Modded servers. Low ping Mumbai & Delhi locations. Trusted by 10,000+ players. Free plugins, subdomain, SFTP access."
        />
        <meta
          name="keywords"
          content="minecraft server hosting india, best minecraft hosting india, minecraft hosting india, cheap minecraft server india, minecraft server india, minecraft hosting mumbai, minecraft hosting delhi, indian minecraft hosting, minecraft bedrock hosting india, minecraft java hosting india, low ping minecraft server india, minecraft server rental india, minecraft hosting with ddos protection, minecraft server provider india, modded minecraft hosting india, minecraft smp hosting india, minecraft plugin hosting, minecraft network hosting, pvp server hosting india, skyblock hosting india, prison server hosting india, faction server hosting india, minecraft dedicated server india, best minecraft host 2025, creepercastle, minecraft server plans india, affordable minecraft hosting, premium minecraft hosting india"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/plans/minecraft" />
        <meta property="og:title" content="Best Minecraft Server Hosting India 2025 | #1 Minecraft Host | Mumbai & Delhi | CreeperCastle" />
        <meta property="og:description" content="🎮 India's #1 Minecraft server hosting! Instant setup from ₹99/mo. Ultra-low 3ms ping Mumbai/Delhi. 50 Tbps DDoS, NVMe SSD, 24/7 support. Perfect for Java, Bedrock, SMP, Modded servers." />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/1a97b5fc-a24e-43f7-9a8a-2b87db8ad1b6.png" />
        <meta property="og:image:alt" content="CreeperCastle Minecraft Server Hosting Plans - Best India 2025" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CreeperCastle" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Minecraft Server Hosting India 2025 🎮 | ₹99" />
        <meta name="twitter:description" content="🏆 Premium Minecraft hosting from ₹99/month. NVMe SSD, instant setup, 50 Tbps DDoS, 24/7 support. 3ms ping Mumbai & Delhi. Java, Bedrock, SMP, Modded. 10,000+ servers!" />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/1a97b5fc-a24e-43f7-9a8a-2b87db8ad1b6.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN-MH;IN-DL" />
        <meta name="geo.placename" content="Mumbai;Delhi" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        <meta name="revisit-after" content="2 days" />
        <meta name="distribution" content="global" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/plans/minecraft" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(minecraftHostingStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(minecraftFaqStructuredData)}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white relative">
        {/* Enhanced background matching home page */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Background image overlay with underwater Minecraft scene */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 bg-scene-img"></div>
          
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 via-navy/80 to-navy-light/70"></div>
          
          {/* Animated particles */}
          {Array.from({ length: 10 }).map((_, i) => {
            const randomValues = {
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5,
              duration: Math.random() * 15 + 20,
              delay: Math.random() * 10,
            };
            
            return (
              <motion.div
                key={i}
                className="absolute bg-creeper/20 rounded-full"
                initial={{
                  width: randomValues.width,
                  height: randomValues.height,  
                  x: randomValues.x,
                  y: randomValues.y,
                  opacity: randomValues.opacity,
                }}
                animate={{
                  y: ["-10%", "110%"],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: randomValues.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: randomValues.delay,
                }}
              />
            );
          })}
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
                  Minecraft <span className="text-creeper">Server Hosting</span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  High-performance Minecraft servers with instant deployment, one-click plugin installation,
                  and 24/7 expert support. Perfect for any size community.
                </motion.p>
              </div>
              
              {/* Features Section - Why Choose Us */}
              <div className="mb-16">
                <div className="text-center mb-12">
                  <motion.h2 
                    className="text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Why Choose <span className="text-creeper">Our Minecraft Hosting</span>?
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    We offer the best features and support to ensure your Minecraft server runs perfectly
                  </motion.p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  <motion.div 
                    className="bg-navy-light p-6 rounded-lg border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 252, 0, 0.2)" }}
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Server className="mr-2 text-creeper h-5 w-5" /> 
                      Enterprise-Grade Processors
                    </h3>
                    <p className="text-gray-400">
                      Powered by latest-generation enterprise Intel and AMD processors, delivering exceptional single-thread and multi-core performance for smooth, lag-free Minecraft gameplay.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-navy-light p-6 rounded-lg border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 252, 0, 0.2)" }}
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <span className="mr-2 text-creeper text-xl">🛡️</span> 
                      17TB DDoS Protection
                    </h3>
                    <p className="text-gray-400">
                      Industry-leading <span className="text-creeper font-semibold">17 TB DDoS protection</span> powered by CreeperShield keeps your server online 24/7, even during the most sophisticated attacks. Your players never experience downtime.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-navy-light p-6 rounded-lg border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 252, 0, 0.2)" }}
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <span className="mr-2 text-creeper text-xl">🏢</span> 
                      OVH Bare Metal Infrastructure
                    </h3>
                    <p className="text-gray-400">
                      Hosted on premium <span className="text-creeper font-semibold">OVH bare metal servers</span> - the gold standard in hosting infrastructure. No virtualization overhead means maximum performance and reliability for your gaming community.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-navy-light p-6 rounded-lg border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 252, 0, 0.2)" }}
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <span className="mr-2 text-creeper text-xl">⚡</span> 
                      Ultra-Low Latency
                    </h3>
                    <p className="text-gray-400">
                      Experience <span className="text-creeper font-semibold">sub-5ms ping</span> with servers strategically located in India. Perfect for competitive gameplay and smooth PvP experiences. Your players will feel the difference instantly.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-navy-light p-6 rounded-lg border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 252, 0, 0.2)" }}
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Check className="mr-2 text-creeper h-5 w-5" /> 
                      One-Click Installation
                    </h3>
                    <p className="text-gray-400">
                      Install Minecraft versions, plugins, and modpacks with just one click through our control panel. Get your server running in seconds, not hours.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-navy-light p-6 rounded-lg border border-gray-800 hover:border-creeper/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 252, 0, 0.2)" }}
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Check className="mr-2 text-creeper h-5 w-5" /> 
                      24/7 Expert Support
                    </h3>
                    <p className="text-gray-400">
                      Our expert team is available around the clock to assist with any issues. Real humans who understand Minecraft hosting, not automated responses.
                    </p>
                  </motion.div>
                </div>
              </div>
              
              {/* Plans Section */}
              <div className="text-center mb-12">
                <motion.h2 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Choose Your <span className="text-creeper">Perfect Plan</span>
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-400 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Select the plan that fits your community size and requirements
                </motion.p>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {minecraftPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <Card 
                      className={`bg-navy-light h-full flex flex-col ${plan.highlighted ? 'border-2 border-creeper relative' : 'border border-gray-800'} transition-all duration-300`}
                    >
                      {plan.highlighted && (
                        <div className="absolute top-0 right-0 bg-creeper text-navy-dark font-medium text-sm px-4 py-1 rounded-bl-lg">
                          Most Popular
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4">
                          <Server className="h-12 w-12 text-creeper" />
                        </div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="flex items-baseline justify-center mt-2">
                          {plan.price ? (
                            <>
                              <span className="text-4xl font-bold">₹{plan.price}</span>
                              <span className="text-gray-400 ml-1">/month</span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-creeper">Custom Pricing</span>
                          )}
                        </div>
                        <CardDescription className="text-gray-400 mt-2">
                          {plan.isCustom ? "For large networks & special requirements" :
                           plan.ram === "2GB" ? "Perfect for small friend groups" : 
                           plan.ram === "4GB" ? "Ideal for growing communities" : 
                           plan.ram === "6GB" ? "For established servers" :
                           plan.ram === "8GB" ? "For medium networks" :
                           plan.ram === "10GB" ? "For large networks" :
                           "For your Minecraft community"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <div className="space-y-4 flex-grow">
                          <div className="border-t border-gray-700 pt-4">
                            <ul className="space-y-2">
                              <li className="flex justify-between">
                                <span className="text-gray-400">RAM</span>
                                <span className="font-medium text-creeper">{plan.ram}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">CPU</span>
                                <span className="font-medium text-creeper">{plan.cpu}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">Storage</span>
                                <span className="font-medium text-creeper">{plan.storage}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">Ports</span>
                                <span className="font-medium text-creeper">{plan.additionalPorts}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">Database</span>
                                <span className="font-medium text-creeper">{plan.databaseSpace}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">Backups</span>
                                <span className="font-medium text-creeper">{plan.backupsLimit}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-400">Locations</span>
                                <div className="text-right">
                                  {plan.locations.map((location, i) => (
                                    <div key={i} className="font-medium text-creeper">{location}</div>
                                  ))}
                                </div>
                              </li>
                              <li className="flex justify-between items-center">
                                <div className="flex items-center text-gray-400">
                                  <span>DDoS Protection</span>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <HelpCircle className="h-4 w-4 ml-1" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-navy-dark border border-gray-700">
                                        <p className="w-64">CreeperShield protects your server from DDoS attacks, keeping it online even during attacks.</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                <span className="font-medium text-creeper">{plan.ddosProtection}</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="border-t border-gray-700 pt-4">
                            <h4 className="font-medium mb-2">Features:</h4>
                            <ul className="space-y-1">
                              {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="h-5 w-5 text-creeper mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {!plan.isCustom ? (
                          <div className="mt-6 space-y-2">
                            <Button
                              className="w-full minecraft-btn"
                              onClick={() => {
                                const id = `minecraft-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
                                addItem({ id, name: plan.name, category: "Minecraft", price: plan.price as number, ram: plan.ram });
                              }}
                              disabled={items.some(i => i.id === `minecraft-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)}
                            >
                              {items.some(i => i.id === `minecraft-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)
                                ? <><ShoppingCart className="h-4 w-4 mr-2" /> In Cart</>
                                : <><ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart</>
                              }
                            </Button>
                          </div>
                        ) : (
                          <Button className="w-full minecraft-btn mt-6" asChild>
                            <a
                              href="https://discord.gg/RuQ9neH56S"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <MessageCircle className="h-5 w-5" /> Join Our Discord
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-16 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Need something <span className="text-creeper">more powerful</span>?
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  For larger communities or special requirements, check out our VPS plans 
                  or contact us for a custom solution tailored to your needs.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button className="minecraft-btn" asChild>
                    <a href="/plans/other">Explore Other Hosting</a>
                  </Button>
                  <Button variant="outline" className="border-creeper text-creeper hover:bg-creeper/10" asChild>
                    <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
                      Get Custom Solution
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default MinecraftPlans;
