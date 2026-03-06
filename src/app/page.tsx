import Home from "@/components/pages/home/Home";
import Header from "@/components/common/header";
export default function HomePage() {
  return (
    <div className=" border border-neutral-900 w-[1150px] mx-auto">
      <Header />
      <Home />
    </div>
  );
}