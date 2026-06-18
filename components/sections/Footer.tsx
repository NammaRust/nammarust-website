import Image from "next/image";
import { navHrefs } from "@/components/sections/Navbar";
import { socialContent } from "@/constants/content";

const Footer = () => {
  const quickLinks = ["Home", "About", "Mission & Vision", "Members"];

  return (
    <footer className="relative bg-grey-dark border-t border-orange-primary/10 overflow-hidden">
      {/* Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.075,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(247,76,0,0.4), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                width={200}
                height={200}
                src="/assets/logo.png"
                alt="NammaRust Logo Footer"
                className="h-14 w-auto"
              />
              <span className="font-poppins font-bold text-white-primary text-lg tracking-wide">
                Namma<span className="text-orange-primary">Rust</span>
              </span>
            </div>
            <p className="font-inter text-white-primary/50 text-sm leading-relaxed">
              Where Rust becomes craft.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-poppins font-bold text-white-primary text-base mb-1">
              Quick Links
            </h3>
            {quickLinks.map((link) => (
              <a
                key={link}
                href={navHrefs[link]}
                className="font-inter text-white-primary/50 text-sm hover:text-orange-primary transition-colors duration-300 w-fit"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <h3 className="font-poppins font-bold text-white-primary text-base mb-1">
              Connect
            </h3>
            {socialContent.platforms.map((platform, i) => (
              <a
                key={i}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-inter text-white-primary/50 text-sm hover:text-orange-primary transition-colors duration-300 w-fit"
              >
                {platform.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white-primary/5 text-center">
          <p
            className="font-mono text-white-primary/30 text-xs tracking-wider"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2026 NammaRust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
