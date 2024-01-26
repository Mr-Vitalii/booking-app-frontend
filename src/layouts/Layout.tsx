import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};
