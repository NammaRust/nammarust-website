"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Event, EventType } from "@/app/api/events/route";
import FloatingParticles from "@/components/ui/FloatingParticles";
import SectionHeader from "@/components/ui/SectionHeader";

const TYPE_CONFIG: Record<EventType, { label: string; color: string; bg: string }> = {
  ongoing:  { label: "Ongoing",  color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
  upcoming: { label: "Upcoming", color: "#F74C00", bg: "rgba(247,76,0,0.12)"   },
  past:     { label: "Past",     color: "rgba(245,245,245,0.35)", bg: "rgba(245,245,245,0.06)" },
};

// Fix 1 (shared): parse date locally to avoid timezone-sensitive day shift
const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
};

const CarouselCard = ({ event }: { event: Event }) => {
  const cfg = TYPE_CONFIG[event.type];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grain-card bg-grey-dark rounded-xl border flex flex-col gap-4 p-6 h-full relative overflow-hidden transition-[border-color,box-shadow] duration-300"
      style={{
        borderColor: hovered ? `${cfg.color}55` : "rgba(245,245,245,0.06)",
        boxShadow: hovered ? `0 0 32px ${cfg.color}18` : "none",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl transition-opacity duration-300"
        style={{ background: cfg.color, opacity: hovered ? 1 : 0.4 }}
      />

      <span
        className="self-start font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
        style={{ color: cfg.color, backgroundColor: cfg.bg, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {cfg.label}
      </span>

      <h3 className="font-poppins font-bold text-lg text-white-primary leading-snug">
        {event.title}
      </h3>

      <div className="flex flex-col gap-1.5">
        {[
          { icon: "📅", text: `${formatDate(event.date)} · ${event.time}` },
          { icon: "📍", text: event.location },
        ].map(({ icon, text }) => (
          <p
            key={text}
            className="font-mono text-xs text-white-primary/40 flex items-center gap-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span>{icon}</span><span>{text}</span>
          </p>
        ))}
      </div>

      <p className="font-inter text-white-primary/55 text-sm leading-relaxed flex-1 line-clamp-3">
        {event.description}
      </p>

      <a
        href={event.type === "past" ? "/events" : event.registrationUrl}
        target={event.type === "past" ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className="self-start font-mono text-xs tracking-wider transition-colors duration-300"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: event.type === "past" ? "rgba(245,245,245,0.3)" : "#F74C00",
        }}
      >
        {event.type === "past" ? "> view recap" : "> register now"}
      </a>
    </div>
  );
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => {
        if (!r.ok) throw new Error("Non-2xx response");
        return r.json();
      })
      // Fix 2: validate API response before storing
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          const order: EventType[] = ["ongoing", "upcoming", "past"];
          const sorted = [...(data as Event[])].sort(
            (a, b) => order.indexOf(a.type) - order.indexOf(b.type)
          );
          setEvents(sorted);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const total = events.length;

  // Fix 3: guard against division by zero when total is 0
  const prev = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  // Fix 4: use composite keys to avoid duplicate key warnings when total < 3
  const visible = total > 0
    ? [0, 1, 2].map((offset) => ({
        event: events[(index + offset) % total],
        slot: offset, // unique per visible slot
      }))
    : [];

  return (
    <section
      id="events"
      className="relative min-h-screen flex flex-col justify-center py-32 px-6 bg-black-primary overflow-hidden"
    >
      <FloatingParticles />

      <div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(247,76,0,0.04) 0%, rgba(247,76,0,0.02) 50%, transparent 70%)" }}
      />

      <span
        className="absolute bottom-1/4 right-8 text-7xl md:text-9xl font-black text-white-primary/[0.03] select-none pointer-events-none"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {"{ }"}
      </span>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <SectionHeader
          tag="< events />"
          headline="What's Happening"
          accentWord="Happening"
        />

        <p className="font-inter text-white-primary/55 text-base leading-relaxed max-w-2xl mb-12">
          Workshops, talks, and community meetups — in person and online. Jump
          in, learn something new, and meet the people behind the code.
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <p
              className="font-mono text-white-primary/30 text-sm animate-pulse"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {"// fetching events..."}
            </p>
          </div>
        ) : (
          <>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -80 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {/* Fix 4: key by slot index to avoid duplicates when total < 3 */}
                  {visible.map(({ event, slot }) => (
                    <CarouselCard key={`slot-${slot}`} event={event} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hide nav controls when there's nothing to navigate */}
            {total > 1 && (
              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-3">
                  {[prev, next].map((fn, i) => (
                    <button
                      key={i}
                      onClick={fn}
                      className="w-10 h-10 rounded-full border border-white-primary/10 flex items-center justify-center font-mono text-white-primary/40 hover:border-orange-primary hover:text-orange-primary transition-all duration-300"
                    >
                      {i === 0 ? "←" : "→"}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {events.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === index ? 20 : 6,
                        height: 6,
                        backgroundColor: i === index ? "#F74C00" : "rgba(245,245,245,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <a
                href="/events"
                className="glow-orange px-8 py-3 bg-orange-primary text-white-primary font-poppins font-semibold text-base rounded-lg transition-all duration-300 hover:scale-105 hover:bg-orange-primary/90"
              >
                View All Events →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
