import type { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  TrendingUp,
  Droplets,
  Users,
  Zap,
  TreePine,
  ArrowRight,
  Shield,
  MapPin,
  BarChart3,
  Clock,
  Building2,
  Globe,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Transparency Dashboard",
  description:
    "Real-time impact data, fund utilization, and operational metrics from Jal Neeti Technologies. Every rupee tracked. Every litre counted.",
};

const IMPACT_METRICS = [
  { label: "Litres Treated", value: "0", icon: Droplets, color: "text-water" },
  { label: "Units Deployed", value: "0", icon: MapPin, color: "text-primary-light" },
  { label: "Households Served", value: "0", icon: Users, color: "text-bio" },
  { label: "Villages Served", value: "0", icon: MapPin, color: "text-accent" },
  { label: "Jobs Created", value: "0", icon: Users, color: "text-primary" },
  { label: "CO₂e Prevented", value: "0 t", icon: TreePine, color: "text-bio" },
  { label: "Funds Raised", value: "₹0", icon: TrendingUp, color: "text-accent" },
  { label: "Average Uptime", value: "—", icon: Zap, color: "text-water" },
];

export default function TransparencyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">
              <Eye className="h-3 w-3 mr-1" />
              Transparency
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.028em] leading-[1.03]">
              Every Rupee Tracked.{" "}
              <span className="text-primary-light">Every Litre Counted.</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Our public transparency dashboard shows real-time impact data,
              fund utilization, and operational metrics. No login required.
              Nothing hidden.
            </p>
          </div>
        </div>
      </section>

      {/* Live Metrics */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            <BarChart3 className="h-3 w-3 mr-1" />
            Live Metrics
          </Badge>
          <SectionTitle>Platform Impact Dashboard</SectionTitle>
          <SectionDescription>
            These numbers update in real-time as JalBox units are deployed
            and operational. Currently in pre-deployment phase.
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {IMPACT_METRICS.map((metric) => (
            <Card key={metric.label} className="p-6 text-center">
              <metric.icon
                className={`h-8 w-8 ${metric.color} mx-auto mb-3`}
              />
              <div className="font-data text-3xl md:text-4xl font-light tracking-tight text-dark">
                {metric.value}
              </div>
              <p className="text-sm text-gray-500 mt-1">{metric.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
          <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium">
            <Clock className="h-4 w-4" />
            Pre-deployment phase — metrics will populate as units go live
          </div>
        </div>
      </Section>

      {/* Fund Utilization */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">Fund Tracking</Badge>
          <SectionTitle>Where Your Money Goes</SectionTitle>
          <SectionDescription>
            Every investment is categorized and tracked publicly. In future
            phases, individual transactions will be blockchain-verified.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {[
              { category: "Unit Manufacturing", pct: 45, color: "bg-primary" },
              { category: "Site Deployment", pct: 20, color: "bg-water" },
              { category: "Technology & IoT", pct: 10, color: "bg-accent" },
              { category: "Team & Operations", pct: 15, color: "bg-bio" },
              { category: "Legal & Compliance", pct: 5, color: "bg-gray-400" },
              { category: "Marketing & Growth", pct: 5, color: "bg-accent-light" },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-dark">
                    {item.category}
                  </span>
                  <span className="font-data text-sm text-gray-500">
                    {item.pct}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Planned allocation. Actual utilization will be updated in
            real-time as funds are deployed.
          </p>
        </div>
      </Section>

      {/* CSR Impact Tracker */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            <Building2 className="h-3 w-3 mr-1" />
            CSR Impact Tracker
          </Badge>
          <SectionTitle>CSR-Funded Deployments</SectionTitle>
          <SectionDescription>
            Every CSR-funded JalBox deployment is tracked with real-time IoT data.
            See exactly how corporate India&apos;s CSR budgets are creating clean water impact.
          </SectionDescription>
        </SectionHeader>

        {/* Sample CSR deployment cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              company: "Sample Corporation Ltd",
              unit: "JalBox-CSR-001",
              location: "Sitapur, Uttar Pradesh",
              deployed: "Coming 2027",
              litresDaily: "—",
              cumulative: "—",
              people: "~350",
              uptime: "—",
            },
            {
              company: "Sample Industries Pvt Ltd",
              unit: "JalBox-CSR-002",
              location: "Bhagalpur, Bihar",
              deployed: "Coming 2027",
              litresDaily: "—",
              cumulative: "—",
              people: "~500",
              uptime: "—",
            },
            {
              company: "Your Company Here",
              unit: "JalBox-CSR-???",
              location: "Your chosen village",
              deployed: "Be the first",
              litresDaily: "25,000",
              cumulative: "9.1M/year",
              people: "200–500",
              uptime: "95%+ target",
            },
          ].map((dep) => (
            <Card key={dep.unit} className={`p-6 ${dep.company === "Your Company Here" ? "ring-2 ring-accent" : ""}`}>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-gray-300" />
                <span className="text-sm font-bold text-dark">{dep.company}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                {dep.unit} &middot; {dep.location} &middot; {dep.deployed}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-data text-lg font-bold text-primary">{dep.litresDaily}</p>
                  <p className="text-xs text-gray-500">Litres/day</p>
                </div>
                <div>
                  <p className="font-data text-lg font-bold text-water">{dep.cumulative}</p>
                  <p className="text-xs text-gray-500">Cumulative</p>
                </div>
                <div>
                  <p className="font-data text-lg font-bold text-bio">{dep.people}</p>
                  <p className="text-xs text-gray-500">People served</p>
                </div>
                <div>
                  <p className="font-data text-lg font-bold text-accent">{dep.uptime}</p>
                  <p className="text-xs text-gray-500">Uptime</p>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[6, 11, 12, 13].map((sdg) => (
                  <Badge key={sdg} variant="success" className="text-xs">SDG {sdg}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* CSR Leaderboard */}
        <Card className="max-w-2xl mx-auto mt-10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-accent" />
            <h3 className="font-bold text-dark">CSR Impact Leaderboard</h3>
          </div>
          <div className="text-center py-8 text-gray-400">
            <Globe className="h-10 w-10 mx-auto mb-3 text-gray-200" />
            <p className="text-sm">
              Be the first company on the leaderboard.
              <br />
              CSR deployments launching 2027.
            </p>
          </div>
          <div className="text-center mt-4">
            <Link href="/csr">
              <Button variant="accent">
                Join the Leaderboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </Section>

      {/* Commitments */}
      <Section variant="dark">
        <SectionHeader>
          <SectionTitle>Our Transparency Commitments</SectionTitle>
          <SectionDescription>
            Transparency isn&apos;t a feature — it&apos;s our operating
            principle.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Eye,
              title: "Public Dashboard",
              description: "All impact metrics visible without login. Anyone — investor, journalist, regulator — can verify our claims.",
            },
            {
              icon: Shield,
              title: "Blockchain Roadmap",
              description: "Phase 2+ will include blockchain-verified fund tracking on Polygon/Ethereum. Every transaction cryptographically proven.",
            },
            {
              icon: BarChart3,
              title: "Quarterly Reports",
              description: "Detailed quarterly reports published publicly. Financial performance, impact metrics, and operational updates.",
            },
            {
              icon: Droplets,
              title: "Live IoT Data",
              description: "When units go live, water quality and treatment data from every JalBox will be publicly accessible in real-time.",
            },
            {
              icon: Users,
              title: "Community Feedback",
              description: "Feedback from communities served is collected and published. Both positive and critical feedback, unedited.",
            },
            {
              icon: TrendingUp,
              title: "Open Data API",
              description: "Future phases will include a public API for researchers, journalists, and policymakers to access our data programmatically.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-card border border-white/10 p-6"
            >
              <item.icon className="h-8 w-8 text-primary-light mb-3" />
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-primary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Invest with Confidence
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Full transparency. Verified impact. Join the investors who know
            exactly where their money goes and what it achieves.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/invest">
              <Button variant="accent" size="lg">
                Invest Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Ask a Question
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
