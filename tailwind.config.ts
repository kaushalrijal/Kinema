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
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
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
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
    variants: {
      extend: {
        display: ["group-hover"],
      },
    },
  },
  plugins: [
    nextui(),
    require("tailwindcss-animate")
  ],
}

export default config
