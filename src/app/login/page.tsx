import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl lg:min-h-[600px]">
        {/* Left: brand image panel */}
        <div className="relative hidden w-1/2 lg:flex lg:flex-col lg:justify-start">
          <Image
            src="/images/hs_bg.png"
            alt="HealthSpine"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-blue-dark/60 to-brand-teal/70" />

          <div className="relative z-10 flex flex-col gap-4 p-10 top-55">
            <h1 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-sm md:text-4xl lg:text-[2.75rem]">
              Smarter Healthcare.
              <br />
              <span className="text-cyan-300">Better Patient Care.</span>
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-slate-200/90 md:text-base">
              Empowering hospitals with seamless operations, connected teams, and
              better patient experiences.
            </p>
          </div>
        </div>

        {/* Right: login form panel */}
        <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}