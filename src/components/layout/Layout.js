import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>
        <Toaster/>
        {children}
      </main>
      <Footer />
    </div>
  );
}
