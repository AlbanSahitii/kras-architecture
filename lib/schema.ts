export function krasOrganizationSchema(locale: "en" | "de") {
  return {
    "@context": "https://schema.org",
    "@type": "ArchitecturalFirm", // specific subtype of Organization
    name:
      locale === "de"
        ? "KRAS Architektur & Design"
        : "KRAS Architecture & Design",
    description:
      locale === "de"
        ? "Schnelle, kostengünstige, nachhaltige Architektur-, Interior-, 3D- und Landschaftsplanung mit deutscher Präzision und balkanischer Effizienz."
        : "Fast, affordable, sustainable architecture, interior, 3D visualisation and landscape design with German precision and Balkan efficiency.",
    url: "https://krasarchitects.com",
    logo: "https://krasarchitects.com/logo-whitebg-black-with-text.jpg",
    image: "https://krasarchitects.com/logo-whitebg-black-with-text.jpg",
    sameAs: ["https://www.facebook.com/profile.php?id=61576569491054"],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Berlin",
        addressCountry: "DE",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Pristina",
        addressCountry: "XK",
      },
    ],
    areaServed: "Europe",
    serviceProvided: [
      "Architectural design",
      "Interior design",
      "3D visualisation",
      "Landscape planning",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@krasarchitects.com",
      availableLanguage: ["en", "de", "sq"],
    },
  };
}
