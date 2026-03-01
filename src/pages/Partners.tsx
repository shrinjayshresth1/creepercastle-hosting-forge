import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crown, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

// Import partner images
import firemcImg from "@/assets/partners/firemc.png";
import psd1Img from "@/assets/partners/psd1.png";
import steelwingImg from "@/assets/partners/steelwing.png";
import senpaispiderImg from "@/assets/partners/senpaispider.png";
import bassuImg from "@/assets/partners/bassu.png";
import deopboiImg from "@/assets/partners/deopboi.png";
import mcaddonImg from "@/assets/partners/mcaddon.png";
import donvisionImg from "@/assets/partners/donvision.png";
import livinglegendImg from "@/assets/partners/livinglegend.png";
import glumegamerImg from "@/assets/partners/glumegamer.png";
import warnetworkImg from "@/assets/partners/warnetwork.png";
import flowpvpImg from "@/assets/partners/flowpvp.png";
import indianmcImg from "@/assets/partners/indianmc.png";
import indiamcImg from "@/assets/partners/indiamc.png";
import servicemediaImg from "@/assets/partners/servicemedia.png";
import bubblemcImg from "@/assets/partners/bubblemc.png";
import teenplaysImg from "@/assets/partners/teenplays.jpg";
import amongusindiaImg from "@/assets/partners/amongusindia.png";
import betterdarkImg from "@/assets/partners/betterdark.png";
import robbietonImg from "@/assets/partners/robbieton.png";
import pubixdImg from "@/assets/partners/pubixd.png";
import mrlapisImg from "@/assets/partners/mrlapis.png";

const partners = [
  { name: "FireMc", image: firemcImg, category: "Content Creator" },
  { name: "PSD1", image: psd1Img, category: "Gaming Community" },
  { name: "Steel Wing", image: steelwingImg, category: "Content Creator" },
  { name: "SenpaiSpider", image: senpaispiderImg, category: "YouTuber" },
  { name: "Bassu Plays", image: bassuImg, category: "Gaming Influencer" },
  { name: "Deop boi", image: deopboiImg, category: "Content Creator" },
  { name: "Mc Addon", image: mcaddonImg, category: "Minecraft Community" },
  { name: "Don Vision", image: donvisionImg, category: "Content Creator" },
  { name: "Living Legend", image: livinglegendImg, category: "Gaming Creator" },
  { name: "GlumeGamer", image: glumegamerImg, category: "YouTuber" },
  { name: "Warnetwork", image: warnetworkImg, category: "Gaming Network" },
  { name: "Flowpvp", image: flowpvpImg, category: "PVP Community" },
  { name: "Indianmc", image: indianmcImg, category: "Gaming Community" },
  { name: "Indiamc.net", image: indiamcImg, category: "Minecraft Community" },
  { name: "Service Media", image: servicemediaImg, category: "Media Partner" },
  { name: "Bubble MC", image: bubblemcImg, category: "Minecraft Server" },
  { name: "Teen Plays", image: teenplaysImg, category: "Gaming YouTuber" },
  { name: "Among us India", image: amongusindiaImg, category: "Gaming Community" },
  { name: "Better Dark", image: betterdarkImg, category: "Content Creator" },
  { name: "Robbie Ton", image: robbietonImg, category: "Content Creator" },
  { name: "PubiXD", image: pubixdImg, category: "Gaming Creator" },
  { name: "MrLapis", image: mrlapisImg, category: "Minecraft YouTuber" },
];

const Partners = () => {
  const partnersStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "CreeperCastle Partners - 23+ Trusted Minecraft Content Creators & YouTubers India",
    "description": "Meet our 23+ trusted partners including FireMc, PSD1, SenpaiSpider, Bassu Plays and top Indian Minecraft content creators who trust CreeperCastle for their Minecraft hosting needs. Join India's #1 Minecraft community.",
    "url": "https://creepercastle.cloud/partners",
    "isPartOf": {
      "@type": "WebSite",
      "name": "CreeperCastle",
      "url": "https://creepercastle.in"
    },
    "about": {
      "@type": "ItemList",
      "itemListElement": partners.map((partner, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Organization",
          "name": partner.name,
          "description": `${partner.category} partnered with CreeperCastle`
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>CreeperCastle Partners 2025 | Trusted by 23+ Top Minecraft Creators & YouTubers India</title>
        <meta name="description" content="Meet CreeperCastle's 23+ trusted partners: FireMc, PSD1, SenpaiSpider, Bassu Plays, Steel Wing, GlumeGamer, Teen Plays, MrLapis & more top Indian Minecraft content creators. Join India's #1 Minecraft hosting community powered by enterprise infrastructure with 99.9% uptime & 50 Tbps DDoS protection." />
        <meta name="keywords" content="CreeperCastle partners, Minecraft YouTubers India, FireMc, PSD1, SenpaiSpider, Bassu Plays, Steel Wing, GlumeGamer, Teen Plays, MrLapis, Robbie Ton, PubiXD, Triggered Boy, Indian Minecraft creators, Minecraft content creators India, gaming influencers India, Minecraft server partners, gaming community India, YouTuber Minecraft hosting, content creator server hosting, influencer gaming hosting, Indian gaming community, Minecraft network partners, gaming creators partnership" />
        <link rel="canonical" href="https://creepercastle.cloud/partners" />
        
        {/* Open Graph */}
        <meta property="og:title" content="CreeperCastle Partners - Trusted by 23+ Top Minecraft Creators India" />
        <meta property="og:description" content="Meet our 23+ trusted partners: FireMc, PSD1, SenpaiSpider, Bassu Plays & top Indian Minecraft YouTubers powering their servers with CreeperCastle." />
        <meta property="og:url" content="https://creepercastle.cloud/partners" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        <meta property="og:image:alt" content="CreeperCastle Partners - Top Minecraft Creators" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="CreeperCastle" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CreeperCastle Partners 🤝 | 23+ Top Minecraft Creators India" />
        <meta name="twitter:description" content="Meet our trusted partners including FireMc, PSD1, SenpaiSpider, Bassu Plays & top Indian Minecraft content creators." />
        <meta name="twitter:image" content="https://creepercastle.cloud/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="CreeperCastle" />
        <meta name="geo.region" content="IN" />
        
        <script type="application/ld+json">
          {JSON.stringify(partnersStructuredData)}
        </script>
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
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-creeper/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-grid-animate opacity-20" />
          
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Crown className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Trusted by the Best</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
            >
              Our <span className="text-primary">Partners</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            >
              Powering the best Minecraft content creators and communities across India. 
              Join the ranks of top creators who trust CreeperCastle for unbeatable performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-lg font-semibold">{partners.length}+ Partners</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="w-5 h-5 text-creeper" />
                <span className="text-lg font-semibold">Top Rated Hosting</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="group relative"
                >
                  <div className="relative bg-card border border-border rounded-lg p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-2">
                    {/* Partner Image */}
                    <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={partner.image}
                        alt={`${partner.name} - CreeperCastle Partner`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>

                    {/* Partner Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {partner.category}
                      </p>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-r from-primary/5 to-primary/5 rounded-2xl p-12 text-center overflow-hidden border border-primary/20"
            >
              <div className="absolute inset-0 bg-grid-animate opacity-10" />
              
              <div className="relative z-10">
                <Crown className="w-16 h-16 mx-auto mb-6 text-primary animate-float" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Want to Become a Partner?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join our growing community of content creators and gaming communities. 
                  Get premium hosting benefits and grow your audience with CreeperCastle.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                >
                  <Users className="w-5 h-5" />
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Partners;
