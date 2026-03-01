
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white pt-16 pb-8 border-t border-creeper/30 relative">
      {/* Add some theme-matching elements to the footer */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-creeper/30 to-transparent"></div>
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-creeper/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-creeper/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/394abece-307b-48f2-8c38-4d2123607648.png" 
                alt="CreeperCastle.cloud" 
                className="h-10 w-10"
              />
              <span className="font-bold text-xl ml-2">CreeperCastle<span className="text-creeper">.cloud</span></span>
            </div>
            <p className="text-gray-300 mb-4">
              Premium game server hosting with unbeatable performance, protection and support.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg border-l-2 border-creeper pl-3">Hosting</h3>
            <ul className="space-y-2">
              <li><a href="https://billing.creepercastle.in/index.php?rp=/store/minecraft-performance-servers" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-creeper transition-colors duration-300">Game Server Plans</a></li>
              <li><a href="https://billing.creepercastle.in/index.php?rp=/store/vps-hosting" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-creeper transition-colors duration-300">VPS Hosting</a></li>
              <li><a href="/plans/creepershield" className="text-gray-300 hover:text-creeper transition-colors duration-300">CreeperShield</a></li>
              <li><a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-creeper transition-colors duration-300">Enterprise Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg border-l-2 border-creeper pl-3">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-creeper transition-colors duration-300">About Us</Link></li>
              <li><Link to="/#locations" className="text-gray-300 hover:text-creeper transition-colors duration-300">Server Locations</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-creeper transition-colors duration-300">Contact Us</Link></li>
              <li><a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-creeper transition-colors duration-300">Join Our Team</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg border-l-2 border-creeper pl-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="https://billing.creepercastle.in/index.php?rp=/knowledgebase" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-creeper transition-colors duration-300">Knowledge Base</a></li>
              <li><a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-creeper transition-colors duration-300">Support Center</a></li>
              <li><a href="https://status.creepercastle.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-creeper transition-colors duration-300">Server Status</a></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-creeper transition-colors duration-300">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-creeper/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CreeperCastle.cloud. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://creepercastle-tos.edgeone.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:text-creeper transition-colors duration-300">Terms of Service</a>
            <a href="https://creepercastleprivacypolicy.edgeone.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:text-creeper transition-colors duration-300">Privacy Policy</a>
            <a href="https://billing.creepercastle.in/index.php?rp=/knowledgebase/4/Refund-Policy-.html" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:text-creeper transition-colors duration-300">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
