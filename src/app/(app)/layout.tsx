import AppShell from "@/components/common/AppShell";

export default function AppShellLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
