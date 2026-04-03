export const BRAND = {
  company: "Jal Neeti Technologies Pvt Ltd",
  companyHindi: "जल नीति टेक्नोलॉजीज",
  product: "JalBox™",
  foundation: "Jal Neeti Foundation",
  innovation: "BioNeer™",
  tagline: "जल की नीति, जीवन की रीति",
  taglineEnglish: "Clean Water. Everywhere.",
  diasporaCta: "Bring Jal Neeti to Your Village",
  domain: "jalneeti.in",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/about", label: "About" },
  { href: "/invest", label: "Invest" },
  { href: "/transparency", label: "Transparency" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const JALBOX_MODELS = [
  {
    model: "JalBox 10",
    capacity: "10 KLD",
    serves: "50–100 people",
    ideal: "Small housing societies, schools, clinics",
  },
  {
    model: "JalBox 25",
    capacity: "25 KLD",
    serves: "150–300 people",
    ideal: "Medium societies, Gram Panchayats",
  },
  {
    model: "JalBox 50",
    capacity: "50 KLD",
    serves: "300–600 people",
    ideal: "Large societies, small towns, commercial",
  },
  {
    model: "JalBox Flexi",
    capacity: "Custom",
    serves: "Modular scale",
    ideal: "Industrial, large municipalities",
  },
] as const;

export const BIONEER_COMPONENTS = [
  {
    name: "Coconut Coir Bio-Media",
    icon: "leaf",
    description: "Kerala-sourced coconut coir provides ideal surface area for biofilm growth, replacing expensive imported plastic MBBR media.",
    source: "Kerala, India",
  },
  {
    name: "Terracotta Diffusers",
    icon: "wind",
    description: "Handcrafted terracotta diffusers from Khurja replace EPDM membrane diffusers at a fraction of the cost with comparable efficiency.",
    source: "Khurja, UP, India",
  },
  {
    name: "Ferrocement Tanks",
    icon: "box",
    description: "Wire-mesh reinforced cement tanks replace expensive SS304 steel, reducing cost by 60% while lasting 25+ years.",
    source: "Local fabrication",
  },
  {
    name: "Vetiver Wetlands",
    icon: "sprout",
    description: "Vetiver grass polishing systems replace UV+carbon filters. Zero electricity, zero consumables, plus vetiver oil as revenue.",
    source: "Tamil Nadu, India",
  },
  {
    name: "ESP32 IoT Gateway",
    icon: "wifi",
    description: "Low-cost Indian-assembled IoT gateway with solar power backup monitors all parameters in real-time via MQTT.",
    source: "Bengaluru, India",
  },
  {
    name: "Solar Power System",
    icon: "sun",
    description: "Indian-manufactured solar panels and lithium batteries enable fully off-grid operation for rural deployments.",
    source: "Made in India",
  },
] as const;

export const TREATMENT_STAGES = [
  { stage: "1", name: "Bar Screen", description: "Removes large solids and debris" },
  { stage: "2", name: "Anaerobic Baffled Reactor", description: "Primary treatment & biogas generation" },
  { stage: "3", name: "MBBR with Coir Media", description: "Biological oxygen demand removal" },
  { stage: "4", name: "Clarifier", description: "Settles remaining suspended solids" },
  { stage: "5", name: "Vetiver Wetland / UV", description: "Final polishing to reuse standards" },
  { stage: "6", name: "Treated Water Storage", description: "Ready for landscaping, flushing, irrigation" },
] as const;

export const SDG_GOALS = [
  { number: 6, title: "Clean Water & Sanitation", relevance: "Core mission — decentralized sewage treatment" },
  { number: 7, title: "Affordable & Clean Energy", relevance: "Solar-powered, off-grid capable STPs" },
  { number: 8, title: "Decent Work", relevance: "Jal Mitra rural employment program" },
  { number: 9, title: "Industry & Innovation", relevance: "BioNeer™ indigenous material innovation" },
  { number: 11, title: "Sustainable Cities", relevance: "Urban and peri-urban water recycling" },
  { number: 13, title: "Climate Action", relevance: "Methane capture, carbon credit generation" },
] as const;

export const CONTACT_CATEGORIES = [
  { value: "investment", label: "Investment Enquiry" },
  { value: "partnership", label: "Partnership / CSR" },
  { value: "customer", label: "I Need a JalBox" },
  { value: "careers", label: "Career Opportunities" },
  { value: "media", label: "Media / Press" },
  { value: "general", label: "General Enquiry" },
] as const;
