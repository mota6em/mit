import { useEffect } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export const useCounter = (
  value: number,
  suffix: string,
  isInView: boolean
) => {
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 200, damping: 30 });
  const display = useTransform(
    rounded,
    (latest) => Math.floor(latest).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) count.set(value);
  }, [isInView, count, value]);

  return display;
};
