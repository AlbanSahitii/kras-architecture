import {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*", "media.tina.io"],

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["assets.tina.io"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
