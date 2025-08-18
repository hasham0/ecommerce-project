import { Outlet } from "react-router";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ScrollToTop from "../components/scroll-to-top";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
