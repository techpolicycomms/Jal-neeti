export const BRAND = {
  company: "Jal Neeti Technologies Pvt Ltd",
  companyHindi: "जल नीति टेक्नोलॉजीज",
  product: "JalBox™",
  foundation: "Ameliore Foundation",
  foundationDesc: "Section 8 Company focused on education, environmental innovation, and sustainable development",
  innovation: "BioNeer™",
  tagline: "जल की नीति, जीवन की रीति",
  taglineEnglish: "Clean Water. Everywhere.",
  taglineMeaning: "Water Wisdom, Life's Way",
  diasporaCta: "Bring Clean Water to Your Village",
  waasTagline: "You don't buy a sewage plant. You subscribe to clean water.",
  domain: "jalneeti.in",
  founderName: "Rahul Jha",
  founderLinkedIn: "linkedin.com/in/r-jha",
  email: "rahul@jalneeti.in",
} as const;

export const NAV_LINKS: readonly { href: string; label: string; highlight?: boolean }[] = [
  { href: "/product", label: "Product" },
  { href: "/for-industry", label: "For Industry" },
  { href: "/government", label: "For Government" },
  { href: "/csr", label: "CSR Partnership", highlight: true },
  { href: "/impact-calculator", label: "Impact Calculator" },
  { href: "/invest", label: "Invest" },
  { href: "/transparency", label: "Transparency" },
  { href: "/challenge", label: "Challenge 2026" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const JALBOX_MODELS = [
  {
    model: "JalBox Micro",
    capacity: "5 KLD",
    serves: "50–100 people",
    ideal: "Schools, hospitals, highway rest areas, railway stations",
    enclosure: "Custom FRP/steel",
    dimensions: "2.5m × 1.5m × 2.0m",
    price: "₹3–5 lakh",
    highlight: false,
  },
  {
    model: "JalBox 10",
    capacity: "10 KLD",
    serves: "100–200 people",
    ideal: "Small societies, village clusters, construction sites",
    enclosure: "10-ft container",
    dimensions: "3.0m × 2.4m × 2.6m",
    price: "₹5–7 lakh",
    highlight: false,
  },
  {
    model: "JalBox 25",
    capacity: "25 KLD",
    serves: "200–500 people",
    ideal: "Medium societies, small towns, FSSM co-treatment nodes",
    enclosure: "20-ft ISO container",
    dimensions: "6.0m × 2.4m × 2.6m",
    price: "₹8–10 lakh",
    highlight: true,
  },
  {
    model: "JalBox 50",
    capacity: "50 KLD",
    serves: "500–1,000 people",
    ideal: "Large societies, industrial reuse, HAM subcontracting",
    enclosure: "40-ft ISO container",
    dimensions: "12.0m × 2.4m × 2.6m",
    price: "₹14–18 lakh",
    highlight: false,
  },
] as const;

export const BIONEER_COMPONENTS = [
  {
    imported: "PE plastic MBBR media",
    indian: "Coconut coir bio-media",
    source: "Kerala",
    saving: "87%",
    icon: "leaf",
    description:
      "Kerala-sourced coconut coir provides ideal surface area for biofilm growth, replacing expensive imported plastic MBBR media.",
  },
  {
    imported: "EPDM membrane diffusers",
    indian: "Terracotta disc diffusers",
    source: "Khurja, UP",
    saving: "82%",
    icon: "wind",
    description:
      "Handcrafted terracotta diffusers from Khurja replace EPDM membrane diffusers at a fraction of the cost with comparable efficiency.",
  },
  {
    imported: "Imported activated carbon",
    indian: "Coconut shell biochar",
    source: "Kerala",
    saving: "90%",
    icon: "flame",
    description:
      "Coconut shell biochar from the same Kerala supply chain as coir. Removes pharmaceuticals, heavy metals, and emerging contaminants. Regenerable using biogas from Stage 2.",
  },
  {
    imported: "UV + activated carbon",
    indian: "Vetiver constructed wetland",
    source: "Tamil Nadu",
    saving: "75%",
    icon: "sprout",
    description:
      "Vetiver grass polishing systems replace UV+carbon filters. Zero electricity, zero consumables, plus vetiver oil as revenue.",
  },
  {
    imported: "Siemens PLC (₹70,000)",
    indian: "ESP32 IoT gateway with edge ML (₹16,000)",
    source: "Indian PCB assembly",
    saving: "77%",
    icon: "wifi",
    description:
      "Low-cost Indian-assembled IoT gateway with edge ML inference monitors all parameters in real-time via MQTT. OTA firmware updates.",
  },
  {
    imported: "Chemical disinfection (chlorine/ozone)",
    indian: "Solar TiO₂ photocatalytic disinfection",
    source: "Indian TiO₂ coating",
    saving: "100%",
    icon: "sun",
    description:
      "TiO₂-coated plates under solar UV generate hydroxyl radicals for 93–100% pathogen removal. Zero electricity. Zero consumables. Zero chemical addition.",
  },
] as const;

export const TREATMENT_STAGES = [
  {
    stage: "1",
    name: "Screening & Equalization",
    description: "Motorized bar screen removes large solids. Equalization tank buffers flow variations.",
    bodIn: "200–300",
    bodOut: "200–300",
  },
  {
    stage: "2",
    name: "Anaerobic Baffled Reactor",
    description: "Primary treatment with biogas capture. Vertical baffles create multiple anaerobic zones. Biogas stored for energy recovery and biochar regeneration.",
    bodIn: "200–300",
    bodOut: "80–120",
  },
  {
    stage: "3",
    name: "MBBR with Coconut Coir Media",
    description: "Aerated biological treatment. Fine-bubble terracotta diffusers oxygenate water through coconut coir bio-media.",
    bodIn: "80–120",
    bodOut: "15–25",
  },
  {
    stage: "4",
    name: "Lamella Plate Clarifier",
    description: "Angled stainless steel plates settle remaining suspended solids efficiently.",
    bodIn: "15–25",
    bodOut: "8–12",
  },
  {
    stage: "5",
    name: "Coconut Shell Biochar Adsorption",
    description: "Biochar column removes pharmaceuticals, heavy metals, and emerging contaminants (84–93% organics, 89% nitrates). Regenerable using biogas from Stage 2.",
    bodIn: "8–12",
    bodOut: "3–5",
  },
  {
    stage: "6",
    name: "Vetiver Wetland / UV Polishing",
    description: "Final polishing and pathogen removal to CPCB 2025 reuse standards. Zero electricity for wetland option. TiO₂ solar photocatalytic disinfection available for compact models.",
    bodIn: "3–5",
    bodOut: "< 3",
  },
] as const;

export const CUSTOMER_SEGMENTS = [
  { name: "Housing Societies (RWAs)", icon: "building2" },
  { name: "Villages & Gram Panchayats", icon: "trees" },
  { name: "Schools & Hospitals", icon: "school" },
  { name: "Construction Sites", icon: "hardHat" },
  { name: "Industrial Water Reuse", icon: "factory" },
  { name: "Government (AMRUT/JJM)", icon: "landmark" },
  { name: "Highway & Railway Stations", icon: "trainFront" },
  { name: "Religious & Tourist Sites", icon: "church" },
] as const;

export const WAAS_REVENUE = [
  { source: "O&M Contract", range: "₹25–35K/month", description: "Monthly annuity for operations & maintenance" },
  { source: "Treated Water Sales", range: "₹5–20K/month", description: "Sold for landscaping, flushing, construction" },
  { source: "Biogas + Fertiliser", range: "₹3–8K/month", description: "Renewable energy and organic compost" },
  { source: "Government Annuity", range: "₹25–40K/month", description: "Under HAM contracts (if applicable)" },
] as const;

export const SDG_GOALS = [
  { number: 6, title: "Clean Water & Sanitation", relevance: "Core mission — decentralized sewage treatment" },
  { number: 9, title: "Industry & Innovation", relevance: "BioNeer™ indigenous material innovation" },
  { number: 11, title: "Sustainable Cities", relevance: "Urban and peri-urban water recycling" },
  { number: 12, title: "Responsible Consumption", relevance: "Circular economy — waste to resource" },
  { number: 13, title: "Climate Action", relevance: "Methane capture, carbon credit generation" },
  { number: 17, title: "Partnerships for Goals", relevance: "Government, diaspora, and NGO collaboration" },
] as const;

export const CONTACT_CATEGORIES = [
  { value: "investment", label: "Investment Enquiry" },
  { value: "partnership", label: "Partnership / CSR" },
  { value: "customer", label: "I Need a JalBox" },
  { value: "government", label: "Government Enquiry" },
  { value: "careers", label: "Career Opportunities" },
  { value: "media", label: "Media / Press" },
  { value: "general", label: "General Enquiry" },
] as const;

export const GOVT_SCHEMES = [
  {
    name: "AMRUT 2.0",
    fullName: "Atal Mission for Rejuvenation & Urban Transformation",
    budget: "₹2.87 Lakh Crore",
    relevance: "Sewerage & septage management component. JalBox qualifies under decentralized STP procurement.",
  },
  {
    name: "Jal Jeevan Mission",
    fullName: "Har Ghar Jal — Rural Water Supply",
    budget: "₹3.60 Lakh Crore",
    relevance: "In-village greywater management mandate. JalBox ideal for Gram Panchayat deployments.",
  },
  {
    name: "SBM 2.0",
    fullName: "Swachh Bharat Mission (Urban)",
    budget: "₹1.41 Lakh Crore",
    relevance: "ODF+ sustainability, faecal sludge management. JalBox with FSSM port is a turnkey solution.",
  },
  {
    name: "Namami Gange",
    fullName: "National Mission for Clean Ganga",
    budget: "₹20,000 Crore",
    relevance: "Decentralized STPs for Ganga basin towns. JalBox ideal for smaller drains and nallahs.",
  },
] as const;

export const CHALLENGE_TRACKS = [
  {
    id: "bio-treatment",
    title: "Track 1: Bio-Treatment Design",
    subtitle: "Design a sewage treatment process using only Indian natural materials",
    materials: "Coconut coir, rice husk, bamboo charcoal, terracotta, vetiver, jute, coconut shell biochar, TiO₂ coatings",
    target: "CPCB 2025 norms, total material cost < ₹5 lakh. NEW sub-tracks: biochar adsorption stage design, solar photocatalytic disinfection system",
    mapsTo: "Process Engineer, Environmental Engineer",
    prototype: false,
  },
  {
    id: "iot-monitoring",
    title: "Track 2: IoT & Monitoring",
    subtitle: "Build a ₹15,000 smart controller for a sewage treatment plant",
    materials: "ESP32, pH/DO/turbidity/flow/temp sensors, motor control, MQTT, WhatsApp alerts",
    target: "Working prototype with video demo mandatory",
    mapsTo: "IoT Engineer, Full-Stack Developer",
    prototype: true,
  },
  {
    id: "business-policy",
    title: "Track 3: Business Model & Policy",
    subtitle: "Deploy 100 JalBox units across UP and Bihar by 2031",
    materials: "Revenue model, government schemes, diaspora fundraising, transparency architecture",
    target: "20-page business plan + financial model + pitch deck",
    mapsTo: "Operations, BD, Government Relations",
    prototype: false,
  },
] as const;
