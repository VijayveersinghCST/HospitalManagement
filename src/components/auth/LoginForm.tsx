"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { setAuthToken } from "@/lib/auth";
import { useAuthStore } from "@/store/auth";

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email/username and password.");
      return;
    }

    setIsSubmitting(true);

    // Mock session establishment
    setTimeout(() => {
      setAuthToken("mock-jwt-token");
      setUser({ email });
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header & Logo */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2.5 shadow-md shadow-slate-100 ring-1 ring-slate-200/80 transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/HSP_logo.png"
            alt="Hospital Management System Logo"
            width={90}
            height={90}
            priority
            className="h-full w-full object-contain drop-shadow-sm"
          />
        </div>

        <span className="mb-2 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
          Hospital Management Portal
        </span>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Enter your authorized credentials to access the console
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 backdrop-blur-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <span className="font-medium leading-relaxed">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Email / Username Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wider text-slate-600"
            >
              Email / Username
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Mail className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
              </div>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hospital.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition duration-200 ease-in-out hover:border-slate-300 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Password
              </label>
            </div>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Lock className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-11 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition duration-200 ease-in-out hover:border-slate-300 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white"/>
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/80" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-400">
              Powered by
            </span>
          </div>
        </div>

        {/* Footer Brand Logo */}
        <div className="flex flex-col items-center justify-center">
          <a
            href="https://computesofttech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/cst.png"
              alt="ComputeSoft Technologies Pvt. Ltd."
              width={160}
              height={40}
              className="h-7 w-auto object-contain transition duration-300"
            />
          </a>
        </div>
      </form>
    </div>
  );
}