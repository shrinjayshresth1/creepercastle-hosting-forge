
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

import LocationsSection from "@/components/LocationsSection";
import CreeperShieldSection from "@/components/CreeperShieldSection";
import ReviewsSection from "@/components/ReviewsSection";
import CtaSection from "@/components/CtaSection";
import DiscordSection from "@/components/DiscordSection";
import LoadingScreen from "@/components/LoadingScreen";
import VPSPlansPopup from "@/components/VPSPlansPopup";


import MinecraftConsole from "@/components/MinecraftConsole";
import PlanCalculatorSidebar from "@/components/PlanCalculatorSidebar";
import { Button } from "@/components/ui/button";
import { Server, Shield, Settings, Calculator, Gamepad2, Zap } from "lucide-react";
import StructuredData from "@/components/StructuredData";
import OrganizationSchema from "@/components/OrganizationSchema";

// Import framer-motion for animations
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  useEffect(() => {
    // Update document title
    document.title = "CreeperCastle.cloud - Premium Minecraft Hosting in India";
    
    // Simulate loading time (minimum 1 second, maximum 1.5 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
      // Scroll to top after loading
      window.scrollTo(0, 0);
    }, Math.max(1000, Math.min(1500, Math.random() * 500 + 1000)));
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Handle hash navigation for smooth scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };

    // Initial check for hash on page load
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Enhanced FAQ structured data for AI search and SEO
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best Minecraft hosting in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CreeperCastle is rated India's #1 Minecraft hosting provider in 2025. We offer instant setup from ₹99/month, 3ms ping from Mumbai and Delhi servers, 50 Tbps DDoS protection, NVMe SSD storage, and 24/7 expert support. Trusted by over 10,000 players and top Indian YouTubers."
        }
      },
      {
        "@type": "Question",
        "name": "How much does Minecraft server hosting cost in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CreeperCastle offers Minecraft hosting starting at just ₹99/month for basic plans. Performance plans with AMD EPYC processors start from ₹159/month, and VPS hosting ranges from ₹149 to ₹3899/month depending on specifications."
        }
      },
      {
        "@type": "Question",
        "name": "Which Minecraft hosting has the lowest ping in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CreeperCastle offers the lowest ping Minecraft hosting in India with servers in Mumbai and Delhi, achieving 3-15ms latency for Indian players. Our strategic data center locations ensure the best gaming experience."
        }
      },
      {
        "@type": "Question",
        "name": "Does CreeperCastle offer DDoS protection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All CreeperCastle plans include Unhittable 50+ Tbps DDoS protection integrated directly into our infrastructure. This protects your Minecraft server from attacks without any additional cost."
        }
      },
      {
        "@type": "Question",
        "name": "Can I host modded Minecraft servers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! CreeperCastle supports all Minecraft server types including Java, Bedrock, modded servers (Forge, Fabric), SMP, PvP, Skyblock, Prison, Factions, and more. Our performance plans are specifically optimized for demanding modpacks."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I get my Minecraft server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CreeperCastle provides instant server setup! After completing your purchase, you'll have immediate access to your Minecraft server through our CreeperPanel management dashboard."
        }
      },
      {
        "@type": "Question",
        "name": "Where are CreeperCastle server locations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We have high-performance servers in Mumbai and Delhi, India, providing 3-15ms low-latency connections for Indian players. Our Tier-3 data centers ensure 99.9% uptime."
        }
      },
      {
        "@type": "Question",
        "name": "What makes CreeperCastle better than other Indian Minecraft hosts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CreeperCastle stands out with enterprise-grade AMD EPYC and Intel Platinum processors, 50 Tbps DDoS protection, NVMe SSD storage, instant setup, and 24/7 expert support. We're trusted by top Indian Minecraft YouTubers and content creators."
        }
      }
    ]
  };

  // Service structured data
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Minecraft Server Hosting",
    "provider": {
      "@type": "Organization",
      "name": "CreeperCastle",
      "url": "https://creepercastle.cloud"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Minecraft Hosting Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Minecraft Classic Hosting",
            "description": "Standard Minecraft hosting with enterprise-grade processors"
          },
          "price": "99",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Minecraft Performance Hosting",
            "description": "High-performance hosting with AMD EPYC 4344P processors"
          },
          "price": "159",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Budget VPS Hosting",
            "description": "VPS hosting with Intel Platinum 8168 processors"
          },
          "price": "149",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance VPS Hosting",
            "description": "Premium VPS with Ryzen 7 5700G 5.3 GHz"
          },
          "price": "399",
          "priceCurrency": "INR"
        }
      ]
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <VPSPlansPopup />
      <OrganizationSchema />
      <Helmet>
        <title>Best Minecraft Hosting India 2025 | CreeperCastle</title>
        <meta name="description" content="India's #1 Minecraft hosting 2025. Instant setup from ₹99/mo with 3–15 ms ping (Mumbai/Delhi), NVMe SSD, 50+ Tbps DDoS protection and 24/7 expert support." />
        <meta name="keywords" content="best minecraft server hosting india 2025, minecraft hosting india, cheap minecraft server india ₹99, minecraft server india, minecraft hosting mumbai, minecraft hosting delhi, indian minecraft hosting, low ping minecraft server 3ms india, minecraft server rental india, minecraft bedrock hosting india, minecraft java hosting india, minecraft smp hosting india, ddos protected minecraft hosting 50tbps, minecraft server provider india, modded minecraft hosting india, premium minecraft hosting, affordable minecraft hosting, minecraft network hosting, minecraft pvp hosting india, skyblock server hosting india, prison server hosting india, faction server hosting india, minecraft plugins hosting, instant minecraft server setup, 24/7 minecraft support india, creepercastle minecraft hosting, trusted minecraft hosting india, best minecraft host 2025 india, enterprise minecraft hosting, minecraft vps india, minecraft dedicated server india, minecraft creator hosting, minecraft youtuber hosting india, top minecraft hosting 2025, fastest minecraft server india, reliable minecraft hosting, professional minecraft hosting india" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/" />
        <meta property="og:title" content="Best Minecraft Server Hosting India 2025 | #1 Low Ping Provider | CreeperCastle" />
        <meta property="og:description" content="🏆 India's #1 Minecraft hosting 2025! Instant setup from ₹99/mo. 3ms Mumbai/Delhi ping, 50 Tbps DDoS, NVMe SSD, 24/7 support. 10,000+ servers. Java, Bedrock, Modded, SMP. Trusted by top YouTubers!" />
        <meta property="og:image:alt" content="CreeperCastle - India's Best Minecraft Server Hosting Provider" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CreeperCastle" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        <meta property="og:image:alt" content="CreeperCastle - India's Best Minecraft Server Hosting Provider" />
        <meta property="og:site_name" content="CreeperCastle.cloud" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://creepercastle.cloud/" />
        <meta name="twitter:title" content="Best Minecraft Hosting India 2025 🎮 | #1 Provider | ₹99" />
        <meta name="twitter:description" content="🏆 India's #1 Minecraft hosting! ₹99/mo | 3ms ping | 50 Tbps DDoS | NVMe | 24/7 support | 10,000+ servers | Instant setup | Trusted by top YouTubers!" />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        <meta name="twitter:site" content="@CreeperCastle" />
        <meta name="twitter:creator" content="@CreeperCastle" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CreeperCastle" />
        <meta name="application-name" content="CreeperCastle" />
        <meta name="msapplication-TileColor" content="#50C878" />
        <meta name="msapplication-TileImage" content="/lovable-uploads/570fb7e4-e36a-4bb5-a9ef-be9e7ae57b15.png" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="publisher" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN-MH;IN-DL" />
        <meta name="geo.placename" content="Mumbai;Delhi" />
        <meta name="geo.position" content="19.0760;72.8777;28.7041;77.1025" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        <meta name="language" content="English, Hindi" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="copyright" content="CreeperCastle.cloud" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://billing.creepercastle.in" />
        <link rel="dns-prefetch" href="https://discord.gg" />
        
        
        {/* Canonical and Alternate URLs */}
        <link rel="canonical" href="https://creepercastle.cloud/" />
        <link rel="alternate" hrefLang="en-IN" href="https://creepercastle.cloud/" />
        <link rel="alternate" hrefLang="en" href="https://creepercastle.cloud/" />
        <link rel="alternate" hrefLang="x-default" href="https://creepercastle.cloud/" />
        <link rel="alternate" hrefLang="en-IN" href="https://creepercastle.cloud/" />
        <link rel="alternate" hrefLang="en" href="https://creepercastle.cloud/" />
        <link rel="alternate" hrefLang="x-default" href="https://creepercastle.cloud/" />
        
        {/* Favicon */}
        <link rel="icon" href="/lovable-uploads/570fb7e4-e36a-4bb5-a9ef-be9e7ae57b15.png" type="image/png" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceStructuredData)}
        </script>
      </Helmet>

      <StructuredData type="website" />
      <StructuredData type="organization" />
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-screen bg-navy text-white relative"
        >
          
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
          
          <PlanCalculatorSidebar
            isOpen={calculatorOpen} 
            onClose={() => setCalculatorOpen(false)} 
          />
          
          <main className="flex-grow pt-16 relative z-10">
            <section id="home">
              <HeroSection />
            </section>
            
            {/* Minecraft Console and Plan Calculator Button */}
            <section className="py-16 bg-navy-light relative">
              {/* Highlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-creeper/10 to-transparent opacity-50"></div>
              <div className="absolute inset-0 border-2 border-creeper/30 rounded-lg m-4"></div>
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div>
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold mb-8 text-center lg:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      Server Console <span className="text-creeper">Live</span>
                    </motion.h2>
                    <MinecraftConsole />
                  </div>
                  
                  <div>
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold mb-8 text-center lg:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Plan <span className="text-creeper">Calculator</span>
                    </motion.h2>
                    
                    <motion.div
                      className="max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="bg-navy-dark border-2 border-creeper/50 rounded-xl p-8 text-center shadow-lg shadow-creeper/20">
                        <div className="flex justify-center mb-6">
                          <div className="w-16 h-16 bg-creeper/20 rounded-full flex items-center justify-center">
                            <img 
                              src="/lovable-uploads/1a0d50b6-cd93-42c1-bb4d-18c8aed41a15.png" 
                              alt="Calculator" 
                              className="h-8 w-8"
                              onError={(e) => {
                                // Fallback to Calculator icon if image fails to load
                                e.currentTarget.style.display = 'none';
                                const fallback = document.createElement('div');
                                fallback.innerHTML = '<svg class="h-8 w-8 text-creeper" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>';
                                e.currentTarget.parentElement?.appendChild(fallback.firstChild!);
                              }}
                            />
                            <Calculator className="h-8 w-8 text-creeper hidden" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-creeper mb-4">
                          🎯 Find Your Perfect Plan
                        </h3>
                        <p className="text-gray-400 mb-6">
                          Tell us about your server and we'll recommend the perfect plan for your needs
                        </p>
                        
                        <Button 
                          onClick={() => setCalculatorOpen(true)}
                          className="minecraft-btn text-lg px-8 py-3 shadow-lg shadow-creeper/30 hover:shadow-creeper/50 transition-all duration-300"
                        >
                          🚀 Open Plan Calculator
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Premium Hosting Services Section */}
            <section className="py-24 bg-gradient-to-b from-navy via-navy-dark to-black relative overflow-hidden">
              {/* Animated background effects */}
              <div className="absolute inset-0 bg-grid opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-creeper/5 via-transparent to-purple-500/5"></div>
              
              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Choose Your <span className="bg-gradient-to-r from-creeper via-amber-400 to-purple-500 bg-clip-text text-transparent">Perfect Hosting</span>
                  </h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Premium hosting solutions designed for performance, reliability, and excellence
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Minecraft Hosting Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="group"
                  >
                    <div className="relative h-full bg-gradient-to-br from-creeper/10 to-creeper/5 backdrop-blur-sm border-2 border-creeper/40 rounded-2xl p-6 hover:border-creeper transition-all duration-300 hover:shadow-2xl hover:shadow-creeper/30 hover:-translate-y-2">
                      <div className="absolute top-4 right-4">
                        <span className="bg-creeper text-navy-dark text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
                      </div>
                      
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-creeper to-creeper-dark rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-creeper/50">
                          <Gamepad2 className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Minecraft</h3>
                        <p className="text-gray-400 text-sm">Ultimate gaming experience</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-creeper rounded-full"></div>
                          <span className="text-gray-300">From <strong className="text-white">2GB RAM</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-creeper rounded-full"></div>
                          <span className="text-gray-300"><strong className="text-white">30GB</strong> NVMe Storage</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-creeper rounded-full"></div>
                          <span className="text-gray-300">Mumbai Location</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-creeper rounded-full"></div>
                          <span className="text-gray-300">DDoS Protected</span>
                        </div>
                      </div>

                      <div className="border-t border-creeper/30 pt-4 mt-auto">
                        <div className="text-3xl font-bold text-creeper mb-4">₹99<span className="text-lg text-gray-400">/mo</span></div>
                        <Button className="w-full bg-creeper hover:bg-creeper-dark text-navy-dark font-bold py-2.5 transition-all duration-300 hover:scale-105 shadow-lg shadow-creeper/30" asChild>
                          <Link to="/plans/minecraft">Get Started</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Performance Hosting Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group"
                  >
                    <div className="relative h-full bg-gradient-to-br from-amber-500/10 to-orange-600/5 backdrop-blur-sm border-2 border-amber-500/40 rounded-2xl p-6 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-2">
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">PREMIUM</span>
                      </div>
                      
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/50">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Performance</h3>
                        <p className="text-gray-400 text-sm">Pure high-performance nodes</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                          <span className="text-gray-300"><strong className="text-amber-300">Infinite CPU Power</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                          <span className="text-gray-300">From <strong className="text-white">3GB RAM</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                          <span className="text-gray-300"><strong className="text-white">Zero Lag</strong> Guaranteed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                          <span className="text-gray-300">Unhittable DDoS</span>
                        </div>
                      </div>

                      <div className="border-t border-amber-500/30 pt-4 mt-auto">
                        <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">₹299<span className="text-lg text-gray-400">/mo</span></div>
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-2.5 transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/30" asChild>
                          <Link to="/plans/performance">Unleash Power</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Budget VPS Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="group"
                  >
                    <div className="relative h-full bg-gradient-to-br from-blue-500/10 to-cyan-600/5 backdrop-blur-sm border-2 border-blue-500/40 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/50">
                          <Server className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Budget VPS</h3>
                        <p className="text-gray-400 text-sm">Affordable virtual servers</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300"><strong className="text-white">Intel Platinum 8168</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">From <strong className="text-white">4GB RAM</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">NVMe SSD Storage</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">17 Tbps DDoS Shield</span>
                        </div>
                      </div>

                      <div className="border-t border-blue-500/30 pt-4 mt-auto">
                        <div className="text-3xl font-bold text-blue-400 mb-4">₹199<span className="text-lg text-gray-400">/mo</span></div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-2.5 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30" asChild>
                          <Link to="/plans/vps">View Plans</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Performance VPS Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="group"
                  >
                    <div className="relative h-full bg-gradient-to-br from-orange-500/10 to-red-600/5 backdrop-blur-sm border-2 border-orange-500/40 rounded-2xl p-6 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-2">
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">ULTIMATE</span>
                      </div>
                      
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/50">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Performance VPS</h3>
                        <p className="text-gray-400 text-sm">Ryzen 7 5700G Beast</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-300"><strong className="text-orange-300">5.3 GHz Turbo</strong> Speed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-300"><strong className="text-white">DDR5 RAM</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-300">NVMe Gen 4 SSD</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-300">50+ Tbps Unhittable</span>
                        </div>
                      </div>

                      <div className="border-t border-orange-500/30 pt-4 mt-auto">
                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">₹399<span className="text-lg text-gray-400">/mo</span></div>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-2.5 transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30" asChild>
                          <Link to="/plans/performance-vps">Unleash Power</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* CreeperPanel Section */}
            <section className="py-16 bg-navy-light">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Manage with <span className="text-creeper">CreeperPanel</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                      Experience our enhanced Pterodactyl-based game server management system with 
                      advanced security, real-time monitoring, and intuitive controls designed 
                      specifically for seamless Minecraft server administration.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="bg-navy rounded-lg p-6 border border-gray-800">
                        <Shield className="h-8 w-8 text-creeper mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Advanced Security</h3>
                        <p className="text-sm text-gray-400">Multi-layer protection with SSL encryption</p>
                      </div>
                      
                      <div className="bg-navy rounded-lg p-6 border border-gray-800">
                        <Server className="h-8 w-8 text-creeper mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
                        <p className="text-sm text-gray-400">Live server stats and performance metrics</p>
                      </div>
                      
                      <div className="bg-navy rounded-lg p-6 border border-gray-800">
                        <Settings className="h-8 w-8 text-creeper mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Easy Management</h3>
                        <p className="text-sm text-gray-400">Intuitive interface for all your needs</p>
                      </div>
                    </div>
                    
                    <Button className="minecraft-btn text-lg px-8 py-3" asChild>
                      <Link to="/creeperpanel">Explore CreeperPanel</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </section>
            
            <section id="locations">
              <LocationsSection />
            </section>
            <section id="features">
              <CreeperShieldSection />
            </section>
            <DiscordSection />
            <ReviewsSection />
            <CtaSection />
          </main>
          
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Index;
