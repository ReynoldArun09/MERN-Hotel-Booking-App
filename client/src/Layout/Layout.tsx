import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Search from "@/components/Search/Search";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <section>
      <Header />
      <Hero />
      <Search />
      <Outlet />
      <Footer />
    </section>
  );
}
