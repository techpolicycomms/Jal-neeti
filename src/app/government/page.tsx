import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Shield,
  ArrowRight,
  CheckCircle,
  Zap,
  Droplets,
  MapPin,
  FileText,
  Award,
  Handshake,
  BarChart3,
  Clock,
  Wifi,
  Truck,
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
import { GOVT_SCHEMES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "For Government",
  description:
    "JalBox™ is eligible under AMRUT 2.0, JJM, SBM 2.0, and Namami Gange. HAM, DBO, and FSSM partnership models for government bodies.",
};

const PARTNERSHIP_MODELS = [
  {
    model: "Hybrid Annuity Model (HAM)",
    description:
      "Government pays 40% during construction. We finance 60%. Performance-linked annuity for 15 years with guaranteed O&M and IoT monitoring.",
    ideal: "ULBs wanting STP infrastructure with guaranteed O&M",
    note: "We can subcontract under larger HAM tenders or bid directly for small-town contracts",
    icon: BarChart3,
  },
  {
    model: "Design-Build-Operate (DBO)",
    description:
      "We design, build, and operate. You pay a monthly service fee. Zero capex for government. Performance guarantee backed by IoT monitoring.",
    ideal: "Gram Panchayats, small ULBs under SBM 2.0",
    note: "Water-as-a-Service model — pay per KL treated",
    icon: Handshake,
  },
  {
    model: "FSSM Co-Treatment Node",
    description:
      "Station a JalBox at your pumping station to receive desludged septage from vacuum trucks across the entire district. ODF+ compliance solution.",
    ideal: "Cities implementing scheduled desludging programmes",
    note: "Every JalBox has a dedicated septage receiving port with flow metering",
    icon: Truck,
  },
  {
    model: "CSR-Funded Deployment",
    description:
      "Corporates fund deployment via Ameliore Foundation (Section 8). Government provides site + permissions. Community receives clean water.",
    ideal: "Rural villages where commercial viability is low",
    note: "CSR contributions are 80G eligible via Ameliore Foundation",
    icon: Building2,
  },
];

const COMPLIANCE = [
  { parameter: "BOD", limit: "< 10 mg/L", jalbox: "< 10 mg/L", pass: true },
  { parameter: "COD", limit: "< 50 mg/L", jalbox: "< 50 mg/L", pass: true },
  { parameter: "TSS", limit: "< 20 mg/L", jalbox: "< 20 mg/L", pass: true },
  { parameter: "pH", limit: "6.5–9.0", jalbox: "7.0–8.0", pass: true },
  { parameter: "Faecal Coliform", limit: "< 100 MPN", jalbox: "< 100 MPN", pass: true },
  { parameter: "Ammonia", limit: "< 5 mg/L", jalbox: "< 5 mg/L", pass: true },
];

const COMPARISON = [
  { metric: "Cost per KLD", centralised: "₹1–2 Crore", jalbox: "₹3–4 Lakh", advantage: "70-80% cheaper" },
  { metric: "Deployment Time", centralised: "2–5 years", jalbox: "48 hours", advantage: "99% faster" },
  { metric: "Land Required", centralised: "Large plot", jalbox: "Container footprint", advantage: "90% less land" },
  { metric: "Power Source", centralised: "Grid dependent", jalbox: "Solar + battery", advantage: "Off-grid capable" },
  { metric: "Monitoring", centralised: "Manual sampling", jalbox: "Real-time IoT", advantage: "24/7 automated" },
  { metric: "National Utilisation", centralised: "~60%", jalbox: "95%+ target", advantage: "Higher uptime" },
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
              Built for Government Schemes.{" "}
              <span className="text-primary-light">
                Designed for Indian Conditions.
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              JalBox™ is eligible under AMRUT 2.0, Jal Jeevan Mission, SBM
              2.0, Namami Gange, and state-level sanitation programmes.
            </p>
          </div>
        </div>
      </section>

      {/* Scheme Alignment */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">Scheme Alignment</Badge>
          <SectionTitle>Eligible Under National Missions</SectionTitle>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {GOVT_SCHEMES.map((scheme) => (
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
      <Section>
        <SectionHeader>
          <SectionTitle>Partnership Models</SectionTitle>
          <SectionDescription>
            Flexible engagement models designed for government procurement.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PARTNERSHIP_MODELS.map((pm) => (
            <Card key={pm.model} className="p-8">
              <pm.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">{pm.model}</h3>
              <p className="text-sm text-gray-600 mb-4">{pm.description}</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    <strong>Ideal for:</strong> {pm.ideal}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">{pm.note}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Case for Decentralised */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>Why Decentralised Beats Centralised</SectionTitle>
          <SectionDescription>
            For the cost of one 10 MLD centralised STP, you can deploy 30–50
            JalBox units serving 15,000–25,000 people across multiple locations.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Metric
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Centralised STP
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  JalBox™
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Advantage
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.metric} className="border-b border-white/5">
                  <td className="py-3 px-4 text-white font-medium">
                    {row.metric}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {row.centralised}
                  </td>
                  <td className="py-3 px-4 text-primary-light font-data font-bold">
                    {row.jalbox}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success">{row.advantage}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* CPCB Compliance */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="success" className="mb-4">
            <Shield className="h-3 w-3 mr-1" />
            Compliance
          </Badge>
          <SectionTitle>CPCB 2025 Discharge Standards</SectionTitle>
          <SectionDescription>
            JalBox meets all Central Pollution Control Board norms. IoT
            monitoring provides auto-generated compliance reports for SPCB.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">
                  Parameter
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">
                  CPCB Limit
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">
                  JalBox Output
                </th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPLIANCE.map((row) => (
                <tr key={row.parameter} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-dark">
                    {row.parameter}
                  </td>
                  <td className="py-3 px-4 font-data text-gray-600">
                    {row.limit}
                  </td>
                  <td className="py-3 px-4 font-data text-primary font-bold">
                    {row.jalbox}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <CheckCircle className="h-5 w-5 text-bio mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="max-w-3xl mx-auto mt-6 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Shield, text: "Liquid Waste Management Rules 2025" },
            { icon: Wifi, text: "IoT monitoring for SPCB auto-reporting" },
            { icon: FileText, text: "We handle all CTE/CTO paperwork" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-100 text-sm text-gray-600"
            >
              <item.icon className="h-4 w-4 text-bio flex-shrink-0" />
              {item.text}
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
            <Link href="/contact?category=government">
              <Button variant="accent" size="lg">
                Government Enquiry Form
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
