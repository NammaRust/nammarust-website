"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Event, EventType } from "@/app/api/events/route";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingParticles from "@/components/ui/FloatingParticles";

const TYPE_CONFIG: Record<EventType, { label: string; color: string; bg: string }> = {
  ongoing:  { label: "Ongoing",  color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
  upcoming: { label: "Upcoming", color: "#F74C00", bg: "rgba(247,76,0,0.12)"   },
  past:     { label: "Past",     color: "rgba(245,245,245,0.35)", bg: "rgba(245,245,245,0.06)" },
};

const TABS: { key: EventType; label: string }[] = [
  { key: "ongoing",  label: "Ongoing"  },
  { key: "upcoming", label: "Upcoming" },
  { key: "past",     label: "Past"     },
];

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const cfg = TYPE_CONFIG[event.type];
  const [hovered, setHovered] = useState(false);

  const dateFormatted = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grain-card bg-grey-dark rounded-xl border flex flex-col gap-4 p-6 transition-all duration-300 relative overflow-hidden"
      style={{
        borderColor: hovered ? `${cfg.color}55` : "rgba(245,245,245,0.06)",
        boxShadow: hovered ? `0 0 32px ${cfg.color}18` : "none",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl transition-opacity duration-300"
        style={{ background: cfg.color, opacity: hovered ? 1 : 0.4 }}
      />

      {/* Badge + tags row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{ color: cfg.color, backgroundColor: cfg.bg, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {cfg.label}
        </span>
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full text-white-primary/30 bg-white-primary/5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-poppins font-bold text-xl text-white-primary leading-snug">
        {event.title}
      </h3>

      {/* Meta */}
      <div className="flex flex-col gap-1.5">
        {[
          { icon: "📅", text: `${dateFormatted} · ${event.time}` },
          { icon: "📍", text: event.location },
        ].map(({ icon, text }) => (
          <p
            key={text}
            className="font-mono text-xs text-white-primary/40 flex items-center gap-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span>{icon}</span>
            <span>{text}</span>
          </p>
        ))}
      </div>

      {/* Description */}
      <p className="font-inter text-white-primary/55 text-sm leading-relaxed flex-1">
        {event.description}
      </p>

      {/* CTA */}
      <a
        href={event.registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start px-5 py-2.5 rounded-lg font-poppins font-semibold text-sm transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: event.type === "past" ? "rgba(245,245,245,0.06)" : "#F74C00",
          color: event.type === "past" ? "rgba(245,245,245,0.4)" : "#fff",
          pointerEvents: event.type === "past" ? "none" : "auto",
        }}
      >
        {event.type === "past" ? "Event Ended" : "Register →"}
      </a>
    </motion.div>
  );
};

const EmptyState = ({ type }: { type: EventType }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-2 flex flex-col items-center justify-center py-24 gap-3"
  >
    <p
      className="font-mono text-orange-primary text-sm tracking-widest"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {"// no events found"}
    </p>
    <p className="font-inter text-white-primary/40 text-base text-center">
      {type === "ongoing"
        ? "No ongoing events right now — check back soon."
        : type === "upcoming"
        ? "No upcoming events scheduled yet. Stay tuned!"
        : "No past events recorded yet."}
    </p>
  </motion.div>
);

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<EventType>("ongoing");

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data: Event[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = events.filter((e) => e.type === activeTab);

  return (
    <div className="min-h-screen bg-black-primary flex flex-col">
      <Navbar />

      <main className="flex-1 relative pt-32 pb-24 px-6 overflow-hidden">
        <FloatingParticles />

        {/* Background accent */}
        <div
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(247,76,0,0.04) 0%, rgba(247,76,0,0.02) 50%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto w-full relative z-10">

          {/* Header */}
          <div className="mb-12">
            <p
              className="font-mono text-orange-primary text-sm tracking-widest mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {"< events />"}
            </p>
            <h1 className="font-poppins font-black text-4xl md:text-5xl text-white-primary mb-4">
              Community{" "}
              <span className="text-gradient">Events</span>
            </h1>
            <p className="font-inter text-white-primary/55 text-base leading-relaxed max-w-xl">
              Workshops, talks, and meetups — where NammaRust members come
              together to learn, share, and build.
            </p>
          </div>

          {/* Tab toggles */}
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            {TABS.map(({ key, label }) => {
              const active = activeTab === key;
              const cfg = TYPE_CONFIG[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="px-5 py-2 rounded-full font-mono text-sm tracking-wider transition-all duration-300"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    backgroundColor: active ? cfg.bg : "rgba(245,245,245,0.04)",
                    color: active ? cfg.color : "rgba(245,245,245,0.4)",
                    border: `1px solid ${active ? cfg.color + "55" : "rgba(245,245,245,0.08)"}`,
                  }}
                >
                  {label}
                  <span className="ml-2 text-[10px] opacity-60">
                    ({events.filter((e) => e.type === key).length})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Event grid */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="wait">
                {filtered.length > 0 ? (
                  filtered.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))
                ) : (
                  <EmptyState key={activeTab} type={activeTab} />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
