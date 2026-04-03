import Link from "next/link";
import Image from "next/image";
import {
  Droplets,
  Sun,
  Wifi,
  Leaf,
  TrendingUp,
  Users,
  Shield,
  ArrowRight,
  ChevronRight,
  Zap,
  Recycle,
  Building2,
  TreePine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND, JALBOX_MODELS, TREATMENT_STAGES } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-dark text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-water rounded-full blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-6 text-sm">
                <Droplets className="h-3 w-3 mr-1" />
                India&apos;s First 100% Indigenous Containerized STP
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                <span className="text-primary-light italic">
                  {BRAND.tagline}
                </span>
                <br />
                <span className="text-white mt-2 block">
                  {BRAND.taglineEnglish}
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {BRAND.product} — containerized, solar-powered, IoT-monitored
                sewage treatment plants. Built with 100% Indian-sourced materials
                through our {BRAND.innovation} design. Deployable in 48 hours.
                Monitored from anywhere.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/product">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore JalBox™
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/invest">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    Invest in Clean Water
                    <TrendingUp className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image — JalBox transport */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                  src="/images/jalbox-transport.jpg"
                  alt="JalBox 25 containerized STPs with solar panels being transported on trucks through rural India"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-6">
                  <p className="text-sm font-medium text-white">
                    JalBox 25 units en route to deployment — solar panels pre-installed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Deployment Time", value: "48 hrs", icon: Zap },
              { label: "Cost Reduction", value: "60%", icon: TrendingUp },
              { label: "Energy", value: "Solar", icon: Sun },
              { label: "Monitoring", value: "Real-time", icon: Wifi },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-accent-light" />
                  <span className="font-data text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Hero Image (shown only on mobile/tablet) */}
      <div className="lg:hidden relative">
        <Image
          src="/images/jalbox-transport.jpg"
          alt="JalBox 25 containerized STPs with solar panels being transported on trucks through rural India"
          width={800}
          height={500}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Crisis Section */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">The Crisis</Badge>
          <SectionTitle>India&apos;s Water Emergency</SectionTitle>
          <SectionDescription>
            India generates 72 billion litres of sewage daily. Only 28% is
            treated. The rest flows into rivers, groundwater, and communities —
            causing disease, environmental destruction, and economic loss.
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              stat: "72B",
              unit: "litres/day",
              label: "Sewage Generated",
              description:
                "India produces 72 billion litres of sewage every single day — enough to fill 29,000 Olympic swimming pools.",
              icon: Droplets,
            },
            {
              stat: "72%",
              unit: "untreated",
              label: "Flows Untreated",
              description:
                "Nearly three-quarters of all sewage in India is discharged directly into water bodies without any treatment.",
              icon: Shield,
            },
            {
              stat: "2L+",
              unit: "deaths/year",
              label: "Waterborne Deaths",
              description:
                "Over 200,000 Indians die annually from waterborne diseases caused by contaminated water sources.",
              icon: Users,
            },
          ].map((item) => (
            <Card key={item.label} className="text-center p-8">
              <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
              <div className="font-data text-4xl font-bold text-primary">
                {item.stat}
              </div>
              <div className="text-sm text-gray-500 mb-2">{item.unit}</div>
              <h3 className="text-lg font-bold text-dark mb-2">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Solution Section with Village Image */}
      <Section>
        <SectionHeader>
          <Badge variant="primary" className="mb-4">The Solution</Badge>
          <SectionTitle>Meet JalBox™</SectionTitle>
          <SectionDescription>
            A containerized, plug-and-play sewage treatment plant that deploys
            in 48 hours, runs on solar power, and monitors itself via IoT —
            all built with 100% Indian materials.
          </SectionDescription>
        </SectionHeader>

        {/* Village deployment showcase */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative">
            <Image
              src="/images/jalbox-village.jpg"
              alt="JalBox deployed in a rural Indian village — Jal Mitra operating the IoT control panel while community members collect treated water"
              width={1200}
              height={600}
              className="w-full h-64 sm:h-80 md:h-[480px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent p-6 md:p-10">
              <div className="max-w-2xl">
                <Badge variant="success" className="mb-2">Live Deployment</Badge>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  JalBox in Action — Serving a Rural Community
                </h3>
                <p className="text-sm md:text-base text-gray-200">
                  A Jal Mitra monitors the IoT dashboard while villagers collect
                  treated water. Biogas bag visible behind the unit. Solar panels
                  power the entire system off-grid.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Recycle,
              title: "Containerized & Modular",
              description:
                "Factory-built in standard shipping containers. No civil work needed. Deploy, connect, and start treating in 48 hours.",
            },
            {
              icon: Sun,
              title: "Solar-Powered",
              description:
                "Fully off-grid capable with Indian-made solar panels and batteries. Zero electricity bills for rural installations.",
            },
            {
              icon: Wifi,
              title: "IoT-Monitored",
              description:
                "ESP32 gateway monitors 15+ parameters in real-time. Predictive alerts. Remote diagnostics. Zero-surprise operations.",
            },
            {
              icon: Leaf,
              title: "100% Indian Materials",
              description:
                "BioNeer™ design uses coconut coir, terracotta, ferrocement, and vetiver grass. Zero imports. Maximum Swadeshi.",
            },
            {
              icon: Building2,
              title: "CPCB Compliant",
              description:
                "Treated water meets CPCB reuse standards. Suitable for landscaping, flushing, and non-potable applications.",
            },
            {
              icon: TreePine,
              title: "Revenue Generating",
              description:
                "Sell treated water, compost from sludge, biogas, and even vetiver oil. Turn a waste problem into revenue streams.",
            },
          ].map((feature) => (
            <Card key={feature.title} className="p-8">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Product Range */}
      <Section variant="dark">
        <SectionHeader>
          <Badge variant="water" className="mb-4">Product Range</Badge>
          <SectionTitle>A JalBox for Every Need</SectionTitle>
          <SectionDescription>
            From a 50-person school to a 600-person housing society — there&apos;s
            a JalBox™ built for the job.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JALBOX_MODELS.map((model) => (
            <div
              key={model.model}
              className="rounded-2xl bg-card border border-white/10 p-6 hover:border-primary-light/30 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-1">
                {model.model}
              </h3>
              <div className="font-data text-3xl font-bold text-primary-light mb-4">
                {model.capacity}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="h-4 w-4 text-accent-light" />
                  {model.serves}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <ChevronRight className="h-4 w-4 text-primary-light" />
                  {model.ideal}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/product">
            <Button variant="outline" size="lg" className="border-primary-light text-primary-light hover:bg-primary-light hover:text-dark">
              View Full Specs
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* How It Works — with Schematic */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="success" className="mb-4">How It Works</Badge>
          <SectionTitle>Inside the JalBox™</SectionTitle>
          <SectionDescription>
            From raw sewage to reusable water in under 12 hours, using
            biological processes powered by nature and monitored by IoT.
          </SectionDescription>
        </SectionHeader>

        {/* Schematic Image */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <Image
            src="/images/jalbox-schematic.jpg"
            alt="JalBox cutaway schematic showing all internal components: screening chamber, anaerobic baffled reactor, MBBR with bio-media, lamella plate clarifier, and UV disinfection chamber"
            width={1400}
            height={700}
            className="w-full h-auto"
          />
          <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              <strong>JalBox™ Cross-Section:</strong> Screening Chamber → Anaerobic Baffled Reactor → MBBR (Bio-media) → Lamella Plate Clarifier → UV Disinfection. Solar panels on top, biogas collection dome, and insulated container walls.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENT_STAGES.map((stage) => (
            <div key={stage.stage} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-data font-bold text-lg">
                {stage.stage}
              </div>
              <div>
                <h3 className="font-bold text-dark">{stage.name}</h3>
                <p className="text-sm text-gray-600">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Business Model */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">Sustainable Business</Badge>
          <SectionTitle>5 Revenue Streams from Waste</SectionTitle>
          <SectionDescription>
            JalBox™ doesn&apos;t just treat sewage — it generates revenue. Our
            Design-Build-Operate model creates predictable, recurring income.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { stream: "O&M Fees", detail: "Monthly annuity contracts", icon: Shield },
            { stream: "Treated Water", detail: "Sold for landscaping, flushing", icon: Droplets },
            { stream: "Biogas", detail: "From anaerobic digestion", icon: Zap },
            { stream: "Fertilizer", detail: "Sludge composting", icon: Leaf },
            { stream: "Carbon Credits", detail: "Methane capture verification", icon: TreePine },
          ].map((item) => (
            <Card key={item.stream} className="text-center p-6">
              <item.icon className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-bold text-dark">{item.stream}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Join the Clean Water Revolution
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Whether you&apos;re an investor, a housing society, a Gram Panchayat,
            or a government body — there&apos;s a way to work with Jal Neeti.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/invest">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                Invest Now
                <TrendingUp className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
