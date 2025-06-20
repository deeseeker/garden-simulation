/**
 * Application constants and configuration
 */

export const STEPS = [
  { id: 1, title: "Quote Request", description: "Select tokens and get quote" },
  { id: 2, title: "Intent Signing", description: "Sign your intent" },
  { id: 3, title: "Order Book", description: "Submit to order book" },
  { id: 4, title: "Auction", description: "Solvers compete" },
  { id: 5, title: "Selection", description: "Winner selected" },
  { id: 6, title: "Settlement", description: "Execute transaction" },
  { id: 7, title: "Execution", description: "Destination confirmation" },
  { id: 8, title: "Redemption", description: "Claim your tokens" },
] as const

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const

export const SIMULATION_DELAYS = {
  quote: 1500,
  signing: 2000,
  submission: 2000,
  auction: 3000,
  challenge: 5000,
  settlement: 5000,
  execution: 4000,
  redemption: 2000,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export const GARDEN_COLORS = {
  mint: {
    50: "#f0fdf9",
    100: "#ccfbef",
    200: "#99f6e0",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#7BDCBA", // Main background
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#FCB9C2", // Alt 2 background
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
  },
} as const
