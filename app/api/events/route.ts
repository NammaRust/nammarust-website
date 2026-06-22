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
}

const events: Event[] = [
  {
    id: "evt-001",
    title: "Rust Fundamentals Workshop",
    description:
      "A hands-on introductory workshop covering ownership, borrowing, and the basics of safe systems programming in Rust. Perfect for developers coming from C++, Python, or JavaScript.",
    date: "2026-06-20",
    time: "6:00 PM IST",
    location: "Chennai / Online",
    type: "ongoing",
    registrationUrl: "#",
    tags: ["workshop", "beginner"],
  },
  {
    id: "evt-002",
    title: "Building CLIs with Rust",
    description:
      "Learn to build fast, ergonomic command-line tools using the clap and indicatif crates. We'll build a real CLI from scratch and publish it to crates.io.",
    date: "2026-07-12",
    time: "5:30 PM IST",
    location: "Online",
    type: "upcoming",
    registrationUrl: "#",
    tags: ["workshop", "intermediate", "cli"],
  },
  {
    id: "evt-003",
    title: "Async Rust Deep Dive",
    description:
      "A technical session exploring async/await in Rust — how the executor model works, tokio vs async-std, and common pitfalls when writing concurrent Rust code.",
    date: "2026-07-26",
    time: "6:00 PM IST",
    location: "Online",
    type: "upcoming",
    registrationUrl: "#",
    tags: ["talk", "advanced", "async"],
  },
  {
    id: "evt-004",
    title: "NammaRust Community Kickoff",
    description:
      "The founding meetup that started it all. Members introduced themselves, shared their Rust journeys, and laid the groundwork for what NammaRust would become.",
    date: "2026-04-05",
    time: "5:00 PM IST",
    location: "Chennai",
    type: "past",
    registrationUrl: "#",
    tags: ["meetup", "community"],
  },
  {
    id: "evt-005",
    title: "Rust for Web Developers",
    description:
      "An overview of the Rust web ecosystem — Axum, Actix-web, and WASM. Aimed at frontend and fullstack developers curious about bringing Rust into their web projects.",
    date: "2026-05-10",
    time: "6:00 PM IST",
    location: "Online",
    type: "past",
    registrationUrl: "#",
    tags: ["talk", "web", "intermediate"],
  },
  {
    id: "evt-006",
    title: "Open Mic: Rust in Production",
    description:
      "Community members share short talks (10 min each) about using Rust in real projects — what worked, what didn't, and lessons learned the hard way.",
    date: "2026-05-31",
    time: "5:30 PM IST",
    location: "Chennai / Online",
    type: "past",
    registrationUrl: "#",
    tags: ["community", "talks"],
  },
];

export async function GET() {
  return NextResponse.json(events);
}
