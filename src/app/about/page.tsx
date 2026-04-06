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
  Globe,
  ExternalLink,
  Shield,
  CheckCircle,
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
import { BRAND, SDG_GOALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Jal Neeti Technologies — Water Policy in Action. Incubated by Ameliore Foundation, building India's indigenous water infrastructure.",
};

const TIMELINE = [
  { period: "2026 Q2", title: "Jal Neeti Challenge launched", description: "National competition to crowdsource R&D for Indian bio-treatment materials." },
  { period: "2026 Q3", title: "UNEP partnership (pending)", description: "Knowledge partnership with UNEP India for competition and research validation." },
  { period: "2026 Q4", title: "Company incorporation", description: "Jal Neeti Technologies Pvt Ltd registered. First seed investment round." },
  { period: "2027 Q1", title: "First prototype", description: "JalBox 25 prototype built with competition-validated BioNeer designs." },
  { period: "2027 Q2", title: "First deployments", description: "Pilot in Noida (urban) and Chhatauni, Bihar (rural). Real data, real impact." },
  { period: "2028", title: "Scale", description: "25 units deployed across UP and Bihar. Series A fundraise." },
  { period: "2031", title: "300 units", description: "300 JalBox units operational. Water-as-a-Service platform serving 150,000+ people." },
];

