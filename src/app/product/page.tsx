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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND, JALBOX_MODELS, BIONEER_COMPONENTS, TREATMENT_STAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "JalBox™ Product",
  description:
    "JalBox™ containerized sewage treatment plants — solar-powered, IoT-monitored, built with 100% Indian materials through BioNeer™ innovation.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  leaf: Leaf,
  wind: Wind,
  box: Box,
  sprout: Sprout,
  wifi: Wifi,
  sun: Sun,
};

const SPECS = [
  { label: "Treatment Standard", value: "CPCB Reuse Norms" },
  { label: "BOD Outlet", value: "< 10 mg/L" },
  { label: "TSS Outlet", value: "< 10 mg/L" },
  { label: "pH Range", value: "6.5 – 8.5" },
  { label: "Power Consumption", value: "0.4–0.8 kWh/KLD" },
  { label: "Deployment Time", value: "24–72 hours" },
  { label: "Design Life", value: "25+ years" },
  { label: "Footprint", value: "6m × 2.4m (20ft container)" },
  { label: "IoT Sensors", value: "15+ parameters" },
  { label: "Data Frequency", value: "1 reading/minute" },
  { label: "Maintenance", value: "2 hrs/week (Jal Mitra)" },
  { label: "Warranty", value: "5 years comprehensive" },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-4">Product</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {BRAND.product}
              </h1>
              <p className="mt-4 text-xl text-gray-300">
                India&apos;s first 100% indigenous containerized sewage treatment
                plant. Factory-built. Solar-powered. IoT-monitored. Deployable in
                48 hours.
              </p>
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

      {/* Product Range */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>Choose Your JalBox</SectionTitle>
          <SectionDescription>
            Every JalBox is factory-built in a standard shipping container,
            tested before dispatch, and commissioned on-site with minimal civil
            work.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {JALBOX_MODELS.map((model, i) => (
            <Card
              key={model.model}
              className={`p-8 ${i === 1 ? "ring-2 ring-primary relative" : ""}`}
            >
              {i === 1 && (
                <Badge variant="primary" className="absolute -top-3 left-6">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-2xl font-bold text-dark">{model.model}</h3>
              <div className="font-data text-4xl font-bold text-primary mt-2 mb-4">
                {model.capacity}
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  Serves {model.serves}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  {model.ideal}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  Solar + IoT included
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  5-year warranty
                </li>
              </ul>
              <Link href="/contact?category=customer" className="mt-6 block">
                <Button variant="outline" className="w-full">
                  Get Quote
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* BioNeer Innovation */}
      <Section id="bioneer">
        <SectionHeader>
          <Badge variant="success" className="mb-4">{BRAND.innovation}</Badge>
          <SectionTitle>100% Indian. Zero Imports.</SectionTitle>
          <SectionDescription>
            BioNeer™ is our proprietary design philosophy: replace every
            imported component with a superior Indian alternative. Lower cost.
            Local supply chains. Rural employment.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BIONEER_COMPONENTS.map((component) => {
            const Icon = ICON_MAP[component.icon] || Leaf;
            return (
              <Card key={component.name} className="p-8">
                <Icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-dark mb-1">
                  {component.name}
                </h3>
                <Badge variant="accent" className="mb-3">
                  {component.source}
                </Badge>
                <p className="text-sm text-gray-600">{component.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Treatment Process */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>6-Stage Treatment Process</SectionTitle>
          <SectionDescription>
            Raw sewage to reusable water in under 12 hours through biological
            processes — no harsh chemicals.
          </SectionDescription>
        </SectionHeader>

        {/* Schematic Diagram */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
          <div className="bg-white p-2">
            <Image
              src="/images/jalbox-schematic.jpg"
              alt="JalBox cutaway schematic: Screening Chamber, Anaerobic Baffled Reactor, MBBR with bio-media and fine-bubble diffusers, Lamella Plate Clarifier, UV Disinfection Chamber — solar panels on top with biogas collection dome"
              width={1400}
              height={700}
              className="w-full h-auto"
            />
          </div>
          <div className="p-4 md:p-6 bg-card border-t border-white/10">
            <p className="text-sm text-gray-300 text-center">
              <strong className="text-white">JalBox™ Internal Layout:</strong> Every component is factory-installed and tested before dispatch. The entire treatment train fits within a standard 20ft shipping container.
            </p>
          </div>
        </div>

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
              <div className="pb-4">
                <h3 className="text-xl font-bold text-white">{stage.name}</h3>
                <p className="text-gray-300 mt-1">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Technical Specs */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>Technical Specifications</SectionTitle>
          <SectionDescription>
            Every JalBox meets or exceeds CPCB discharge norms for treated
            sewage reuse.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {SPECS.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100"
            >
              <span className="text-sm text-gray-600">{spec.label}</span>
              <span className="font-data font-bold text-primary text-sm">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* IoT Monitoring */}
      <Section>
        <SectionHeader>
          <Badge variant="water" className="mb-4">
            <Wifi className="h-3 w-3 mr-1" />
            IoT Monitoring
          </Badge>
          <SectionTitle>Every Drop, Tracked</SectionTitle>
          <SectionDescription>
            Our ESP32-based IoT gateway sends real-time data every 60 seconds.
            Predictive maintenance. Automated alerts. Zero surprises.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { param: "pH Level", icon: Gauge, range: "6.5–8.5" },
            { param: "Dissolved Oxygen", icon: Wind, range: "> 4 mg/L" },
            { param: "Flow Rate", icon: Droplets, range: "Real-time L/hr" },
            { param: "Temperature", icon: ThermometerSun, range: "Ambient & MBBR" },
            { param: "Power Source", icon: Zap, range: "Solar/Grid/Battery" },
            { param: "BOD/COD/TSS", icon: Shield, range: "Compliance check" },
            { param: "Sludge Level", icon: Gauge, range: "Auto-desludge alert" },
            { param: "Biogas Flow", icon: Leaf, range: "L/hr production" },
          ].map((item) => (
            <div
              key={item.param}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
            >
              <item.icon className="h-6 w-6 text-water flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-dark">{item.param}</p>
                <p className="text-xs text-gray-500 font-data">{item.range}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Deployment Showcase */}
      <Section>
        <SectionHeader>
          <Badge variant="success" className="mb-4">In the Field</Badge>
          <SectionTitle>JalBox™ in Action</SectionTitle>
          <SectionDescription>
            From factory to village in days — here&apos;s what a deployed
            JalBox looks like serving a real community.
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
                  <p className="text-accent-light font-data font-bold text-lg">Solar Powered</p>
                  <p className="text-sm text-gray-200">Rooftop panels run the entire system off-grid</p>
                </div>
                <div>
                  <p className="text-accent-light font-data font-bold text-lg">IoT Monitored</p>
                  <p className="text-sm text-gray-200">Jal Mitra operates via touchscreen control panel</p>
                </div>
                <div>
                  <p className="text-accent-light font-data font-bold text-lg">Biogas Capture</p>
                  <p className="text-sm text-gray-200">Black biogas bag stores methane for cooking fuel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-primary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Deploy Clean Water?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Get a custom quote for your housing society, village, or
            institution. Site survey included.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?category=customer">
              <Button variant="accent" size="lg">
                Request a Quote
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
