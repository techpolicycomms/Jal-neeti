import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Cpu,
  BarChart3,
  Award,
  BookOpen,
  HelpCircle,
  Leaf,
  Wifi,
  Briefcase,
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
import { BRAND, CHALLENGE_TRACKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Jal Neeti Challenge 2026",
  description:
    "Design India's Cheapest Clean Water Machine. A national competition by Ameliore Foundation — 3 tracks, real prizes, and a path to joining Jal Neeti.",
};

const TIMELINE = [
  { date: "June 15", label: "Launch & Registration Opens" },
  { date: "July", label: "Webinar Series (4 sessions)" },
  { date: "Aug 15", label: "Registration Closes" },
  { date: "Aug–Oct", label: "Development Phase" },
  { date: "Nov 30", label: "Grand Finale" },
  { date: "December", label: "Hiring & Integration" },
];

const PRIZES = [
  {
    place: "1st",
    cash: "₹1,00,000",
    extras: [
      "Pre-placement offer at Jal Neeti",
      "Design integrated into production JalBox",
      "Certificate with UNEP co-branding",
    ],
  },
  {
    place: "2nd",
    cash: "₹50,000",
    extras: [
      "6-month paid internship",
      "Certificate with UNEP co-branding",
      "LinkedIn recommendation",
    ],
  },
  {
    place: "3rd",
    cash: "₹25,000",
    extras: [
      "Internship offer",
      "Certificate with UNEP co-branding",
      "Talent community access",
    ],
  },
];

const FAQ = [
  {
    q: "Can we participate in multiple tracks?",
    a: "Yes, your team can submit entries for multiple tracks.",
  },
  {
    q: "Is there a registration fee?",
    a: "No. The Jal Neeti Challenge is completely free to enter.",
  },
  {
    q: "Do we need a working prototype?",
    a: "Track 2 (IoT) requires a working prototype with video demo. Track 1 and 3 do not.",
  },
  {
    q: "Can postgraduate students participate?",
    a: "Yes. Any student from an AICTE-approved institution can participate.",
  },
  {
    q: "Will travel be reimbursed for finalists?",
    a: "Yes, up to ₹5,000 per team for the Grand Finale event.",
  },
  {
    q: "Can individuals participate?",
    a: "Yes. Individual applicants will be helped to form teams.",
  },
];

const TRACK_ICONS = {
  "bio-treatment": Leaf,
  "iot-monitoring": Wifi,
  "business-policy": BarChart3,
};

