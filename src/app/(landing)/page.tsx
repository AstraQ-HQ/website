import config from "@payload-config";
import type { Metadata } from "next";
import Script from "next/script";
import { getPayload } from "payload";
import type { Graph, Organization, WebSite } from "schema-dts";
import { env } from "@/env";
import { Footer } from "./_components/layout/footer";
import { Header } from "./_components/layout/header";
import { BackedBySection } from "./_components/sections/backed-by";
import { ContactUsSection } from "./_components/sections/contact-us";
import { FAQSection } from "./_components/sections/faq";
import { HeroSection } from "./_components/sections/hero";
import { ProductsSection } from "./_components/sections/products";
import { ServicesSection } from "./_components/sections/services";
import { TestimonialsSection } from "./_components/sections/testimonials";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config });
  const siteInfo = await payload.findGlobal({ slug: "siteInfo" });
  return {
    title: siteInfo.title,
    description: siteInfo.subtitle,
  };
}

export default async function Page() {
  const payload = await getPayload({ config });

  const [company, footer, header, siteInfo] = await Promise.all([
    payload.findGlobal({ slug: "company" }),
    payload.findGlobal({ slug: "footer" }),
    payload.findGlobal({ slug: "header" }),
    payload.findGlobal({ slug: "siteInfo" }),
  ]);

  const organizationSchema: Organization = {
    "@type": "Organization",
    name: company.name,
    description: company.description,
    url: company.website ?? env.NEXT_PUBLIC_SITE_URL,
    ...(company.email && {
      email: company.email,
    }),
    ...(company.phone && {
      telephone: company.phone,
    }),
    ...(company.logo &&
      typeof company.logo !== "number" &&
      company.logo.url && {
        logo: company.logo.url,
      }),
    ...(company.address && {
      address: {
        "@type": "PostalAddress",
        ...(company.address.line1 && { streetAddress: company.address.line1 }),
        ...(company.address.line2 && { addressLine2: company.address.line2 }),
        ...(company.address.city && { addressLocality: company.address.city }),
        ...(company.address.state && { addressRegion: company.address.state }),
        ...(company.address.postalCode && {
          postalCode: company.address.postalCode,
        }),
        ...(company.address.country && {
          addressCountry: company.address.country,
        }),
      },
    }),
    ...(company.social && {
      sameAs: [
        company.social.facebook,
        company.social.twitter,
        company.social.linkedin,
        company.social.instagram,
        company.social.github,
        company.social.youtube,
      ].filter((url): url is string => Boolean(url)),
    }),
  };

  const websiteSchema: WebSite = {
    "@type": "WebSite",
    name: siteInfo.title,
    description: siteInfo.subtitle,
    url: env.NEXT_PUBLIC_SITE_URL,
    publisher: {
      "@type": "Organization",
      name: company.name,
    },
  };

  const graphSchema: Graph = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema],
  };

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden flex flex-col justify-start items-center">
      <div className="relative flex flex-col justify-start items-center w-full">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
          <div className="w-px h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-border shadow-[1px_0px_0px_white] z-0"></div>
          <div className="w-px h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-border shadow-[1px_0px_0px_white] z-0"></div>
          <div className="self-stretch pt-[9px] overflow-hidden border-b border-border/50 flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
            <Header header={header} company={company} />

            <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-[216px] pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full sm:pl-0 sm:pr-0 pl-0 pr-0">
              <HeroSection company={company} siteInfo={siteInfo} />
              <ProductsSection />
              <BackedBySection siteInfo={siteInfo} />
              <ServicesSection siteInfo={siteInfo} />
              <TestimonialsSection />
              <FAQSection siteInfo={siteInfo} />
              <ContactUsSection />
            </div>

            <Footer footer={footer} company={company} />
          </div>
        </div>
      </div>

      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a valid use case
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graphSchema),
        }}
      />
    </div>
  );
}
