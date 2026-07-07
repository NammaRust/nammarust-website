import { NextResponse } from "next/server";

export type EventType = "upcoming" | "ongoing" | "past";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  registrationUrl: string;
  tags: string[];
  image: string;
}

const events: Event[] = [
  {
    id: "evt-005",
    title: "NammaRust Website Challenge 2026",
    description:
      "A community-driven competition inviting students and developers to build the official NammaRust website. Participants designed a modern, responsive site covering Home, About, Members, Mission & Vision, Social Media, and Contact sections. Top submissions were awarded certificates and featured across NammaRust platforms.",
    date: "2026-06-05",
    time: "8:00 PM IST - Jun 20, 11:30 PM",
    location: "Online",
    type: "past",
    registrationUrl: "#",
    tags: ["challenge", "design", "open-source"],
    image: "/assets/events/event2.png",
  },
  {
    id: "evt-006",
    title: "Getting Started With Rust",
    description:
      "A beginner-friendly 1-hour workshop introducing Rust to newcomers. Covered what Rust is, where it's used in industry, and a hands-on session building something simple together. Designed to make Rust feel less intimidating and more approachable for developers coming from other languages.",
    date: "2026-03-29",
    time: "3:00 PM - 4:00 PM IST",
    location: "Online",
    type: "past",
    registrationUrl: "#",
    tags: ["workshop", "beginner"],
    image: "/assets/events/event1.png",
  },
];

export async function GET() {
  return NextResponse.json(events);
}