const VALUES = [
  { icon: Heart, title: "Water as a Right", description: "Clean water isn't a luxury. Every community deserves access, regardless of economic status or location." },
  { icon: Lightbulb, title: "Indigenous Innovation", description: "India doesn't need imported solutions. BioNeer™ proves local materials can outperform imports at a fraction of the cost." },
  { icon: Target, title: "Radical Transparency", description: "Every rupee tracked. Every litre measured. Every impact reported. Our public dashboards hide nothing." },
  { icon: Users, title: "Community Ownership", description: "Technology without community ownership fails. Our Jal Mitra program ensures local stewardship of every unit." },
  { icon: Award, title: "Operational Excellence", description: "IoT monitoring, predictive maintenance, and professional O&M ensure 95%+ uptime across all deployments." },
  { icon: Building2, title: "Sustainable Business", description: "Charity doesn't scale. Our Water-as-a-Service model creates self-sustaining revenue that grows impact." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.028em] leading-[1.03]">
              Water Policy{" "}
              <span className="text-primary-light">in Action</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              <em>Jal Neeti</em> (जल नीति) means Water Wisdom. We use policy
              insight to deliver water infrastructure that actually works for
              India.
            </p>
          </div>
        </div>
      </section>

      {/* The Story */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">The Story</Badge>
          <SectionTitle>Why Jal Neeti Exists</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>
            India generates over 72,000 MLD of sewage every day. Only 28% is
            treated. The rest — nearly 52,000 MLD — flows directly into rivers,
            groundwater, and communities. This isn&apos;t a statistics problem.
            It&apos;s a human crisis affecting 600,000 villages.
          </p>
          <p>
            Centralised STPs have failed. They take 3–5 years to build, cost
            crores, require grid power, and need specialised operators. They
            work for Tier-1 cities with budgets and engineers. But what about
            the thousands of towns and hundreds of thousands of villages that
            lack both?
          </p>
          <p>
            We asked: <strong>What if a complete STP could arrive on a truck?</strong>{" "}
            What if every component was Made in India? What if IoT could replace
            expensive PLCs? What if sewage was a resource, not waste? What if
            you could subscribe to clean water like you subscribe to broadband?
          </p>
          <p>
            That premise became <strong>{BRAND.product}</strong>. The design
            philosophy of replacing every imported component with an Indian
            alternative became <strong>{BRAND.innovation}</strong>. And the
            business model of owning and operating units while charging for
            treated water became <strong>Water-as-a-Service</strong>.
          </p>
        </div>
      </Section>

      {/* Team */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">Team</Badge>
          <SectionTitle>The People Behind the Mission</SectionTitle>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Founder */}
          <Card className="p-6 text-center sm:col-span-2 lg:col-span-1 ring-2 ring-primary/20">
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-dark">{BRAND.founderName}</h3>
            <p className="text-sm text-primary font-medium">Founder & CEO</p>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              ITU Geneva alumnus. Digital transformation researcher (PhD).
              Bihar roots. Bridging the digital divide and the water divide.
            </p>
            <a
              href="https://linkedin.com/in/r-jha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-3"
            >
              LinkedIn <ExternalLink className="h-3 w-3" />
            </a>
          </Card>

          {/* Hiring placeholders */}
          {[
            { role: "CTO", dept: "Technology & IoT" },
            { role: "Head of Engineering", dept: "Engineering" },
            { role: "Head of Operations", dept: "Operations" },
          ].map((pos) => (
            <Card key={pos.role} className="p-6 text-center relative">
              <div className="absolute top-3 right-3">
                <Badge variant="accent">Hiring</Badge>
              </div>
              <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="font-bold text-dark">{pos.role}</h3>
              <p className="text-sm text-gray-500">{pos.dept}</p>
              <Link href="/careers" className="mt-3 inline-block">
                <Button variant="ghost" size="sm">
                  View Role
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Ameliore Foundation */}
      <Section>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" className="mb-4">Incubator</Badge>
            <h2 className="text-3xl font-bold text-dark mb-4">
              {BRAND.foundation}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Jal Neeti Technologies is incubated by {BRAND.foundation}, a
              Section 8 Company focused on education, environmental innovation,
              and sustainable development.
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "R&D for indigenous water treatment materials",
                "Jal Neeti Challenge — national engineering competition",
                "Jal Mitra training & certification programme",
                "Academic partnerships with IITs and NITs",
                "CSR fund management (80G eligible)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-8 bg-gray-50">
            <h3 className="font-bold text-dark mb-3">Legal Structure</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="p-3 rounded-lg bg-white border border-gray-100">
                <p className="font-bold text-primary">{BRAND.foundation}</p>
                <p>Section 8 Company (non-profit arm)</p>
                <p className="text-xs text-gray-400 mt-1">
                  R&D, competitions, training, CSR management
                </p>
              </div>
              <div className="text-center text-gray-300">↕ incubates</div>
              <div className="p-3 rounded-lg bg-white border border-primary/20">
                <p className="font-bold text-primary">{BRAND.company}</p>
                <p>Private Limited (commercial arm)</p>
                <p className="text-xs text-gray-400 mt-1">
                  Manufacturing, deployment, WaaS operations, revenue
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Values */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>Our Values</SectionTitle>
          <SectionDescription>
            Operating principles, not wall posters.
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
            Roadmap
          </Badge>
          <SectionTitle>Our Journey</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto">
          {TIMELINE.map((item, i) => (
            <div key={item.period} className="flex gap-6 mb-6 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                {i < TIMELINE.length - 1 && (
                  <div className="w-0.5 flex-1 bg-primary/20 mt-1" />
                )}
              </div>
              <div className="pb-6">
                <span className="font-data text-sm font-bold text-primary">
                  {item.period}
                </span>
                <h3 className="font-bold text-dark mt-0.5">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SDG Alignment */}
      <Section>
        <SectionHeader>
          <Badge variant="success" className="mb-4">
            <Globe className="h-3 w-3 mr-1" />
            UN SDGs
          </Badge>
          <SectionTitle>Aligned with Global Goals</SectionTitle>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {SDG_GOALS.map((sdg) => (
            <div
              key={sdg.number}
              className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center font-data font-bold text-primary text-lg flex-shrink-0">
                {sdg.number}
              </div>
              <div>
                <h3 className="font-bold text-dark text-sm">{sdg.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {sdg.relevance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section variant="light">
        <div className="text-center max-w-2xl mx-auto">
          <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark mb-2">
            Geneva Today. Noida Tomorrow. India Always.
          </h2>
          <p className="text-gray-600">
            Currently based in Geneva with India operations launching in 2026.
            First deployments targeted for Noida (UP) and Chhatauni (Bihar).
          </p>
          <Link href="/careers" className="mt-6 inline-block">
            <Button size="lg">
              Join the Founding Team
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
