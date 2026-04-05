import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  Users,
  Heart,
  Lightbulb,
  Zap,
  Leaf,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Jal Neeti team — engineers, community builders, and water professionals solving India's sewage crisis. All salaries public.",
};

const OPEN_POSITIONS = [
  {
    slug: "process-engineer",
    title: "Process Engineer",
    department: "Engineering",
    location: "Noida / Field",
    type: "Full-time",
    salary: "₹8–14 LPA",
    description:
      "Design and optimize JalBox treatment processes using BioNeer™ components. Commission units on-site, validate CPCB compliance, and refine coconut coir / terracotta / vetiver systems.",
    featured: true,
  },
  {
    slug: "iot-engineer",
    title: "IoT Engineer",
    department: "Technology",
    location: "Noida / Remote",
    type: "Full-time",
    salary: "₹10–16 LPA",
    description:
      "Build the ESP32-based IoT gateway, MQTT telemetry pipeline, and real-time monitoring dashboard. Sensor integration, edge computing, and OTA firmware updates.",
    featured: true,
  },
  {
    slug: "fullstack-developer",
    title: "Full-Stack Developer",
    department: "Technology",
    location: "Remote / Noida",
    type: "Full-time",
    salary: "₹12–20 LPA",
    description:
      "Build the Jal Neeti platform — WaaS operations dashboard, investor portal, IoT data visualization, public transparency engine, and admin tools.",
    featured: true,
  },
  {
    slug: "operations-associate",
    title: "Operations Associate",
    department: "Operations",
    location: "Noida",
    type: "Full-time",
    salary: "₹6–10 LPA",
    description:
      "Manage unit manufacturing coordination, deployment logistics, maintenance scheduling, vendor management, and supply chain across all active sites.",
    featured: false,
  },
  {
    slug: "jal-mitra-coordinator",
    title: "Jal Mitra Coordinator",
    department: "Community & Rural",
    location: "Uttar Pradesh / Bihar",
    type: "Full-time",
    salary: "₹5–8 LPA",
    description:
      "Recruit, train, and manage Jal Mitra (water guardian) network across deployments. Coordinate with Gram Panchayats and ensure community ownership of JalBox units.",
    featured: false,
  },
  {
    slug: "rd-intern",
    title: "R&D Intern",
    department: "Engineering",
    location: "Noida",
    type: "Internship (6 months)",
    salary: "₹15–25K/month",
    description:
      "Work on BioNeer™ material testing, bio-media performance optimization, and treatment process R&D. Ideal for environmental / civil engineering students.",
    featured: false,
  },
  {
    slug: "government-relations",
    title: "Government Relations & BD Manager",
    department: "Sales & Partnerships",
    location: "Noida / Delhi",
    type: "Full-time",
    salary: "₹8–14 LPA",
    description:
      "Track AMRUT 2.0 / JJM / SBM 2.0 tenders, prepare bids, manage HAM/DBO partnerships, and build relationships with ULBs and state water boards.",
    featured: false,
  },
];

const CULTURE_POINTS = [
  {
    icon: Heart,
    title: "Mission-Driven",
    description: "Every role directly contributes to solving India's water crisis. This isn't just a job — it's purpose.",
  },
  {
    icon: Lightbulb,
    title: "Builder Culture",
    description: "We're pre-revenue. If you like building 0→1, wearing multiple hats, and moving fast — you'll thrive.",
  },
  {
    icon: Users,
    title: "Salary Transparency",
    description: "Every job listing shows the salary band. No negotiation games. Fair pay for everyone.",
  },
  {
    icon: Zap,
    title: "Real Impact",
    description: "See your work deployed in the field. Meet the communities you serve. Watch the water flow clean.",
  },
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "We practice what we preach — minimal travel, digital-first operations, and a zero-waste mindset.",
  },
  {
    icon: Briefcase,
    title: "ESOP for All",
    description: "Every full-time employee receives stock options. When Jal Neeti wins, you win.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">Careers</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Build India&apos;s{" "}
              <span className="text-primary-light">Water Future</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              We&apos;re assembling a founding team of engineers, community
              builders, and water professionals. All salaries transparent. ESOP
              for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            {OPEN_POSITIONS.length} Open Roles
          </Badge>
          <SectionTitle>Current Openings</SectionTitle>
          <SectionDescription>
            We&apos;re hiring across engineering, operations, community, and
            technology. Every role is critical to our mission.
          </SectionDescription>
        </SectionHeader>

        <div className="space-y-4 max-w-4xl mx-auto">
          {OPEN_POSITIONS.map((position) => (
            <Link
              key={position.slug}
              href={`/careers/${position.slug}`}
              className="block"
            >
              <Card className="p-6 hover:border-primary/30 transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                        {position.title}
                      </h3>
                      {position.featured && (
                        <Badge variant="accent">Featured</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {position.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {position.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-data text-sm font-bold text-primary">
                      {position.salary}
                    </span>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Culture */}
      <Section>
        <SectionHeader>
          <SectionTitle>Why Join Jal Neeti?</SectionTitle>
          <SectionDescription>
            We&apos;re not a typical startup. We&apos;re a mission-driven
            company building real infrastructure that changes real lives.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CULTURE_POINTS.map((point) => (
            <Card key={point.title} className="p-8">
              <point.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">
                {point.title}
              </h3>
              <p className="text-gray-600">{point.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Jal Mitra */}
      <Section variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <Users className="h-12 w-12 text-primary-light mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Jal Mitra Program
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Not a desk job? Our Jal Mitra (Water Guardian) program trains
            local community members to operate and maintain JalBox units.
            Dignified employment at the village level with training,
            certification, and monthly stipend.
          </p>
          <Link href="/contact?category=careers">
            <Button variant="accent" size="lg">
              Learn About Jal Mitra
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section variant="light">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-dark mb-4">
            Don&apos;t See Your Role?
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;re always looking for passionate people. Send us your
            resume and tell us how you can contribute to the clean water
            mission.
          </p>
          <Link href="/contact?category=careers">
            <Button size="lg">
              Send Open Application
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
