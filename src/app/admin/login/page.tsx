"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Droplets className="mx-auto h-10 w-10 text-blue-500" />
          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Admin Access
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage Jal Neeti.
          </p>
        </div>

        {/* TODO: Wire up actual auth logic */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@jalneeti.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
