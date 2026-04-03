import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplicationForm } from "./application-form";

// In production, these would come from the database
const POSITIONS: Record<
  string,
  {
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
    benefits: string[];
  }
> = {
  "water-treatment-engineer": {
    title: "Water Treatment Engineer",
    department: "Engineering",
    location: "New Delhi / Field",
    type: "Full-time",
    salary: "₹8–14 LPA",
    description:
      "We're looking for a Water Treatment Engineer to design, optimize, and commission JalBox sewage treatment plants. You'll work hands-on with our BioNeer components — coconut coir bio-media, terracotta diffusers, vetiver wetlands — and ensure every unit meets CPCB discharge standards.",
    responsibilities: [
      "Design and optimize MBBR, ABR, and polishing stage treatment processes",
      "Commission JalBox units on-site and conduct performance testing",
      "Monitor water quality data via IoT dashboard and recommend process adjustments",
      "Develop and improve BioNeer component performance (coir media, terracotta diffusers)",
      "Prepare CPCB/SPCB compliance documentation and test reports",
      "Train Jal Mitras on daily operations and basic troubleshooting",
      "Collaborate with IoT team on sensor calibration and alert threshold tuning",
    ],
    requirements: [
      "B.Tech/M.Tech in Environmental Engineering, Chemical Engineering, or related field",
      "2+ years experience in STP/ETP design, commissioning, or operations",
      "Knowledge of biological wastewater treatment (MBBR, MBR, SBR, ABR)",
      "Familiarity with CPCB/SPCB discharge norms and regulatory compliance",
      "Willingness to travel 40-50% of time for field deployments",
      "Hindi + English fluency required",
    ],
    niceToHave: [
      "Experience with decentralized/containerized STPs",
      "Knowledge of constructed wetland systems",
      "Experience with SCADA or IoT-based monitoring systems",
      "Familiarity with biogas generation and utilization",
    ],
    benefits: [
      "Competitive salary with annual revision",
      "ESOP (stock options) from day 1",
      "Health insurance for you and family",
      "Annual site visit budget",
      "Professional development budget",
      "Flexible work arrangement (office + field)",
    ],
  },
  "iot-embedded-engineer": {
    title: "IoT & Embedded Systems Engineer",
    department: "Technology & IoT",
    location: "New Delhi",
    type: "Full-time",
    salary: "₹10–16 LPA",
    description:
      "Build the brain of JalBox — our ESP32-based IoT gateway that monitors 15+ water quality and operational parameters in real-time. You'll design the hardware, firmware, MQTT pipeline, and data ingestion system.",
    responsibilities: [
      "Design and develop ESP32-based IoT gateway firmware (C/C++, Arduino/ESP-IDF)",
      "Integrate water quality sensors (pH, DO, turbidity, flow meters, pressure)",
      "Build MQTT data pipeline from gateway to Supabase via Edge Functions",
      "Implement OTA firmware update system for remote unit management",
      "Design power management for solar + battery operation",
      "Develop edge computing logic for local alerting and data buffering",
      "Collaborate with water treatment team on sensor placement and calibration",
    ],
    requirements: [
      "B.Tech in Electronics, Electrical, CS, or related field",
      "3+ years experience with embedded systems (ESP32, Arduino, STM32)",
      "Proficiency in C/C++ for firmware development",
      "Experience with MQTT, HTTP/REST, and IoT protocols",
      "Knowledge of sensor interfacing (I2C, SPI, UART, 4-20mA, RS485/Modbus)",
      "Basic PCB design skills (KiCad or equivalent)",
    ],
    niceToHave: [
      "Experience with water quality monitoring systems",
      "Knowledge of solar charge controllers and battery management",
      "Experience with LoRaWAN or NB-IoT",
      "Familiarity with TimescaleDB or time-series databases",
      "Experience with React/Next.js for dashboard development",
    ],
    benefits: [
      "Competitive salary with annual revision",
      "ESOP (stock options) from day 1",
      "Health insurance for you and family",
      "Home office setup budget",
      "Conference and learning budget",
      "Flexible hours",
    ],
  },
  "community-engagement-lead": {
    title: "Community Engagement Lead",
    department: "Community & Rural",
    location: "Uttar Pradesh / Bihar",
    type: "Full-time",
    salary: "₹6–10 LPA",
    description:
      "Lead community engagement for JalBox deployments in rural India. You'll work directly with Gram Panchayats, train Jal Mitras, and ensure that every deployment has genuine community ownership.",
    responsibilities: [
      "Lead community engagement for JalBox rural deployments",
      "Coordinate with Gram Panchayats, Block Development Officers, and Zila Parishads",
      "Recruit, train, and manage Jal Mitra water guardians",
      "Conduct community awareness sessions on water treatment and hygiene",
      "Collect and document community feedback and impact stories",
      "Coordinate with government schemes (JJM, SBM, AMRUT) for subsidy linkage",
      "Report on community engagement metrics and social impact",
    ],
    requirements: [
      "Bachelor's degree in Social Work, Rural Development, or related field",
      "3+ years experience in community development, rural projects, or NGO work",
      "Strong network in UP/Bihar government and development sector",
      "Hindi fluency required; Bhojpuri/Awadhi is a strong plus",
      "Willingness to travel extensively in rural areas (60-70%)",
      "Experience with government schemes and subsidy processes",
    ],
    niceToHave: [
      "Experience in WASH (Water, Sanitation, Hygiene) sector",
      "Knowledge of Jal Jeevan Mission and SBM implementation",
      "Experience training community health workers or similar",
      "Photography/videography skills for impact documentation",
    ],
    benefits: [
      "Competitive salary with annual revision",
      "ESOP (stock options) from day 1",
      "Health insurance for you and family",
      "Travel and field allowance",
      "Local language training support",
      "Impact bonus based on deployment success",
    ],
  },
  "fullstack-developer": {
    title: "Full Stack Developer",
    department: "Technology & IoT",
    location: "Remote / New Delhi",
    type: "Full-time",
    salary: "₹12–20 LPA",
    description:
      "Build the Jal Neeti platform from the ground up — the investor portal, IoT monitoring dashboard, operations hub, and public transparency engine. You'll work with Next.js, TypeScript, Supabase, and real-time data from JalBox IoT systems.",
    responsibilities: [
      "Build and maintain the Jal Neeti platform (Next.js 14+, TypeScript, Supabase)",
      "Develop the IoT monitoring dashboard with real-time data visualization",
      "Build the investor portal with fund tracking and impact reporting",
      "Create the admin panel for CRM, tender tracking, and operations management",
      "Implement Mapbox-based geographic visualizations",
      "Build the public transparency dashboard with live metrics",
      "Integrate payment systems (Razorpay, Stripe) for investments",
    ],
    requirements: [
      "3+ years of full-stack web development experience",
      "Proficiency in TypeScript, React, Next.js (App Router)",
      "Experience with PostgreSQL and Supabase (or similar BaaS)",
      "Knowledge of real-time systems (WebSockets, Server-Sent Events)",
      "Experience with data visualization libraries (Recharts, D3, Tremor)",
      "Understanding of authentication, authorization, and Row Level Security",
    ],
    niceToHave: [
      "Experience with Mapbox GL JS or similar mapping libraries",
      "Knowledge of MQTT and IoT data pipelines",
      "Experience with blockchain integration (ethers.js)",
      "Familiarity with Tailwind CSS and shadcn/ui",
      "Experience building dashboards for operational monitoring",
    ],
    benefits: [
      "Competitive salary with annual revision",
      "ESOP (stock options) from day 1",
      "Health insurance for you and family",
      "Remote-first with optional office access",
      "Home office setup budget (₹50K)",
      "Conference and learning budget",
    ],
  },
  "operations-manager": {
    title: "Operations Manager",
    department: "Operations",
    location: "New Delhi",
    type: "Full-time",
    salary: "₹8–14 LPA",
    description:
      "Manage the end-to-end operations of JalBox manufacturing, deployment, and maintenance. From vendor coordination to field logistics to maintenance scheduling.",
    responsibilities: [
      "Manage JalBox unit manufacturing and assembly process",
      "Coordinate vendor relationships and procurement",
      "Plan and execute site deployments and commissioning",
      "Manage maintenance schedules and work order system",
      "Track inventory, spare parts, and supply chain",
      "Ensure quality control at every stage of production",
      "Report on operational KPIs and cost optimization",
    ],
    requirements: [
      "Bachelor's degree in Engineering, Operations, or Business",
      "3+ years in operations management (manufacturing, infrastructure, or utilities)",
      "Strong project management and vendor coordination skills",
      "Experience with inventory management and supply chain",
      "Hindi + English fluency",
      "Willingness to travel for site deployments (30%)",
    ],
    niceToHave: [
      "Experience in water/wastewater industry",
      "Knowledge of containerized or modular manufacturing",
      "Experience with ERP or operations management software",
      "Six Sigma or lean manufacturing certification",
    ],
    benefits: [
      "Competitive salary with annual revision",
      "ESOP (stock options) from day 1",
      "Health insurance for you and family",
      "Travel allowance for site visits",
      "Professional development budget",
    ],
  },
  "government-relations-manager": {
    title: "Government Relations & Tender Manager",
    department: "Sales & Partnerships",
    location: "New Delhi",
    type: "Full-time",
    salary: "₹8–14 LPA",
    description:
      "Track government tenders, prepare competitive bids, manage regulatory approvals, and build relationships with government stakeholders across water and sanitation departments.",
    responsibilities: [
      "Monitor tender portals (GeM, CPPP, state portals) for relevant opportunities",
      "Prepare and submit competitive bid documents",
      "Build relationships with state water boards, urban bodies, and rural departments",
      "Track government schemes (AMRUT 2.0, JJM, SBM, NMCG) for partnership opportunities",
      "Manage regulatory approvals (CTE, CTO, environmental clearances)",
      "Represent Jal Neeti at government events and industry conferences",
      "Maintain the tender pipeline and win/loss analysis",
    ],
    requirements: [
      "Bachelor's degree in Engineering, Public Policy, or Business",
      "3+ years in government relations, tender management, or BD in infrastructure",
      "Strong understanding of Indian government procurement processes",
      "Experience with GeM portal and e-tendering systems",
      "Hindi + English fluency; knowledge of regional languages preferred",
      "Strong communication and presentation skills",
    ],
    niceToHave: [
      "Experience in water/sanitation sector government projects",
      "Network within MoHUA, MoJS, NMCG, or state water departments",
      "Knowledge of CSR regulations and corporate partnership structures",
      "Experience with PPP (Public-Private Partnership) models",
    ],
    benefits: [
      "Competitive salary with annual revision",
      "ESOP (stock options) from day 1",
      "Health insurance for you and family",
      "Travel and representation budget",
      "Performance bonus on tender wins",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POSITIONS).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // We need to resolve params - for generateMetadata we return a promise
  return params.then(({ slug }) => {
    const position = POSITIONS[slug];
    if (!position) return { title: "Position Not Found" };
    return {
      title: position.title,
      description: position.description,
    };
  });
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const position = POSITIONS[slug];

  if (!position) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="bg-dark text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary-light mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {position.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-primary-light" />
              {position.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary-light" />
              {position.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary-light" />
              {position.type}
            </span>
            <Badge variant="accent">{position.salary}</Badge>
          </div>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">About the Role</h2>
              <p className="text-gray-600 leading-relaxed">{position.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {position.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">Requirements</h2>
              <ul className="space-y-3">
                {position.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">Nice to Have</h2>
              <ul className="space-y-3">
                {position.niceToHave.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">Benefits</h2>
              <ul className="space-y-3">
                {position.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-bio mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar — Application Form */}
          <div>
            <Card className="p-6 sticky top-20">
              <h3 className="text-xl font-bold text-dark mb-4">Apply Now</h3>
              <ApplicationForm jobTitle={position.title} jobSlug={slug} />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
