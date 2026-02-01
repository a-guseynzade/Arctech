import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export default function Preloader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-32 md:w-40"
        >
          <img src={logo} alt="Arctech" className="w-full h-auto" />
        </motion.div>

        {/* Progress Bar */}
        <div className="w-48 h-[2px] bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-[var(--primary-brand)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
