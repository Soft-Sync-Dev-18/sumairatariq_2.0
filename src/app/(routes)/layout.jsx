import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Roboto } from "next/font/google";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Sumaira Tariq || Were Different",
  description: "Sumara Tariq || Were Different ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
