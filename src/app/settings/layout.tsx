import Header from "@/components/Header";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="max-w-5xl px-4 mx-auto mt-12">{children}</main>
    </div>
  );
}
