import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Shield, Database, HardDrive, Cpu, Clock, TrendingUp, Award, Sparkles, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

const PerformancePlans = () => {
  const { addItem, items } = useCart();
  const parsePrice = (str: string) => parseInt(str.replace(/[₹,]/g, ''), 10) || 0;
  // Comprehensive structured data for Performance hosting
  const performanceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "High-Performance Minecraft Hosting India",
    "description": "Ultra-performance Minecraft hosting powered by enterprise-grade hardware specially optimized for maximum performance, delivering zero-lag gaming experience in Mumbai datacenter",
    "brand": {
      "@type": "Brand",
      "name": "CreeperCastle"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "299",
      "highPrice": "1762",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "87"
    }
  };

  const breadcrumbData = {
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
        "name": "Plans",
        "item": "https://creepercastle.cloud/plans"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Performance Hosting",
        "item": "https://creepercastle.cloud/plans/performance"
      }
    ]
  };

  const plans = [
    {
      name: 'Amberheart',
      price: '₹299',
      period: '/month',
      description: 'Perfect for small communities',
      ram: '3 GB',
      cpu: 'Infinite',
      storage: '10 GB SSD',
      ports: '2 Additional Ports',
      databases: '2 Databases',
      backups: '2 Backups',
      location: 'Mumbai, India',
      ddos: 'Unhittable DDoS Protection',
      link: 'https://billing.creepercastle.in/products/minecraft-performance/amberheart',
      popular: false,
      color: 'from-amber-500/20 to-orange-600/20',
      borderColor: 'border-amber-500/40',
    },
    {
      name: 'Obsidian Crest',
      price: '₹532',
      period: '/month',
      description: 'Ideal for growing servers',
      ram: '6 GB',
      cpu: 'Infinite',
      storage: '20 GB SSD',
      ports: '4 Additional Ports',
      databases: '4 Databases',
      backups: '4 Backups',
      location: 'Mumbai, India',
      ddos: 'Unhittable DDoS Protection',
      link: 'https://billing.creepercastle.in/products/minecraft-performance/obsidian-crest',
      popular: true,
      color: 'from-amber-400/30 to-orange-500/30',
      borderColor: 'border-amber-400/60',
    },
    {
      name: 'Dragon Forge',
      price: '₹987',
      period: '/month',
      description: 'Built for large communities',
      ram: '12 GB',
      cpu: 'Infinite',
      storage: '40 GB SSD',
      ports: '8 Additional Ports',
      databases: '8 Databases',
      backups: '8 Backups',
      location: 'Mumbai, India',
      ddos: 'Unhittable DDoS Protection',
      link: 'https://billing.creepercastle.in/products/minecraft-performance/dragonforge',
      popular: false,
      color: 'from-amber-600/20 to-orange-700/20',
      borderColor: 'border-amber-600/40',
    },
    {
      name: 'Witherfall',
      price: '₹1762',
      period: '/month',
      description: 'Ultimate performance powerhouse',
      ram: '24 GB',
      cpu: 'Infinite',
      storage: '80 GB SSD',
      ports: '16 Additional Ports',
      databases: '16 Databases',
      backups: '16 Backups',
      location: 'Mumbai, India',
      ddos: 'Unhittable DDoS Protection',
      link: 'https://billing.creepercastle.in/products/minecraft-performance/witherfall',
      popular: false,
      color: 'from-amber-700/20 to-orange-800/20',
      borderColor: 'border-amber-700/40',
    },
  ];

  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'AMD Ryzen 7 5700G Processor',
      description: 'Powered by the legendary AMD Ryzen 7 5700G with 4.6 GHz boost clock - 8 cores and 16 threads of pure gaming performance that dominates Minecraft hosting',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Pure Performance Nodes',
      description: 'Specially tuned systems ensuring lightning-fast tick processing and absolute zero lag for seamless gameplay',
      gradient: 'from-yellow-500 to-amber-600',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Optimized Infrastructure',
      description: 'Highly optimized architecture designed exclusively for maximum Minecraft server performance',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Unhittable DDoS Protection',
      description: 'Military-grade multi-layer protection with 50+ Tbps capacity. Your server stays online even under the most massive attacks - completely unhittable',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Ultra-Low Latency',
      description: 'Optimized networking ensures consistent 20 TPS performance even with hundreds of players',
      gradient: 'from-yellow-600 to-amber-700',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Premium Components',
      description: 'NVMe SSDs, high-speed DDR4 RAM, and enterprise-grade components for maximum reliability',
      gradient: 'from-orange-600 to-red-700',
    },
  ];

  return (
    <>
      <Helmet>
        <title>High-Performance Minecraft Hosting India | CreeperCastle</title>
        <meta name="description" content="⚡ Ultimate Minecraft hosting with enterprise-grade hardware - Pure performance nodes specially optimized for zero lag. Advanced OVH DDoS protection. Mumbai servers from ₹299/mo. #1 premium Minecraft hosting India 2025." />
        <meta name="keywords" content="high performance minecraft hosting india, best minecraft server hosting, premium minecraft hosting, zero lag minecraft server india, mumbai minecraft hosting, dedicated minecraft nodes, enterprise minecraft hosting, fastest minecraft server india, optimized minecraft hosting, professional minecraft server india, creepercastle performance plans" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/plans/performance" />
        <meta property="og:title" content="High-Performance Minecraft Hosting | Pure Speed | #1 India" />
        <meta property="og:description" content="🚀 Ultimate Minecraft performance - Enterprise-grade hardware, pure performance nodes, zero lag. Advanced OVH DDoS protection. Starting ₹299/mo in Mumbai. Trust us with your server!" />
        <meta property="og:image" content="https://creepercastle.cloud/og-images/ryzen9-hosting.jpg" />
        <meta property="og:image:alt" content="High-Performance Minecraft Hosting by CreeperCastle" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CreeperCastle" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="High-Performance Minecraft Hosting ⚡ Pure Speed" />
        <meta name="twitter:description" content="Ultimate Minecraft performance with dedicated nodes. Zero lag, infinite CPU power, NVMe, OVH DDoS. Starting ₹299/mo in Mumbai." />
        <meta name="twitter:image" content="https://creepercastle.cloud/og-images/ryzen9-hosting.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.placename" content="Mumbai;Delhi" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        <meta name="revisit-after" content="2 days" />
        
        <link rel="canonical" href="https://creepercastle.cloud/plans/performance" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(performanceStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-navy text-white relative">
        {/* Enhanced background */}
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

        <main className="flex-grow pt-16 relative z-10">
          {/* Hero Section */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-600/10 to-amber-500/5 animate-pulse-slow" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            
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
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 text-lg border-none shadow-lg shadow-amber-500/50">
                    <Sparkles className="w-4 h-4 mr-2 inline" />
                    Pure Performance Unleashed
                  </Badge>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent leading-tight">
                  High-Performance
                  <br />
                  <span className="text-white">Minecraft Hosting</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Experience the ultimate power of <span className="text-amber-400 font-semibold">specially dedicated performance nodes</span> optimized exclusively for Minecraft. 
                  Leave the technical details to us - we've engineered every aspect for 
                  <span className="text-orange-400 font-semibold"> absolute zero lag</span> and 
                  <span className="text-amber-300 font-semibold"> infinite performance</span>.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 backdrop-blur-sm border border-amber-500/40 rounded-lg px-6 py-4">
                    <div className="text-3xl font-bold text-amber-400 flex items-center justify-center gap-2">
                      ∞
                    </div>
                    <div className="text-sm text-gray-300">Infinite CPU Power</div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 backdrop-blur-sm border border-amber-500/40 rounded-lg px-6 py-4">
                    <div className="text-3xl font-bold text-orange-400">100%</div>
                    <div className="text-sm text-gray-300">Optimized Nodes</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/40 rounded-lg px-6 py-4">
                    <div className="text-3xl font-bold text-purple-400">50+ Tbps</div>
                    <div className="text-sm text-gray-300">Unhittable DDoS</div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 backdrop-blur-sm border border-amber-500/40 rounded-lg px-6 py-4">
                    <div className="text-3xl font-bold text-amber-300">Zero</div>
                    <div className="text-sm text-gray-300">Lag Guaranteed</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-lg p-6 mb-4 max-w-2xl mx-auto">
                  <p className="text-lg text-gray-200 leading-relaxed">
                    <span className="text-amber-400 font-semibold">Trust us with your server.</span> Our enterprise-grade infrastructure is meticulously tuned and optimized. You focus on your community - we handle the performance magic behind the scenes.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                  <p className="text-lg text-gray-200 leading-relaxed">
                    <Shield className="w-5 h-5 inline mr-2 text-purple-400" />
                    Protected by <span className="text-purple-400 font-semibold">Unhittable DDoS Protection</span> with 50+ Tbps capacity. Your server stays online even under massive attacks - completely unhittable, guaranteed.
                  </p>
                </div>

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-bold shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/60 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="#plans">
                    <Zap className="w-5 h-5 mr-2" />
                    View Premium Plans
                  </a>
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Processor Showcase Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/20 to-amber-500/10" />
            <div className="absolute inset-0">
              <div className="absolute top-10 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 text-lg border-none shadow-lg shadow-amber-500/50 mb-6">
                    <Cpu className="w-4 h-4 mr-2 inline" />
                    Powered by Excellence
                  </Badge>
                  
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    <span className="text-white">Unleashing the Power of</span>
                    <br />
                    <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                      AMD Ryzen 7 5700G
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                    Experience the pinnacle of gaming performance with the <span className="text-amber-400 font-semibold">AMD Ryzen 7 5700G</span> - 
                    a legendary 8-core, 16-thread powerhouse with 4.6 GHz boost clock that dominates Minecraft server hosting with exceptional single-threaded performance.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm border-2 border-amber-500/50 rounded-xl p-6 hover:border-amber-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30"
                  >
                    <div className="text-center">
                      <div className="text-5xl font-bold text-amber-400 mb-2">4.6 GHz</div>
                      <div className="text-sm text-gray-300 font-semibold">Boost Clock</div>
                      <p className="text-xs text-gray-400 mt-2">Lightning-fast clock speeds that crush any workload</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 backdrop-blur-sm border-2 border-yellow-500/50 rounded-xl p-6 hover:border-yellow-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30"
                  >
                    <div className="text-center">
                      <div className="text-5xl font-bold text-yellow-400 mb-2">8C/16T</div>
                      <div className="text-sm text-gray-300 font-semibold">Cores & Threads</div>
                      <p className="text-xs text-gray-400 mt-2">Massive multi-threaded power for demanding servers</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/40 rounded-2xl p-8 backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Why the Ryzen 7 5700G is a Gaming Beast</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-200">
                    <div className="flex items-start gap-3">
                      <Zap className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">Blazing 4.6 GHz Boost:</strong> Peak performance that accelerates through complex calculations and heavy plugin loads effortlessly with exceptional single-core speed
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">8 Cores, 16 Threads:</strong> Massive multi-threaded power handles 400+ concurrent players without breaking a sweat
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">Exceptional IPC:</strong> Zen 3 architecture delivers industry-leading instructions per clock - perfect for Minecraft's single-threaded workloads
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">Zero Bottlenecks:</strong> 16MB L3 cache and DDR4 memory support ensures your server never waits, never lags, never compromises
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-400/10 to-orange-400/10 border border-amber-400/30 rounded-lg">
                    <p className="text-center text-amber-300 font-semibold text-lg">
                      🏆 The Ryzen 7 5700G is the ultimate gaming processor - designed for performance that never compromises. Your players deserve Ryzen excellence.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
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
                  Why Our <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Performance Nodes</span> Dominate
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Specially dedicated hardware engineered exclusively for extreme Minecraft server performance
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
                    <Card className="bg-gradient-to-br from-navy-dark/80 to-black/80 border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 h-full backdrop-blur-sm">
                      <CardHeader>
                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
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

          {/* Unhittable DDoS Protection Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10" />
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-lg border-none shadow-lg shadow-purple-500/50 mb-6">
                  <Shield className="w-4 h-4 mr-2 inline" />
                  Industry-Leading Protection
                </Badge>
                
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Unhittable</span> DDoS Protection
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                  Your server is protected by the most powerful DDoS mitigation infrastructure in India. 
                  We don't just block attacks - <span className="text-purple-400 font-semibold">we make them impossible</span>.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 h-full backdrop-blur-sm">
                    <CardHeader>
                      <div className="text-4xl font-bold text-purple-400 mb-2">50+ Tbps</div>
                      <CardTitle className="text-xl text-white">Mitigation Capacity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        Massive 50+ Terabit protection capacity crushes even the largest volumetric attacks before they reach your server
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 h-full backdrop-blur-sm">
                    <CardHeader>
                      <div className="text-4xl font-bold text-pink-400 mb-2">Multi-Layer</div>
                      <CardTitle className="text-xl text-white">Defense System</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        Advanced L3/L4/L7 protection with intelligent filtering, rate limiting, and behavioral analysis stops all attack types
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 h-full backdrop-blur-sm">
                    <CardHeader>
                      <div className="text-4xl font-bold text-purple-300 mb-2">24/7</div>
                      <CardTitle className="text-xl text-white">Always-On Protection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        Real-time monitoring and instant mitigation activate automatically - your server stays online no matter what
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Why Our Protection is Truly Unhittable</h3>
                <div className="grid md:grid-cols-2 gap-6 text-gray-200">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Enterprise OVH Infrastructure:</strong> Battle-tested protection handling millions of attacks daily
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Instant Auto-Mitigation:</strong> Attacks neutralized in milliseconds with zero manual intervention
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Global Scrubbing Centers:</strong> Distributed protection across multiple continents for maximum resilience
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Zero Performance Impact:</strong> Protection works invisibly - your players never notice a thing
                    </div>
                  </div>
                </div>
                <p className="text-center text-purple-300 font-semibold mt-6 text-lg">
                  Sleep peacefully knowing your server is completely unhittable. We've got your back 24/7/365.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section id="plans" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Choose Your <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Power Level</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  All plans feature infinite CPU power and dedicated performance nodes. Scale as you grow!
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-1 shadow-lg">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <Card className={`h-full bg-gradient-to-br ${plan.color} backdrop-blur-sm border-2 ${plan.borderColor} hover:border-amber-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 ${plan.popular ? 'ring-2 ring-amber-400/50' : ''}`}>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl text-white flex items-center gap-2">
                          {plan.name}
                          {plan.popular && <Sparkles className="w-5 h-5 text-amber-400" />}
                        </CardTitle>
                        <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 pb-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-amber-400">{plan.price}</span>
                          <span className="text-gray-400">{plan.period}</span>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-200">
                            <Database className="w-4 h-4 text-creeper" />
                            <span className="font-semibold">{plan.ram}</span> RAM
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <Cpu className="w-4 h-4 text-amber-400" />
                            <span className="font-semibold">{plan.cpu}</span> CPU Power
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <HardDrive className="w-4 h-4 text-blue-400" />
                            <span className="font-semibold">{plan.storage}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <Check className="w-4 h-4 text-creeper" />
                            {plan.ports}
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <Check className="w-4 h-4 text-creeper" />
                            {plan.databases}
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <Check className="w-4 h-4 text-creeper" />
                            {plan.backups}
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <Shield className="w-4 h-4 text-purple-400" />
                            {plan.ddos}
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => {
                            const id = `performance-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
                            addItem({ id, name: plan.name, category: "Performance Minecraft", price: parsePrice(plan.price), ram: plan.ram });
                          }}
                          disabled={items.some(i => i.id === `performance-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)}
                        >
                          {items.some(i => i.id === `performance-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)
                            ? <><ShoppingCart className="w-4 h-4 mr-2" /> In Cart</>
                            : <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>
                          }
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-600/10 to-amber-500/10" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4 relative z-10"
            >
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Experience <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Infinite Performance</span>?
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Join thousands of satisfied server owners who trust us with their Minecraft hosting. 
                  Our specially optimized nodes deliver unmatched performance you can rely on 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-bold shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/60 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="#plans">
                      <Zap className="w-5 h-5 mr-2" />
                      Choose Your Plan
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-amber-500/50 text-white hover:bg-amber-500/10 px-8 py-6 text-lg font-bold transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="https://discord.gg/RWc4F3Ey" target="_blank" rel="noopener noreferrer">
                      💬 Join Discord
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PerformancePlans;
