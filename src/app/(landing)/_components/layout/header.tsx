import Link from "next/link";
import type { Company as CompanyType, Header as HeaderType } from "@/payload/types";

type HeaderProps = {
  header: HeaderType;
  company: CompanyType;
};

export function Header({ header, company }: HeaderProps) {
  return (
    <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0">
      <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-(--landing-border) shadow-[0px_1px_0px_white]"></div>

      <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-(--landing-neutral-50) backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
        <div className="flex justify-center items-center">
          <div className="flex justify-start items-center">
            <div className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans">
              {company.name}
            </div>
          </div>
        </div>
        <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 flex justify-start items-start sm:flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-4">
          {header.links.map((link) => (
            <div className="flex justify-start items-center" key={link.id}>
              <Link
                href={link.url}
                className="flex flex-col justify-center text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
