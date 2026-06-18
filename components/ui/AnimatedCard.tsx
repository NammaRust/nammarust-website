"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

const AnimatedCard = ({ children, index = 0, className = "" }: AnimatedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className={"relative grain-card bg-grey-dark rounded-xl border border-white-primary/5 overflow-hidden group " + className}
      whileTap={{ scale: 0.98 }}
    >
      {/* Orange corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div
          className="absolute top-0 right-0 w-12 h-12"
          style={{
            background: "linear-gradient(225deg, rgba(247,76,0,0.3) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Orange bottom border on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-orange-primary rounded-full"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />

      {children}
    </motion.div>
  );
};

export default AnimatedCard;