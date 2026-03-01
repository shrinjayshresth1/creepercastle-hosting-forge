import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const founders = [
    {
      name: "Ahaan Gupta",
      role: "CEO / Founder",
      avatar: "/lovable-uploads/founder-ahaan.png",
      bio: "Passionate about creating exceptional gaming experiences and leading CreeperCastle's vision for the future of Minecraft hosting.",
    },
    {
      name: "Yaswanth",
      role: "Lead Management / Co-Founder",
      avatar: "/lovable-uploads/founder-yaswanth.png", 
      bio: "Driving operational excellence and ensuring our community receives world-class support and management services.",
    }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community First",
      description: "Every decision we make is guided by what's best for our gaming community."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Obsessed",
      description: "We're relentless in our pursuit of lightning-fast, lag-free gaming experiences."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Reliability Guaranteed",
      description: "Your servers deserve unwavering uptime and rock-solid security protection."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Support that Cares",
      description: "Real humans providing real help when you need it most."
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-navy text-white relative">
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
        <Helmet>
          <title>About CreeperCastle | Minecraft Hosting India</title>
          <meta 
            name="description" 
            content="Learn about CreeperCastle, India's Minecraft hosting company run by passionate founders delivering fast, secure and reliable servers for 10,000+ players."
          />
          <meta name="keywords" content="about creepercastle, minecraft hosting india company, creepercastle founders, indian minecraft hosting, creepercastle story" />
          
          {/* Open Graph */}
          <meta property="og:title" content="About CreeperCastle - Meet the Founders of India's #1 Minecraft Host" />
          <meta property="og:description" content="Meet Ahaan Gupta & Yaswanth, the passionate founders revolutionizing Minecraft hosting in India with enterprise-grade infrastructure and community-first values." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://creepercastle.cloud/about" />
          <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
          <meta property="og:locale" content="en_IN" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="About CreeperCastle - Meet Our Founders 👥" />
          <meta name="twitter:description" content="Discover the story behind India's premier Minecraft hosting company and meet the founders revolutionizing gaming infrastructure." />
          <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
          
          {/* Additional SEO */}
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
          <link rel="canonical" href="https://creepercastle.cloud/about" />
          
          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About CreeperCastle",
              "description": "Learn about CreeperCastle founders and our mission to provide exceptional Minecraft hosting services",
              "mainEntity": {
                "@type": "Organization",
                "name": "CreeperCastle",
                "url": "https://creepercastle.cloud",
                "founder": [
                  {
                    "@type": "Person",
                    "name": "Ahaan Gupta",
                    "jobTitle": "CEO / Founder"
                  },
                  {
                    "@type": "Person", 
                    "name": "Yaswanth",
                    "jobTitle": "Lead Management / Co-Founder"
                  }
                ]
              }
            })}
          </script>
        </Helmet>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 z-10">
          <div className="absolute inset-0 bg-[url('/creeper-pattern.png')] opacity-5"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm bg-creeper/20 text-creeper border-creeper/30">
              About CreeperCastle
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Meet the <span className="text-creeper">Founders</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The passionate minds behind CreeperCastle's mission to revolutionize Minecraft hosting
            </p>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="text-creeper">Leadership</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Meet the visionaries who are transforming the Minecraft hosting landscape
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {founders.map((founder, index) => (
                <Card key={index} className="bg-navy-light/50 border-gray-700 backdrop-blur-sm group hover:bg-navy-light/70 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-creeper/20 to-creeper/40 flex items-center justify-center text-4xl font-bold text-creeper border-2 border-creeper/30 group-hover:border-creeper/50 transition-colors duration-300">
                        {founder.name.split(' ').map(name => name[0]).join('')}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                    <Badge variant="outline" className="mb-4 text-creeper border-creeper/30 bg-creeper/10">
                      {founder.role}
                    </Badge>
                    <p className="text-gray-300 leading-relaxed">
                      {founder.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Message from Founders */}
        <section className="py-20 px-4 bg-navy-dark/50">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-navy-light/30 to-navy/30 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    A Message from the <span className="text-creeper">Founders</span>
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-creeper to-creeper-light mx-auto rounded-full"></div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-300">
                  <p className="text-lg leading-relaxed mb-6">
                    <strong className="text-white">Hey there,</strong>
                  </p>
                  
                  <p className="text-lg leading-relaxed mb-6">
                    We're the team behind CreeperCastle, and we wanted to personally welcome you.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    CreeperCastle started as a small passion project — born from late nights gaming, frustrating server lag, and the dream of building something better. We were tired of overpriced hosting, poor support, and unreliable performance. So we rolled up our sleeves and decided to create the kind of platform we always wished existed.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    Today, CreeperCastle is more than just a hosting service. It's a growing community of creators, players, and server owners who deserve tools that actually work and support that actually listens. We've invested in high-end hardware, clean interfaces, strong DDoS protection, and a lightning-fast setup process — all so that you can focus on what really matters: playing and building without limits.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    We've poured our time, effort, and honestly, a lot of sleepless nights into making sure CreeperCastle runs as smooth as possible. And we're not done. We're always improving, always upgrading — guided by your feedback, your reviews, and your suggestions.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    So whether you're running a cozy survival server with friends or launching a full-blown community with mods and mini-games, we're here to back you up.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    Thanks for being part of this journey. We can't wait to see what you build.
                  </p>

                  <div className="text-right mt-8">
                    <p className="text-lg font-medium text-white">
                      With appreciation,<br />
                      <span className="text-creeper">– The CreeperCastle Founders</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="text-creeper">Values</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The principles that guide everything we do at CreeperCastle
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-navy-light/30 border-gray-700 backdrop-blur-sm text-center group hover:bg-navy-light/50 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="text-creeper mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-creeper/10 to-creeper-light/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Join Our <span className="text-creeper">Community</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the difference that passion, dedication, and community-first values make in Minecraft hosting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-creeper text-creeper font-semibold rounded-lg hover:bg-creeper hover:text-navy-dark transition-colors duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;