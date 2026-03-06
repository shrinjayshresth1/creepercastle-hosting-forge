
import { Button } from "@/components/ui/button";
import { Check, HelpCircle, Server, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const plans = [
  {
    name: "VPS",
    price: 3300,
    ram: "Starting from 32GB",
    cpu: "Starting from 10 vCores",
    storage: "300GB NVMe SSD",
    location: "India, Delhi",
    ddos: "CreeperShield Protection",
    plugins: "Unlimited",
    features: [],
    mostPopular: false,
    link: "/plans/vps",
    icon: <Server className="h-10 w-10 text-creeper mb-2" />
  },
  {
    name: "Minecraft Performance Servers",
    price: 99,
    ram: "Starting from 2GB",
    cpu: "Starting from 1 vCore",
    storage: "30GB NVMe SSD",
    location: "India, Delhi",
    ddos: "DDoS Protection powered by CreeperShield",
    plugins: "Unlimited",
    features: ["One-Click Plugin Installer", "Custom Domain", "99.9% Uptime", "24/7 Support", "Modpack Support"],
    mostPopular: true,
    link: "/plans/performance",
    icon: <Server className="h-10 w-10 text-creeper mb-2" />
  },
  {
    name: "CreeperShield",
    price: 84,
    ram: "Bandwidth starting from 1 Tbps",
    cpu: "Special features like IP Filteration",
    storage: "Less than 1.1ms resolving time",
    location: "For more info scroll down",
    ddos: "Advanced Protection",
    plugins: "Unlimited",
    features: ["Layer 3 & 4 Protection", "Minecraft Server Protection", "Zero Downtime Protection", "Automatic Filtering", "24/7 Security Team"],
    mostPopular: false,
    link: "/plans/creepershield",
    icon: <Shield className="h-10 w-10 text-creeper mb-2" />
  }
];

const PricingSection = () => {
  return (
    <section className="py-20 bg-navy-dark" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent <span className="text-creeper">Pricing</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your game server needs. All plans include our CreeperShield DDoS protection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-navy-light rounded-xl overflow-hidden transition-all hover:transform hover:-translate-y-2 ${plan.mostPopular ? 'border-2 border-creeper relative' : 'border border-gray-800'}`}>
              {plan.mostPopular && (
                <div className="absolute top-0 right-0 bg-creeper text-navy-dark font-medium text-sm px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 text-center">
                {plan.icon}
                <h3 className="font-bold text-2xl mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <Button className="w-full minecraft-btn rounded-md" asChild>
                  <a href={plan.link}>Get Started</a>
                </Button>
              </div>
              
              <div className="border-t border-gray-800 p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="font-medium mr-2">{plan.name === "CreeperShield" ? "Bandwidth:" : "RAM:"}</span>
                    <span className="ml-auto text-creeper">{plan.ram}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium mr-2">{plan.name === "CreeperShield" ? "Features:" : "CPU:"}</span>
                    <span className="ml-auto text-creeper">{plan.cpu}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium mr-2">{plan.name === "CreeperShield" ? "Response Time:" : "Storage:"}</span>
                    <span className="ml-auto text-creeper">{plan.storage}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium mr-2">Location:</span>
                    <span className="ml-auto text-creeper">{plan.location}</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex items-center font-medium mr-2">
                      <span>DDoS Protection:</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64">CreeperShield protects your server from DDoS attacks, keeping it online even during attacks.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="ml-auto text-creeper">{plan.ddos}</span>
                  </li>
                </ul>
              </div>
              
              {(plan.features.length > 0) && (
                <div className="border-t border-gray-800 p-6">
                  <h4 className="font-medium mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-creeper mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Need a custom solution? We've got you covered.</p>
          <Button variant="outline" className="border-creeper text-creeper hover:bg-creeper/10 rounded-md" asChild>
            <a href="https://discord.gg/RuQ9neH56S" target="_blank" rel="noopener noreferrer">
              Contact Us for Custom Plans
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
