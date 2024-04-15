import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Search from "@/components/Search/Search";
import { Outlet } from "react-router-dom";
import Effect from "./Effect";

export default function Layout() {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
      <Search />
      </div>
      <Effect />
      <main className="container mx-auto">
      <Outlet />
      </main>
      <Footer />
    </section>
  );
}
