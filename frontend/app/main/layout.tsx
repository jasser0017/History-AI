import Header from "@/components/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </div>
    );
  }