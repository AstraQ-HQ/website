import config from "@payload-config";
import { getPayload } from "payload";
import { Footer } from "./_components/layout/footer";
import { Header } from "./_components/layout/header";
import { ContactUsSection } from "./_components/sections/contact-us";
import { DocumentationSection } from "./_components/sections/documentation";
import { FAQSection } from "./_components/sections/faq";
import { FeaturesSection } from "./_components/sections/features";
import { HeroSection } from "./_components/sections/hero";
import { SocialProofSection } from "./_components/sections/social-proof";
import { TestimonialsSection } from "./_components/sections/testimonials";

export default async function Page() {
  const payload = await getPayload({ config });

  const [company, footer, header] = await Promise.all([
    payload.findGlobal({ slug: "company" }),
    payload.findGlobal({ slug: "footer" }),
    payload.findGlobal({ slug: "header" }),
  ]);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden flex flex-col justify-start items-center">
      <div className="relative flex flex-col justify-start items-center w-full">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
          <div className="w-px h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-(--landing-border) shadow-[1px_0px_0px_white] z-0"></div>
          <div className="w-px h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-(--landing-border) shadow-[1px_0px_0px_white] z-0"></div>
          <div className="self-stretch pt-[9px] overflow-hidden border-b border-(--landing-border-weak) flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
            <Header header={header} company={company} />

            <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-[216px] pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full sm:pl-0 sm:pr-0 pl-0 pr-0">
              <HeroSection company={company} />
              <FeaturesSection />
              <SocialProofSection />
              <DocumentationSection />
              <TestimonialsSection />
              <FAQSection />
              <ContactUsSection />
            </div>

            <Footer footer={footer} company={company} />
          </div>
        </div>
      </div>
    </div>
  );
}
