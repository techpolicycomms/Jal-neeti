"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Droplets,
  Users,
  Factory,
  Leaf,
  TrendingUp,
  Calculator as CalcIcon,
  ArrowRight,
  Printer,
  Globe,
  Recycle,
  TreePine,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
import { BRAND } from "@/lib/constants";

const INDIAN_STATES = [
  "Uttar Pradesh",
  "Bihar",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Rajasthan",
  "Madhya Pradesh",
  "West Bengal",
  "Andhra Pradesh",
  "Telangana",
  "Kerala",
  "Odisha",
  "Jharkhand",
  "Chhattisgarh",
  "Punjab",
  "Haryana",
  "Uttarakhand",
  "Assam",
  "Himachal Pradesh",
] as const;

type Deployment = "rural" | "urban" | "factory" | "mixed";

const DEPLOYMENT_OPTIONS: { value: Deployment; label: string }[] = [
  { value: "rural", label: "Rural Village" },
  { value: "urban", label: "Urban Community" },
  { value: "factory", label: "Factory Perimeter" },
  { value: "mixed", label: "Mixed" },
];

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function Calculator() {
  const [budget, setBudget] = useState(2500000);
  const [deployment, setDeployment] = useState<Deployment>("rural");
  const [state, setState] = useState("Uttar Pradesh");

  // Formulas
  const costPerUnit =
    deployment === "rural"
      ? 900000
      : deployment === "urban"
        ? 1000000
        : deployment === "factory"
          ? 1100000
          : 950000;
  const units = Math.floor(budget / costPerUnit) || 1;
  const capacityPerUnit = 25;
  const totalCapacity = units * capacityPerUnit;
  const populationPerUnit = 350;
  const totalPopulation = units * populationPerUnit;
  const litresPerYear = totalCapacity * 1000 * 365;
  const olympicPools = (litresPerYear / 2500000).toFixed(1);
  const co2PerUnit = 8;
  const totalCo2 = units * co2PerUnit;
  const waterSaved = litresPerYear * 0.7;
  const fertiliserPerUnit = 2;
  const totalFertiliser = units * fertiliserPerUnit;
  const costPerPerson = Math.round(budget / totalPopulation);
  const costPerLitre = (budget / litresPerYear).toFixed(4);
  const borewellComparison = Math.round(
    (totalPopulation * 15) / (50 * 15)
  );
  const communities = units;

  return (
    <>
      {/* Hero Section */}
      <Section variant="dark" className="print:bg-white print:text-gray-900">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            <CalcIcon className="mr-1.5 h-3 w-3" />
            CSR Impact Calculator
          </Badge>
          <SectionTitle>
            How Far Can Your{" "}
            <span className="text-primary">CSR Budget</span> Go?
          </SectionTitle>
          <SectionDescription>
            Enter your budget and see the projected impact of deploying{" "}
            {BRAND.product} decentralized water treatment units across India.
          </SectionDescription>
        </SectionHeader>
      </Section>

      {/* Input Section */}
      <Section variant="light" className="print:py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Budget Slider */}
          <Card className="p-8">
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-gray-500">
              CSR Budget
            </label>
            <div className="mb-4 text-4xl font-bold text-primary">
              {formatINR(budget)}
            </div>
            <input
              type="range"
              min={500000}
              max={50000000}
              step={500000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mb-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatINR(500000)}</span>
              <span>{formatINR(50000000)}</span>
            </div>
          </Card>

          {/* Deployment + State */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Deployment Preference */}
            <Card className="p-8">
              <label className="mb-4 block text-sm font-semibold uppercase tracking-wider text-gray-500">
                Deployment Preference
              </label>
              <div className="space-y-3">
                {DEPLOYMENT_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all ${
                      deployment === option.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deployment"
                      value={option.value}
                      checked={deployment === option.value}
                      onChange={() => setDeployment(option.value)}
                      className="sr-only"
                    />
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        deployment === option.value
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {deployment === option.value && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </Card>

            {/* State Preference */}
            <Card className="p-8">
              <label className="mb-4 block text-sm font-semibold uppercase tracking-wider text-gray-500">
                State Preference
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-100 bg-white px-4 py-3 text-base font-medium transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <p className="mt-4 text-sm text-gray-400">
                Cost estimates may vary by state. Currently showing base
                estimates for {state}.
              </p>

              {/* Direct number input */}
              <label className="mt-6 mb-2 block text-sm font-semibold uppercase tracking-wider text-gray-500">
                Or enter exact budget
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  min={500000}
                  max={50000000}
                  step={100000}
                  value={budget}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v >= 500000 && v <= 50000000) setBudget(v);
                  }}
                  className="w-full rounded-xl border-2 border-gray-100 bg-white py-3 pl-8 pr-4 text-base font-medium transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Impact Metrics */}
      <Section>
        <SectionHeader>
          <Badge variant="water" className="mb-4">
            <Droplets className="mr-1.5 h-3 w-3" />
            Impact Metrics
          </Badge>
          <SectionTitle className="text-2xl md:text-3xl">
            Projected Impact
          </SectionTitle>
        </SectionHeader>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={<Factory className="h-6 w-6" />}
            label="JalBox Units Deployable"
            value={formatNumber(units)}
            accent="primary"
          />
          <StatCard
            icon={<Droplets className="h-6 w-6" />}
            label="Treatment Capacity"
            value={`${formatNumber(totalCapacity)} KLD`}
            accent="water"
          />
          <StatCard
            icon={<Users className="h-6 w-6" />}
            label="Population Served"
            value={formatNumber(totalPopulation)}
            accent="accent"
          />
          <StatCard
            icon={<Droplets className="h-6 w-6" />}
            label="Litres Treated / Year"
            value={formatNumber(litresPerYear)}
            accent="water"
          />
          <StatCard
            icon={<Sparkles className="h-6 w-6" />}
            label="Olympic Swimming Pools / Year"
            value={olympicPools}
            subtitle="1 pool = 25,00,000 litres"
            accent="primary"
          />
        </div>
      </Section>

      {/* Environmental Metrics */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="success" className="mb-4">
            <Leaf className="mr-1.5 h-3 w-3" />
            Environmental Impact
          </Badge>
          <SectionTitle className="text-2xl md:text-3xl">
            Environmental Metrics
          </SectionTitle>
        </SectionHeader>

        <div className="grid gap-6 sm:grid-cols-3">
          <StatCard
            icon={<TreePine className="h-6 w-6" />}
            label="CO₂e Prevented"
            value={`${formatNumber(totalCo2)} tonnes/yr`}
            accent="success"
          />
          <StatCard
            icon={<Droplets className="h-6 w-6" />}
            label="Freshwater Saved"
            value={`${formatNumber(waterSaved)} KL/yr`}
            accent="water"
          />
          <StatCard
            icon={<Recycle className="h-6 w-6" />}
            label="Chemical Fertiliser Replaced"
            value={`${formatNumber(totalFertiliser)} tonnes/yr`}
            accent="success"
          />
        </div>
      </Section>

      {/* Financial Metrics */}
      <Section>
        <SectionHeader>
          <Badge variant="accent" className="mb-4">
            <TrendingUp className="mr-1.5 h-3 w-3" />
            Financial Efficiency
          </Badge>
          <SectionTitle className="text-2xl md:text-3xl">
            Financial Metrics
          </SectionTitle>
        </SectionHeader>

        <div className="grid gap-6 sm:grid-cols-3">
          <StatCard
            icon={<Users className="h-6 w-6" />}
            label="Cost per Person Served"
            value={`${formatINR(costPerPerson)}/yr`}
            accent="accent"
          />
          <StatCard
            icon={<Droplets className="h-6 w-6" />}
            label="Cost per Litre Treated"
            value={`₹${costPerLitre}/litre`}
            accent="water"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            label="vs. Borewell Effectiveness"
            value={`${formatNumber(borewellComparison)}x`}
            subtitle="more cost-effective than a borewell"
            accent="primary"
          />
        </div>
      </Section>

      {/* SDG Contribution */}
      <Section variant="light">
        <SectionHeader>
          <Badge variant="primary" className="mb-4">
            <Globe className="mr-1.5 h-3 w-3" />
            SDG Contribution
          </Badge>
          <SectionTitle className="text-2xl md:text-3xl">
            UN Sustainable Development Goals
          </SectionTitle>
        </SectionHeader>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <SDGCard
            number={6}
            title="Clean Water & Sanitation"
            metric={`${formatNumber(litresPerYear)} litres of clean water`}
          />
          <SDGCard
            number={11}
            title="Sustainable Cities"
            metric={`${formatNumber(communities)} communities with improved sanitation`}
          />
          <SDGCard
            number={13}
            title="Climate Action"
            metric={`${formatNumber(totalCo2)} tonnes CO₂e prevented`}
          />
          <SDGCard
            number={12}
            title="Responsible Consumption"
            metric={`${formatNumber(totalFertiliser)} tonnes fertiliser from waste`}
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="dark" className="print:hidden">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionTitle className="text-2xl md:text-3xl">
            Ready to Make This Impact Real?
          </SectionTitle>
          <SectionDescription>
            Our CSR team will create a customized deployment plan for {state}{" "}
            based on your budget of {formatINR(budget)}.
          </SectionDescription>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Talk to Our CSR Team
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.print()}
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Printer className="h-5 w-5" />
              Download as PDF
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ---------- Subcomponents ---------- */

function StatCard({
  icon,
  label,
  value,
  subtitle,
  accent = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  accent?: "primary" | "water" | "accent" | "success";
}) {
  const colorMap = {
    primary: "text-primary bg-primary/10",
    water: "text-water bg-water/10",
    accent: "text-accent bg-accent/10",
    success: "text-bio bg-bio/10",
  };

  return (
    <Card className="flex flex-col gap-4 p-6">
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[accent]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}

function SDGCard({
  number,
  title,
  metric,
}: {
  number: number;
  title: string;
  metric: string;
}) {
  return (
    <Card className="flex flex-col gap-3 p-6">
      <Badge variant="primary" className="w-fit text-sm font-bold">
        SDG {number}
      </Badge>
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      <p className="text-lg font-bold text-gray-900">{metric}</p>
    </Card>
  );
}
