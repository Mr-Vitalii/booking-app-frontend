import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
    </div>
  );
};
