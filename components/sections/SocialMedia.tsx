"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";
import { socialContent } from "@/constants/content";
import FloatingParticles from "@/components/ui/FloatingParticles";
import TypewriterTag from "@/components/ui/TypewriterTag";
import { motion, useInView } from "framer-motion";

const icons: Record<string, JSX.Element> = {
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  x: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a2.997 2.997 0 0 0-2.107-2.12C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.521A2.997 2.997 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.107 2.12c1.886.521 9.391.521 9.391.521s7.505 0 9.391-.521a2.997 2.997 0 0 0 2.107-2.12C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
    </svg>
  ),
  github: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.347-.347.521-.521.174-.174.232-.298.348-.497.116-.198.058-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.05 3.13 4.967 4.27 2.916 1.14 2.916.76 3.443.713.526-.05 1.758-.72 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.025 0C5.405 0 .025 5.38.025 12c0 2.654.873 5.107 2.349 7.103L0 24l4.984-1.624A11.93 11.93 0 0012.025 24C18.645 24 24 18.62 24 12S18.645 0 12.025 0zm0 21.91c-1.939 0-3.747-.566-5.27-1.539l-.378-.236-3.748 1.221 1.244-3.66-.244-.382A9.872 9.872 0 012.115 12c0-5.467 4.444-9.91 9.91-9.91 5.466 0 9.91 4.443 9.91 9.91 0 5.466-4.444 9.91-9.91 9.91z" />
    </svg>
  ),
  medium: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  ),
  discord: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
};

// One-line description per channel — what actually lives there, not generic praise
const blurbs: Record<string, string> = {
  discord: "Live chats, voice rooms, and day-to-day dev banter.",
  github: "Every repo, issue, and pull request we ship.",
  youtube: "Talks, walkthroughs, and recorded sessions.",
  medium: "Long-form writeups from members, in their own words.",
  linkedin: "Milestones, launches, and community news.",
  instagram: "Behind-the-scenes moments and event recaps.",
};

// Two channels get the "hub" treatment — the ones a member actually lives in day to day.
// Falls back to the first two platforms if neither is present in the data.
const FEATURED_ICONS = ["youtube", "linkedin"];

// Same staggered opacity pulse as the terminal header dots in Contact.tsx,
// minus the "sent" state swap (no equivalent status here).
const TerminalDots = ({ color }: { color: string }) => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const CopyButton = ({ url, color }: { url: string; color: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access failed silently
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-poppins font-semibold border transition-all duration-200"
      style={{
        borderColor: copied ? color : "rgba(245,245,245,0.15)",
        color: copied ? color : "rgba(245,245,245,0.6)",
        backgroundColor: copied ? `${color}1A` : "transparent",
      }}
    >
      {copied ? (
        <>
          Copied
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </>
      ) : (
        <>
          Copy
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 012-2h10" />
          </svg>
        </>
      )}
    </button>
  );
};

const FeaturedCard = ({
  platform,
  isInView,
  index,
}: {
  platform: typeof socialContent.platforms[0];
  isInView: boolean;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grain-card md:col-span-2 bg-grey-dark rounded-2xl p-7 md:p-8 border transition-all duration-300 flex flex-col justify-between min-h-[260px]"
      style={{
        backgroundImage: `linear-gradient(135deg, ${platform.color}${hovered ? "26" : "14"} 0%, transparent 55%)`,
        borderColor: hovered ? `${platform.color}55` : `${platform.color}22`,
        boxShadow: hovered ? `0 0 40px ${platform.color}22` : "none",
      }}
    >
      <div>
        <div className="flex items-start justify-between mb-5">
          <div
            className="flex items-center justify-center rounded-2xl shrink-0 [&>svg]:w-7 [&>svg]:h-7 transition-colors duration-300"
            style={{
              width: 60,
              height: 60,
              backgroundColor: hovered ? `${platform.color}26` : "rgba(245,245,245,0.06)",
              color: hovered ? platform.color : "rgba(245,245,245,0.5)",
            }}
          >
            {icons[platform.icon]}
          </div>
          <div className="pt-1">
            <TerminalDots color={platform.color} />
          </div>
        </div>

        <h3 className="font-poppins font-bold text-2xl text-white-primary mb-1">
          {platform.name}
        </h3>
        <p className="font-mono text-white-primary/35 text-sm mb-4">{platform.username}</p>
        <p className="font-inter text-white-primary/55 text-sm leading-relaxed max-w-sm">
          {blurbs[platform.icon] ?? socialContent.description}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-poppins font-semibold transition-opacity duration-200 hover:opacity-90"
          style={{ backgroundColor: platform.color, color: "#0B0B0B" }}
        >
          Visit
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <CopyButton url={platform.url} color={platform.color} />
      </div>
    </motion.div>
  );
};

const ChannelCard = ({
  platform,
  isInView,
  index,
}: {
  platform: typeof socialContent.platforms[0];
  isInView: boolean;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.35 + index * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grain-card bg-grey-dark rounded-2xl p-5 border transition-all duration-300 flex flex-col"
      style={{
        backgroundImage: `linear-gradient(135deg, ${platform.color}${hovered ? "22" : "12"} 0%, transparent 60%)`,
        borderColor: hovered ? `${platform.color}55` : `${platform.color}1f`,
        boxShadow: hovered ? `0 0 28px ${platform.color}1f` : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="flex items-center justify-center rounded-xl shrink-0 [&>svg]:w-5 [&>svg]:h-5 transition-colors duration-300"
          style={{
            width: 42,
            height: 42,
            backgroundColor: hovered ? `${platform.color}26` : "rgba(245,245,245,0.06)",
            color: hovered ? platform.color : "rgba(245,245,245,0.5)",
          }}
        >
          {icons[platform.icon]}
        </div>
        <svg
          className="w-3.5 h-3.5 transition-all duration-300"
          style={{
            color: hovered ? platform.color : "rgba(245,245,245,0.25)",
            transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
        </svg>
      </div>

      <p className="font-poppins font-semibold text-white-primary text-base mb-0.5">
        {platform.name}
      </p>
      <p className="font-mono text-white-primary/35 text-xs">{platform.username}</p>
    </motion.a>
  );
};

const SocialMedia = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featured = socialContent.platforms.filter((p) => FEATURED_ICONS.includes(p.icon));
  const rest = socialContent.platforms.filter((p) => !FEATURED_ICONS.includes(p.icon));
  const orderedFeatured = featured.length >= 2 ? featured : socialContent.platforms.slice(0, 2);
  const orderedRest = featured.length >= 2 ? rest : socialContent.platforms.slice(2);

  return (
    <section
      ref={sectionRef}
      id="social-media"
      className="relative min-h-screen flex flex-col justify-center py-32 px-6 bg-black-primary overflow-hidden"
    >
      <FloatingParticles />

      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(247,76,0,0.05) 0%, rgba(247,76,0,0.02) 50%, transparent 70%)" }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(247,76,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(247,76,0,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <TypewriterTag text={socialContent.tag} />
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-white-primary mb-3">
            {socialContent.headline} <span className="text-gradient">{socialContent.accentWord}</span>
          </h2>
          <p className="font-poppins font-semibold text-orange-primary text-base md:text-lg mb-4">
            {socialContent.subheading}
          </p>
          <p className="font-inter text-white-primary/60 text-base leading-relaxed">
            {socialContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {orderedFeatured.map((platform, i) => (
            <FeaturedCard key={platform.icon} platform={platform} isInView={isInView} index={i} />
          ))}
          {orderedRest.map((platform, i) => (
            <ChannelCard key={platform.icon} platform={platform} isInView={isInView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;