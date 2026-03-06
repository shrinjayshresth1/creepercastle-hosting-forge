/**
 * Seed script — populates the products collection from the original hardcoded
 * frontend plan arrays.
 *
 * Usage (from project root):
 *   cd server
 *   npx ts-node -e "require('dotenv/config')" src/scripts/seedProducts.ts
 *
 * Or after compiling:
 *   node dist/scripts/seedProducts.js
 *
 * Safe to re-run: uses upsert (matching on slug) so no duplicates.
 */

import "dotenv/config";
import mongoose from "mongoose";
import { Product } from "../models/Product";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set");
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// Data extracted from frontend plan arrays
// ─────────────────────────────────────────────────────────────────────────────

const products = [

  // ── Minecraft Hosting ─────────────────────────────────────────────────────
  {
    slug: "minecraft-redstone-power",
    category: "minecraft",
    name: "Redstone Power Plan",
    price: 99,
    highlighted: false,
    order: 1,
    specs: { ram: "2GB", cpu: "100% CPU", storage: "10GB SSD", additionalPorts: "2 Additional Ports", databaseSpace: "2 Database Space", backupsLimit: "2 Backups Limit", ddosProtection: "Basic Protection" },
    features: ["Instant Setup", "All Minecraft Versions", "24/7 Support", "Automatic Backups", "One-Click Plugin Installer", "Custom Domain", "99.9% Uptime", "SFTP Access"],
    locations: ["India, Mumbai", "India, Delhi"],
  },
  {
    slug: "minecraft-diamond-core",
    category: "minecraft",
    name: "Diamond Core Plan",
    price: 249,
    highlighted: false,
    order: 2,
    specs: { ram: "4GB", cpu: "100% CPU", storage: "40GB SSD", additionalPorts: "4 Additional Ports", databaseSpace: "4 Database Space", backupsLimit: "4 Backups Limit", ddosProtection: "Standard Protection" },
    features: ["Instant Setup", "All Minecraft Versions", "24/7 Support", "Automatic Backups", "One-Click Plugin Installer", "Custom Domain", "99.9% Uptime", "SFTP Access", "Free Subdomain"],
    locations: ["India, Mumbai", "India, Delhi"],
  },
  {
    slug: "minecraft-nether-storm",
    category: "minecraft",
    name: "Nether Storm Plan",
    price: 372,
    highlighted: true,
    badge: "Most Popular",
    order: 3,
    specs: { ram: "6GB", cpu: "200% CPU", storage: "60GB SSD", additionalPorts: "6 Additional Ports", databaseSpace: "6 Database Space", backupsLimit: "6 Backups Limit", ddosProtection: "Standard Protection" },
    features: ["Instant Setup", "All Minecraft Versions", "24/7 Priority Support", "2x Daily Backups", "One-Click Plugin Installer", "Custom Domain", "99.9% Uptime", "Full Modpack Support", "Free Subdomain", "SFTP Access"],
    locations: ["India, Mumbai", "India, Delhi"],
  },
  {
    slug: "minecraft-end-storm",
    category: "minecraft",
    name: "End Storm Plan",
    price: 499,
    highlighted: false,
    order: 4,
    specs: { ram: "8GB", cpu: "250% CPU", storage: "80GB SSD", additionalPorts: "8 Additional Ports", databaseSpace: "8 Database Space", backupsLimit: "8 Backups Limit", ddosProtection: "Advanced Protection" },
    features: ["Instant Setup", "All Minecraft Versions", "24/7 Priority Support", "3x Daily Backups", "One-Click Plugin Installer", "Custom Domain", "99.9% Uptime", "Full Modpack Support", "Free Subdomain", "Dedicated Resources", "SFTP Access"],
    locations: ["India, Mumbai", "India, Delhi"],
  },
  {
    slug: "minecraft-wither-storm",
    category: "minecraft",
    name: "Wither Storm Plan",
    price: 582,
    highlighted: false,
    order: 5,
    specs: { ram: "10GB", cpu: "300% CPU", storage: "100GB SSD", additionalPorts: "10 Additional Ports", databaseSpace: "10 Database Space", backupsLimit: "10 Backups Limit", ddosProtection: "Advanced Protection" },
    features: ["Instant Setup", "All Minecraft Versions", "24/7 Priority Support", "3x Daily Backups", "One-Click Plugin Installer", "Custom Domain", "99.9% Uptime", "Full Modpack Support", "Free Subdomain", "Dedicated Resources", "SFTP Access"],
    locations: ["India, Mumbai", "India, Delhi"],
  },
  {
    slug: "minecraft-dragon-buff",
    category: "minecraft",
    name: "Dragon Buff Plan",
    price: 672,
    highlighted: false,
    order: 6,
    specs: { ram: "12GB", cpu: "350% CPU", storage: "120GB SSD", additionalPorts: "12 Additional Ports", databaseSpace: "12 Database Space", backupsLimit: "12 Backups Limit", ddosProtection: "Premium Protection" },
    features: ["Instant Setup", "All Minecraft Versions", "24/7 Priority Support", "4x Daily Backups", "One-Click Plugin Installer", "Custom Domain", "99.99% Uptime", "Full Modpack Support", "Free Subdomain", "Dedicated Resources", "SFTP Access", "Premium Support"],
    locations: ["India, Mumbai", "India, Delhi"],
  },
  {
    slug: "minecraft-custom",
    category: "minecraft",
    name: "Custom Plan",
    price: null,
    highlighted: false,
    isCustom: true,
    order: 7,
    specs: { ram: "∞ GB", cpu: "∞ CPU", storage: "∞ SSD", additionalPorts: "Unlimited Ports", databaseSpace: "Unlimited Database Space", backupsLimit: "Unlimited Backups", ddosProtection: "Ultimate Protection" },
    features: ["Instant Setup", "All Minecraft Versions", "24/7 VIP Support", "Unlimited Daily Backups", "One-Click Plugin Installer", "Custom Domain", "99.999% Uptime", "Full Modpack Support", "Free Subdomain", "Dedicated Resources", "SFTP Access", "VIP Support", "Custom Development", "Custom Mods", "Custom Plugins"],
    locations: ["India, Mumbai", "India, Delhi"],
  },

  // ── Performance Minecraft ─────────────────────────────────────────────────
  {
    slug: "performance-amberheart",
    category: "performance",
    name: "Amberheart",
    description: "Perfect for small communities",
    price: 299,
    highlighted: false,
    order: 1,
    specs: { ram: "3 GB", cpu: "Infinite", storage: "10 GB SSD", ports: "2 Additional Ports", databases: "2 Databases", backups: "2 Backups", location: "Mumbai, India", ddos: "Unhittable DDoS Protection" },
    features: [],
    locations: ["Mumbai, India"],
  },
  {
    slug: "performance-obsidian-crest",
    category: "performance",
    name: "Obsidian Crest",
    description: "Ideal for growing servers",
    price: 532,
    highlighted: true,
    badge: "Most Popular",
    order: 2,
    specs: { ram: "6 GB", cpu: "Infinite", storage: "20 GB SSD", ports: "4 Additional Ports", databases: "4 Databases", backups: "4 Backups", location: "Mumbai, India", ddos: "Unhittable DDoS Protection" },
    features: [],
    locations: ["Mumbai, India"],
  },
  {
    slug: "performance-dragon-forge",
    category: "performance",
    name: "Dragon Forge",
    description: "Built for large communities",
    price: 987,
    highlighted: false,
    order: 3,
    specs: { ram: "12 GB", cpu: "Infinite", storage: "40 GB SSD", ports: "8 Additional Ports", databases: "8 Databases", backups: "8 Backups", location: "Mumbai, India", ddos: "Unhittable DDoS Protection" },
    features: [],
    locations: ["Mumbai, India"],
  },
  {
    slug: "performance-witherfall",
    category: "performance",
    name: "Witherfall",
    description: "Ultimate performance powerhouse",
    price: 1762,
    highlighted: false,
    order: 4,
    specs: { ram: "24 GB", cpu: "Infinite", storage: "80 GB SSD", ports: "16 Additional Ports", databases: "16 Databases", backups: "16 Backups", location: "Mumbai, India", ddos: "Unhittable DDoS Protection" },
    features: [],
    locations: ["Mumbai, India"],
  },

  // ── VPS Hosting ───────────────────────────────────────────────────────────
  {
    slug: "vps-creeper-mini",
    category: "vps",
    name: "Creeper Mini",
    price: 199,
    highlighted: false,
    order: 1,
    logoUrl: "/lovable-uploads/2e0d644d-6f7e-43e0-93e8-2efabb828007.png",
    specs: { cpu: "Intel Platinum 8168 💎", cores: "2V Cores 🚀", ram: "4 GB DDR4 ECC RAM 🪄", storage: "20 GB NVMe Storage🪄", network: "Upto 1Gbps network speed🛜", location: "India, Delhi🚩", ddos: "CreeperCastle DDoS Protection🛡️", mitigation: "17 Tbps Smart MITIGATION🛡️", rdns: "RDNS Facility Available✅" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "vps-knight",
    category: "vps",
    name: "CreeperCastle Knight",
    price: 399,
    highlighted: true,
    badge: "Most Popular",
    order: 2,
    logoUrl: "/lovable-uploads/92e056f5-c85f-4f06-9432-7c5ca32fe8b2.png",
    specs: { cpu: "Intel Platinum 8168 💎", cores: "4V Cores 🚀", ram: "8 GB DDR4 ECC RAM 🪄", storage: "40 GB NVMe Storage🪄", network: "Upto 1Gbps network speed🛜", location: "India, Delhi🚩", ddos: "CreeperCastle DDoS Protection🛡️", mitigation: "17 Tbps Smart MITIGATION🛡️", rdns: "RDNS Facility Available✅" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "vps-titan",
    category: "vps",
    name: "CreeperCastle Titan",
    price: 699,
    highlighted: false,
    order: 3,
    logoUrl: "/lovable-uploads/592d5824-5311-47bb-beb0-5aae9ff5c280.png",
    specs: { cpu: "Intel Platinum 8168 💎", cores: "6V Cores 🚀", ram: "16 GB DDR4 ECC RAM 🪄", storage: "60 GB NVMe Storage🪄", network: "Upto 1Gbps network speed🛜", location: "India, Delhi🚩", ddos: "CreeperCastle DDoS Protection🛡️", mitigation: "17 Tbps Smart MITIGATION🛡️", rdns: "RDNS Facility Available✅" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "vps-guardian",
    category: "vps",
    name: "CreeperCastle Guardian",
    price: 1199,
    highlighted: false,
    order: 4,
    logoUrl: "/lovable-uploads/102f77a4-d71f-456c-b542-1f98a55eb506.png",
    specs: { cpu: "Intel Platinum 8168 💎", cores: "10V Cores 🚀", ram: "32 GB DDR4 ECC RAM 🪄", storage: "100 GB NVMe Storage🪄", network: "Upto 1Gbps network speed🛜", location: "India, Delhi🚩", ddos: "CreeperCastle DDoS Protection🛡️", mitigation: "17 Tbps Smart MITIGATION🛡️", rdns: "RDNS Facility Available✅" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "vps-overlord",
    category: "vps",
    name: "CreeperCastle Overlord",
    price: 2099,
    highlighted: false,
    order: 5,
    logoUrl: "/lovable-uploads/c78b0c32-1019-4b21-a48b-1581857db978.png",
    specs: { cpu: "Intel Platinum 8168 💎", cores: "20V Cores 🚀", ram: "64 GB DDR4 ECC RAM 🪄", storage: "200 GB NVMe Storage🪄", network: "Upto 1Gbps network speed🛜", location: "India, Delhi🚩", ddos: "CreeperCastle DDoS Protection🛡️", mitigation: "17 Tbps Smart MITIGATION🛡️", rdns: "RDNS Facility Available✅" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "vps-custom",
    category: "vps",
    name: "Custom VPS Plan",
    price: null,
    highlighted: false,
    isCustom: true,
    order: 6,
    logoUrl: "/lovable-uploads/a5ede7d4-e1bf-4925-84dd-4b075648dc11.png",
    specs: { cpu: "Intel Platinum 8168 (Custom) 💎", cores: "Custom Cores 🚀", ram: "Custom RAM Configuration 🪄", storage: "Flexible Storage Options 🪄", network: "Dedicated Bandwidth 🛜", location: "Multiple Locations Available 🚩", ddos: "Enterprise DDoS Protection 🛡️", mitigation: "Advanced Security 🛡️", rdns: "Full Management Support ✅" },
    features: [],
    locations: [],
  },

  // ── Performance VPS ───────────────────────────────────────────────────────
  {
    slug: "perf-vps-the-creeper",
    category: "performance-vps",
    name: "The Creeper",
    price: 399,
    highlighted: false,
    order: 1,
    logoUrl: "/lovable-uploads/2e0d644d-6f7e-43e0-93e8-2efabb828007.png",
    specs: { cpu: "AMD Ryzen 7 5700G 🔥", cores: "1V Core 🚀", ram: "4 GB DDR4 RAM 💎", storage: "30 GB NVMe SSD 🪄", bandwidth: "1 TB Bandwidth 🌐", location: "India, Delhi 🚩", ddos: "Unhittable DDoS Protection 🛡️", network: "Up to 1Gbps Network Speed 🛜" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "perf-vps-the-warden",
    category: "performance-vps",
    name: "The Warden",
    price: 799,
    highlighted: true,
    badge: "Most Popular",
    order: 2,
    logoUrl: "/lovable-uploads/92e056f5-c85f-4f06-9432-7c5ca32fe8b2.png",
    specs: { cpu: "AMD Ryzen 7 5700G 🔥", cores: "2V Cores 🚀", ram: "8 GB DDR4 RAM 💎", storage: "60 GB NVMe SSD 🪄", bandwidth: "2 TB Bandwidth 🌐", location: "India, Delhi 🚩", ddos: "Unhittable DDoS Protection 🛡️", network: "Up to 1Gbps Network Speed 🛜" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "perf-vps-wither-hulk",
    category: "performance-vps",
    name: "Wither Hulk",
    price: 1399,
    highlighted: false,
    order: 3,
    logoUrl: "/lovable-uploads/592d5824-5311-47bb-beb0-5aae9ff5c280.png",
    specs: { cpu: "AMD Ryzen 7 5700G 🔥", cores: "4V Cores 🚀", ram: "16 GB DDR4 RAM 💎", storage: "120 GB NVMe Gen 4 SSD 🪄", bandwidth: "4 TB Bandwidth 🌐", location: "India, Delhi 🚩", ddos: "Unhittable DDoS Protection 🛡️", network: "Up to 1Gbps Network Speed 🛜" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "perf-vps-ender-destroyer",
    category: "performance-vps",
    name: "Ender Destroyer",
    price: 2499,
    highlighted: false,
    order: 4,
    logoUrl: "/lovable-uploads/102f77a4-d71f-456c-b542-1f98a55eb506.png",
    specs: { cpu: "AMD Ryzen 7 5700G 🔥", cores: "6V Cores 🚀", ram: "32 GB DDR4 RAM 💎", storage: "240 GB NVMe SSD 🪄", bandwidth: "Unmetered Bandwidth ♾️", location: "India, Delhi 🚩", ddos: "Unhittable DDoS Protection 🛡️", network: "Up to 1Gbps Network Speed 🛜" },
    features: [],
    locations: ["India, Delhi"],
  },
  {
    slug: "perf-vps-king-of-the-castle",
    category: "performance-vps",
    name: "King of the Castle",
    price: 3899,
    highlighted: false,
    badge: "Ultimate",
    order: 5,
    logoUrl: "/lovable-uploads/c78b0c32-1019-4b21-a48b-1581857db978.png",
    specs: { cpu: "AMD Ryzen 7 5700G 🔥", cores: "8V Cores 🚀", ram: "64 GB DDR4 RAM 💎", storage: "400 GB NVMe SSD 🪄", bandwidth: "Unmetered Bandwidth ♾️", location: "India, Delhi 🚩", ddos: "Unhittable DDoS Protection 🛡️", network: "Up to 1Gbps Network Speed 🛜" },
    features: [],
    locations: ["India, Delhi"],
  },

  // ── Discord Bot Hosting ───────────────────────────────────────────────────
  {
    slug: "discord-bot-coder",
    category: "discord-bot",
    name: "Coder",
    price: 22,
    highlighted: false,
    order: 1,
    specs: { ram: "512MB", cpu: "100%", storage: "2GB SSD", ports: "2 Additional Ports", backups: "2 Backup Limit", databases: "2 Databases" },
    features: ["24/7 Bot Hosting", "SSH Access", "Node.js & Python Support", "Instant Setup", "99.9% Uptime", "Community Support"],
    locations: [],
  },
  {
    slug: "discord-bot-developer",
    category: "discord-bot",
    name: "Developer",
    price: 49,
    highlighted: true,
    badge: "Most Popular",
    order: 2,
    specs: { ram: "1GB", cpu: "200%", storage: "4GB SSD", ports: "4 Additional Ports", backups: "4 Backup Limit", databases: "4 Databases" },
    features: ["24/7 Bot Hosting", "SSH Access", "Node.js & Python Support", "Instant Setup", "99.9% Uptime", "Priority Support", "Advanced Monitoring", "Custom Modules"],
    locations: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB");

  let upserted = 0;
  for (const p of products) {
    await Product.findOneAndUpdate(
      { slug: p.slug },
      { $set: p },
      { upsert: true, new: true }
    );
    upserted++;
  }

  console.log(`✓ Seeded / updated ${upserted} products`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
