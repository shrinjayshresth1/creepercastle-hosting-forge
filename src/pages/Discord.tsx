
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Headphones, Gift } from "lucide-react";
import { motion } from "framer-motion";

const Discord = () => {
  const discordStructuredData = {
    "@context": "https://schema.org",
    "@type": "OnlineGroup",
    "name": "CreeperCastle Discord Community",
    "description": "Join 3000+ Minecraft enthusiasts in India's largest gaming community",
    "url": "https://creepercastle.cloud/discord",
    "sameAs": "https://discord.gg/RuQ9neH56S",
    "memberOf": {
      "@type": "Organization",
      "name": "CreeperCastle.cloud"
    },
    "hasMember": {
      "@type": "QuantitativeValue",
      "value": "3000",
      "unitText": "members"
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
        "name": "Discord Community",
        "item": "https://creepercastle.cloud/discord"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>CreeperCastle Discord | 10,000+ Members | 24/7 Support & Giveaways</title>
        <meta 
          name="description" 
          content="🎮 Join 10,000+ Minecraft enthusiasts! Get 24/7 instant support, exclusive giveaways, server tips, community events. India's largest Minecraft hosting Discord!"
        />
        <meta
          name="keywords"
          content="creepercastle discord server, minecraft hosting discord india, minecraft community discord india, 24/7 discord support, minecraft discord server india, server owner discord, minecraft giveaways discord, indian minecraft community, hosting support discord, free minecraft discord, active minecraft discord india"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/discord" />
        <meta property="og:title" content="Join CreeperCastle Discord - India's Largest Minecraft Community" />
        <meta property="og:description" content="Connect with 3000+ Minecraft players, get instant support, join events, and be part of India's most active gaming community." />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        <meta property="og:image:alt" content="CreeperCastle Discord Community" />
        <meta property="og:site_name" content="CreeperCastle.cloud" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join CreeperCastle Discord Community 🎮" />
        <meta name="twitter:description" content="India's largest Minecraft Discord with 3000+ active members. Join events, get support, and make gaming friends!" />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/discord" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(discordStructuredData)}
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
                  Join India's Largest <span className="text-creeper">Minecraft Discord</span>
                </motion.h1>
                <motion.h2 
                  className="text-2xl md:text-3xl text-gray-300 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  3000+ Active Players • Daily Events • Instant Support
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Connect with thousands of Minecraft enthusiasts, participate in daily events, get instant technical support, and find your perfect gaming squad.
                </motion.p>
              </div>

              {/* Main Discord Card */}
              <div className="max-w-4xl mx-auto mb-12">
                <Card className="bg-navy-light border-2 border-creeper">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-6 p-4 bg-creeper/20 rounded-full w-fit">
                      <MessageCircle className="h-12 w-12 text-creeper" />
                    </div>
                    <CardTitle className="text-3xl mb-4">
                      India's Largest <span className="text-creeper">Minecraft Community</span>
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-300">
                      Join thousands of players, get instant support, and be part of something amazing!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <div className="text-3xl font-bold text-creeper mb-2">3000+</div>
                        <div className="text-gray-400">Active Members</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-creeper mb-2">24/7</div>
                        <div className="text-gray-400">Online Support</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-creeper mb-2">Daily</div>
                        <div className="text-gray-400">Events & Giveaways</div>
                      </div>
                    </div>
                    <Button size="lg" className="minecraft-btn text-lg px-8 py-6" asChild>
                      <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
                        Join Discord Community
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Card className="bg-navy-light border-gray-800 hover:border-creeper transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-creeper/20 rounded-full w-fit">
                      <Headphones className="h-6 w-6 text-creeper" />
                    </div>
                    <CardTitle className="text-lg">Instant Support</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-400 text-sm">
                      Get help from our expert team and community members within minutes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-navy-light border-gray-800 hover:border-creeper transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-creeper/20 rounded-full w-fit">
                      <Users className="h-6 w-6 text-creeper" />
                    </div>
                    <CardTitle className="text-lg">Find Gaming Partners</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-400 text-sm">
                      Connect with players near you and form lasting gaming friendships.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-navy-light border-gray-800 hover:border-creeper transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-creeper/20 rounded-full w-fit">
                      <Gift className="h-6 w-6 text-creeper" />
                    </div>
                    <CardTitle className="text-lg">Events & Giveaways</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-400 text-sm">
                      Participate in regular events and win amazing prizes and exclusive giveaways.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-navy-light border-gray-800 hover:border-creeper transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-creeper/20 rounded-full w-fit">
                      <MessageCircle className="h-6 w-6 text-creeper" />
                    </div>
                    <CardTitle className="text-lg">Active Community</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-400 text-sm">
                      Join discussions, share builds, and stay updated with the latest Minecraft news.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Why Join Section */}
              <div className="mt-16 max-w-4xl mx-auto">
                <Card className="bg-navy-light border-gray-800">
                  <CardHeader>
                    <h3 className="text-2xl text-center mb-6">
                      Why Join Our <span className="text-creeper">Gaming Community</span>?
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-creeper rounded-full mt-2"></div>
                        <div>
                          <h3 className="font-semibold">Fastest Support Response Times</h3>
                          <p className="text-gray-400 text-sm">Get help with server issues, setup, or questions typically within 5 minutes.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-creeper rounded-full mt-2"></div>
                        <div>
                          <h3 className="font-semibold">Exclusive Member Benefits</h3>
                          <p className="text-gray-400 text-sm">Access to member-only channels, early feature previews, and special discounts.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-creeper rounded-full mt-2"></div>
                        <div>
                          <h3 className="font-semibold">Regular Events & Tournaments</h3>
                          <p className="text-gray-400 text-sm">Participate in building competitions, PvP tournaments, and community challenges.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-creeper rounded-full mt-2"></div>
                        <div>
                          <h3 className="font-semibold">Learn from Experts</h3>
                          <p className="text-gray-400 text-sm">Get tips on server management, plugin development, and advanced Minecraft techniques.</p>
                        </div>
                      </div>
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

export default Discord;
