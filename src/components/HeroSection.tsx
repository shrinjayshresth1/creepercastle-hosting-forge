
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Server, Shield, Cpu, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const textVariants = [
  "Gaming",
  "SMP",
  "Discord Bot",
  "FPS",
  "Battle Royale",
  "Roleplay",
  "Modded",
  "Survival",
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  // Single interval swap â€” far cheaper than 10 simultaneous framer-motion animations
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % textVariants.length), 2200);
    return () => clearInterval(id);
  }, []);
  
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Static dot-grid â€” zero paint cost */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      {/* Ambient glow blobs â€” opacity-only animation, compositor-safe */}
      <div
        className="absolute top-1/4 -left-40 w-[480px] h-[480px] rounded-full bg-creeper/10 blur-3xl animate-glow pointer-events-none"
      />
      <div
        className="absolute -bottom-20 right-0 w-[360px] h-[360px] rounded-full bg-violet-600/8 blur-3xl animate-glow animation-delay-2000 pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left â€” copy */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-creeper/30 bg-creeper/10 text-creeper text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Zap size={13} />
              India's #1 Game Server Hosting
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Unleash Your{" "}
              {/* AnimatePresence swap â€” single active element instead of 8 concurrent */}
              <span className="relative inline-flex h-[1.2em] items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textVariants[index]}
                    className="text-creeper"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {textVariants[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
              {" "}Server
            </h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Premium hosting with instant setup, high-performance hardware, and
              unmatched DDoS protection. Your gaming adventure starts here.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <Button className="game-btn rounded-lg text-base py-5 px-7 font-semibold" asChild>
                <a href="https://billing.creepercastle.in" target="_blank" rel="noopener noreferrer">
                  View Plans
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/[0.06] rounded-lg text-base py-5 px-7"
                asChild
              >
                <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </a>
              </Button>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              className="mt-10 flex flex-wrap gap-2.5 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: <Server size={13} />, label: "Instant Setup" },
                { icon: <Shield size={13} />, label: "CreeperShieldâ„¢ DDoS" },
                { icon: <Cpu size={13} />,    label: "NVMe Storage" },
                { icon: <Zap size={13} />,    label: "99.9% Uptime" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-sm text-gray-300 bg-white/[0.05] border border-white/[0.08] px-3 py-1.5 rounded-full"
                >
                  <span className="text-creeper">{icon}</span>
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right â€” logo */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Glow â€” opacity-only, no repaint */}
              <div
                className="absolute inset-0 scale-[1.4] rounded-full blur-3xl bg-creeper/20 animate-glow"
              />
              <motion.img
                src="/lovable-uploads/570fb7e4-e36a-4bb5-a9ef-be9e7ae57b15.png"
                alt="CreeperCastle.cloud"
                className="relative w-4/5 mx-auto rounded-2xl drop-shadow-2xl will-change-transform"
                animate={{ y: [-8, 8] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border border-white/[0.07] divide-x divide-y md:divide-y-0 divide-white/[0.07]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          {[
            { value: "1000+", label: "Active Servers" },
            { value: "99.9%", label: "Uptime" },
            { value: "17 Tbps", label: "DDoS Protection" },
            { value: "24/7",   label: "Support" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-5 px-4 bg-white/[0.025]">
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-sm text-gray-400 mt-0.5">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