export default function ChallengePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-[128px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge variant="accent" className="mb-4">
              <Trophy className="h-3 w-3 mr-1" />
              National Competition
            </Badge>
            <p className="text-lg text-accent-light font-data font-bold mb-4">
              72,000 MLD of sewage. 28% treated. You design the fix.
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Jal Neeti Challenge{" "}
              <span className="text-accent-light">2026</span>
            </h1>
            <p className="mt-2 text-2xl md:text-3xl text-primary-light italic">
              &ldquo;Design India&apos;s Cheapest Clean Water Machine&rdquo;
            </p>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl">
              A joint initiative of {BRAND.foundation} and UNEP India
              <span className="text-gray-500 text-sm ml-2">
                (partnership pending)
              </span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact?category=general">
                <Button variant="accent" size="lg">
                  Register Your Team
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#tracks">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Explore Tracks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Tracks */}
      <Section variant="light" id="tracks">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">3 Tracks</Badge>
          <SectionTitle>Choose Your Challenge</SectionTitle>
          <SectionDescription>
            Each track maps to real engineering roles at Jal Neeti. Top
            performers get pre-placement offers.
          </SectionDescription>
        </SectionHeader>

        <div className="grid lg:grid-cols-3 gap-8">
          {CHALLENGE_TRACKS.map((track) => {
            const Icon =
              TRACK_ICONS[track.id as keyof typeof TRACK_ICONS] || Lightbulb;
            return (
              <Card key={track.id} className="p-8 flex flex-col">
                <Icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold text-dark mb-1">
                  {track.title}
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {track.subtitle}
                </p>
                <div className="space-y-3 text-sm text-gray-600 flex-1">
                  <div>
                    <p className="font-medium text-dark text-xs uppercase tracking-wider mb-1">
                      Materials / Tools
                    </p>
                    <p>{track.materials}</p>
                  </div>
                  <div>
                    <p className="font-medium text-dark text-xs uppercase tracking-wider mb-1">
                      Target
                    </p>
                    <p>{track.target}</p>
                  </div>
                  <div>
                    <p className="font-medium text-dark text-xs uppercase tracking-wider mb-1">
                      Maps to Roles
                    </p>
                    <p className="text-accent font-medium">{track.mapsTo}</p>
                  </div>
                </div>
                {track.prototype && (
                  <Badge variant="accent" className="mt-4 self-start">
                    Working Prototype Required
                  </Badge>
                )}
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Prizes */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            <Award className="h-3 w-3 mr-1" />
            Prizes
          </Badge>
          <SectionTitle>Win Cash, Jobs & Recognition</SectionTitle>
        </SectionHeader>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {PRIZES.map((prize, i) => (
            <Card
              key={prize.place}
              className={`p-8 text-center ${i === 0 ? "ring-2 ring-accent" : ""}`}
            >
              <div
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-data font-bold text-2xl ${
                  i === 0
                    ? "bg-accent text-white"
                    : i === 1
                      ? "bg-gray-200 text-gray-700"
                      : "bg-accent-light/20 text-accent"
                }`}
              >
                {prize.place}
              </div>
              <div className="font-data text-3xl font-bold text-dark mb-4">
                {prize.cash}
              </div>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                {prize.extras.map((extra) => (
                  <li key={extra} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-bio mt-0.5 flex-shrink-0" />
                    {extra}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          All finalists receive certificates, LinkedIn recommendations, and
          access to the Jal Neeti talent community.
        </p>
      </Section>

      {/* Timeline */}
      <Section variant="dark">
        <SectionHeader>
          <Badge variant="water" className="mb-4">
            <Calendar className="h-3 w-3 mr-1" />
            Timeline
          </Badge>
          <SectionTitle>Key Dates</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE.map((item, i) => (
            <div
              key={item.date}
              className="flex items-start gap-4 rounded-2xl bg-card border border-white/10 p-5"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 text-accent-light flex items-center justify-center font-data font-bold text-sm flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="font-data text-sm font-bold text-accent-light">
                  {item.date}
                </p>
                <p className="text-sm text-gray-300 mt-0.5">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Eligibility */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>Who Can Participate</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            {
              icon: Users,
              title: "Teams of 3–6",
              desc: "From any AICTE-approved institution",
            },
            {
              icon: BookOpen,
              title: "All Disciplines",
              desc: "Environmental, Civil, Electronics, CS, Management",
            },
            {
              icon: Briefcase,
              title: "UG & PG Students",
              desc: "Undergraduates and postgraduates welcome",
            },
            {
              icon: Lightbulb,
              title: "Individuals Too",
              desc: "Solo applicants will be helped to form teams",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-100"
            >
              <item.icon className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-dark">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Mentorship */}
      <Section>
        <SectionHeader>
          <SectionTitle>Mentorship & Resources</SectionTitle>
          <SectionDescription>
            We don&apos;t just set challenges — we help you solve them.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            "Free 4-session webinar series (July 2026)",
            "Discord community for all participants",
            "Access to JalBox specs & BioNeer material data",
            "Weekly office hours with Jal Neeti engineers",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
            >
              <CheckCircle className="h-5 w-5 text-bio flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Jury */}
      <Section variant="light">
        <SectionHeader>
          <SectionTitle>Jury Panel</SectionTitle>
          <SectionDescription>
            Industry leaders, academics, and impact investors.
          </SectionDescription>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {[
            { role: "Academic", org: "IIT Environmental Engineering" },
            { role: "Industry", org: "Indian Water Technology" },
            { role: "Government", org: "CPCB / SPCB" },
            { role: "Impact Investor", org: "Aavishkaar / Villgro" },
            { role: "Founder", org: "Jal Neeti Technologies" },
          ].map((juror) => (
            <Card key={juror.role} className="p-5 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-300" />
              </div>
              <p className="font-bold text-dark text-sm">{juror.role}</p>
              <p className="text-xs text-gray-500">{juror.org}</p>
              <Badge className="mt-2">TBA</Badge>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            <HelpCircle className="h-3 w-3 mr-1" />
            FAQ
          </Badge>
          <SectionTitle>Common Questions</SectionTitle>
        </SectionHeader>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="border border-gray-100 rounded-xl p-5"
            >
              <h3 className="font-bold text-dark mb-1">{item.q}</h3>
              <p className="text-sm text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-accent text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Build India&apos;s Water Future?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Win a competition. Get a job. Change a million lives.
          </p>
          <div className="mt-8">
            <Link href="/contact?category=general">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-accent"
              >
                Register Your Team
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/60">
            Organised by {BRAND.foundation} (Section 8 Company) | In
            partnership with UNEP India{" "}
            <span className="text-white/40">(pending)</span>
          </p>
        </div>
      </section>
    </>
  );
}
