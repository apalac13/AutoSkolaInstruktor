import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import axios from "axios";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});
axios.defaults.baseURL = "http://localhost:3003";
axios.defaults.headers["Content-Type"] = "application/json";

export const metadata = {
  title: "Autoškola Instruktor",
  description: "Autoškola Instruktor Posušje",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/asi_logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={sourceSans3.className}>
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
