"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex   flex-col items-center justify-center bg-white text-slate-950 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#f1c34c 10%,#11b505 15%,#4d93fb 20%,#f1c34c 25%,#11b505 30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000 0%,#000 7%,transparent 10%,transparent 12%,#000 16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff 0%,#fff 7%,transparent 10%,transparent 12%,#fff 16%)",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,#f1c34c_10%,#11b505_15%,#4d93fb_20%,#f1c34c_25%,#11b505_30%)] [--dark-gradient:repeating-linear-gradient(100deg,#000_0%,#000_7%,var(--transparent)_10%,var(--transparent)_12%,#000_16%)] [--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,var(--transparent)_10%,var(--transparent)_12%,#fff_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
