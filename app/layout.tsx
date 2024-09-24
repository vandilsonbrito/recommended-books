import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthProvider";
import SignedUpToast from "./components/SignedUpToast";


const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recommended Books",
  description: "The place you find the best books - Recommended Book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="en">
      <body
        className={montserrat.className}
      >
        <AuthContextProvider>
            <SignedUpToast/>
            {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
