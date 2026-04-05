import type { Metadata } from "next";
import { Calculator } from "./calculator";

export const metadata: Metadata = {
  title: "CSR Impact Calculator",
  description:
    "Calculate how many villages your CSR budget can serve with JalBox clean water infrastructure.",
};

export default function ImpactCalculatorPage() {
  return <Calculator />;
}
