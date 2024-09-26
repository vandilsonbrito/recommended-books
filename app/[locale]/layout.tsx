import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthProvider";
import SignedUpToast from "../components/SignedUpToast";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Head from "next/head";


const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recommended Books",
  description: "The place you find the best books - Recommended Book",
};

export default async function RootLayout({
    children,
    params: {locale}
  }: Readonly<{
    children: React.ReactNode;
    params: {locale: string};
  }>) {

  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
      </Head>
      <body
        className={montserrat.className}
      >
        <NextIntlClientProvider messages={messages}>
            <AuthContextProvider>
                <SignedUpToast/>
                {children}
            </AuthContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
