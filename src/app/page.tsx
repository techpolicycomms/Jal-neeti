import Link from "next/link";
import Image from "next/image";
import {
  Droplets,
  Sun,
  Wifi,
  Leaf,
  TrendingUp,
  Users,
  ArrowRight,
  ChevronRight,
  Zap,
  Building2,
  TreePine,
  Factory,
  Landmark,
  TrainFront,
  Church,
  School,
  HardHat,
  IndianRupee,
  Truck,
  Clock,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
import { Card, CardDark } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  JALBOX_MODELS,
  TREATMENT_STAGES,
  BIONEER_COMPONENTS,
  CUSTOMER_SEGMENTS,
  WAAS_REVENUE,
} from "@/lib/constants";

const SEGMENT_ICONS: Record<string, React.ElementType> = {
  building2: Building2,
  trees: TreePine,
  school: School,
  hardHat: HardHat,
  factory: Factory,
  landmark: Landmark,
  trainFront: TrainFront,
  church: Church,
};

export default function HomePage() {
  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-water rounded-full blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="accent" className="mb-6 text-sm">
                <Droplets className="h-3 w-3 mr-1" />
                72% of India&apos;s sewage flows untreated into rivers
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                <span className="text-white">
                  We fix that.
                </span>
                <br />
                <span className="text-primary-light mt-2 block">
                  One container at a time.
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                JalBox™ — containerised sewage treatment plants. Solar-powered.
                IoT-monitored. 100% Indian materials. Deployed in 48 hours.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/product">
                  <Button size="lg" className="w-full sm:w-auto">
                    See JalBox in Action
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/invest">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    Bring Clean Water to Your Village
                    <TrendingUp className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image — desktop */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                  src="/images/jalbox-transport.jpg"
                  alt="JalBox containerized STP being transported on a truck for rapid deployment"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-6">
                  <p className="text-sm font-medium text-white">
                    JalBox units en route — solar panels pre-installed, ready to treat in 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image — mobile */}
      <div className="lg:hidden relative">
        <Image
          src="/images/jalbox-transport.jpg"
          alt="JalBox containerized STP being transported on a truck for rapid deployment"
          width={800}
          height={500}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* ── 2. THE CRISIS ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="accent" className="mb-4">The Crisis</Badge>
          <SectionTitle>Why India Needs a New Approach</SectionTitle>
          <SectionDescription>
            Centralised mega-STPs were supposed to fix India&apos;s sewage problem.
            Decades and thousands of crores later, the numbers tell a different story.
            Massive plants need massive pipes, massive land, and massive budgets —
            none of which reach the 600,000 villages that need them most.
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              stat: "72,368",
              unit: "MLD",
              label: "Sewage Generated Daily",
              description:
                "India produces over 72,000 million litres of sewage every single day — and the number grows with every new connection.",
              icon: Droplets,
            },
            {
              stat: "28%",
              unit: "actually treated",
              label: "Treatment Rate",
              description:
                "Less than a third of all sewage generated is treated. The remaining 72% flows raw into rivers, lakes, and groundwater.",
              icon: TrendingUp,
            },
            {
              stat: "600,000",
              unit: "villages",
              label: "Zero Treatment",
              description:
                "Six hundred thousand Indian villages have no sewage treatment infrastructure at all. Not one pipe. Not one plant.",
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

      {/* ── 3. THE SOLUTION — JALBOX™ ── */}
      <Section>
        <SectionHeader>
          <Badge variant="primary" className="mb-4">The Solution</Badge>
          <SectionTitle>Meet JalBox™</SectionTitle>
          <SectionDescription>
            A complete sewage treatment plant that arrives on a truck and starts
            treating in 48 hours.
          </SectionDescription>
        </SectionHeader>

        {/* Village deployment image — full width with gradient */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative">
            <Image
              src="/images/jalbox-village.jpg"
              alt="JalBox deployed in a rural Indian village with community members collecting treated water"
              width={1200}
              height={600}
              className="w-full h-64 sm:h-80 md:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="max-w-2xl">
                <Badge variant="success" className="mb-2">Live Deployment</Badge>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  JalBox in a Village — Treating Sewage, Creating Livelihoods
                </h3>
                <p className="text-sm md:text-base text-gray-200">
                  Solar-powered. IoT-monitored from anywhere. Biogas and treated water
                  generated on-site. No civil works. No land acquisition delays.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 product cards from JALBOX_MODELS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JALBOX_MODELS.map((model) => (
            <Card
              key={model.model}
              className={`p-6 ${model.highlight ? "ring-2 ring-primary shadow-lg" : ""}`}
            >
              {model.highlight && (
                <Badge variant="primary" className="mb-3">Most Popular</Badge>
              )}
              <h3 className="text-xl font-bold text-dark mb-1">{model.model}</h3>
              <div className="font-data text-3xl font-bold text-primary mb-4">
                {model.capacity}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4 text-primary" />
                  {model.serves}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <IndianRupee className="h-4 w-4 text-accent" />
                  {model.price}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/product">
            <Button variant="outline" size="lg">
              View Full Specs
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ── 4. WATER-AS-A-SERVICE ── */}
      <Section variant="dark">
        <SectionHeader>
          <Badge variant="water" className="mb-4">Water-as-a-Service</Badge>
          <SectionTitle>
            You don&apos;t buy a sewage plant. You subscribe to clean water.
          </SectionTitle>
          <SectionDescription>
            Jal Neeti owns every JalBox. We deploy it at your site, operate it 24/7,
            and charge you a simple monthly fee for treated water output. Think
            &quot;Jio for water.&quot;
          </SectionDescription>
        </SectionHeader>

        {/* 3-step visual */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              step: "1",
              title: "Deploy",
              description:
                "JalBox arrives on a truck. Placed on-site, connected, and commissioned in 48 hours. No civil works.",
              icon: Truck,
            },
            {
              step: "2",
              title: "Treat 24/7",
              description:
                "Solar-powered, IoT-monitored treatment runs continuously. Our Jal Mitras handle all operations and maintenance.",
              icon: Clock,
            },
            {
              step: "3",
              title: "Pay Monthly",
              description:
                "Simple monthly subscription. No capex, no headaches. Cancel or upgrade any time.",
              icon: CreditCard,
            },
          ].map((item) => (
            <CardDark key={item.step} className="text-center p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <item.icon className="h-8 w-8 text-primary-light" />
              </div>
              <div className="text-sm font-medium text-accent-light mb-1">
                Step {item.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </CardDark>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="font-data text-3xl md:text-4xl font-bold text-accent-light">
            ₹35,000/month
          </p>
          <p className="mt-2 text-lg text-gray-400">
            Less than your security agency.
          </p>
        </div>

        {/* 4 revenue taps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WAAS_REVENUE.map((item) => (
            <CardDark key={item.source} className="p-6">
              <h3 className="font-bold text-white mb-1">{item.source}</h3>
              <div className="font-data text-lg font-bold text-primary-light mb-2">
                {item.range}
              </div>
              <p className="text-sm text-gray-400">{item.description}</p>
            </CardDark>
          ))}
        </div>
      </Section>

      {/* ── 5. BIONEER™ INNOVATION ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="success" className="mb-4">BioNeer™ Innovation</Badge>
          <SectionTitle>100% Indian Materials. 50% Lower Cost.</SectionTitle>
          <SectionDescription>
            Every component in a JalBox can be traced to an Indian state. We replaced
            expensive imports with indigenous materials — slashing costs while boosting
            repairability and local employment.
          </SectionDescription>
        </SectionHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Imported Component
                </th>
                <th className="py-3 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Indian Replacement
                </th>
                <th className="py-3 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="py-3 px-4 text-sm font-bold text-primary uppercase tracking-wider text-right">
                  Cost Saved
                </th>
              </tr>
            </thead>
            <tbody>
              {BIONEER_COMPONENTS.map((row) => (
                <tr
                  key={row.imported}
                  className="border-b border-gray-100 hover:bg-white transition-colors"
                >
                  <td className="py-4 px-4 text-gray-500 line-through text-sm">
                    {row.imported}
                  </td>
                  <td className="py-4 px-4 font-semibold text-dark text-sm">
                    {row.indian}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{row.source}</td>
                  <td className="py-4 px-4 text-right">
                    <Badge variant="primary" className="font-data font-bold">
                      {row.saving}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 italic">
          Every component traceable to an Indian state. Maximum Swadeshi. Minimum import dependency.
        </p>
      </Section>

      {/* ── 6. WHO WE SERVE ── */}
      <Section>
        <SectionHeader>
          <Badge variant="primary" className="mb-4">Who We Serve</Badge>
          <SectionTitle>Built for Every Corner of India</SectionTitle>
          <SectionDescription>
            From housing societies to highway rest areas, JalBox serves any community
            that generates sewage and deserves clean water.
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CUSTOMER_SEGMENTS.map((segment) => {
            const Icon = SEGMENT_ICONS[segment.icon] || Users;
            return (
              <Card key={segment.name} className="text-center p-6">
                <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-sm font-bold text-dark">{segment.name}</h3>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ── 7. SCHEMATIC ── */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="success" className="mb-4">Inside the JalBox</Badge>
          <SectionTitle>How Treatment Works</SectionTitle>
          <SectionDescription>
            From raw sewage to reusable water in under 12 hours — using biological
            processes powered by nature and monitored by IoT.
          </SectionDescription>
        </SectionHeader>

        <div className="mb-12 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <Image
            src="/images/jalbox-schematic.jpg"
            alt="JalBox cutaway schematic showing screening chamber, anaerobic baffled reactor, MBBR with coconut coir bio-media, lamella plate clarifier, and UV/vetiver polishing"
            width={1400}
            height={700}
            className="w-full h-auto"
          />
          <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              <strong>JalBox™ Cross-Section:</strong> Screening &amp; Equalization →
              Anaerobic Baffled Reactor → MBBR (Coconut Coir Media) → Lamella Plate
              Clarifier → Vetiver Wetland / UV Polishing. Solar panels on top, biogas
              collection dome, IoT gateway, and insulated container walls.
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

      {/* ── 8. JOIN THE MOVEMENT ── */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">Join the Movement</Badge>
          <SectionTitle>There&apos;s a Role for You</SectionTitle>
          <SectionDescription>
            Whether you live in a housing society, care about your ancestral village
            from abroad, or want to build the future of water — we need you.
          </SectionDescription>
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              audience: "For RWAs & Communities",
              description:
                "Get a JalBox deployed at your society. No capex. Monthly subscription. We handle everything.",
              cta: "Request a JalBox",
              href: "/contact",
              icon: Building2,
              variant: "primary" as const,
            },
            {
              audience: "For NRIs & Investors",
              description:
                "Fund a JalBox for your ancestral village. Track its impact in real-time. Earn returns while doing good.",
              cta: "Invest in Clean Water",
              href: "/invest",
              icon: TrendingUp,
              variant: "accent" as const,
            },
            {
              audience: "For Engineers & Builders",
              description:
                "Join our team. Build containerised STPs, IoT systems, and bio-innovation with 100% Indian materials.",
              cta: "View Open Roles",
              href: "/careers",
              icon: Zap,
              variant: "outline" as const,
            },
          ].map((item) => (
            <Card key={item.audience} className="p-8 flex flex-col">
              <item.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">{item.audience}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{item.description}</p>
              <Link href={item.href}>
                <Button variant={item.variant} className="w-full">
                  {item.cta}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 9. FINAL CTA ── */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-water rounded-full blur-[80px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Join the Clean Water Revolution
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            72% of India&apos;s sewage is untreated. One JalBox at a time, we change that.
            Whether you&apos;re an RWA, an NRI, a Gram Panchayat, or a government body —
            there&apos;s a way to work with Jal Neeti.
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
