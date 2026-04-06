import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Droplets,
  Users,
  Building2,
  BarChart3,
  Wifi,
  FileText,
  Camera,
  MapPin,
  Receipt,
  Globe,
  Leaf,
  Shield,
  Award,
  Factory,
  Calendar,
  Truck,
  LayoutDashboard,
  Clock,
  Sparkles,
  Quote,
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
import { CardDark } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "CSR Partnership Programme — Deploy JalBox via Section 135 | Jal Neeti",
  description:
    "Deploy IoT-monitored JalBox sewage treatment plants through your CSR budget. Section 135, Schedule VII compliant. 80G tax deduction via Ameliore Foundation. From ₹10 lakh per unit.",
};

const IMPACT_TIERS = [
  {
    investment: "₹10 Lakh",
    units: "1 JalBox",
    people: "200–500",
    outcome: "Permanent clean water",
    highlight: false,
  },
  {
    investment: "₹50 Lakh",
    units: "5 JalBox cluster",
    people: "1,000–2,500",
    outcome: "Small town transformed",
    highlight: true,
  },
  {
    investment: "₹1 Crore",
    units: "10 JalBox units",
    people: "2,000–5,000",
    outcome: "District-level impact",
    highlight: false,
  },
];

const SCHEDULE_VII_ITEMS = [
  {
    clause: "(i)",
    title: "Eradicating hunger, poverty",
    description:
      "Clean water reduces waterborne disease healthcare costs by up to 80%. Families save ₹2,000–5,000/month on medical expenses.",
  },
  {
    clause: "(iv)",
    title: "Environmental sustainability",
    description:
      "Sewage treatment, water recycling, biogas generation. Every JalBox prevents 25,000 litres of raw sewage from entering water bodies daily.",
  },
  {
    clause: "(x)",
    title: "Rural development",
    description:
      "Village-level WASH infrastructure that creates local employment (Jal Mitra operators) and improves quality of life.",
  },
  {
    clause: "(ii)",
    title: "Education",
    description:
      "The Jal Neeti Challenge competition trains the next generation of environmental engineers through hands-on problem-solving.",
  },
];

const DELIVERABLES = [
  {
    icon: Building2,
    title: "Named JalBox Unit",
    description: "Company branding on the deployed unit with permanent plaque",
  },
  {
    icon: Wifi,
    title: "Real-Time IoT Dashboard",
    description: "Live water quality data for your ESG reports and board presentations",
  },
  {
    icon: BarChart3,
    title: "Quarterly Impact Report",
    description: "Detailed report with photos, treatment data, and beneficiary metrics",
  },
  {
    icon: MapPin,
    title: "Site Visit Invitation",
    description: "Bring your CSR committee to see the impact firsthand",
  },
  {
    icon: Receipt,
    title: "80G Tax Deduction",
    description: `Certificate from ${BRAND.foundation} for full tax deduction`,
  },
  {
    icon: Globe,
    title: "SDG Contribution Metrics",
    description: "Verified contribution to SDG 6, 11, 12, and 13",
  },
  {
    icon: Leaf,
    title: "Carbon Offset Calculation",
    description: "Scope 3 reporting data including methane capture and water reuse metrics",
  },
];

const TIMELINE_STEPS = [
  {
    month: "Month 1",
    icon: MapPin,
    title: "Site Selection",
    description: "CSR team selects deployment location from priority list or nominates a site",
  },
  {
    month: "Month 2",
    icon: Handshake,
    title: "Grant & Manufacturing",
    description: `${BRAND.foundation} receives grant. Jal Neeti manufactures the JalBox unit.`,
  },
  {
    month: "Month 3",
    icon: Truck,
    title: "Deploy & Commission",
    description: "Unit deployed on-site, commissioned, and IoT systems connected",
  },
  {
    month: "Month 3+",
    icon: LayoutDashboard,
    title: "Live Monitoring",
    description: "Dashboard active with real-time data. Quarterly impact reports begin.",
  },
  {
    month: "Year 1+",
    icon: Clock,
    title: "Annual Review",
    description: "Annual impact review with your CSR committee. Option to deploy more units.",
  },
];

