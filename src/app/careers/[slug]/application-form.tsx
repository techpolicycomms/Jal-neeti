"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApplicationFormProps {
  jobTitle: string;
  jobSlug: string;
}

export function ApplicationForm({ jobTitle, jobSlug }: ApplicationFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      jobTitle,
      jobSlug,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      linkedin: formData.get("linkedin") as string,
      coverNote: formData.get("coverNote") as string,
      source: formData.get("source") as string,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-bio mx-auto mb-3" />
        <h4 className="text-lg font-bold text-dark mb-1">
          Application Sent!
        </h4>
        <p className="text-sm text-gray-600">
          Thank you for applying for {jobTitle}. We&apos;ll review your
          application and get back within 5–7 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-dark mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-dark mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-dark mb-1">
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="linkedin.com/in/yourprofile"
        />
      </div>

      <div>
        <label htmlFor="source" className="block text-sm font-medium text-dark mb-1">
          How did you find us?
        </label>
        <select
          id="source"
          name="source"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white"
        >
          <option value="website">Website</option>
          <option value="linkedin">LinkedIn</option>
          <option value="referral">Referral</option>
          <option value="naukri">Naukri / Indeed</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="coverNote" className="block text-sm font-medium text-dark mb-1">
          Why Jal Neeti? *
        </label>
        <textarea
          id="coverNote"
          name="coverNote"
          required
          rows={4}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-y"
          placeholder="Tell us why you want to join Jal Neeti and what you'd bring to this role..."
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          Something went wrong. Please try again.
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting..." : "Submit Application"}
        <Send className="h-4 w-4" />
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Resume upload will be available soon. For now, include your LinkedIn
        profile above.
      </p>
    </form>
  );
}
