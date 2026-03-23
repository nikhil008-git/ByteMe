import Home from "@/components/pages/home/Home";
import Header from "@/components/common/header";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#000000] text-white font-sans selection:bg-white/20">
      <Header />
      <Home />
    </main>
  );
}