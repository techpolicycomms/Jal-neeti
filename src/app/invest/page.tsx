import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Globe,
  Droplets,
  Users,
  Briefcase,
  IndianRupee,
  Factory,
  Truck,
  Wifi,
  UserCheck,
  Settings,
  BarChart3,
  Phone,
  Calendar,
  PlayCircle,
  LayoutDashboard,
  PiggyBank,
  Leaf,
  Shield,
  Award,
  Heart,
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
import { BRAND, WAAS_REVENUE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Invest — Bring Clean Water to Your Village | Jal Neeti",
  description:
    "Fund a distributed water utility with 15-year recurring revenue. Diaspora-first investment in JalBox deployments — transparent tracking, contractual cash flows, and verified impact.",
};

const TIERS = [
  {
    name: "Seed Supporter",
    minAmount: "₹50,000",
    minLabel: "onwards",
    benefits: [
      "Quarterly impact reports",
      "Name on supporter wall",
      "Investor portal access",
      "Certificate of impact",
    ],
    highlight: false,
  },
  {
    name: "Community Builder",
    minAmount: "₹2,00,000",
    minLabel: "onwards",
    benefits: [
      "Everything in Seed Supporter",
      "Monthly detailed updates",
      "Site visit invitations",
      "Direct founder access",
      "Early access to future rounds",
    ],
    highlight: true,
  },
  {
    name: "Village Champion",
    minAmount: "₹5,00,000",
    minLabel: "onwards",
    benefits: [
      "Everything in Community Builder",
      "Earmark your deployment village",
      "Dedicated live IoT dashboard",
      "Board observer invitation",
      "Annual vetiver oil gift",
    ],
    highlight: false,
  },
  {
    name: "Founding Partner",
    minAmount: "₹10,00,000",
    minLabel: "onwards",
    benefits: [
      "Everything in Village Champion",
      "Advisory board seat",
      "Revenue share participation",
      "Strategic input on expansion",
      "Annual founder dinner",
    ],
    highlight: false,
  },
];

const FUND_ALLOCATION = [
  { label: "Unit Manufacturing", pct: 60, color: "bg-primary" },
  { label: "Deployment & Installation", pct: 15, color: "bg-accent" },
  { label: "IoT & Monitoring", pct: 10, color: "bg-water" },
  { label: "Team & Operations", pct: 10, color: "bg-bio" },
  { label: "Working Capital", pct: 5, color: "bg-gray-400" },
];

const TIMELINE_STEPS = [
  { icon: IndianRupee, label: "Invest", desc: "Choose your tier and commit capital" },
  { icon: Factory, label: "Manufacture", desc: "JalBox built within 6-8 weeks" },
  { icon: Truck, label: "Deploy", desc: "Shipped and installed at site" },
  { icon: Settings, label: "Operate", desc: "15-year O&M contract begins" },
  { icon: LayoutDashboard, label: "Live Dashboard", desc: "Real-time IoT data access" },
  { icon: PiggyBank, label: "Quarterly Returns", desc: "Cash flows from operations" },
];

const FAQ = [
  {
    q: "Is this equity or a donation?",
    a: `This is equity investment via ${BRAND.company}. You become a shareholder in a water utility business with contractual revenue streams. This is not a donation.`,
  },
  {
    q: "Can NRIs invest?",
    a: "Yes. NRI investment is welcome under the FDI automatic route. We handle all FEMA compliance and documentation. USD/GBP/EUR transfers accepted.",
  },
  {
    q: "How do I track my investment?",
    a: "Every investor gets access to a live IoT dashboard showing real-time water treatment data from their funded JalBox unit(s), plus quarterly financial updates and fund utilization reports.",
  },
  {
    q: "Can I earmark a specific village?",
    a: "Yes. Village Champion tier and above can choose a specific village or region for deployment. We will work with local gram panchayats to identify the highest-need sites.",
  },
  {
    q: "What about tax benefits?",
    a: `CSR contributions via ${BRAND.foundation} are 80G eligible (tax deductible). Equity investment in ${BRAND.company} is not a donation and does not qualify for 80G — but it does generate financial returns.`,
  },
];

