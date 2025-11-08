"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SiteInfo as SiteInfoType } from "@/payload/types";

type FAQSectionProps = {
  siteInfo: SiteInfoType;
};

export function FAQSection({ siteInfo }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-secondary-foreground font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            {siteInfo.faq.title}
          </div>
          <div className="w-full text-muted-foreground text-base font-normal leading-7 font-sans">
            {siteInfo.faq.description}
          </div>
        </div>

        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {siteInfo.faq.faqItems.map((item, index) => {
              const isOpen = openItems.includes(index);

              return (
                <div
                  key={item.question}
                  className="w-full border-b border-foreground/20 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-foreground/5 transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-secondary-foreground text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronDownIcon
                        className={cn(
                          "size-6 text-foreground/60 transition-transform duration-300 ease-in-out",
                          isOpen ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </div>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="px-5 pb-[18px] text-muted-foreground text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
