import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, ThumbsUp, MessageSquare, Youtube, Users, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

const Links = () => {
  const reviewLinks = [
    {
      name: "Trustpilot Reviews",
      url: "https://www.trustpilot.com/review/creepercastle.cloud",
      description: "Read authentic customer reviews on Trustpilot",
      icon: <Star className="h-6 w-6" />,
      type: "review",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    },
    {
      name: "Google Business Profile",
      url: "https://share.google/z9njZNHT1uT4u8UYO",
      description: "Check our Google reviews and business information",
      icon: <ThumbsUp className="h-6 w-6" />,
      type: "review",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/30"
    }
  ];

  const socialLinks = [
    {
      name: "YouTube Channel",
      url: "https://www.youtube.com/channel/UCFHCS5QydQQhpazC2h9BHdA",
      description: "Subscribe for tutorials, server updates, and community content",
      icon: <Youtube className="h-6 w-6" />,
      type: "social",
      color: "bg-red-500/10 text-red-400 border-red-500/30"
    },
    {
      name: "Discord Community",
      url: "https://discord.gg/RuQ9neH56S",
      description: "Join our Discord for 24/7 support and community discussions",
      icon: <MessageSquare className="h-6 w-6" />,
      type: "social",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    }
  ];

  const dashboardLinks = [
    {
      name: "Game Panel",
      url: "https://control.creepercastle.in",
      description: "Access your game server control panel and manage all your servers",
      icon: <Gamepad2 className="h-6 w-6" />,
      type: "dashboard",
      color: "bg-creeper/20 text-creeper border-creeper/30"
    }
  ];

  const linksStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "CreeperCastle Official Links - Reviews & Social Media",
    "description": "Find all official CreeperCastle links including customer reviews on Trustpilot & Google, plus our social media channels for support and community updates.",
    "url": "https://creepercastle.cloud/links",
    "mainEntity": {
      "@type": "Organization",
      "name": "CreeperCastle.cloud",
      "url": "https://creepercastle.cloud",
      "sameAs": [
        "https://www.trustpilot.com/review/creepercastle.cloud",
        "https://share.google/z9njZNHT1uT4u8UYO",
        "https://www.youtube.com/channel/UCFHCS5QydQQhpazC2h9BHdA",
        "https://discord.gg/RuQ9neH56S",
        "https://control.creepercastle.in"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      }
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
        "name": "Official Links",
        "item": "https://creepercastle.cloud/links"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>CreeperCastle Official Links | Reviews, Discord, YouTube, Support</title>
        <meta 
          name="description" 
          content="All official CreeperCastle links: Trustpilot reviews (4.8★), Discord support, YouTube tutorials, control panels, status page. Join 10,000+ satisfied customers!"
        />
        <meta
          name="keywords"
          content="creepercastle official links, creepercastle reviews, trustpilot creepercastle, google reviews minecraft hosting india, creepercastle discord server, creepercastle youtube channel, minecraft hosting support india, creepercastle control panel, status page creepercastle, customer testimonials india, minecraft hosting feedback, best minecraft host reviews india"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creepercastle.cloud/links" />
        <meta property="og:title" content="CreeperCastle Official Links - Reviews & Social Media" />
        <meta property="og:description" content="Find all official CreeperCastle links including customer reviews, social media channels, and community platforms." />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/394abece-307b-48f2-8c38-4d2123607648.png" />
        <meta property="og:image:alt" content="CreeperCastle Official Links and Reviews" />
        <meta property="og:site_name" content="CreeperCastle.cloud" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CreeperCastle Official Links - Reviews & Social 🔗" />
        <meta name="twitter:description" content="Find all our official links including customer reviews, Discord community, YouTube channel, and more!" />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/394abece-307b-48f2-8c38-4d2123607648.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CreeperCastle.cloud" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Mumbai, Delhi" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://creepercastle.cloud/links" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(linksStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-navy text-white relative">
        {/* Enhanced background with underwater Minecraft scene */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 bg-scene-img"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 via-navy/80 to-navy-light/70"></div>
          
          {/* Animated particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-creeper/20 rounded-full"
              initial={{
                width: Math.random() * 8 + 3,
                height: Math.random() * 8 + 3,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.6,
              }}
              animate={{
                y: ["-10%", "110%"],
                opacity: [0, 0.8, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 25,
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
                <Badge variant="secondary" className="mb-6 text-sm bg-creeper/20 text-creeper border-creeper/30">
                  Official Links & Reviews
                </Badge>
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-creeper to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Connect with <span className="text-creeper">CreeperCastle</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Find all our official links, read genuine customer reviews, and join our thriving community across all platforms
                </motion.p>
              </div>

              {/* Dashboard Links Section */}
              <motion.section 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Dashboard <span className="text-creeper">Access</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Manage your services through our intuitive control panels
                  </p>
                </div>

                <div className="flex justify-center max-w-4xl mx-auto">
                  {dashboardLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="w-full md:w-1/2"
                    >
                      <Card className="bg-navy-light/50 border-2 backdrop-blur-sm h-full group hover:border-opacity-100 transition-all duration-300 hover:scale-105 shadow-lg" style={{ borderColor: link.color.split(' ')[2].replace('border-', '') }}>
                        <CardHeader className="text-center">
                          <div className={`mx-auto mb-4 p-4 rounded-full w-fit ${link.color} group-hover:scale-110 transition-transform duration-300`}>
                            {link.icon}
                          </div>
                          <CardTitle className="text-2xl text-white">{link.name}</CardTitle>
                          <CardDescription className="text-gray-300 mt-2">
                            {link.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                          <Button className="minecraft-btn w-full group bg-creeper hover:bg-creeper/90 text-navy-dark font-bold" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                              Access Dashboard
                              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Customer Reviews Section */}
              <motion.section 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Customer <span className="text-creeper">Reviews</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Read authentic reviews from our satisfied customers and see why they choose CreeperCastle
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {reviewLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="bg-navy-light/50 border-gray-700 backdrop-blur-sm h-full group hover:bg-navy-light/70 transition-all duration-300 hover:scale-105">
                        <CardHeader className="text-center">
                          <div className={`mx-auto mb-4 p-4 rounded-full w-fit ${link.color} group-hover:scale-110 transition-transform duration-300`}>
                            {link.icon}
                          </div>
                          <CardTitle className="text-2xl text-white">{link.name}</CardTitle>
                          <CardDescription className="text-gray-300 mt-2">
                            {link.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                          <Button className="minecraft-btn w-full group" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                              View Reviews
                              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Social Media Section */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Social <span className="text-creeper">Media</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Follow us on social media for updates, tutorials, and community engagement
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {socialLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    >
                      <Card className="bg-navy-light/50 border-gray-700 backdrop-blur-sm h-full group hover:bg-navy-light/70 transition-all duration-300 hover:scale-105">
                        <CardHeader className="text-center">
                          <div className={`mx-auto mb-4 p-4 rounded-full w-fit ${link.color} group-hover:scale-110 transition-transform duration-300`}>
                            {link.icon}
                          </div>
                          <CardTitle className="text-2xl text-white">{link.name}</CardTitle>
                          <CardDescription className="text-gray-300 mt-2">
                            {link.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                          <Button className="minecraft-btn w-full group" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                              {link.name.includes('Discord') ? 'Join Server' : link.name.includes('YouTube') ? 'Subscribe' : 'Follow Us'}
                              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Community Stats Section */}
              <motion.section 
                className="mt-20 bg-gradient-to-r from-creeper/10 to-creeper-light/10 rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Join Our <span className="text-creeper">Community</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Be part of thousands of satisfied customers who trust CreeperCastle for their Minecraft hosting needs
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold text-creeper">1000+</div>
                    <div className="text-gray-300">Active Servers</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold text-creeper">5000+</div>
                    <div className="text-gray-300">Happy Customers</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold text-creeper">24/7</div>
                    <div className="text-gray-300">Support Available</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold text-creeper">99.9%</div>
                    <div className="text-gray-300">Uptime</div>
                  </div>
                </div>
              </motion.section>

              {/* CTA Section */}
              <section className="mt-16 text-center">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    Ready to Start Your <span className="text-creeper">Minecraft Journey</span>?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of satisfied customers and experience the best Minecraft hosting in India.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="minecraft-btn px-8 py-3" asChild>
                      <a href="/plans/minecraft">
                        View Hosting Plans
                      </a>
                    </Button>
                    <Button className="minecraft-btn px-8 py-3 bg-purple-600 hover:bg-purple-700" asChild>
                      <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
                        Join Discord
                      </a>
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Links;