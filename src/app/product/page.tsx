import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Droplets,
  Sun,
  Wifi,
  Leaf,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  ThermometerSun,
  Gauge,
  Wind,
  Box,
  Sprout,
  Building2,
  Trees,
  HardHat,
  Link2,
  Landmark,
  Battery,
  Fuel,
  Truck,
  QrCode,
  Cpu,
  BellRing,
  BarChart3,
  Route,
  IndianRupee,
  Factory,
  FlaskConical,
  Brain,
  SunMedium,
  Beaker,
  Wrench,
  Settings,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BRAND,
  JALBOX_MODELS,
  BIONEER_COMPONENTS,
  TREATMENT_STAGES,
} from "@/lib/constants";

const CSR_USE_CASES: Record<string, string> = {
  "JalBox Micro": "School/hospital adoption programmes",
  "JalBox 10": "Village clean water projects, factory perimeter communities",
  "JalBox 25": "Panchayat-level deployment, dual-purpose factory+community",
  "JalBox 50": "District-level impact, industrial estate community service",
};

export const metadata: Metadata = {
  title: "JalBox™ — 6-Stage Containerised Sewage Treatment | Jal Neeti",
  description:
    "JalBox™ 6-stage containerized sewage treatment plants with biochar adsorption, AI/ML edge intelligence, and solar photocatalytic disinfection. Solar-powered, IoT-monitored, CPCB 2025 compliant. 5 KLD to 50 KLD.",
};

const DEPLOYMENT_SCENARIOS = [
  {
    title: "Urban",
    location: "Noida society basement",
    description:
      "Fits in existing basement utility areas. Silent operation, zero odour, treated water reused for flushing and landscaping.",
    icon: Building2,
  },
  {
    title: "Rural",
    location: "Bihar village next to panchayat bhawan",
    description:
      "Gram Panchayat owned, Jal Mitra operated. Biogas for community cooking, treated water for irrigation.",
    icon: Trees,
  },
  {
    title: "Temporary",
    location: "Construction site (6-month lease)",
    description:
      "Plug-and-play deployment. Lease a JalBox for the project duration, return when done. Zero civil work.",
    icon: HardHat,
  },
  {
    title: "Cluster",
    location: "5 units daisy-chained for 125 KLD",
    description:
      "Modular scaling — connect multiple JalBoxes for larger capacity without building a conventional STP.",
    icon: Link2,
  },
  {
    title: "FSSM Node",
    location: "At municipal pumping station",
    description:
      "Septage receiving port accepts vacuum truck discharge. Co-treats faecal sludge with sewage for total sanitation.",
    icon: Landmark,
  },
] as const;

const NEW_FEATURES = [
  {
    title: "FSSM Co-Treatment",
    tagline: "Every JalBox has a septage receiving port",
    description:
      "Dedicated inlet for vacuum trucks allows co-treatment of faecal sludge alongside regular sewage. Converts any JalBox into a Faecal Sludge & Septage Management node — critical for ODF+ compliance under SBM 2.0.",
    icon: Truck,
  },
  {
    title: "Treated Water Storage & Sale",
    tagline: "5–10 KL storage with metered dispensing",
    description:
      "Built-in treated water storage tank with volumetric metering and UPI QR-based payment. Sell treated water for construction, landscaping, and vehicle washing — turning waste into revenue.",
    icon: QrCode,
  },
  {
    title: "Biogas Utilisation",
    tagline: "Gas storage bladder with 3 pathways",
    description:
      "Anaerobic stage captures methane in a flexible gas storage bladder. Three utilisation pathways: direct cooking gas for community kitchens, biogas generator for supplementary power, or Bio-CNG compression for vehicle fuel.",
    icon: Fuel,
  },
  {
    title: "Sludge-to-Resource",
    tagline: "Solar drying bed + bagging + certification",
    description:
      "Stabilised sludge is transferred to an integrated solar drying bed. Dried, bagged, and nutrient-certified as organic soil conditioner. Generates additional revenue and closes the sanitation loop.",
    icon: Sprout,
  },
] as const;

