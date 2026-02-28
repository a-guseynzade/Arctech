import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className = "",
  fullWidth = false,
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
      viewport={{ once: true, margin: "-200px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
      className={`${className} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </motion.div>
  );
}
