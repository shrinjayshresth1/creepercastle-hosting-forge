
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Minecraft Server Hosting Pricing India 2025 | Compare Plans from ₹99/mo | CreeperCastle</title>
        <meta 
          name="description" 
          content="💰 Transparent Minecraft hosting pricing in India starting from ₹99/month. Compare budget, standard, premium VPS plans with DDoS protection, NVMe SSD, instant setup. No hidden fees. Best value for Indian gamers with Mumbai & Delhi servers."
        />
        <meta 
          name="keywords" 
          content="minecraft hosting pricing india, minecraft server cost india, minecraft hosting plans india, cheap minecraft server india, minecraft hosting price comparison, affordable minecraft hosting india, minecraft server plans 2025, budget minecraft hosting, premium minecraft hosting plans, minecraft vps pricing india, minecraft server rental cost, minecraft hosting packages india, best minecraft hosting prices, minecraft hosting rates india, creepercastle pricing"
        />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/pricing" />
        <meta property="og:title" content="Minecraft Hosting Pricing - Plans from ₹99/mo | CreeperCastle" />
        <meta property="og:description" content="Transparent pricing for Minecraft hosting in India. Compare budget, standard, premium plans with DDoS protection from ₹99/month." />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Minecraft Hosting Pricing India 💰 | From ₹99/mo" />
        <meta name="twitter:description" content="Transparent pricing for Minecraft hosting. Budget to premium plans with DDoS protection from ₹99/month." />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://creepercastle.cloud/pricing" />
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
        
        <main className="flex-grow pt-16 relative z-10">
          {/* Hero Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Transparent <span className="text-creeper">Pricing</span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Simple, affordable pricing for Minecraft hosting with no hidden fees.
                  All plans include our Unhittable 50+ Tbps DDoS protection, 24/7 support, and instant setup.
                 </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button className="minecraft-btn text-lg py-6 px-8" asChild>
                    <a href="#pricing-options">View Pricing Options</a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Main Pricing Section */}
          <section id="pricing-options">
            <PricingSection />
          </section>
          
          {/* Pricing Comparison Table */}
          <section className="py-16 bg-navy-light/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Plan <span className="text-creeper">Comparison</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Compare our plans to find the perfect fit for your Minecraft server
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <Table className="w-full border-collapse">
                  <TableHeader className="bg-navy-dark">
                    <TableRow>
                      <TableHead className="text-left text-white font-bold">Feature</TableHead>
                      <TableHead className="text-center text-white font-bold">Budget Plan</TableHead>
                      <TableHead className="text-center text-white font-bold">Standard Plan</TableHead>
                      <TableHead className="text-center text-white font-bold">Premium Plan</TableHead>
                      <TableHead className="text-center text-white font-bold">VPS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">Price (monthly)</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">₹99</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">₹249</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">₹499</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">₹3300+</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">RAM</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">2GB</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">5GB</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">10GB</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">32GB+</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">CPU</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">1 vCore</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">2 vCores</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">4 vCores</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">10 vCores+</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">Storage</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">30GB NVMe</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">75GB NVMe</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">150GB NVMe</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">300GB+ NVMe</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">Player Slots</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">10</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">30</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Unlimited</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Unlimited</TableCell>
                    </TableRow>
                     <TableRow>
                       <TableCell className="border-t border-gray-800 font-medium">
                         <div className="flex items-center">
                           <span>DDoS Protection</span>
                           <TooltipProvider>
                             <Tooltip>
                               <TooltipTrigger>
                                 <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                               </TooltipTrigger>
                               <TooltipContent>
                                 <p className="w-64">Our Unhittable 50+ Tbps DDoS shield protects your server from attacks, keeping it online even during the toughest floods.</p>
                               </TooltipContent>
                             </Tooltip>
                           </TooltipProvider>
                         </div>
                       </TableCell>
                       <TableCell className="border-t border-gray-800 text-center">Basic</TableCell>
                       <TableCell className="border-t border-gray-800 text-center">Standard</TableCell>
                       <TableCell className="border-t border-gray-800 text-center">Advanced</TableCell>
                       <TableCell className="border-t border-gray-800 text-center">Unhittable Shield</TableCell>
                     </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">Plugins/Mods</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Unlimited</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Unlimited</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Unlimited</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Unlimited</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">One-Click Installer</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">
                        <Check className="h-5 w-5 text-creeper mx-auto" />
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center">
                        <Check className="h-5 w-5 text-creeper mx-auto" />
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center">
                        <Check className="h-5 w-5 text-creeper mx-auto" />
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Root Access</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">Custom Domain</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">
                        <Check className="h-5 w-5 text-creeper mx-auto" />
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center">
                        <Check className="h-5 w-5 text-creeper mx-auto" />
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center">
                        <Check className="h-5 w-5 text-creeper mx-auto" />
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center">
                        <Check className="h-5 w-5 text-creeper mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">Modpack Support</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Basic</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Full Support</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Full Support</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Full Support</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">Technical Support</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Standard</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Priority</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">24/7 Priority</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">24/7 Priority</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800 font-medium">Automatic Backups</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Daily</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">2x Daily</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">3x Daily</TableCell>
                      <TableCell className="border-t border-gray-800 text-center">Custom Schedule</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-t border-gray-800"></TableCell>
                      <TableCell className="border-t border-gray-800 text-center py-4">
                        <Button className="minecraft-btn" asChild>
                          <a href="https://billing.creepercastle.in/index.php?rp=/store/minecraft-performance-servers" target="_blank" rel="noopener noreferrer">
                            Get Started
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center py-4">
                        <Button className="minecraft-btn" asChild>
                          <a href="https://billing.creepercastle.in/index.php?rp=/store/minecraft-performance-servers" target="_blank" rel="noopener noreferrer">
                            Get Started
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center py-4">
                        <Button className="minecraft-btn" asChild>
                          <a href="https://billing.creepercastle.in/index.php?rp=/store/minecraft-performance-servers" target="_blank" rel="noopener noreferrer">
                            Get Started
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="border-t border-gray-800 text-center py-4">
                        <Button className="minecraft-btn" asChild>
                          <a href="https://billing.creepercastle.in/index.php?rp=/store/vps-hosting" target="_blank" rel="noopener noreferrer">
                            Get Started
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
          
          {/* Custom Plans Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-navy-light p-8 rounded-xl border border-gray-800">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Need a <span className="text-creeper">Custom Plan</span>?</h2>
                  <p className="text-lg text-gray-300">
                    Don't see a plan that fits your needs? We offer custom solutions tailored to your specific requirements.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-creeper mr-3 mt-1" />
                        <span>Dedicated hardware configurations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-creeper mr-3 mt-1" />
                        <span>Custom resource allocations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-creeper mr-3 mt-1" />
                        <span>Special plugin requirements</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-creeper mr-3 mt-1" />
                        <span>Large network solutions</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-creeper mr-3 mt-1" />
                        <span>Enhanced DDoS protection options</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center md:text-right">
                    <p className="text-lg mb-4">Contact our team to discuss your requirements</p>
                    <div className="space-y-4">
                      <Button className="minecraft-btn w-full md:w-auto" asChild>
                        <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
                          Join Our Discord
                        </a>
                      </Button>
                      <div className="block md:hidden"></div>
                      <Button className="w-full md:w-auto bg-transparent border border-creeper text-creeper hover:bg-creeper/10" asChild>
                        <a href="/contact">Contact Us</a>
                      </Button>
                    </div>
                  </div>
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

export default PricingPage;
