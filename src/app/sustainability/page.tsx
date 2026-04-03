import type { Metadata } from "next";
import Link from "next/link";
import {
  Leaf,
  Recycle,
  Sun,
  TreePine,
  Droplets,
  ArrowRight,
  Zap,
  Globe,
  Heart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SDG_GOALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "How JalBox™ addresses climate change, water scarcity, and rural employment through sustainable, circular-economy sewage treatment.",
};

export default function SustainabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="success" className="mb-4">
              <Leaf className="h-3 w-3 mr-1" />
              Sustainability
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Water Treatment as{" "}
              <span className="text-bio">Climate Action</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Every JalBox™ deployed is a step toward cleaner rivers, reduced
              methane emissions, green jobs, and a circular water economy.
            </p>
          </div>
        </div>
      </section>

      {/* Climate Case */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>The Climate Case for Decentralized STPs</SectionTitle>
          <SectionDescription>
            Untreated sewage is one of India&apos;s largest sources of methane —
            a greenhouse gas 80x more potent than CO₂ over 20 years.
            Treating sewage isn&apos;t just sanitation — it&apos;s climate action.
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: TreePine,
              title: "Methane Capture",
              description:
                "Our anaerobic baffled reactor captures methane as biogas instead of releasing it into the atmosphere.",
            },
            {
              icon: Sun,
              title: "Zero-Carbon Energy",
              description:
                "Solar-powered operations with battery backup means zero Scope 2 emissions from electricity.",
            },
            {
              icon: Recycle,
              title: "Circular Economy",
              description:
                "Treated water, biogas, fertilizer, vetiver oil — every output becomes an input somewhere else.",
            },
            {
              icon: Globe,
              title: "Carbon Credits",
              description:
                "Verified methane reduction generates carbon credits under Gold Standard and Verra methodologies.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-8 text-center">
              <item.icon className="h-10 w-10 text-bio mx-auto mb-4" />
              <h3 className="text-lg font-bold text-dark mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Circular Economy */}
      <Section>
        <SectionHeader>
          <Badge variant="primary" className="mb-4">Circular Economy</Badge>
          <SectionTitle>Nothing is Waste</SectionTitle>
          <SectionDescription>
            JalBox™ transforms sewage into 5 valuable outputs — creating
            revenue while solving pollution.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              input: "Raw Sewage",
              output: "Treated Water",
              use: "Landscaping, flushing, construction, irrigation",
              icon: Droplets,
              color: "text-water",
            },
            {
              input: "Organic Load",
              output: "Biogas",
              use: "Cooking fuel, electricity generation, vehicle fuel",
              icon: Zap,
              color: "text-accent",
            },
            {
              input: "Settled Sludge",
              output: "Organic Fertilizer",
              use: "Soil enrichment, nursery composting",
              icon: Leaf,
              color: "text-bio",
            },
            {
              input: "Vetiver Grass",
              output: "Vetiver Essential Oil",
              use: "Perfumery, aromatherapy, export commodity",
              icon: Heart,
              color: "text-primary",
            },
            {
              input: "Methane Prevention",
              output: "Carbon Credits",
              use: "Tradeable on voluntary carbon markets",
              icon: TreePine,
              color: "text-bio",
            },
          ].map((item) => (
            <div
              key={item.output}
              className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100"
            >
              <item.icon className={`h-10 w-10 ${item.color} flex-shrink-0`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-400">{item.input}</span>
                  <ArrowRight className="h-4 w-4 text-gray-300" />
                  <span className="font-bold text-dark">{item.output}</span>
                </div>
                <p className="text-sm text-gray-600">{item.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SDG Alignment */}
      <Section variant="dark">
        <SectionHeader>
          <Badge variant="water" className="mb-4">UN SDGs</Badge>
          <SectionTitle>Aligned with Global Goals</SectionTitle>
          <SectionDescription>
            JalBox™ directly contributes to 6 of the 17 UN Sustainable
            Development Goals.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SDG_GOALS.map((sdg) => (
            <div
              key={sdg.number}
              className="rounded-2xl bg-card border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary-light/20 flex items-center justify-center font-data font-bold text-primary-light text-lg">
                  {sdg.number}
                </div>
                <h3 className="font-bold text-white">{sdg.title}</h3>
              </div>
              <p className="text-sm text-gray-400">{sdg.relevance}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Social Impact */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">Social Impact</Badge>
          <SectionTitle>Water Equity for All</SectionTitle>
          <SectionDescription>
            Our mission goes beyond technology — it&apos;s about ensuring every
            community, regardless of wealth or location, has access to clean
            water.
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Jal Mitra Program",
              description:
                "We train local community members as Jal Mitras — water guardians who operate and maintain JalBox units. Dignified employment at the village level.",
            },
            {
              icon: Heart,
              title: "Cross-Subsidy Model",
              description:
                "Revenue from urban commercial deployments subsidizes rural installations. Every urban JalBox helps fund a village unit.",
            },
            {
              icon: Globe,
              title: "Open Data Commitment",
              description:
                "All impact data is publicly available. Water quality metrics, financial utilization, and deployment status — transparent to everyone.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-8">
              <item.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-bio text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Invest in India&apos;s Water Future
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Every rupee invested in JalBox™ creates measurable environmental
            and social impact — with financial returns.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/invest">
              <Button variant="accent" size="lg">
                Explore Investment
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/transparency">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-bio"
              >
                View Impact Data
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
