import { Layout, Navbar } from "nextra-theme-docs";
import { Banner } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "nextra-theme-docs/style.css";
import "@/styles/globals.css";
import Logo from "@/components/layout/logo";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Reflecto Documentation",
  description:
    "Complete documentation for Reflecto - A private, AI-powered journaling app",
};

const banner = (
  <Banner storageKey="reflecto-docs-banner">
    Welcome to Reflecto Docs - Your guide to mindful journaling
  </Banner>
);

const navbar = (
  <Navbar
    logo={<Logo size="sm" showText={true} />}
    projectLink="https://github.com/hasnaintypes/reflecto-app"
  />
);

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap("/docs");

  return (
    <div className={`${dmSans.variable} ${playfair.variable}`}>
      <Layout
        banner={banner}
        navbar={navbar}
        pageMap={pageMap}
        docsRepositoryBase="https://github.com/hasnaintypes/reflecto-app/tree/main/content"
        editLink="Edit this page on GitHub"
        feedback={{
          content: "Question? Give us feedback →",
          labels: "feedback",
        }}
      >
        {children}
      </Layout>
    </div>
  );
}