const PRECEDENTS = [
  "Infosys Foundation funds WASH projects across Karnataka",
  "Reliance Foundation deployed water ATMs in rural Gujarat",
  "Tata Trusts invested in water infrastructure across 100+ districts",
  "Your company could be the first to deploy IoT-monitored, containerised STPs at scale",
];

const TRUST_SIGNALS = [
  {
    icon: Award,
    label: `${BRAND.foundation} — Section 8, CSR-1 Registered`,
    variant: "primary" as const,
  },
  {
    icon: Receipt,
    label: "80G Registration for Tax Deduction",
    variant: "accent" as const,
  },
  {
    icon: Shield,
    label: "CPCB 2025 Compliant",
    variant: "water" as const,
  },
  {
    icon: Wifi,
    label: "IoT-Verified Impact Metrics",
    variant: "success" as const,
  },
  {
    icon: Globe,
    label: "Incubated with support from UNEP India (pending)",
    variant: "default" as const,
  },
];

export default function CSRPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-dark text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-[128px]" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge variant="accent" className="mb-6">
              <Handshake className="h-3 w-3 mr-1" />
              CSR Partnership Programme
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.028em] leading-[1.03] leading-tight">
              Your CSR Budget Can Give an Entire Village Clean Water.{" "}
              <span className="text-accent">Permanently.</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
              Not a borewell that runs dry. Not a water tank that empties. A{" "}
              {BRAND.product} &mdash; a permanent, IoT-monitored sewage treatment
              plant that turns waste into clean water, biogas, and fertiliser.
              For less than &#x20B9;10 lakh.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/contact?category=partnership">
                <Button variant="accent" size="lg">
                  Start Your CSR Water Project
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/impact-calculator">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Calculate Your Impact
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE CSR CASE ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            The CSR Case
          </Badge>
          <SectionTitle>Impact Per Rupee, Quantified</SectionTitle>
          <SectionDescription>
            Indian companies with &#x20B9;5 Cr+ net profit must spend 2% on CSR
            (Section 135, Companies Act 2013). The annual CSR pool is ~&#x20B9;26,000 Cr
            (FY24). Only ~6% goes to water and sanitation. Here&apos;s what your
            budget can do.
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-8">
          {IMPACT_TIERS.map((tier) => (
            <Card
              key={tier.investment}
              className={`p-8 text-center ${tier.highlight ? "ring-2 ring-accent relative" : ""}`}
            >
              {tier.highlight && (
                <Badge variant="accent" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <div className="font-data text-4xl font-bold text-accent">
                {tier.investment}
              </div>
              <div className="mt-3 text-lg font-bold text-dark">
                {tier.units}
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 text-gray-600">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-data font-semibold">{tier.people}</span> people served
              </div>
              <div className="mt-3">
                <Badge variant="success">{tier.outcome}</Badge>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="p-8 bg-accent/5 border-accent/20">
            <p className="text-center text-lg leading-relaxed text-dark">
              <strong className="text-accent">Compare:</strong>{" "}
              &#x20B9;10 lakh on a borewell serves ~50 people for ~5 years.{" "}
              <br className="hidden sm:block" />
              &#x20B9;10 lakh on a {BRAND.product} serves{" "}
              <strong>200&ndash;500 people for 15+ years.</strong>
            </p>
          </Card>
        </div>
      </Section>

      {/* ── SCHEDULE VII ALIGNMENT ── */}
      <Section>
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            Schedule VII Compliance
          </Badge>
          <SectionTitle>Fully Schedule VII Eligible</SectionTitle>
          <SectionDescription>
            {BRAND.product} deployment qualifies under multiple clauses of
            Schedule VII, Companies Act 2013.
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {SCHEDULE_VII_ITEMS.map((item) => (
            <Card key={item.clause} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-bio/10 text-bio flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-dark">
                    <span className="text-primary">{item.clause}</span>{" "}
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="p-8 text-center bg-gray-50 border-gray-200">
            <p className="text-lg font-semibold text-dark">
              Your CA signs off. Your board approves. Your Annual Report shines.
            </p>
          </Card>
        </div>
      </Section>

      {/* ── WHAT YOU GET ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            CSR Deliverables
          </Badge>
          <SectionTitle>What You Get</SectionTitle>
          <SectionDescription>
            Every CSR partner receives comprehensive reporting, branding, and
            compliance documentation.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {DELIVERABLES.map((item) => (
            <Card key={item.title} className="p-6">
              <item.icon className="h-8 w-8 text-accent mb-4" />
              <h3 className="font-bold text-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── HOW IT WORKS (TIMELINE) ── */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>How It Works</SectionTitle>
          <SectionDescription>
            From CSR approval to village impact &mdash; a clear, trackable timeline.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-4xl mx-auto">
          {/* Desktop: horizontal timeline */}
          <div className="hidden md:grid grid-cols-5 gap-6">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={step.month} className="text-center relative">
                {i < TIMELINE_STEPS.length - 1 && (
                  <div className="absolute top-6 left-[60%] right-0 h-0.5 bg-white/20 z-0" />
                )}
                <div className="relative z-10 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-3">
                  <step.icon className="h-5 w-5" />
                </div>
                <Badge variant="accent" className="mb-2 text-xs">
                  {step.month}
                </Badge>
                <h4 className="font-bold text-white text-sm">{step.title}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-6">
            {TIMELINE_STEPS.map((step) => (
              <div key={step.month} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                  <step.icon className="h-4 w-4" />
                </div>
                <div>
                  <Badge variant="accent" className="mb-1 text-xs">
                    {step.month}
                  </Badge>
                  <h4 className="font-bold text-white text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── DUAL-PURPOSE MODEL ── */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Card className="p-10 ring-2 ring-accent/30 bg-accent/5 border-accent/20">
            <div className="text-center">
              <Badge variant="accent" className="mb-6">
                <Sparkles className="h-3 w-3 mr-1" />
                Dual-Purpose Model
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-dark leading-tight">
                Deploy a {BRAND.product} at Your Manufacturing Facility
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Your CSR budget funds the community sewage treatment. Your
                operations team buys the treated water output for factory use.{" "}
                <strong className="text-dark">
                  One investment, two compliance boxes checked.
                </strong>
              </p>
              <div className="mt-8">
                <Link href="/contact?category=partnership">
                  <Button variant="accent" size="lg">
                    Explore Dual-Purpose Deployment
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* ── INDUSTRY PRECEDENT ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            Industry Precedent
          </Badge>
          <SectionTitle>CSR Leaders in Water</SectionTitle>
          <SectionDescription>
            Leading Indian companies already invest in water and sanitation.
            These are general CSR examples &mdash; not {BRAND.product} customers.
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PRECEDENTS.map((item, i) => (
            <Card
              key={i}
              className={`p-6 ${i === PRECEDENTS.length - 1 ? "ring-2 ring-accent bg-accent/5 border-accent/20" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Quote className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p
                  className={`text-sm leading-relaxed ${i === PRECEDENTS.length - 1 ? "font-bold text-dark" : "text-gray-700"}`}
                >
                  {item}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── TRUST SIGNALS ── */}
      <Section>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-10">
            Trust &amp; Compliance
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {TRUST_SIGNALS.map((signal) => (
              <Badge
                key={signal.label}
                variant={signal.variant}
                className="text-sm px-5 py-2.5"
              >
                <signal.icon className="h-4 w-4 mr-2" />
                {signal.label}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-accent text-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Droplets className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Start Your CSR Water Project
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Schedule VII compliant. 80G eligible. IoT-verified impact.
            <br className="hidden sm:block" />
            From &#x20B9;10 lakh, give an entire village clean water &mdash; permanently.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?category=partnership">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-accent"
              >
                Start Your CSR Water Project
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/impact-calculator">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                Calculate Your Impact
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
