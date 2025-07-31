import { Outlet } from "react-router";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
