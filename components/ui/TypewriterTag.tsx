"use client";

import { useEffect, useRef, useState } from "react";

const TypewriterTag = ({ text }: { text: string }) => {
  const [typedText, setTypedText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [started, text]); // Added 'text' to dependency array

  return (
    <p
      ref={ref}
      className="font-mono text-orange-primary text-sm tracking-widest mb-4"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {typedText}
      {!done && (
        <span
          className="inline-block w-0.5 h-4 bg-orange-primary ml-0.5 align-middle"
        />
      )}
    </p>
  );
};

export default TypewriterTag;