
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-navy flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <img 
          src="/lovable-uploads/394abece-307b-48f2-8c38-4d2123607648.png" 
          alt="CreeperCastle.cloud" 
          className="w-32 h-32 animate-pulse-slow"
        />
        <div className="absolute inset-0 scale-150 rounded-full blur-3xl bg-creeper/20 animate-pulse"></div>
      </motion.div>
      
      <motion.h1 
        className="text-3xl font-bold mt-8 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        CreeperCastle<span className="text-creeper">.cloud</span>
      </motion.h1>
      
      <motion.div 
        className="mt-8 relative w-64 h-2 bg-navy-light rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "16rem" }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-creeper-dark to-creeper rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 1.5 }}
        ></motion.div>
      </motion.div>
      
      <motion.p 
        className="text-gray-400 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Preparing your gaming experience...
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
