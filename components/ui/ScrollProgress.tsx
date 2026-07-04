"use client";

import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollY / docHeight) * 100;
      setProgress(percent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-transparent">
      <div
        className="h-full rounded-full"
        style={{
          width: progress + "%",
          background: "linear-gradient(to right, #F74C00, #ff7a3d)",
          boxShadow: "0 0 8px rgba(247, 76, 0, 0.6)",
          transition: "width 0.1s ease",
        }}
      />
    </div>
  );
};

export default ScrollProgress;