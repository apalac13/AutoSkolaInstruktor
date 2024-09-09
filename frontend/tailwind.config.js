/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-page": "url('/home.jpg')",
        "service-1": "url('/bmw_old.jpg')",
        "service-2": "url('/ride.jpg')",
        "service-3": "url('/split.jpg')",
        "category-title": "url('/parking-lot.jpg')",
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
        },
        white: {
          60: "#FFFFFF",
          61: "#F4FFFD",
        },
        red: {
          70: "#BE1E2D",
          71: "#DA291C",
        },
        green: {
          80: "#0A5C36",
          81: "#475841",
          82: "#9D9C62",
        },
      },
    },
  },
  plugins: [],
};
