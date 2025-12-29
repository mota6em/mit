"use client";

import { SWRConfig } from "swr";
import { Toaster, toast } from "react-hot-toast";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        // sGlobal Cache Rules
        revalidateOnFocus: false,
        dedupingInterval: 180000, // 3 mins

        // Global Error Handling
        onError: (error) => {
          if (error.status !== 403 && error.status !== 404) {
            console.error("Global SWR Error:", error);
            toast.error("Oops! Could not load data.");
          }
        },
      }}
    >
      {children}
      <Toaster position="bottom-right" />
    </SWRConfig>
  );
};
