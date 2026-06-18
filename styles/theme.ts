export const colors = {
  orange: {
    primary: "#F74C00",
    light: "#ff7a3d",
    glow: "rgba(247, 76, 0, 0.4)",
  },
  black: {
    primary: "#0B0B0B",
  },
  grey: {
    dark: "#1B1B1B",
    mid: "#2a2a2a",
  },
  white: {
    primary: "#F5F5F5",
    muted: "#a0a0a0",
  },
};

// We will map these to the CSS variables we created in layout.tsx
export const fonts = {
  heading: "var(--font-poppins)",
  body: "var(--font-inter)",
  mono: "var(--font-mono)",
};

export const transitions = {
  fast: "all 0.2s ease",
  medium: "all 0.4s ease",
  slow: "all 0.6s ease",
};