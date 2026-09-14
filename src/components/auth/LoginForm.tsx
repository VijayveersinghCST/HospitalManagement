"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: call auth API here (services/apiClient.js se hook karo)
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            <div>
                <h2 className="text-3xl font-bold text-brand-navy">Login</h2>
                <p className="mt-1.5 text-sm text-brand-gray">
                    Enter your credentials to access your account
                </p>
            </div>

            <div className="space-y-5">
                <div className="space-y-1.5">
                    <label
                        htmlFor="email"
                        className="text-xs font-semibold uppercase tracking-wide text-brand-gray"
                    >
                        Email / Username
                    </label>
                    <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray" />
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email or username"
                            required
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/60 py-3 pl-11 pr-4 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="password"
                        className="text-xs font-semibold uppercase tracking-wide text-brand-gray"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/60 py-3 pl-11 pr-11 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gray transition hover:text-brand-blue"
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

            <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-green py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition hover:shadow-xl hover:shadow-brand-blue/30 active:scale-[0.99]"
            >
                <LogIn className="h-4 w-4 transition group-hover:translate-x-0.5" />
                Login
            </button>
            <div className="flex flex-col items-center gap-2">
                <p className="text-center text-xs text-brand-gray">
                    Powered by
                </p>
                <a
                    href="https://computesofttech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <Image
                    src="/images/cst.png"
                    alt="ComputeSoft Technologies Pvt. Ltd."
                    width={180}
                    height={50}

                    className="h-auto w-45 object-contain"
                />
                </a>
            </div>
        </form>
    );
}