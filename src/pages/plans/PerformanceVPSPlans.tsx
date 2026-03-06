import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Server, Cpu, Zap, Shield, HardDrive, Globe, Sparkles, Crown, Rocket, Award, TrendingUp, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/hooks/useProducts";

// performanceVPSPlans data deleted — now served from MongoDB via /api/products?category=performance-vps

const PerformanceVPSPlans = () => {
  const { addItem, items } = useCart();
  const { products: performanceVPSPlans, loading: plansLoading } = useProducts("performance-vps");
  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'AMD Ryzen 7 5700G Monster',
      description: 'The legendary Ryzen 7 5700G - an absolute gaming beast with 8 cores, 16 threads, and crushing 4.6 GHz boost clock (up to 5.3 GHz turbo). Built on Zen 3 architecture, this powerhouse delivers unrivaled single-threaded performance and multi-core dominance. Minecraft servers with 400+ players? No problem. The ultimate choice for extreme performance.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: '5.3 GHz Turbo Frequency',
      description: 'Experience blazing-fast clock speeds with turbo boost up to 5.3 GHz. This exceptional frequency ensures your server responds instantly, handles complex workloads effortlessly, and delivers buttery-smooth performance even with hundreds of concurrent users online simultaneously.',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'DDR4 RAM Technology',
      description: 'High-performance DDR4 memory technology delivering exceptional bandwidth and lower latency. Lightning-fast data access ensures your server handles massive world generation, complex redstone contraptions, and heavy mod packs without breaking a sweat.',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Unhittable DDoS Protection',
      description: '50+ Tbps capacity with military-grade multi-layer protection. 24/7 always-on protection keeps your server online and secure against the most sophisticated DDoS attacks. Your players stay connected, always.',
      gradient: 'from-cyan-600 to-teal-600',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'NVMe Gen 4 Performance',
      description: 'Cutting-edge Gen 4 NVMe SSD storage delivering mind-blowing 7000+ MB/s read speeds. World loading, chunk generation, and plugin data access happen instantly. Zero lag, pure performance.',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: '400+ Player Capability',
      description: 'Engineered to handle massive player loads with ease. The Ryzen 7 5700G combined with DDR4 RAM and NVMe storage creates a performance trifecta that crushes even the most demanding Minecraft servers with 400+ concurrent players.',
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Premium Ryzen 7 5700G VPS Hosting India 2025 | Ultimate Performance | CreeperCastle</title>
        <meta 
          name="description" 
          content="🔥 India's Most Powerful VPS 2025! AMD Ryzen 7 5700G with 5.3 GHz turbo, DDR4 RAM, NVMe Gen 4 SSD, handles 400+ players. Unhittable 50+ Tbps DDoS protection, Delhi datacenter. Premium performance from ₹399/mo."
        />
        <meta
          name="keywords"
          content="ryzen 7 5700g vps india, best performance vps india 2025, premium vps hosting india, ddr4 ram vps india, nvme gen 4 vps, minecraft vps 400 players, high performance gaming vps, ryzen vps delhi, zen 3 architecture vps, fastest vps india, premium game server hosting, enterprise vps india, 5.3 ghz vps hosting, ddos protected vps india, unmetered bandwidth vps, creepercastle premium vps, ultimate performance vps india, ryzen gaming server india"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/plans/performance-vps" />
        <meta property="og:title" content="AMD Ryzen 7 5700G Premium VPS India | 5.3 GHz Turbo | DDR4 | 400+ Players | Unhittable DDoS" />
        <meta property="og:description" content="🔥 Ultimate Performance VPS: Ryzen 7 5700G with 5.3 GHz turbo, DDR4 RAM, NVMe Gen 4, handles 400+ Minecraft players. 50+ Tbps DDoS protection. Delhi datacenter. From ₹399/mo." />
        <meta property="og:image" content="https://creepercastle.cloud/og-images/ryzen9-hosting.jpg" />
        <meta property="og:image:alt" content="AMD Ryzen 7 5700G Premium VPS Hosting by CreeperCastle" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CreeperCastle" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ryzen 7 5700G Premium VPS India 🔥 5.3 GHz Beast" />
        <meta name="twitter:description" content="Ultimate Performance: Ryzen 7 5700G 5.3 GHz turbo, DDR4, NVMe Gen 4, 400+ players capable. 50+ Tbps Unhittable DDoS. Delhi from ₹399/mo." />
        <meta name="twitter:image" content="https://creepercastle.cloud/og-images/ryzen9-hosting.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Delhi" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/plans/performance-vps" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white relative overflow-hidden">
        {/* Premium background with golden/orange particles */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 bg-scene-img"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/95 via-navy/85 to-amber-900/20"></div>
          
          {/* Premium golden particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, ${i % 3 === 0 ? 'rgba(251, 191, 36, 0.4)' : i % 3 === 1 ? 'rgba(249, 115, 22, 0.4)' : 'rgba(234, 179, 8, 0.4)'} 0%, transparent 70%)`,
              }}
              initial={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.6,
              }}
              animate={{
                y: ["-10%", "110%"],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 12 + 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 8,
              }}
            />
          ))}
        </div>
        
        <Navbar />
        
        <main className="flex-grow relative z-10">
          {/* Ultra Premium Hero Section */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-600/15 to-amber-500/10 animate-pulse-slow" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-4 relative z-10"
            >
              <div className="text-center max-w-6xl mx-auto">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-6"
                >
                  <Badge className="bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 text-white px-8 py-3 text-xl border-none shadow-2xl shadow-amber-500/50 animate-pulse">
                    <Crown className="w-5 h-5 mr-2 inline" />
                    Premium Performance VPS Hosting
                  </Badge>
                </motion.div>
                
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                    AMD Ryzen 7 5700G
                  </span>
                  <br />
                  <span className="text-white">Ultimate VPS Power</span>
                </h1>
                
                <p className="text-xl md:text-3xl text-gray-200 mb-10 leading-relaxed max-w-4xl mx-auto font-medium">
                  Unleash the <span className="text-amber-400 font-bold">monstrous power of Ryzen 7 5700G</span> - 8 cores of pure dominance with 
                  <span className="text-orange-400 font-bold"> blazing 5.3 GHz turbo boost</span>. Built on revolutionary 
                  <span className="text-amber-400 font-bold"> Zen 3 architecture</span> with 
                  <span className="text-orange-400 font-bold"> high-performance DDR4 RAM</span> and
                  <span className="text-amber-400 font-bold"> NVMe Gen 4 SSD</span>. 
                  <span className="text-green-400 font-bold block mt-4"> Handles 400+ Minecraft players effortlessly</span>. 
                  Protected by our <span className="text-cyan-400 font-bold">Unhittable 50+ Tbps DDoS shield</span> - India's most premium hosting solution.
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  <div className="bg-gradient-to-r from-amber-500/30 to-orange-600/30 backdrop-blur-sm border-2 border-amber-500/60 rounded-xl px-8 py-5 shadow-2xl shadow-amber-500/30">
                    <div className="text-4xl font-bold text-amber-400">5.3 GHz</div>
                    <div className="text-base text-gray-200 font-medium">Turbo Boost</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500/30 to-red-600/30 backdrop-blur-sm border-2 border-orange-500/60 rounded-xl px-8 py-5 shadow-2xl shadow-orange-500/30">
                    <div className="text-4xl font-bold text-orange-400">DDR4</div>
                    <div className="text-base text-gray-200 font-medium">High-Speed RAM</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/30 to-emerald-600/30 backdrop-blur-sm border-2 border-green-500/60 rounded-xl px-8 py-5 shadow-2xl shadow-green-500/30">
                    <div className="text-4xl font-bold text-green-400">400+</div>
                    <div className="text-base text-gray-200 font-medium">Players Ready</div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500/30 to-blue-600/30 backdrop-blur-sm border-2 border-cyan-500/60 rounded-xl px-8 py-5 shadow-2xl shadow-cyan-500/30">
                    <div className="text-4xl font-bold text-cyan-400">50+ Tbps</div>
                    <div className="text-base text-gray-200 font-medium">DDoS Shield</div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-10 py-7 text-xl font-bold shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/70 transition-all duration-300 hover:scale-110 border-2 border-amber-400/50"
                  asChild
                >
                  <a href="#plans">
                    <Rocket className="w-6 h-6 mr-3" />
                    View Premium Plans
                  </a>
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Premium Features Grid */}
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                  Why <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Ryzen 7 5700G</span> Dominates
                </h2>
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
                  5.3 GHz turbo beast engineered for extreme Minecraft performance - handles 400+ players like a champion
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
                    <Card className="bg-gradient-to-br from-navy-dark/90 to-black/90 border-2 border-amber-500/40 hover:border-amber-500/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 h-full backdrop-blur-sm group">
                      <CardHeader>
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          {feature.icon}
                        </div>
                        <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 leading-relaxed text-base">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Premium Pricing Plans */}
          <section id="plans" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                  Choose Your <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Premium Tier</span>
                </h2>
                <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                  Ryzen 7 5700G performance VPS plans with DDR5 RAM and Gen 4 NVMe storage
                </p>
              </motion.div>

              {plansLoading && <div className="text-center py-16 text-gray-400">Loading plans…</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {performanceVPSPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={plan.highlighted ? "lg:scale-105" : ""}
                  >
                    <Card className={`relative h-full flex flex-col backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
                      plan.badge === "Ultimate"
                        ? "bg-gradient-to-br from-amber-500/20 via-orange-600/20 to-amber-500/20 border-4 border-amber-500 hover:border-amber-400 shadow-2xl shadow-amber-500/40"
                        : plan.highlighted
                        ? "bg-gradient-to-br from-orange-500/15 via-amber-600/15 to-orange-500/15 border-2 border-orange-500/60 hover:border-orange-400 shadow-xl shadow-orange-500/30"
                        : "bg-gradient-to-br from-navy-dark/80 to-black/80 border border-amber-500/30 hover:border-amber-500/60 shadow-lg shadow-amber-500/20"
                    }`}>
                      {plan.badge === "Ultimate" && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 text-sm font-bold shadow-xl border-2 border-amber-400 animate-pulse">
                            <Crown className="w-4 h-4 mr-1 inline" />
                            ULTIMATE POWER
                          </Badge>
                        </div>
                      )}
                      {plan.highlighted && plan.badge !== "Ultimate" && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-1 text-xs font-bold shadow-lg">
                            <Sparkles className="w-3 h-3 mr-1 inline" />
                            POPULAR
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        {plan.badge === "Ultimate" && (
                          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <Crown className="w-20 h-20 text-amber-400 drop-shadow-2xl" />
                          </div>
                        )}
                        <CardTitle className={`text-3xl mb-3 ${plan.badge === "Ultimate" ? 'text-amber-400 mt-2' : 'text-white mt-6'}`}>{plan.name}</CardTitle>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className={`text-5xl font-bold ${plan.badge === "Ultimate" ? 'bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent' : 'text-amber-400'}`}>
                            {plan.isCustom ? 'Custom' : `₹${plan.price}`}
                          </span>
                          <span className="text-gray-400 text-lg">/month</span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-grow">
                        <div className="space-y-3">
                          {Object.entries(plan.specs).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-3 p-2 rounded-lg hover:bg-amber-500/10 transition-colors">
                              <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.badge === "Ultimate" ? 'text-amber-400' : 'text-green-400'}`} />
                              <span className="text-gray-200 text-base">{value}</span>
                            </div>
                          ))}
                        </div>

                        <Button 
                          className={`w-full mt-6 text-base font-bold py-6 transition-all duration-300 hover:scale-105 ${
                            plan.badge === "Ultimate"
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-2xl shadow-amber-500/50 border-2 border-amber-400/50"
                              : plan.highlighted
                              ? "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-xl shadow-orange-500/40"
                              : "bg-gradient-to-r from-amber-500/20 to-orange-600/20 hover:from-amber-500/30 hover:to-orange-600/30 text-white border border-amber-500/50 hover:border-amber-400"
                          }`}
                          onClick={() => {
                            const id = `perf-vps-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
                            addItem({ id, name: plan.name, category: "Performance VPS", price: plan.price ?? 0 });
                          }}
                          disabled={items.some(i => i.id === `perf-vps-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)}
                        >
                          {items.some(i => i.id === `perf-vps-${plan.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`) ? (
                            <><ShoppingCart className="w-5 h-5 mr-2" /> In Cart</>
                          ) : (
                            <><ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart</>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Premium CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 text-center"
              >
                <Card className="bg-gradient-to-br from-amber-500/20 via-orange-600/20 to-amber-500/20 border-2 border-amber-500/60 backdrop-blur-sm shadow-2xl shadow-amber-500/30 max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-4xl text-white mb-4">
                      Need a <span className="text-amber-400">Custom Premium VPS</span>?
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-300">
                      Contact us on Discord for enterprise-grade custom configurations tailored to your exact requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-bold shadow-xl hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <a href="https://discord.gg/creepercastle" target="_blank" rel="noopener noreferrer">
                        💬 Contact Sales Team
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PerformanceVPSPlans;
