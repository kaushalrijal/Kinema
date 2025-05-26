import type { Config } from 'tailwindcss'

const {nextui} = require("@nextui-org/react");

const config: Config = {
  darkMode: "class",

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        lightbg: "#ffffff",
        lightprimary: "#2563eb",
        secondary: "#e2e8f0",
        
        // Dark theme colors
        darkbg: "#181818",
        darkbgSecondary: "#212121",
        darkprimary: "#f2932c",
        darktext: "#f4f4f4",
        darktextSecondary: "#a3a3a3",
        darkborder: "#333333",
        
        // Common colors
        accent: "#f2932c",
      },
    },
    plugins: [nextui()],  
    variants: {
      extend: {
          display: ["group-hover"],
      },
  },
  },
  screens: {
    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
