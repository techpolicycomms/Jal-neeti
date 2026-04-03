import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Shield,
  Eye,
  ArrowRight,
  CheckCircle,
  Globe,
  Heart,
  Zap,
  Users,
  BarChart3,
  Lock,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Invest",
  description:
    "Invest in India's clean water future. Jal Neeti's diaspora-first crowdfunding — transparent fund tracking, verified impact, and financial returns.",
};

const TIERS = [
  {
    name: "Seed Supporter",
    minAmount: "₹50,000",
    benefits: [
      "Quarterly impact reports",
      "Name on supporter wall",
      "JalBox™ unit naming rights (shared)",
      "Investor portal access",
    ],
    highlight: false,
  },
  {
    name: "Community Builder",
    minAmount: "₹2,00,000",
    benefits: [
      "Everything in Seed Supporter",
      "Monthly detailed updates",
      "Site visit invitations",
      "Direct founder access",
      "Early access to new investment rounds",
    ],
    highlight: true,
  },
  {
    name: "Village Champion",
    minAmount: "₹5,00,000",
    benefits: [
      "Everything in Community Builder",
      "Choose deployment village/site",
      "Dedicated impact dashboard",
      "Board observer invitation",
      "Vetiver oil annual gift",
    ],
    highlight: false,
  },
  {
    name: "Founding Partner",
    minAmount: "₹25,00,000",
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

const FAQ = [
  {
    q: "Who can invest?",
    a: "Indian residents, NRIs, PIOs, and OCIs can invest. International investors participate through our FCRA-compliant structure. All investments comply with FEMA and Companies Act regulations.",
  },
  {
    q: "What instrument is used?",
    a: "Early-stage investments are structured as Compulsorily Convertible Debentures (CCDs) or equity shares, depending on the round. CSR contributions flow through the Jal Neeti Foundation (Section 8).",
  },
  {
    q: "How is my money tracked?",
    a: "Every rupee is tracked through our public transparency dashboard. Fund utilization is categorized, timestamped, and (in future phases) blockchain-verified. You can see exactly where your investment goes.",
  },
  {
    q: "What returns can I expect?",
    a: "This is a social enterprise with commercial viability. Our DBO model generates recurring revenue from O&M fees, water sales, biogas, fertilizer, and carbon credits. Detailed financial projections are shared during due diligence.",
  },
  {
    q: "What is the exit path?",
    a: "Planned exits include strategic acquisition by larger water infrastructure companies, secondary sale to impact funds, or IPO on SME exchange (5-7 year horizon). Revenue-based returns begin from Month 18 post-deployment.",
  },
  {
    q: "Can I visit a JalBox site?",
    a: "Absolutely. Community Builder tier and above get site visit invitations. We encourage all investors to see the impact firsthand. We can also arrange virtual site tours via our IoT dashboard.",
  },
];

export default function InvestPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-[128px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              Investment Opportunity
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {BRAND.diasporaCta}
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Invest in India&apos;s clean water revolution. Transparent fund
              tracking. Verified impact. Financial returns. Join the founding
              investor cohort.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact?category=investment">
                <Button variant="accent" size="lg">
                  Express Interest
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/transparency">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Eye className="h-5 w-5" />
                  View Transparency Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>Why Invest in Jal Neeti?</SectionTitle>
          <SectionDescription>
            A rare opportunity to generate financial returns while creating
            massive social and environmental impact.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: "₹72,000 Cr Market",
              description: "India's sewage treatment market is massive and growing. Government schemes (AMRUT 2.0, JJM, SBM 2.0) are funding billions in water infrastructure.",
            },
            {
              icon: Zap,
              title: "5 Revenue Streams",
              description: "O&M fees, treated water sales, biogas, fertilizer, and carbon credits create diversified, recurring revenue from every JalBox deployed.",
            },
            {
              icon: Shield,
              title: "First-Mover Advantage",
              description: "No other company in India offers a fully indigenous, containerized, solar + IoT STP. We're defining the category.",
            },
            {
              icon: Globe,
              title: "Government Tailwinds",
              description: "AMRUT 2.0 (₹2.87L Cr), Jal Jeevan Mission, SBM 2.0, and NMCG are actively seeking decentralized STP solutions.",
            },
            {
              icon: Heart,
              title: "Impact at Scale",
              description: "Each ₹1 Cr invested translates to ~250 households gaining access to treated water. Measurable, verifiable impact.",
            },
            {
              icon: Lock,
              title: "Radical Transparency",
              description: "Every rupee tracked publicly. Fund utilization dashboard. Blockchain verification roadmap. You always know where your money goes.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-8">
              <item.icon className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Investment Tiers */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">Investment Tiers</Badge>
          <SectionTitle>Choose Your Level of Impact</SectionTitle>
          <SectionDescription>
            From ₹50K to ₹25L+ — every investment tier comes with
            transparency, access, and impact tracking.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={`p-6 ${tier.highlight ? "ring-2 ring-accent relative" : ""}`}
            >
              {tier.highlight && (
                <Badge variant="accent" className="absolute -top-3 left-6">
                  Recommended
                </Badge>
              )}
              <h3 className="text-lg font-bold text-dark">{tier.name}</h3>
              <div className="font-data text-3xl font-bold text-accent mt-2 mb-4">
                {tier.minAmount}
                <span className="text-sm text-gray-400 font-body ml-1">
                  minimum
                </span>
              </div>
              <ul className="space-y-2">
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
                  Express Interest
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>How It Works</SectionTitle>
          <SectionDescription>
            A simple, transparent process from interest to impact.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            { step: "1", title: "Express Interest", desc: "Fill out our investment enquiry form or schedule a call with our founder." },
            { step: "2", title: "Due Diligence", desc: "Receive our investor deck, financial projections, legal documents, and full disclosure materials." },
            { step: "3", title: "Commit & Invest", desc: "Choose your tier, sign agreements, and transfer funds via bank/Razorpay/Stripe." },
            { step: "4", title: "Track Your Impact", desc: "Access your investor portal. See real-time deployment, fund utilization, and water treated." },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 rounded-2xl bg-card border border-white/10 p-6"
            >
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-data font-bold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Diaspora CTA */}
      <Section variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            NRI / Diaspora Investors
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Living abroad but your heart is in India? This is your chance to
            bring clean water to your ancestral village, your parents&apos;
            town, or any community in need. NRI-friendly investment structure
            with FCRA compliance and full tax documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?category=investment">
              <Button variant="accent" size="lg">
                Schedule a Call
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto space-y-6">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="border border-gray-100 rounded-xl p-6"
            >
              <h3 className="font-bold text-dark mb-2">{item.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <section className="bg-accent text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Make an Impact?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Join our founding investor cohort. Be part of India&apos;s clean
            water revolution from Day 1.
          </p>
          <div className="mt-8">
            <Link href="/contact?category=investment">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-accent"
              >
                Express Interest Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
