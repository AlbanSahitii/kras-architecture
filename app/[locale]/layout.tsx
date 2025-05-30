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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface localeType {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: localeType): Promise<Metadata> {
  const {locale} = await params;

  const t = await getTranslations("metaData");

  return {
    title: {
      default: "Home | Kras Architecture",
      template: `%s | Kras Architecture`,
    },
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_EN",
      url: "https://krasarchitects.com",
      title: "Kras Architecture",
      siteName: "Kras Architecture",
      images: [
        {
          url: "/logo-whitebg-black-with-text.jpg",
          width: 1200,
          height: 630,
          alt: "Kras Architecture",
          type: "image/png",
        },
      ],
    },
    facebook: {
      appId: "https://www.facebook.com/profile.php?id=61576569491054",
    },
    twitter: {
      card: "summary_large_image",
      title: "Kras Architecture",
      description: t("description"),
      images: ["/logo-whitebg-black-with-text.jpg"],
    },
    icons: {
      icon: "/favicon.ico",
    },
    viewport: {
      width: "device-width",
      initialScale: 1.0,
      interactiveWidget: "resizes-content",
    },
  };
}

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
    <html lang={locale} translate="no" className="notranslate">
      <body
        translate="no"
        className={`${poppins.className} overflow-x-hidden  h-full`}
      >
        <ReactQueryProvider>
          <NextIntlClientProvider>
            <Navbar
              projects={navbarMessages("projects")}
              aboutUs={navbarMessages("aboutUs")}
              home={navbarMessages("home")}
              contact={navbarMessages("contact")}
              closeText={navbarMessages("close")}
            />
            {children}
            <Analytics />
            <Footer
              contactUs={footerMessages("contactUs")}
              socials={footerMessages("socials")}
            />
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
