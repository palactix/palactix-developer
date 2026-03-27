import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FormMessage({ children, className }: { children?: ReactNode, className?: string }) {
  return (
    <AnimatePresence mode="popLayout">
      {children && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, height: 0, y: -5 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`text-[12px] font-medium text-destructive mt-1.5 leading-none ${className || ""}`}
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
