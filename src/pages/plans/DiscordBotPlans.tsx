import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Bot } from "lucide-react";
import { motion } from "framer-motion";

const discordBotPlans = [
  {
    name: "Coder",
    price: 22,
    specs: {
      ram: "512MB",
      cpu: "100%",
      storage: "2GB SSD",
      ports: "2 Additional Ports",
      backups: "2 Backup Limit",
      databases: "2 Databases"
    },
    features: [
      "24/7 Bot Hosting",
      "SSH Access",
      "Node.js & Python Support",
      "Instant Setup",
      "99.9% Uptime",
      "Community Support"
    ],
    buyLink: "https://billing.creepercastle.in/products/discord-bot-hosting/coder"
  },
  {
    name: "Developer",
    price: 49,
    specs: {
      ram: "1GB",
      cpu: "200%",
      storage: "4GB SSD",
      ports: "4 Additional Ports",
      backups: "4 Backup Limit",
      databases: "4 Databases"
    },
    features: [
      "24/7 Bot Hosting",
      "SSH Access",
      "Node.js & Python Support",
      "Instant Setup",
      "99.9% Uptime",
      "Priority Support",
      "Advanced Monitoring",
      "Custom Modules"
    ],
    highlighted: true,
    buyLink: "https://billing.creepercastle.in/products/discord-bot-hosting/developer"
  }
];

const DiscordBotPlans = () => {
  return (
    <>
      <Helmet>
        <title>Best Discord Bot Hosting India 2025 | 24/7 Uptime | Node.js Python | ₹22 | CreeperCastle</title>
        <meta 
          name="description" 
          content="🤖 #1 Discord bot hosting India! 24/7 online bots from ₹22/mo. Node.js, Python, Java, discord.js, discord.py support. SSH/SFTP, MySQL, instant setup. 99.9% uptime guaranteed."
        />
        <meta
          name="keywords"
          content="best discord bot hosting india 2025, cheap discord bot hosting, 24/7 discord bot online india, node.js bot hosting, python discord bot hosting india, discord.js hosting, discord.py hosting, java discord bot hosting, music bot hosting india, discord bot server india, ssh discord hosting, sftp discord bot, mysql discord bot india, always online bot hosting, reliable discord hosting mumbai, premium discord bot hosting, affordable bot hosting india, creepercastle discord hosting"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/plans/discord-bot" />
        <meta property="og:title" content="Discord Bot Hosting India | 24/7 Uptime | Node.js, Python | CreeperCastle" />
        <meta property="og:description" content="🤖 Professional Discord bot hosting from ₹22/month. 24/7 uptime, Node.js, Python, Java support. SSH, SFTP, MySQL included. Instant setup!" />
        <meta property="og:image" content="https://creepercastle.cloud/og-images/discord-bot-hosting.jpg" />
        <meta property="og:image:alt" content="Discord Bot Hosting by CreeperCastle" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CreeperCastle" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Discord Bot Hosting India 🤖 24/7 Uptime" />
        <meta name="twitter:description" content="Professional Discord bot hosting from ₹22/mo. Node.js, Python, Java. 24/7 uptime guaranteed." />
        <meta name="twitter:image" content="https://creepercastle.cloud/og-images/discord-bot-hosting.jpg" />
        
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="revisit-after" content="3 days" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/plans/discord-bot" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white relative">
        {/* Enhanced background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 bg-scene-img"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 via-navy/80 to-navy-light/70"></div>
          
          {/* Animated particles */}
          {Array.from({ length: 8 }).map((_, i) => (
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
                  Discord Bot <span className="text-creeper">Hosting Plans</span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Reliable hosting for your Discord bots with 24/7 uptime and easy deployment
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {discordBotPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <Card 
                      className={`bg-navy-light ${plan.highlighted ? 'border-2 border-creeper relative' : 'border border-gray-800'} hover:transform hover:-translate-y-2 transition-all duration-300 h-full`}
                    >
                      {plan.highlighted && (
                        <div className="absolute top-0 right-0 bg-creeper text-navy-dark font-medium text-sm px-4 py-1 rounded-bl-lg">
                          Most Popular
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4">
                          <Bot className="h-12 w-12 text-creeper" />
                        </div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="flex items-baseline justify-center mt-2">
                          <span className="text-3xl font-bold text-creeper">₹{plan.price}</span>
                          <span className="text-lg text-gray-400">/month</span>
                        </div>
                        <CardDescription className="text-gray-400 mt-2">
                          Perfect for Discord bot hosting with reliable uptime
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-4">
                          <div className="border-t border-gray-700 pt-4">
                            <ul className="space-y-2">
                              <li className="flex justify-between">
                                <span className="text-gray-400">RAM</span>
                                <span className="font-medium text-creeper">{plan.specs.ram}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">CPU</span>
                                <span className="font-medium text-creeper">{plan.specs.cpu}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">Storage</span>
                                <span className="font-medium text-creeper">{plan.specs.storage}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">Additional Ports</span>
                                <span className="font-medium text-creeper">{plan.specs.ports}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">Backup Limit</span>
                                <span className="font-medium text-creeper">{plan.specs.backups}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-400">Databases</span>
                                <span className="font-medium text-creeper">{plan.specs.databases}</span>
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
                          
                          <Button className="w-full minecraft-btn mt-6" asChild>
                            <a 
                              href={plan.buyLink}
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Buy Now - ₹{plan.price}/month
                            </a>
                          </Button>
                        </div>
                      </CardContent>
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

export default DiscordBotPlans;