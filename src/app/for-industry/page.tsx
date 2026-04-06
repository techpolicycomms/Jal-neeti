import type { Metadata } from "next";
import Link from "next/link";
import {
  Factory,
  ArrowRight,
  Droplets,
  Thermometer,
  Wind,
  Sprout,
  HardHat,
  Car,
  Wifi,
  CircleDollarSign,
  Truck,
  Gauge,
  ShieldCheck,
  BarChart3,
  Handshake,
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
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industrial Water Reuse",
  description:
    "Treated water from JalBox at 8-15 per KL vs tanker freshwater at 40+ per KL. CPCB-compliant, IoT-verified non-potable water for cooling, washing, and industrial process use.",
};

const COST_COMPARISON = [
  {
    source: "Freshwater tanker",
    cost: "\u20B940\u201380",
    reliability: "Low (seasonal)",
    quality: "None",
    highlight: false,
  },
  {
    source: "Groundwater borewell",
    cost: "\u20B915\u201325 + extraction cost",
    reliability: "Declining (water table falling)",
    quality: "None",
    highlight: false,
  },
  {
    source: `${BRAND.product} treated water`,
    cost: "\u20B98\u201315",
    reliability: "High (24/7 IoT-monitored)",
    quality: "Real-time IoT dashboard",
    highlight: true,
  },
];

const USE_CASES = [
  {
    title: "Cooling Towers",
    grade: "Grade A treatment",
    icon: Thermometer,
  },
  {
    title: "Boiler Feed Water",
    grade: "With RO polishing",
    icon: Gauge,
  },
  {
    title: "Dust Suppression & Road Washing",
    grade: "Grade C",
    icon: Wind,
  },
  {
    title: "Landscaping & Green Belt Irrigation",
    grade: "Grade B",
    icon: Sprout,
  },
  {
    title: "Construction Curing",
    grade: "Grade B",
    icon: HardHat,
  },
  {
    title: "Vehicle Washing",
    grade: "Grade B",
    icon: Car,
  },
];

const STEPS = [
  {
    step: 1,
    title: "Deploy",
    description: `We deploy a ${BRAND.product} at or near your facility.`,
    icon: Factory,
  },
  {
    step: 2,
    title: "Connect",
    description:
      "We connect to your greywater/sewage source OR receive septage from the surrounding area.",
    icon: Truck,
  },
  {
    step: 3,
    title: "Treat & Store",
    description:
      "Treated water is stored and piped/trucked to your process.",
    icon: Droplets,
  },
  {
    step: 4,
    title: "Pay Per KL",
    description:
      "You pay per KL consumed \u2014 metered, IoT-verified, UPI/invoice billing.",
    icon: CircleDollarSign,
  },
  {
    step: 5,
    title: "Monitor",
    description:
      "Real-time quality dashboard accessible to your EHS team.",
    icon: BarChart3,
  },
];

export default function ForIndustryPage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">
              <Factory className="h-3 w-3 mr-1" />
              For Industry
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Factory Needs Water.{" "}
              <span className="text-primary-light">
                The Sewage Next Door Has It.
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Treated water from {BRAND.product} at \u20B98\u201315/KL vs.
              tanker freshwater at \u20B940+/KL. Same quality for cooling,
              washing, and process use. CPCB-compliant. IoT-verified.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact?category=customer">
                <Button variant="primary" size="lg">
                  Get a Quote
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/transparency">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                  See Water Quality Data
                  <ShieldCheck className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE MATH */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            <CircleDollarSign className="h-3 w-3 mr-1" />
            The Math
          </Badge>
          <SectionTitle>Cost Comparison Per Kilolitre</SectionTitle>
          <SectionDescription>
            Industrial non-potable water doesn&apos;t need to come from
            freshwater sources. See how treated sewage stacks up.
          </SectionDescription>
        </SectionHeader>

        <Card className="max-w-4xl mx-auto overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Source
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Cost/KL
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Reliability
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Quality Guarantee
                  </th>
                </tr>
              </thead>
              <tbody>
                {COST_COMPARISON.map((row) => (
                  <tr
                    key={row.source}
                    className={
                      row.highlight
                        ? "bg-primary/5 border-l-4 border-l-primary"
                        : "border-b border-gray-100"
                    }
                  >
                    <td
                      className={`py-4 px-6 font-medium ${
                        row.highlight ? "text-primary font-bold" : "text-dark"
                      }`}
                    >
                      {row.source}
                    </td>
                    <td
                      className={`py-4 px-6 font-data ${
                        row.highlight
                          ? "text-primary font-bold text-lg"
                          : "text-gray-600"
                      }`}
                    >
                      {row.cost}
                    </td>
                    <td
                      className={`py-4 px-6 ${
                        row.highlight ? "text-primary font-medium" : "text-gray-600"
                      }`}
                    >
                      {row.reliability}
                    </td>
                    <td
                      className={`py-4 px-6 ${
                        row.highlight ? "text-primary font-medium" : "text-gray-500"
                      }`}
                    >
                      {row.quality}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* 3. USE CASES */}
      <Section>
        <SectionHeader>
          <SectionTitle>Industrial Use Cases</SectionTitle>
          <SectionDescription>
            Treated water from {BRAND.product} meets the quality standards
            required for a wide range of non-potable industrial applications.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {USE_CASES.map((uc) => (
            <Card key={uc.title} className="p-6">
              <uc.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-bold text-dark mb-1">{uc.title}</h3>
              <Badge variant="water">{uc.grade}</Badge>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-10 p-4 rounded-xl bg-accent/5 border border-accent/20 text-sm text-gray-700">
          <strong className="text-accent">Regulatory note:</strong> Tariff
          Policy 2016 mandates thermal power plants within 50km of an STP to
          use treated water. Get ahead of compliance.
        </div>
      </Section>

      {/* 4. HOW IT WORKS */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>How It Works</SectionTitle>
          <SectionDescription>
            From deployment to daily metering — five steps to reliable,
            low-cost industrial water.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-3xl mx-auto space-y-0">
          {STEPS.map((s, i) => (
            <div key={s.step} className="flex gap-6">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">
                  {s.step}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-0.5 flex-1 bg-primary/20" />
                )}
              </div>
              {/* Content */}
              <div className="pb-10">
                <div className="flex items-center gap-3 mb-1">
                  <s.icon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-dark">{s.title}</h3>
                </div>
                <p className="text-gray-600">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. THE CIRCULAR DEAL */}
      <Section variant="dark">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            <Handshake className="h-3 w-3 mr-1" />
            The Circular Deal
          </Badge>
          <SectionTitle>One Unit. Two Purposes. Full Compliance.</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-300 leading-relaxed">
            If your factory also has a CSR obligation, deploy a {BRAND.product}{" "}
            that treats <strong className="text-white">both</strong> your factory
            wastewater <strong className="text-white">and</strong> the
            neighbouring community&apos;s sewage. Your CSR budget funds the
            community portion. Your operations budget pays for the water you
            consume. One unit. Two purposes. Full compliance on both fronts.
          </p>
          <div className="mt-8">
            <Link href="/contact?category=partnership">
              <Button variant="accent" size="lg">
                Talk to us about a dual-purpose deployment
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* 6. ENQUIRY CTA */}
      <section className="bg-primary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Get a Custom Quote for Your Plant
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Tell us your daily water requirement, location, and use case. We
            will respond with a techno-commercial proposal within 48 hours.
          </p>
          <div className="mt-8">
            <Link href="/contact?category=customer">
              <Button variant="accent" size="lg">
                Request a Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
