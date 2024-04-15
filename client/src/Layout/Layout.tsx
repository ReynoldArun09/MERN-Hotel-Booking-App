import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Search from "@/components/Search/Search";
import { Outlet, useLocation } from "react-router-dom";
import Effect from "./Effect";

export default function Layout() {
  const {pathname} = useLocation()
  const showSeachBar = pathname !== '/' && pathname !== '/search'
  return (
    <section className="flex flex-col min-h-screen">
    <Header />
    {!showSeachBar ? (
     <>
     <Hero />
      <div className="container mx-auto">
          <Search />
      </div>
     </>
    ): null}
    <main className="container mx-auto py-10 flex-1">
        <Effect />
        <Outlet />
    </main>
    <Footer />
</section>
  );
}
