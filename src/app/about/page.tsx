import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  Target,
  Heart,
  Users,
  Award,
  Calendar,
  MapPin,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Jal Neeti Technologies — founded to solve India's sewage crisis with indigenous innovation, transparency, and community-first deployment.",
};

const TIMELINE = [
  {
    year: "2025",
    quarter: "Q3",
    title: "Ideation & Research",
    description: "Deep research into India's sewage crisis. Identified the gap: no affordable, indigenous, containerized STP existed.",
  },
  {
    year: "2025",
    quarter: "Q4",
    title: "BioNeer™ Concept",
    description: "Developed the BioNeer design philosophy — replacing every imported component with Indian alternatives.",
  },
  {
    year: "2026",
    quarter: "Q1",
    title: "Company Incorporated",
    description: "Jal Neeti Technologies Pvt Ltd incorporated. Seed funding round initiated for diaspora investors.",
  },
  {
    year: "2026",
    quarter: "Q2",
    title: "Prototype Development",
    description: "First JalBox 10 prototype under development. IoT gateway design finalized. Vendor partnerships established.",
  },
  {
    year: "2026",
    quarter: "Q3",
    title: "Pilot Deployment",
    description: "Target: First pilot deployment in Uttar Pradesh. Community engagement and Jal Mitra training begins.",
  },
  {
    year: "2027",
    quarter: "Q1",
    title: "Commercial Launch",
    description: "Full product line launch. Government tender participation. Scale deployment across UP and Bihar.",
  },
];

const VALUES = [
  {
    icon: Heart,
    title: "Water as a Right",
    description: "Clean water isn't a luxury. Every community deserves access to treated water, regardless of economic status.",
  },
  {
    icon: Lightbulb,
    title: "Indigenous Innovation",
    description: "India doesn't need imported solutions. Our BioNeer™ design proves that local materials can outperform imports.",
  },
  {
    icon: Target,
    title: "Radical Transparency",
    description: "Every rupee tracked. Every litre measured. Every impact reported. Our public dashboards hide nothing.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Technology deployed without community ownership fails. Our Jal Mitra program ensures local stewardship.",
  },
  {
    icon: Award,
    title: "Operational Excellence",
    description: "IoT monitoring, predictive maintenance, and professional O&M ensure 95%+ uptime across all units.",
  },
  {
    icon: Building2,
    title: "Sustainable Business",
    description: "Charity doesn't scale. Our DBO model with 5 revenue streams creates a self-sustaining business that grows impact.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Born from Crisis.{" "}
              <span className="text-primary-light">Built for Impact.</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              {BRAND.company} is an Indian social enterprise on a mission to
              make decentralized sewage treatment affordable, accessible, and
              transparent for every community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <Section variant="light">
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-10">
            <Badge variant="primary" className="mb-4">Our Mission</Badge>
            <h2 className="text-2xl font-bold text-dark mb-4">
              Clean Water for Every Community
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To deploy affordable, IoT-monitored, solar-powered sewage
              treatment systems across India — starting with the communities
              that need it most. We believe technology should serve the
              underserved, not just the wealthy.
            </p>
          </Card>
          <Card className="p-10">
            <Badge variant="accent" className="mb-4">Our Vision</Badge>
            <h2 className="text-2xl font-bold text-dark mb-4">
              Zero Untreated Sewage by 2040
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A future where no river in India carries untreated sewage. Where
              every housing society and village has access to professional-grade
              water treatment. Where waste becomes wealth and water is
              recycled, not wasted.
            </p>
          </Card>
        </div>
      </Section>

      {/* Founder Story */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">The Story</Badge>
          <SectionTitle>Why Jal Neeti Exists</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto prose prose-lg text-gray-600">
          <p>
            India generates 72 billion litres of sewage every day. Only 28% is
            treated. The rest — nearly 52 billion litres — flows directly into
            our rivers, groundwater, and communities. This isn&apos;t a
            statistics problem. It&apos;s a human crisis.
          </p>
          <p>
            Conventional STPs cost crores, take years to build, require grid
            power, and need specialized operators. They work for Tier-1 cities
            with budgets and engineers. But what about the 6,000+ towns and
            600,000+ villages that lack both?
          </p>
          <p>
            Jal Neeti was founded with a radical premise: what if we could
            build a sewage treatment plant in a shipping container, power it
            with solar, monitor it with IoT, and staff it with locally trained
            Jal Mitras — using only Indian-sourced materials?
          </p>
          <p>
            That premise became JalBox™. And the design philosophy of replacing
            every imported component with an Indian alternative became
            BioNeer™. Today, we&apos;re building India&apos;s first truly
            indigenous, decentralized water treatment platform.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>Our Values</SectionTitle>
          <SectionDescription>
            These aren&apos;t wall posters. They&apos;re operating principles
            that guide every decision.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl bg-card border border-white/10 p-6"
            >
              <value.icon className="h-8 w-8 text-primary-light mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            <Calendar className="h-3 w-3 mr-1" />
            Journey
          </Badge>
          <SectionTitle>Our Timeline</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto">
          {TIMELINE.map((item, i) => (
            <div key={item.title} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-16 flex-shrink-0 text-center">
                  <span className="font-data text-sm font-bold text-primary">
                    {item.year}
                  </span>
                  <br />
                  <span className="font-data text-xs text-gray-400">
                    {item.quarter}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center mx-2">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                {i < TIMELINE.length - 1 && (
                  <div className="w-0.5 flex-1 bg-primary/20 mt-1" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-bold text-dark">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Team Placeholder */}
      <Section>
        <SectionHeader>
          <Badge variant="primary" className="mb-4">Team</Badge>
          <SectionTitle>Building the Founding Team</SectionTitle>
          <SectionDescription>
            We&apos;re assembling a world-class team of engineers, community
            builders, and water professionals. Interested in joining?
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { role: "Founder & CEO", dept: "Leadership" },
            { role: "CTO", dept: "Technology & IoT" },
            { role: "Head of Operations", dept: "Operations" },
            { role: "Head of Community", dept: "Community & Rural" },
          ].map((position) => (
            <Card key={position.role} className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="font-bold text-dark">{position.role}</h3>
              <p className="text-sm text-gray-500">{position.dept}</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/careers">
            <Button size="lg">
              View Open Positions
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Location */}
      <Section variant="light">
        <div className="text-center max-w-2xl mx-auto">
          <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark mb-2">
            Based in New Delhi, Deploying Across India
          </h2>
          <p className="text-gray-600">
            Headquarters in New Delhi. Manufacturing partners across India.
            First deployments targeted for Uttar Pradesh and Bihar — two of
            India&apos;s most water-stressed states.
          </p>
        </div>
      </Section>
    </>
  );
}
