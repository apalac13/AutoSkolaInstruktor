import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Autoškola Instruktor",
  description: "Autoškola Instruktor Posušje",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/asi_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hr" className="scroll-smooth">
      <body className={sourceSans3.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