export default function InvestPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-dark text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-[128px]" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              Diaspora Investment
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.028em] leading-[1.03]">
              {BRAND.diasporaCta}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-300 leading-relaxed">
              You left. But your village still drinks dirty water.
              <br className="hidden sm:block" />
              Change that.
            </p>
            <p className="mt-4 text-base text-gray-400">
              Fund a distributed water utility with 15-year recurring revenue
              contracts &mdash; not a hardware company selling boxes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact?category=investment">
                <Button variant="accent" size="lg">
                  Invest Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact?category=investment&action=call">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5" />
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE OPPORTUNITY: UNIT ECONOMICS ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            Unit Economics
          </Badge>
          <SectionTitle>The Opportunity</SectionTitle>
          <SectionDescription>
            Every {BRAND.product} deployed is a physical asset generating
            contractual cash flows for 15 years.
          </SectionDescription>
        </SectionHeader>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: key metrics */}
          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-lg font-bold text-dark mb-1">
                Cost to Deploy 1 JalBox 25
              </h3>
              <div className="font-data text-4xl font-bold text-primary">
                &#x20B9;9 Lakh
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Fully containerised, plug-and-play, IoT-enabled
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-lg font-bold text-dark mb-4">
                Monthly Revenue per Unit
              </h3>
              <div className="space-y-3">
                {WAAS_REVENUE.map((item) => (
                  <div
                    key={item.source}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <span className="text-sm font-medium text-dark">
                        {item.source}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {item.description}
                      </span>
                    </div>
                    <span className="font-data font-bold text-accent whitespace-nowrap ml-4">
                      {item.range}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 flex items-center justify-between font-bold">
                  <span className="text-dark">Total</span>
                  <span className="font-data text-lg text-primary">
                    &#x20B9;48,500 &ndash; &#x20B9;1,04,500/mo
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: highlights */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                label: "Payback Period",
                value: "12-24 months",
                icon: Calendar,
                note: "Depending on revenue mix",
              },
              {
                label: "15-Year Lifetime Revenue",
                value: "₹60-120 Lakh",
                icon: TrendingUp,
                note: "Per unit deployed",
              },
              {
                label: "Contract Duration",
                value: "15 Years",
                icon: Shield,
                note: "Recurring O&M annuity",
              },
              {
                label: "Revenue Streams",
                value: "4+",
                icon: BarChart3,
                note: "Diversified, contractual",
              },
            ].map((item) => (
              <Card key={item.label} className="p-6 text-center">
                <item.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="font-data text-2xl font-bold text-dark">
                  {item.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mt-1">
                  {item.label}
                </div>
                <div className="text-xs text-gray-400 mt-1">{item.note}</div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ── INVESTMENT TIERS ── */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            Investment Tiers
          </Badge>
          <SectionTitle>Choose Your Level of Impact</SectionTitle>
          <SectionDescription>
            From &#x20B9;50K to &#x20B9;10L+ &mdash; every tier includes
            transparency, access, and impact tracking.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={`p-6 flex flex-col ${tier.highlight ? "ring-2 ring-accent relative" : ""}`}
            >
              {tier.highlight && (
                <Badge variant="accent" className="absolute -top-3 left-6">
                  Recommended
                </Badge>
              )}
              <h3 className="text-lg font-bold text-dark">{tier.name}</h3>
              <div className="font-data text-3xl font-bold text-accent mt-2 mb-1">
                {tier.minAmount}
                <span className="text-sm text-gray-400 font-body ml-1">
                  {tier.minLabel}
                </span>
              </div>
              <ul className="space-y-2 mt-4 flex-1">
                {tier.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?category=investment"
                className="mt-6 block"
              >
                <Button
                  variant={tier.highlight ? "accent" : "outline"}
                  className="w-full"
                >
                  Invest Now
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── WHERE YOUR MONEY GOES ── */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>Where Your Money Goes</SectionTitle>
          <SectionDescription>
            Every rupee tracked. Every litre measured.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-2xl mx-auto space-y-4">
          {FUND_ALLOCATION.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-white">{item.label}</span>
                <span className="font-data font-bold text-white">
                  {item.pct}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <div
                  className={`${item.color} h-4 rounded-full transition-all`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PROJECTED IMPACT PER ₹10 LAKH ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="success" className="mb-4">
            Per &#x20B9;10 Lakh Invested
          </Badge>
          <SectionTitle>Projected Impact</SectionTitle>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Droplets,
              value: "1",
              unit: "JalBox 25",
              desc: "Deployed and operational",
            },
            {
              icon: Users,
              value: "200-500",
              unit: "People Served",
              desc: "Daily clean water access",
            },
            {
              icon: Leaf,
              value: "25,000",
              unit: "Litres/Day",
              desc: "Sewage treated to CPCB norms",
            },
            {
              icon: Briefcase,
              value: "1",
              unit: "Jal Mitra Job",
              desc: "Local employment created",
            },
          ].map((item) => (
            <Card key={item.unit} className="p-6 text-center">
              <item.icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="font-data text-3xl font-bold text-dark">
                {item.value}
              </div>
              <div className="text-sm font-bold text-gray-700 mt-1">
                {item.unit}
              </div>
              <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── HOW IT WORKS (TIMELINE) ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>How It Works</SectionTitle>
          <SectionDescription>
            From investment to impact &mdash; a clear, trackable process.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-5xl mx-auto">
          {/* Desktop: horizontal timeline */}
          <div className="hidden md:grid grid-cols-6 gap-4">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={step.label} className="text-center relative">
                {/* Connector line */}
                {i < TIMELINE_STEPS.length - 1 && (
                  <div className="absolute top-6 left-[60%] right-0 h-0.5 bg-gray-200 z-0" />
                )}
                <div className="relative z-10 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-3">
                  <step.icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-dark text-sm">{step.label}</h4>
                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-4">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={step.label} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                  <step.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">{step.label}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto space-y-6">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="border border-gray-200 rounded-xl p-6 bg-white"
            >
              <h3 className="font-bold text-dark mb-2">{item.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── TRUST SIGNALS ── */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-dark mb-8">
            Backed By Trust
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Badge variant="primary" className="text-sm px-4 py-2">
              <Award className="h-4 w-4 mr-1" />
              {BRAND.foundation}
            </Badge>
            <Badge variant="water" className="text-sm px-4 py-2">
              <Shield className="h-4 w-4 mr-1" />
              CPCB 2025 Compliant
            </Badge>
            {[6, 9, 11, 13].map((sdg) => (
              <Badge key={sdg} variant="success" className="text-sm px-4 py-2">
                SDG {sdg}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* ── NRI / DIASPORA SECTION ── */}
      <Section variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-dark mb-4">
            Living Abroad but Heart in India?
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            This is your chance to bring clean water to your ancestral village,
            your parents&apos; town, or any community in need.
          </p>
          <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
            {[
              "FDI automatic route — no approvals needed",
              "USD / GBP / EUR transfers accepted",
              "Full FEMA compliance and documentation",
              "Earmark a specific village for deployment",
              "Live IoT dashboard from anywhere in the world",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?category=investment">
              <Button variant="accent" size="lg">
                Invest from Abroad
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact?category=investment&action=call">
              <Button variant="outline" size="lg">
                <Phone className="h-5 w-5" />
                Schedule a Call
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-accent text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-10 w-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Your Village Is Waiting
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Every &#x20B9;10 lakh deployed means 500 people get clean water,
            one local job is created, and 25,000 litres are treated daily
            &mdash; for the next 15 years.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?category=investment">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-accent"
              >
                Invest Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact?category=investment&action=call">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                Schedule a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
