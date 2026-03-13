import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className = "",
  fullWidth = false,
  amount = 0.15,
}) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "-10% 0px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className, fullWidth && "w-full")}
    >
      {children}
    </motion.div>
  );
}