export default function ProductPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-4">
                Water-as-a-Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {BRAND.product} — The Swiss Army Knife of Sewage Treatment
              </h1>
              <p className="mt-4 text-xl text-gray-300">
                A complete, self-contained treatment plant in a shipping
                container.
              </p>
              <p className="mt-3 text-lg text-primary-light font-medium">
                {BRAND.waasTagline}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/contact?category=customer">
                  <Button variant="accent" size="lg">
                    Get a Quote
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/jalbox-transport.jpg"
                alt="JalBox 25 containerized STPs with solar panels on transport trucks"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT FAMILY ── */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>The JalBox Family</SectionTitle>
          <SectionDescription>
            Every JalBox is factory-built in a standard shipping container,
            tested before dispatch, and commissioned on-site with minimal civil
            work. Pick the size that fits your community.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {JALBOX_MODELS.map((model) => (
            <Card
              key={model.model}
              className={`p-8 flex flex-col ${
                model.highlight
                  ? "ring-2 ring-primary relative"
                  : ""
              }`}
            >
              {model.highlight && (
                <Badge variant="primary" className="absolute -top-3 left-6">
                  Flagship
                </Badge>
              )}
              <h3 className="text-2xl font-bold text-dark">{model.model}</h3>
              <div className="font-data text-4xl font-bold text-primary mt-2 mb-4">
                {model.capacity}
              </div>
              <ul className="space-y-3 text-sm text-gray-600 flex-1">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Serves:</strong> {model.serves}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Ideal for:</strong> {model.ideal}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Enclosure:</strong> {model.enclosure}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Dimensions:</strong> {model.dimensions}
                  </span>
                </li>
                {CSR_USE_CASES[model.model] && (
                  <li className="flex items-start gap-2">
                    <Factory className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-accent">CSR ideal for:</strong>{" "}
                      {CSR_USE_CASES[model.model]}
                    </span>
                  </li>
                )}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Starting at
                </p>
                <p className="text-2xl font-bold text-dark font-data">
                  {model.price}
                </p>
              </div>
              <Link
                href="/contact?category=customer"
                className="mt-4 block"
              >
                <Button variant="outline" className="w-full">
                  Get a Quote
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 6-STAGE TREATMENT PROCESS ── */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>6-Stage Treatment Process</SectionTitle>
          <SectionDescription>
            Raw sewage in, reusable water out. Six stages — biological treatment,
            biochar adsorption, and natural polishing. No harsh chemicals, no expensive membranes.
          </SectionDescription>
        </SectionHeader>

        {/* Schematic Diagram */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
          <div className="bg-white p-2">
            <Image
              src="/images/jalbox-schematic.jpg"
              alt="JalBox cutaway schematic showing 6-stage treatment: Screening, ABR, MBBR, Clarifier, Biochar Adsorption, and Wetland/UV polishing — with solar panels on top and biogas collection"
              width={1400}
              height={700}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Inlet / Outlet Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
          <div className="bg-red-900/30 border border-red-500/30 rounded-xl px-6 py-4 text-center">
            <p className="text-xs text-red-300 uppercase tracking-wide">
              Inlet BOD
            </p>
            <p className="text-2xl font-bold font-data text-red-400">
              200–300 mg/L
            </p>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 sm:rotate-0" />
          <div className="bg-green-900/30 border border-green-500/30 rounded-xl px-6 py-4 text-center">
            <p className="text-xs text-green-300 uppercase tracking-wide">
              Outlet BOD
            </p>
            <p className="text-2xl font-bold font-data text-green-400">
              &lt; 10 mg/L
            </p>
          </div>
          <Badge variant="success" className="sm:ml-4">
            <Shield className="h-3 w-3 mr-1" />
            CPCB 2025 Compliant
          </Badge>
        </div>

        {/* Stage cards */}
        <div className="max-w-4xl mx-auto">
          {TREATMENT_STAGES.map((stage, i) => (
            <div
              key={stage.stage}
              className="flex items-start gap-6 mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-light text-dark flex items-center justify-center font-data font-bold text-lg flex-shrink-0">
                  {stage.stage}
                </div>
                {i < TREATMENT_STAGES.length - 1 && (
                  <div className="w-0.5 h-8 bg-primary-light/30 mt-2" />
                )}
              </div>
              <div className="pb-4 flex-1">
                <h3 className="text-xl font-bold text-white">{stage.name}</h3>
                <p className="text-gray-300 mt-1">{stage.description}</p>
                <div className="mt-2 flex gap-4 text-xs font-data">
                  <span className="text-red-400">
                    BOD in: {stage.bodIn} mg/L
                  </span>
                  <span className="text-green-400">
                    BOD out: {stage.bodOut} mg/L
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── BUILT FOR INDIA'S REALITY ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">Product Intelligence</Badge>
          <SectionTitle>Built for India&apos;s Reality</SectionTitle>
          <SectionDescription>
            India&apos;s sewage infrastructure has systemic challenges. JalBox is
            specifically designed to overcome them — not work around them.
          </SectionDescription>
        </SectionHeader>

        <div className="space-y-8 max-w-4xl mx-auto">
          {[
            {
              icon: Shield,
              title: "Self-Enforcing Compliance",
              problem:
                "39% of India\u2019s STPs don\u2019t meet discharge standards (CPCB). Operators lack training. Inspectors can\u2019t visit every site.",
              solution:
                "Auto-adjusting treatment parameters. Auto-generated CPCB compliance reports emailed to SPCB. Public real-time dashboard. Tamper detection. No manual control panel — everything is cloud-managed.",
            },
            {
              icon: Route,
              title: "Septage Co-Treatment Port",
              problem:
                "60% of urban India uses septic tanks. Desludged septage is dumped illegally because there\u2019s nowhere to treat it.",
              solution:
                "Every unit has a dedicated septage receiving port with flow meter, truck ID logging, and controlled dosing. Vacuum trucks bring septage from across the district. One JalBox serves the entire surrounding area\u2019s septic tanks.",
            },
            {
              icon: IndianRupee,
              title: "Treated Water Marketplace",
              problem:
                "Only 3% of treated wastewater in India is reused. No system connects treated water supply with industrial demand.",
              solution:
                "Treated output is auto-graded (A/B/C) and available for sale. Metered dispenser with UPI payment. Tanker filling point for bulk buyers. Connect to our water marketplace to find buyers within 10km.",
            },
          ].map((feature) => (
            <Card key={feature.title} className="p-8">
              <div className="flex items-start gap-6">
                <feature.icon className="h-10 w-10 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-accent mb-1">The Problem</p>
                      <p className="text-sm text-gray-600">{feature.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-bio mb-1">JalBox Solution</p>
                      <p className="text-sm text-gray-600">{feature.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── RESEARCH-BACKED INNOVATION ── */}
      <Section variant="dark">
        <SectionHeader>
          <Badge variant="water" className="mb-4">
            <FlaskConical className="h-3 w-3 mr-1" />
            Peer-Reviewed Science
          </Badge>
          <SectionTitle>Research-Backed Innovation</SectionTitle>
          <SectionDescription>
            Every stage in JalBox is validated by peer-reviewed research published
            in top environmental engineering journals. JalBox isn&apos;t just
            engineering — it&apos;s applied science.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Leaf,
              title: "Biochar Adsorption",
              stat: "84–93%",
              statLabel: "organic removal",
              description:
                "Coconut shell biochar removes pharmaceuticals, heavy metals, and emerging contaminants. 89% nitrate removal validated in published studies.",
            },
            {
              icon: Brain,
              title: "AI/ML Process Control",
              stat: "15–25%",
              statLabel: "energy reduction",
              description:
                "Edge ML on ESP32 enables adaptive dissolved oxygen control, anomaly detection, and predictive maintenance — validated by peer-reviewed AI applications in wastewater.",
            },
            {
              icon: SunMedium,
              title: "Solar TiO₂ Photocatalysis",
              stat: "93–100%",
              statLabel: "pathogen removal",
              description:
                "TiO₂-coated plates generate hydroxyl radicals under solar UV. Zero electricity. Zero consumables. Zero chemical addition.",
            },
            {
              icon: Beaker,
              title: "Chitosan Biosorbent",
              stat: "95%+",
              statLabel: "heavy metal capture",
              description:
                "Chitosan from Indian coastal seafood waste captures heavy metals via ion exchange and chelation. Modular insert for industrial models.",
            },
            {
              icon: Zap,
              title: "Electrocoagulation",
              stat: "97%+",
              statLabel: "turbidity removal",
              description:
                "Aluminium electrode pre-treatment removes oil, grease, and petroleum traces. Optional add-on for industrial co-treatment deployments.",
            },
            {
              icon: Sprout,
              title: "Hybrid Biological-Natural",
              stat: "6 stages",
              statLabel: "integrated treatment",
              description:
                "The combination of biological (ABR, MBBR), adsorptive (biochar), and natural (vetiver wetland) treatment is validated as superior to any single approach.",
            },
          ].map((innovation) => (
            <div
              key={innovation.title}
              className="rounded-2xl bg-card border border-white/10 p-6 hover:border-primary-light/30 transition-all"
            >
              <innovation.icon className="h-8 w-8 text-primary-light mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">
                {innovation.title}
              </h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-data text-2xl font-bold text-accent-light">
                  {innovation.stat}
                </span>
                <span className="text-xs text-gray-400">
                  {innovation.statLabel}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {innovation.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-2xl mx-auto p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-sm text-gray-300">
            <BookOpen className="h-4 w-4 inline mr-1 text-primary-light" />
            All innovations validated by published peer-reviewed studies in
            leading environmental engineering and energy journals.
          </p>
        </div>
      </Section>

      {/* ── CONFIGURABLE FOR YOUR NEEDS ── */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            <Settings className="h-3 w-3 mr-1" />
            Modular Design
          </Badge>
          <SectionTitle>Configurable for Your Needs</SectionTitle>
          <SectionDescription>
            Every JalBox starts with the same 6-stage core. Add modules based on
            your deployment context — from compact rural units to heavy industrial
            co-treatment.
          </SectionDescription>
        </SectionHeader>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Standard JalBox",
              subtitle: "Community & residential",
              color: "ring-primary",
              badgeVariant: "primary" as const,
              stages: [
                "6-stage treatment train",
                "Vetiver constructed wetland polishing",
                "Coconut shell biochar column",
                "ESP32 IoT with edge ML",
                "Solar + battery power system",
                "FSSM co-treatment port",
              ],
              ideal: "Housing societies, villages, schools, hospitals",
            },
            {
              title: "Industrial JalBox",
              subtitle: "Factory & CSR dual-purpose",
              color: "ring-accent",
              badgeVariant: "accent" as const,
              stages: [
                "Everything in Standard, plus:",
                "Electrocoagulation pre-treatment",
                "Chitosan biosorbent cartridge",
                "Enhanced biochar for heavy metals",
                "Industrial-grade flow metering",
                "Dual inlet (factory + community)",
              ],
              ideal: "Manufacturing plants, textile units, food processing, CSR deployments",
            },
            {
              title: "Compact JalBox",
              subtitle: "Space-constrained sites",
              color: "ring-water",
              badgeVariant: "water" as const,
              stages: [
                "6-stage core in smaller footprint",
                "TiO₂ solar photocatalytic disinfection",
                "No wetland required",
                "Zero-electricity pathogen kill",
                "Ideal for JalBox Micro (5 KLD)",
                "Highway rest areas, railway stations",
              ],
              ideal: "Schools, rest areas, construction sites, railway stations",
            },
          ].map((config) => (
            <Card
              key={config.title}
              className={`p-8 flex flex-col ring-2 ${config.color}`}
            >
              <Badge variant={config.badgeVariant} className="self-start mb-4">
                {config.subtitle}
              </Badge>
              <h3 className="text-xl font-bold text-dark mb-4">
                {config.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 flex-1">
                {config.stages.map((stage) => (
                  <li key={stage} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                    <span>{stage}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Ideal for
                </p>
                <p className="text-sm text-dark font-medium">{config.ideal}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── NEW FEATURES ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            New in 2026
          </Badge>
          <SectionTitle>Beyond Treatment</SectionTitle>
          <SectionDescription>
            JalBox is not just an STP. It is an integrated sanitation and
            resource-recovery platform.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 gap-8">
          {NEW_FEATURES.map((feature) => (
            <Card key={feature.title} className="p-8">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark">{feature.title}</h3>
              <p className="text-sm font-medium text-primary mt-1 mb-3">
                {feature.tagline}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── POWER SYSTEM ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Triple-Source Energy
          </Badge>
          <SectionTitle>Power That Never Fails</SectionTitle>
          <SectionDescription>
            Every JalBox runs on a triple-redundant power system. Grid-optional
            by design — built for rural India where power cuts are the norm.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <Sun className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-bold text-dark">Solar PV</h3>
            <p className="font-data text-2xl font-bold text-primary mt-2">
              4.3 kWp
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Foldable panels for transport, deployed on container roof.
              Generates 100% of daytime power needs.
            </p>
          </Card>

          <Card className="p-8 text-center">
            <Battery className="h-12 w-12 text-bio mx-auto mb-4" />
            <h3 className="text-lg font-bold text-dark">LiFePO4 Battery</h3>
            <p className="font-data text-2xl font-bold text-primary mt-2">
              48V / 200Ah
            </p>
            <p className="text-sm text-gray-600 mt-2">
              6–8 hours of night-time autonomy. 5,000+ cycle life.
              Maintenance-free lithium iron phosphate chemistry.
            </p>
          </Card>

          <Card className="p-8 text-center">
            <Fuel className="h-12 w-12 text-water mx-auto mb-4" />
            <h3 className="text-lg font-bold text-dark">
              Diesel / Biogas Generator
            </h3>
            <p className="font-data text-2xl font-bold text-primary mt-2">
              &lt; 20ms
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Emergency switchover in under 20 milliseconds. Can run on
              captured biogas for zero-fuel-cost operation.
            </p>
          </Card>
        </div>
      </Section>

      {/* ── IoT + EDGE AI ── */}
      <Section>
        <SectionHeader>
          <Badge variant="water" className="mb-4">
            <Wifi className="h-3 w-3 mr-1" />
            ESP32 IoT + Edge AI
          </Badge>
          <SectionTitle>Every Drop, Tracked. Every Decision, Intelligent.</SectionTitle>
          <SectionDescription>
            Our ESP32 gateway doesn&apos;t just monitor — it thinks. Edge ML
            inference runs on-device for adaptive control, anomaly detection, and
            predictive maintenance. Works even offline.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <Cpu className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-dark">10 Sensors</p>
                <p className="text-xs text-gray-500">
                  pH, DO, flow, temp, turbidity, TSS, sludge level, biogas
                  flow, power, UV dose
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <BarChart3 className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-dark">MQTT Telemetry</p>
                <p className="text-xs text-gray-500">
                  1 reading per minute, cloud dashboard, historical trends
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <BellRing className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-dark">WhatsApp Alerts</p>
                <p className="text-xs text-gray-500">
                  Instant anomaly notifications to operator and owner
                </p>
              </div>
            </div>
          </div>

          {/* Edge AI capabilities */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                icon: Brain,
                title: "Adaptive DO Control",
                description:
                  "ML model adjusts blower speed based on inlet load prediction — time-of-day patterns, flow rate trends. 15–25% energy savings.",
              },
              {
                icon: Shield,
                title: "Anomaly Detection",
                description:
                  "TinyML detects membrane fouling, biofilm washout, and pump cavitation signatures. Predictive maintenance alerts before failure.",
              },
              {
                icon: Droplets,
                title: "Water Quality Prediction",
                description:
                  "Predicts outlet BOD/COD 2–4 hours ahead based on inlet conditions, allowing preemptive process adjustments.",
              },
              {
                icon: Fuel,
                title: "Biogas Yield Optimisation",
                description:
                  "Correlates ABR temperature, pH, and sludge age with biogas production to maximise energy recovery.",
              },
            ].map((ai) => (
              <div
                key={ai.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <ai.icon className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-dark">{ai.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {ai.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="text-lg font-bold text-dark">
              <span className="font-data text-primary">&#8377;16,000</span>{" "}
              replaces a{" "}
              <span className="font-data text-gray-400 line-through">
                &#8377;70,000
              </span>{" "}
              Siemens PLC
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Indian-assembled ESP32 IoT gateway with edge ML inference.
              77% cost saving. Models run at the edge — no cloud required.
            </p>
          </div>
        </div>
      </Section>

      {/* ── DEPLOYMENT SCENARIOS ── */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>Where JalBox Deploys</SectionTitle>
          <SectionDescription>
            One product, five deployment patterns. From a basement car park to a
            municipal pumping station — JalBox adapts.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {DEPLOYMENT_SCENARIOS.map((scenario) => (
            <div
              key={scenario.title}
              className="bg-card border border-white/10 rounded-2xl p-6 hover:border-primary-light/30 transition-all"
            >
              <scenario.icon className="h-8 w-8 text-primary-light mb-3" />
              <h3 className="text-lg font-bold text-white">
                {scenario.title}
              </h3>
              <p className="text-xs text-primary-light font-medium mt-1 mb-2">
                {scenario.location}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                {scenario.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── VILLAGE SHOWCASE ── */}
      <Section>
        <SectionHeader>
          <Badge variant="success" className="mb-4">
            In the Field
          </Badge>
          <SectionTitle>JalBox in Action</SectionTitle>
          <SectionDescription>
            From factory to village in days — here&apos;s what a deployed JalBox
            looks like serving a real community.
          </SectionDescription>
        </SectionHeader>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <div className="relative">
            <Image
              src="/images/jalbox-village.jpg"
              alt="JalBox deployed in a rural Indian village with Jal Mitra operating IoT panel, biogas bag, and women collecting treated water"
              width={1200}
              height={600}
              className="w-full h-64 sm:h-80 md:h-[500px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6 md:p-10">
              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl">
                <div>
                  <p className="text-accent-light font-data font-bold text-lg">
                    Solar Powered
                  </p>
                  <p className="text-sm text-gray-200">
                    Rooftop panels run the entire system off-grid
                  </p>
                </div>
                <div>
                  <p className="text-accent-light font-data font-bold text-lg">
                    IoT Monitored
                  </p>
                  <p className="text-sm text-gray-200">
                    Jal Mitra operates via touchscreen control panel
                  </p>
                </div>
                <div>
                  <p className="text-accent-light font-data font-bold text-lg">
                    Biogas Capture
                  </p>
                  <p className="text-sm text-gray-200">
                    Black biogas bag stores methane for cooking fuel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── THE SCIENCE BEHIND JALBOX ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            Academic Foundation
          </Badge>
          <SectionTitle>The Science Behind JalBox</SectionTitle>
          <SectionDescription>
            JalBox technology is built on the shoulders of global wastewater
            research, adapted for Indian conditions and materials. Every design
            decision has published evidence.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                material: "Coconut Coir MBBR Media",
                finding:
                  "Equivalent biofilm surface area and BOD removal performance compared to imported PE plastic media, at 87% lower cost.",
                field: "Biological Wastewater Treatment",
              },
              {
                material: "Coconut Shell Biochar",
                finding:
                  "84–93% organic removal and 89% nitrate removal. Regenerable through thermal treatment. Effective against pharmaceuticals and emerging contaminants.",
                field: "Adsorption & Emerging Contaminants",
              },
              {
                material: "Solar TiO₂ Photocatalysis",
                finding:
                  "93–100% removal of metals and organics via solar-activated hydroxyl radicals. Zero electricity, zero consumables required.",
                field: "Advanced Oxidation Processes",
              },
              {
                material: "Chitosan Biosorbent",
                finding:
                  "Effective heavy metal capture via ion exchange and chelation. Sourced from Indian coastal seafood waste — abundant and renewable.",
                field: "Biosorbent Heavy Metal Removal",
              },
              {
                material: "Edge AI/ML on ESP32",
                finding:
                  "15–25% energy reduction through adaptive dissolved oxygen optimisation. Predictive maintenance reduces downtime by detecting faults before failure.",
                field: "AI Applications in Wastewater",
              },
              {
                material: "Electrocoagulation",
                finding:
                  "97%+ removal of turbidity and petroleum hydrocarbons using aluminium electrodes. Effective pre-treatment for industrial co-treatment loads.",
                field: "Hybrid Treatment Systems",
              },
            ].map((research) => (
              <Card key={research.material} className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="h-5 w-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-dark">{research.material}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {research.finding}
                </p>
                <Badge variant="water" className="text-xs">
                  {research.field}
                </Badge>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-sm text-gray-700">
              Research sourced from peer-reviewed publications in energy,
              environmental engineering, and water research journals (2024–2025).
              JalBox adapts global findings for Indian materials, conditions, and
              supply chains.
            </p>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="bg-primary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            You Subscribe to Clean Water, Not Buy Equipment.
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Get a custom quote for your housing society, village, or
            institution. Site survey included. Zero upfront capex options
            available.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?category=customer">
              <Button variant="accent" size="lg">
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/invest">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Invest Instead
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
