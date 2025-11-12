const { nextui } = require("@nextui-org/theme");
const { transform } = require("next/dist/build/swc");
const {
  ErrorBoundaryHandler,
} = require("next/dist/client/components/error-boundary");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(date-picker|button|ripple|spinner|calendar|date-input|popover).js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-page": "url('/asi-hero-image.png')",
        "service-1": "url('/bmw-golf2.jpg')",
        "service-2": "url('/bmw2.jpg')",
        "service-3": "url('/split.jpg')",
        "category-title": "url('/bmw-golf2.jpg')",
        "category-A": "url('/A-kat.jpg')",
        "category-B": "url('/B-kat.jpg')",
        "category-BE": "url('/BE-kat.jpg')",
        "category-C": "url('/C-kat.jpg')",
        "online-prijava": "url('/online-prijava.jpg')",
        "online-testovi": "url('/online-testovi.jpg')",
        "e-nastava": "url('/lukakandidati.jpg')",
        kontakt: "url('/kontakt.jpg')",
      },
      fontFamily: {
        sourceSans3: ["Source Sans 3", "sans-serif"],
      },
      colors: {
        black: {
          40: "#231F20",
        },
        gray: {
          50: "#969696",
          51: "#181818",
          52: "#E4E5E4",
        },
        white: {
          60: "#FFFFFF",
          61: "#F4FFFD",
        },
        red: {
          70: "#BE1E2D",
          71: "#DA291C",
          72: "#311515",
        },
        green: {
          80: "#0A5C36",
          81: "#475841",
          82: "#9D9C62",
        },
      },
    },
  },
  plugins: [nextui()],
};
