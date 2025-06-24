import {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*", "media.tina.io"],

  reactStrictMode: true,
  images: {
    domains: ["media.tina.io"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
