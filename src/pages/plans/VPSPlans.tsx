import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Server, Cpu, Zap, Shield, HardDrive, Globe, Sparkles, Crown, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const vpsPlans = [
  {
    name: "Creeper Mini",
    price: "₹199",
    logo: "/lovable-uploads/2e0d644d-6f7e-43e0-93e8-2efabb828007.png",
    specs: {
      cpu: "Intel Platinum 8168 💎",
      cores: "2V Cores 🚀",
      ram: "4 GB DDR4 ECC RAM 🪄",
      storage: "20 GB NVMe Storage🪄",
      network: "Upto 1Gbps network speed🛜",
      location: "India, Delhi🚩",
      ddos: "CreeperCastle DDoS Protection🛡️",
      mitigation: "17 Tbps Smart MITIGATION🛡️",
      rdns: "RDNS Facility Available✅"
    },
    buyLink: "https://billing.creepercastle.in/products/vps-hosting/creeper-mini",
    highlighted: false
  },
  {
    name: "CreeperCastle Knight",
    price: "₹399",
    logo: "/lovable-uploads/92e056f5-c85f-4f06-9432-7c5ca32fe8b2.png",
    specs: {
      cpu: "Intel Platinum 8168 💎",
      cores: "4V Cores 🚀",
      ram: "8 GB DDR4 ECC RAM 🪄",
      storage: "40 GB NVMe Storage🪄",
      network: "Upto 1Gbps network speed🛜",
      location: "India, Delhi🚩",
      ddos: "CreeperCastle DDoS Protection🛡️",
      mitigation: "17 Tbps Smart MITIGATION🛡️",
      rdns: "RDNS Facility Available✅"
    },
    buyLink: "https://billing.creepercastle.in/products/vps-hosting/creepercastle-knight",
    highlighted: true
  },
  {
    name: "CreeperCastle Titan",
    price: "₹699",
    logo: "/lovable-uploads/592d5824-5311-47bb-beb0-5aae9ff5c280.png",
    specs: {
      cpu: "Intel Platinum 8168 💎",
      cores: "6V Cores 🚀",
      ram: "16 GB DDR4 ECC RAM 🪄",
      storage: "60 GB NVMe Storage🪄",
      network: "Upto 1Gbps network speed🛜",
      location: "India, Delhi🚩",
      ddos: "CreeperCastle DDoS Protection🛡️",
      mitigation: "17 Tbps Smart MITIGATION🛡️",
      rdns: "RDNS Facility Available✅"
    },
    buyLink: "https://billing.creepercastle.in/products/vps-hosting/creepercastle-titan",
    highlighted: false
  },
  {
    name: "CreeperCastle Guardian",
    price: "₹1,199",
    logo: "/lovable-uploads/102f77a4-d71f-456c-b542-1f98a55eb506.png",
    specs: {
      cpu: "Intel Platinum 8168 💎",
      cores: "10V Cores 🚀",
      ram: "32 GB DDR4 ECC RAM 🪄",
      storage: "100 GB NVMe Storage🪄",
      network: "Upto 1Gbps network speed🛜",
      location: "India, Delhi🚩",
      ddos: "CreeperCastle DDoS Protection🛡️",
      mitigation: "17 Tbps Smart MITIGATION🛡️",
      rdns: "RDNS Facility Available✅"
    },
    buyLink: "https://billing.creepercastle.in/products/vps-hosting/creepercastle-guardian",
    highlighted: false
  },
  {
    name: "CreeperCastle Overlord",
    price: "₹2,099",
    logo: "/lovable-uploads/c78b0c32-1019-4b21-a48b-1581857db978.png",
    specs: {
      cpu: "Intel Platinum 8168 💎",
      cores: "20V Cores 🚀",
      ram: "64 GB DDR4 ECC RAM 🪄",
      storage: "200 GB NVMe Storage🪄",
      network: "Upto 1Gbps network speed🛜",
      location: "India, Delhi🚩",
      ddos: "CreeperCastle DDoS Protection🛡️",
      mitigation: "17 Tbps Smart MITIGATION🛡️",
      rdns: "RDNS Facility Available✅"
    },
    buyLink: "https://billing.creepercastle.in/products/vps-hosting/creepercastle-overlord",
    highlighted: false
  },
  {
    name: "Custom VPS Plan",
    price: "Custom",
    logo: "/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png",
    specs: {
      cpu: "Intel Platinum 8168 (Custom) 💎",
      cores: "Custom Cores 🚀",
      ram: "Custom RAM Configuration 🪄",
      storage: "Flexible Storage Options 🪄",
      network: "Dedicated Bandwidth 🛜",
      location: "Multiple Locations Available 🚩",
      ddos: "Enterprise DDoS Protection 🛡️",
      mitigation: "Advanced Security 🛡️",
      rdns: "Full Management Support ✅"
    },
    buyLink: "https://discord.gg/creepercastle",
    highlighted: false,
    isCustom: true
  }
];

