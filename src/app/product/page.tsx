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

export const metadata: Metadata = {
  title: "JalBox™ — The Swiss Army Knife of Sewage Treatment | Jal Neeti",
  description:
    "JalBox™ containerized sewage treatment plants. You subscribe to clean water, not buy equipment. Solar-powered, IoT-monitored, CPCB 2025 compliant. 5 KLD to 50 KLD models available.",
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

      {/* ── 5-STAGE TREATMENT PROCESS ── */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>5-Stage Treatment Process</SectionTitle>
          <SectionDescription>
            Raw sewage in, reusable water out. Every stage is biological — no
            harsh chemicals, no expensive membranes.
          </SectionDescription>
        </SectionHeader>

        {/* Schematic Diagram */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
          <div className="bg-white p-2">
            <Image
              src="/images/jalbox-schematic.jpg"
              alt="JalBox cutaway schematic showing 5-stage treatment: Screening, ABR, MBBR, Clarifier, and Wetland/UV polishing — with solar panels on top and biogas collection"
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

      {/* ── NEW FEATURES ── */}
      <Section>
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

      {/* ── IoT MONITORING ── */}
      <Section>
        <SectionHeader>
          <Badge variant="water" className="mb-4">
            <Wifi className="h-3 w-3 mr-1" />
            ESP32-Based IoT
          </Badge>
          <SectionTitle>Every Drop, Tracked</SectionTitle>
          <SectionDescription>
            Our custom IoT gateway monitors 10 parameters in real-time via MQTT
            telemetry. WhatsApp alerts for anomalies. OTA firmware updates.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-3xl mx-auto">
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
              Indian-assembled ESP32 IoT gateway with identical functionality.
              77% cost saving.
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
