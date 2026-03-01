import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, MapPin, Zap, Shield, Cpu, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const MumbaiRestockPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds on page load
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('mumbaiRestockPopupSeen');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('mumbaiRestockPopupSeen', 'true');
  };

  const handleCheckoutPlans = () => {
    localStorage.setItem('mumbaiRestockPopupSeen', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[10000] flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 100, rotateX: -15 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 100, rotateX: -15 }}
          transition={{ 
            type: "spring", 
            duration: 0.8, 
            bounce: 0.3 
          }}
          className="relative max-w-lg w-full"
        >
          <Card className="bg-gradient-to-br from-navy-dark via-navy-dark to-navy-light border-2 border-creeper shadow-2xl shadow-creeper/30 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 bg-black/20 rounded-full p-2 backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-creeper/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
            
            <CardHeader className="text-center pb-4 pt-8 relative z-10">
              <motion.div 
                className="mx-auto mb-4 p-4 bg-gradient-to-r from-creeper/30 to-blue-500/30 rounded-full w-fit backdrop-blur-sm border border-creeper/50"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(80, 200, 120, 0.3)",
                    "0 0 40px rgba(80, 200, 120, 0.6)",
                    "0 0 20px rgba(80, 200, 120, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <MapPin className="h-14 w-14 text-creeper" />
              </motion.div>
              
              <motion.div 
                className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-green-500/40 mx-auto"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="h-4 w-4" />
                RESTOCKED NOW!
              </motion.div>
              
              <CardTitle className="text-2xl md:text-3xl mb-3 bg-gradient-to-r from-white via-creeper to-blue-400 bg-clip-text text-transparent font-bold">
                🚀 Mumbai Location is Back!
              </CardTitle>
              <CardDescription className="text-base text-gray-300 leading-relaxed">
                High-performance servers are now available in Mumbai with blazing fast 
                <span className="text-creeper font-semibold"> 3.2GHz CPUs</span> and ultra-low ping!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center space-y-6 relative z-10">
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="bg-creeper/10 p-4 rounded-lg border border-creeper/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Cpu className="h-6 w-6 text-creeper mx-auto mb-2" />
                  <div className="font-bold text-creeper text-sm">3.2GHz CPU</div>
                  <div className="text-gray-300 text-xs">High Performance</div>
                </motion.div>
                
                <motion.div 
                  className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Wifi className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="font-bold text-blue-400 text-sm">Ultra Low Ping</div>
                  <div className="text-gray-300 text-xs">Mumbai Location</div>
                </motion.div>
                
                <motion.div 
                  className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="font-bold text-purple-400 text-sm">DDoS Protected</div>
                  <div className="text-gray-300 text-xs">CreeperShield</div>
                </motion.div>
                
                <motion.div 
                  className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Zap className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                  <div className="font-bold text-orange-400 text-sm">Instant Setup</div>
                  <div className="text-gray-300 text-xs">30 Seconds</div>
                </motion.div>
              </div>
              
              {/* Call to Action */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="lg" 
                    className="minecraft-btn w-full text-lg py-6 group relative overflow-hidden" 
                    asChild
                    onClick={handleCheckoutPlans}
                  >
                    <Link to="/plans/minecraft" className="flex items-center justify-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="h-5 w-5" />
                      </motion.div>
                      Checkout Mumbai Plans
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClose}
                    className="w-full text-gray-300 border-gray-600 hover:bg-creeper/10 hover:border-creeper/40 hover:text-creeper backdrop-blur-sm"
                  >
                    Maybe Later
                  </Button>
                </motion.div>
              </div>
              
              <motion.p 
                className="text-xs text-gray-500 mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Limited slots available • Premium hardware • Instant deployment
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MumbaiRestockPopup;