"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FeatureCard } from "../feature-card";

export function ProductsSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return;

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % 3);
          }
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (!mountedRef.current) return;
    setActiveCard(index);
    setProgress(0);
  };
  return (
    <>
      <div className="relative z-5 my-8 mb-0 flex w-full max-w-[960px] flex-col items-center justify-center gap-2 px-2 pt-2 pb-6 sm:my-12 sm:px-4 sm:pt-4 sm:pb-8 md:my-16 md:px-6 md:pb-10 lg:my-16 lg:w-[960px] lg:px-11 lg:pb-0">
        <div className="flex h-[200px] w-full max-w-[960px] flex-col items-start justify-start overflow-hidden rounded-[6px] bg-card shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] sm:h-[280px] sm:rounded-[8px] md:h-[450px] lg:h-[695.55px] lg:w-[960px] lg:rounded-[9.06px]">
          <div className="flex flex-1 items-start justify-start self-stretch">
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative h-full w-full overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 transition-all duration-500 ease-in-out",
                    activeCard === 0
                      ? "scale-100 opacity-100 blur-0"
                      : "scale-95 opacity-0 blur-sm",
                  )}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dsadsadsa.jpg-xTHS4hGwCWp2H5bTj8np6DXZUyrxX7.jpeg"
                    alt="Schedules Dashboard - Customer Subscription Management"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div
                  className={cn(
                    "absolute inset-0 transition-all duration-500 ease-in-out",
                    activeCard === 1
                      ? "scale-100 opacity-100 blur-0"
                      : "scale-95 opacity-0 blur-sm",
                  )}
                >
                  <Image
                    src="/analytics-dashboard-with-charts-graphs-and-data-vi.jpg"
                    alt="Analytics Dashboard"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={cn(
                    "absolute inset-0 transition-all duration-500 ease-in-out",
                    activeCard === 2
                      ? "scale-100 opacity-100 blur-0"
                      : "scale-95 opacity-0 blur-sm",
                  )}
                >
                  <Image
                    src="/data-visualization-dashboard-with-interactive-char.jpg"
                    alt="Data Visualization Dashboard"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center self-stretch border-border/70 border-t border-b">
        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
          <div className="absolute top-[-120px] left-[-40px] flex w-[120px] flex-col items-start justify-start sm:left-[-50px] sm:w-[140px] md:left-[-58px] md:w-[162px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't need a key here
                key={i}
                className="-rotate-45 h-3 origin-top-left self-stretch outline-[0.5px] outline-foreground/10 outline-offset-[-0.25px] sm:h-4"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-stretch justify-center gap-0 px-0 sm:px-2 md:flex-row md:px-0">
          <FeatureCard
            title="Plan your schedules"
            description="Streamline customer subscriptions and billing with automated scheduling tools."
            isActive={activeCard === 0}
            progress={activeCard === 0 ? progress : 0}
            onClick={() => handleCardClick(0)}
          />
          <FeatureCard
            title="Analytics & insights"
            description="Transform your business data into actionable insights with real-time analytics."
            isActive={activeCard === 1}
            progress={activeCard === 1 ? progress : 0}
            onClick={() => handleCardClick(1)}
          />
          <FeatureCard
            title="Collaborate seamlessly"
            description="Keep your team aligned with shared dashboards and collaborative workflows."
            isActive={activeCard === 2}
            progress={activeCard === 2 ? progress : 0}
            onClick={() => handleCardClick(2)}
          />
        </div>

        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
          <div className="-left-10 absolute top-[-120px] flex w-[120px] flex-col items-start justify-start sm:left-[-50px] sm:w-[140px] md:left-[-58px] md:w-[162px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't need a key here
                key={i}
                className="-rotate-45 h-3 origin-top-left self-stretch outline-[0.5px] outline-foreground/10 outline-offset-[-0.25px] sm:h-4"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
