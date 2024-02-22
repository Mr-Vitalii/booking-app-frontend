import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {location.pathname === "/" && (
        <>
          <Hero />
          <div className="container mx-auto">
            <SearchBar />
          </div>
        </>
      )}
      <div className="container mx-auto py-10 px-2 flex-1 md:px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
};
