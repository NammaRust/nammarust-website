"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TypewriterTag from "./TypewriterTag";

interface SectionHeaderProps {
  tag: string;
  headline: string;
  accentWord?: string;
  center?: boolean;
}

const SectionHeader = ({ tag, headline, accentWord, center = false }: SectionHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const renderHeadline = () => {
    if (!accentWord) return headline;
    const parts = headline.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="text-gradient">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={"mb-12 " + (center ? "text-center" : "text-left")}
    >
      <TypewriterTag text={tag} />
      <h2 className="font-poppins font-black text-4xl md:text-5xl text-white-primary">
        {renderHeadline()}
      </h2>
    </motion.div>
  );
};

export default SectionHeader;