import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Shield,
  ArrowRight,
  CheckCircle,
  Handshake,
  FileText,
  Award,
  Zap,
  Droplets,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "For Government",
  description:
    "Jal Neeti Technologies partners with government bodies under AMRUT 2.0, Jal Jeevan Mission, SBM 2.0, and NMCG for decentralized sewage treatment.",
};

const SCHEMES = [
  {
    name: "AMRUT 2.0",
    fullName: "Atal Mission for Rejuvenation & Urban Transformation",
    budget: "₹2.87 Lakh Crore",
    relevance: "Funds decentralized STPs in urban areas. JalBox qualifies under new STP procurement.",
  },
  {
    name: "Jal Jeevan Mission",
    fullName: "Har Ghar Jal — Rural Water Supply",
    budget: "₹3.60 Lakh Crore",
    relevance: "Greywater management component funds village-level treatment. JalBox ideal for Gram Panchayat deployments.",
  },
  {
    name: "SBM 2.0",
    fullName: "Swachh Bharat Mission (Urban)",
    budget: "₹1.41 Lakh Crore",
    relevance: "Focus on used water treatment. Mandates faecal sludge and septage management. JalBox is a turnkey solution.",
  },
  {
    name: "NMCG",
    fullName: "National Mission for Clean Ganga (Namami Gange)",
    budget: "₹20,000 Crore",
    relevance: "Funds STPs along Ganga basin. Decentralized STPs preferred for smaller drains and nallahs.",
  },
];

const PARTNERSHIP_MODELS = [
  {
    model: "Design-Build-Operate (DBO)",
    description: "We design, manufacture, deploy, and operate JalBox units on a long-term contract. The government pays a monthly O&M fee.",
    ideal: "Urban Local Bodies, Housing Boards",
  },
  {
    model: "HAM (Hybrid Annuity)",
    description: "40% upfront payment from government, 60% as annuity over contract period. Reduces government's upfront burden.",
    ideal: "State Water Boards, AMRUT projects",
  },
  {
    model: "Technology Partner",
    description: "We provide JalBox technology and training; the government or their contractor handles deployment and O&M.",
    ideal: "Large contractors, NMCG projects",
  },
  {
    model: "O&M Only",
    description: "For existing STPs that need professional operations management, monitoring upgrades, or rehabilitation.",
    ideal: "Municipalities with non-functional STPs",
  },
];

export default function GovernmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">
              <Building2 className="h-3 w-3 mr-1" />
              Government Partners
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Decentralized STPs for{" "}
              <span className="text-primary-light">India&apos;s Missions</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              JalBox™ aligns with AMRUT 2.0, Jal Jeevan Mission, SBM 2.0, and
              NMCG objectives. Rapid deployment. IoT compliance monitoring.
              Transparent operations.
            </p>
          </div>
        </div>
      </section>

      {/* Why Decentralized */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>Why Decentralized STPs?</SectionTitle>
          <SectionDescription>
            Large centralized STPs take 3–5 years to build and need extensive
            sewer networks. Decentralized JalBox units deploy in days and treat
            sewage at source.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "48-Hour Deployment",
              description: "Factory-built in containers. No civil construction. Plug-and-play commissioning.",
            },
            {
              icon: Droplets,
              title: "No Sewer Network Needed",
              description: "Treats sewage at source. Eliminates the need for expensive underground sewer infrastructure.",
            },
            {
              icon: Shield,
              title: "CPCB Compliant",
              description: "Meets all Central Pollution Control Board discharge norms. Real-time IoT compliance monitoring.",
            },
            {
              icon: MapPin,
              title: "Rural + Urban",
              description: "Modular design serves 50 to 600+ people. Works for villages, towns, and urban societies.",
            },
            {
              icon: Award,
              title: "100% Made in India",
              description: "Atmanirbhar Bharat — all components sourced from Indian manufacturers. Supports local employment.",
            },
            {
              icon: FileText,
              title: "Transparent Monitoring",
              description: "Real-time IoT dashboard accessible to regulators. Automated compliance reports to SPCB/CPCB.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-8">
              <item.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Government Schemes */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">Scheme Alignment</Badge>
          <SectionTitle>Aligned with National Missions</SectionTitle>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {SCHEMES.map((scheme) => (
            <Card key={scheme.name} className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="primary">{scheme.name}</Badge>
                <span className="font-data text-sm font-bold text-accent">
                  {scheme.budget}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{scheme.fullName}</p>
              <p className="text-sm text-gray-600">{scheme.relevance}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Partnership Models */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>Partnership Models</SectionTitle>
          <SectionDescription>
            Flexible engagement models designed for government procurement
            processes.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PARTNERSHIP_MODELS.map((model) => (
            <div
              key={model.model}
              className="rounded-2xl bg-card border border-white/10 p-6"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                {model.model}
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                {model.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-accent-light">
                <Handshake className="h-4 w-4" />
                Ideal for: {model.ideal}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-primary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore a Partnership
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Contact us to discuss how JalBox can be deployed under your
            scheme, municipality, or water board.
          </p>
          <div className="mt-8">
            <Link href="/contact?category=partnership">
              <Button variant="accent" size="lg">
                Contact for Partnership
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
