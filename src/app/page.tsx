import Home from "@/components/pages/home/Home";
import Header from "@/components/common/header";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      <Header />
      <Home />
    </div>
  );
}