const VPSPlans = () => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Intel Platinum 8168 Powerhouse',
      description: 'The legendary Intel Platinum 8168 - a data center beast with 24 cores, 48 threads, and massive 33MB cache. Engineered for extreme multi-threaded performance, this processor demolishes Minecraft server loads with unmatched single-thread speeds and parallel processing power. The gold standard for game hosting.',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Own Infrastructure',
      description: 'Built on our proprietary hardware infrastructure, meticulously optimized and Minecraft-ready for zero-compromise performance',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '17 Tbps DDoS Shield',
      description: 'CreeperCastle enterprise DDoS protection with massive 17 Tbps mitigation capacity and premium network keeps you online 24/7',
      gradient: 'from-cyan-600 to-teal-600',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast NVMe',
      description: 'Enterprise-grade NVMe SSD storage delivering 7000MB/s speeds for instant application response',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Delhi Datacenter',
      description: 'Strategic India location with premium 1Gbps network, perfect latency for South Asian audiences',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Full Root Access',
      description: 'Complete control with KVM virtualization, rDNS support, and instant provisioning',
      gradient: 'from-teal-500 to-cyan-600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best VPS Hosting India 2025 | CreeperCastle</title>
        <meta 
          name="description" 
          content="💻 #1 VPS India 2025! Intel Platinum 8168 24-core powerhouse on our own optimized infrastructure, Minecraft-ready, NVMe SSD, 17 Tbps DDoS, ECC RAM, Delhi datacenter. KVM, root access from ₹199/mo."
        />
        <meta
          name="keywords"
          content="best vps hosting india 2025, intel platinum 8168 vps, cheap vps india delhi, kvm vps india, nvme vps india, minecraft vps hosting india, vps with ddos protection, linux vps india, windows vps india, game server vps, high performance vps india, root access vps delhi, ecc ram vps, rdns vps india, managed vps india, unmanaged vps india, vps hosting delhi, enterprise vps india, creepercastle vps, fastest vps india 2025, own infrastructure vps"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/plans/vps" />
        <meta property="og:title" content="Intel Platinum 8168 VPS Hosting India | 24-Core Beast | Own Infrastructure | 17 Tbps DDoS" />
        <meta property="og:description" content="💻 Ultimate VPS: Intel Platinum 8168 24-core powerhouse on our own optimized infrastructure, Minecraft-ready, NVMe SSD, 17 Tbps DDoS protection. Delhi datacenter. From ₹199/mo." />
        <meta property="og:image" content="https://creepercastle.cloud/og-images/vps-hosting.jpg" />
        <meta property="og:image:alt" content="Intel Platinum 8168 VPS Hosting by CreeperCastle" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CreeperCastle" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Intel Platinum 8168 VPS India 💻 24-Core Powerhouse" />
        <meta name="twitter:description" content="Enterprise VPS with Intel Platinum 8168 24-core beast, own optimized infrastructure, Minecraft-ready, NVMe, 17 Tbps DDoS. Delhi from ₹199/mo." />
        <meta name="twitter:image" content="https://creepercastle.cloud/og-images/vps-hosting.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Delhi" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/plans/vps" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white relative overflow-hidden">
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
        
        <main className="flex-grow relative z-10">
          {/* Epic Hero Section */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-600/10 to-cyan-500/5 animate-pulse-slow" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-4 relative z-10"
            >
              <div className="text-center max-w-5xl mx-auto">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-6"
                >
                  <Badge className="bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white px-6 py-2 text-lg border-none shadow-lg shadow-cyan-500/50">
                    <Crown className="w-4 h-4 mr-2 inline" />
                    Enterprise-Grade VPS Hosting
                  </Badge>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent">
                    Intel Platinum 8168
                  </span>
                  <br />
                  <span className="text-white">VPS Hosting</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Unleash the raw power of Intel Platinum 8168 - 24 cores of pure performance on our own hyper-optimized infrastructure. 
                  <span className="text-cyan-400 font-semibold"> Minecraft-optimized architecture</span> with 
                  <span className="text-blue-400 font-semibold"> massive 33MB cache</span> and 
                  <span className="text-creeper font-semibold"> enterprise-grade reliability</span>. Protected by our 
                  <span className="text-cyan-400 font-semibold"> 17 Tbps DDoS shield</span> - the ultimate hosting solution.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/40 rounded-lg px-6 py-4">
                    <div className="text-3xl font-bold text-cyan-400">Platinum</div>
                    <div className="text-sm text-gray-300">Intel 8168</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/40 rounded-lg px-6 py-4">
                    <div className="text-3xl font-bold text-blue-400">17 Tbps</div>
                    <div className="text-sm text-gray-300">DDoS Protection</div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500/20 to-creeper/20 backdrop-blur-sm border border-cyan-500/40 rounded-lg px-6 py-4">
                    <div className="text-3xl font-bold text-creeper">Own Infra</div>
                    <div className="text-sm text-gray-300">Optimized</div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-bold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-600/60 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="#plans">
                    <Rocket className="w-5 h-5 mr-2" />
                    Explore Epic Plans
                  </a>
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Features Grid */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Why <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Intel Platinum 8168</span> Crushes Everything
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  24-core data center beast on our own infrastructure — high-density compute, optimized for domination, engineered for victory
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-navy-dark/80 to-black/80 border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 h-full backdrop-blur-sm group">
                      <CardHeader>
                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {feature.icon}
                        </div>
                        <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section id="plans" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Choose Your <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Power Tier</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Intel Platinum 8168 VPS plans on our own optimized infrastructure
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {vpsPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card 
                      className={`relative overflow-hidden bg-gradient-to-br from-navy-dark/90 to-black/80 backdrop-blur-md ${
                        plan.highlighted 
                          ? 'border-2 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.5)]' 
                          : 'border border-cyan-500/20 hover:border-cyan-500/50'
                      } transition-all duration-500 h-full flex flex-col group`}
                    >
                      {/* Epic animated background effects */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-creeper/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <motion.div 
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {plan.highlighted && (
                        <motion.div 
                          className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 text-sm font-bold rounded-bl-xl shadow-lg z-10"
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(6,182,212,0.5)",
                              "0 0 30px rgba(6,182,212,0.8)",
                              "0 0 20px rgba(6,182,212,0.5)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Sparkles className="w-4 h-4 inline mr-1" />
                          MOST POPULAR
                        </motion.div>
                      )}
                      
                      <CardHeader className="text-center relative z-10">
                        <motion.div 
                          className="mx-auto mb-4 relative"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: [0, -10, 10, 0],
                            transition: { duration: 0.6 }
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-2xl rounded-full" />
                          <img 
                            src={plan.logo} 
                            alt={`${plan.name} logo`}
                            className="h-20 w-auto mx-auto relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                          />
                        </motion.div>
                        
                        <CardTitle className="text-2xl font-bold mb-4">
                          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            {plan.name}
                          </span>
                        </CardTitle>
                        
                        <div className="flex items-baseline justify-center">
                          <motion.span 
                            className="text-5xl font-black text-white"
                            whileHover={{ scale: 1.1 }}
                          >
                            {plan.price}
                          </motion.span>
                          <span className="text-lg text-gray-400 ml-2 font-medium">/month</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="flex-grow space-y-3 text-sm relative z-10 pb-4">
                        {Object.entries(plan.specs).map(([key, value], idx) => (
                          <motion.div 
                            key={key} 
                            className="flex items-start gap-3 group/item"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            </div>
                            <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
                              {value}
                            </span>
                          </motion.div>
                        ))}
                      </CardContent>
                      
                      <div className="p-6 pt-0 relative z-10">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            className={`w-full font-bold py-6 text-base shadow-xl transition-all duration-300 ${
                              plan.highlighted
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-cyan-500/50 hover:shadow-cyan-600/60'
                                : 'bg-gradient-to-r from-creeper/90 to-creeper hover:from-creeper hover:to-creeper/90 text-navy-dark shadow-creeper/50'
                            }`}
                            asChild
                          >
                            <a href={plan.buyLink} target="_blank" rel="noopener noreferrer">
                              <span className="flex items-center justify-center gap-2">
                                {plan.isCustom ? (
                                  <>
                                    <Sparkles className="w-4 h-4" />
                                    Contact Us
                                  </>
                                ) : (
                                  <>
                                    <Rocket className="w-4 h-4" />
                                    Get Started
                                  </>
                                )}
                              </span>
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VPSPlans;