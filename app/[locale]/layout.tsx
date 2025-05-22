import type {Metadata, Viewport} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {ReactQueryProvider} from "./reactQueryProvider";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
import {getTranslations} from "next-intl/server";
import {Analytics} from "@vercel/analytics/next";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kras Architecture",
  description: "Kras Architecture",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};
type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function RootLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const footerMessages = await getTranslations("Footer");
  const navbarMessages = await getTranslations("Navbar");

  return (
    <html lang={locale}>
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <body className={`${poppins.className} `}>
        <ReactQueryProvider>
          <NextIntlClientProvider>
            <Navbar
              projects={navbarMessages("projects")}
              aboutUs={navbarMessages("aboutUs")}
              news={navbarMessages("news")}
            />
            {children}
            <Analytics />
            <Footer
              address={footerMessages("address")}
              contactUs={footerMessages("contactUs")}
              socials={footerMessages("socials")}
            />
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
