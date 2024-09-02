import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminHeader />
      <main>
        <Toaster/>
        {children}
      </main>
      <Footer />
    </div>
  );
}
