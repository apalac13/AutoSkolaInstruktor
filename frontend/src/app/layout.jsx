import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navigacija from "@/components/Navigacija";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "Autoškola Instruktor",
  description: "Autoškola Instruktor Posušje",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/asi_logo.png" />
      </head>
      <body className={sourceSans3.className}>
        <Navigacija />
        <div>{children}</div>
      </body>
    </html>
  );
}
