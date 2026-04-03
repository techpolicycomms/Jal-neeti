import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Jal Neeti Technologies — investment enquiries, partnership proposals, JalBox quotes, or career interest.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">Contact</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Let&apos;s Talk <span className="text-primary-light">Water</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Whether you want to invest, partner, deploy a JalBox, or join
              our team — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <Section>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-dark">Office</p>
                    <p className="text-sm text-gray-600">
                      New Delhi, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-dark">Email</p>
                    <p className="text-sm text-gray-600">hello@jalneeti.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-dark">Phone</p>
                    <p className="text-sm text-gray-600">+91-XXXXX-XXXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-dark">Hours</p>
                    <p className="text-sm text-gray-600">
                      Mon–Sat, 9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <Card className="p-6 bg-gray-50">
              <h3 className="font-bold text-dark mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-600">Investment enquiries →</span>{" "}
                  <a href="/invest" className="text-primary font-medium hover:underline">
                    Visit Invest page
                  </a>
                </li>
                <li>
                  <span className="text-gray-600">Career opportunities →</span>{" "}
                  <a href="/careers" className="text-primary font-medium hover:underline">
                    Visit Careers page
                  </a>
                </li>
                <li>
                  <span className="text-gray-600">Product details →</span>{" "}
                  <a href="/product" className="text-primary font-medium hover:underline">
                    Visit Product page
                  </a>
                </li>
              </ul>
            </Card>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-dark mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
