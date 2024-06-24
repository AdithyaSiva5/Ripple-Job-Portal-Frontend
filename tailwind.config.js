/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    'node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      animation: {
        slideleft: 'slideleft 1s ease-in'
      },
      colors: {
        'green-600': '#079D46' ,
        grape: "rgba(var(--grape))",
        orange: 'hsl(26, 100%, 55%)',
        paleOrange: 'hsl(25, 100%, 94%)',
        veryDarkBlue: 'hsl(220, 13%, 13%)',
        darkGrayishBlue: 'hsl(219, 9%, 45%)',
        grayishBlue: 'hsl(220, 14%, 75%)',
        lightGrayishBlue: 'hsl(223, 64%, 98%)', 
        black75: 'hsla(0, 0%, 0%, 75%)', 
        darkColor: '#141519',

        purewhite: 'rgba(var(--purewhite))',
        primary: 'rgba(var(--primary))',       // Bright blue for primary actions
        pureblack: 'rgba(var(--pureblack))',
        background: 'hsl(230, 17%, 14%)',     // Very dark blue for the background
        onBackground: 'hsl(0, 0%, 95%)',      // Very light gray for text on background


        secondary: 'hsl(48, 94%, 68%)',       // Soft yellow for secondary accents
        accent: 'hsl(343, 82%, 58%)',         // Bright red for highlights
        surface: 'hsl(230, 20%, 18%)',        // Slightly lighter dark blue for surfaces
        onPrimary: 'hsl(0, 0%, 100%)',        // Pure white for text on primary color
        onSurface: 'hsl(0, 0%, 90%)',         // Light gray for text on surfaces
        onAccent: 'hsl(0, 0%, 100%)',         // Pure white for text on accent color
        borderColor: 'hsl(230, 20%, 24%)',    // Darker blue for borders
        mutedText: 'hsl(0, 0%, 60%)',         // Muted gray for less important text
        shadow: 'hsl(230, 20%, 10%)'

      },
      keyframes: {
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-100%)' },
          to: { opacity: 1, transform: 'none' }
        }
      }
    },
    active: {
      on: "active rounded-t-lg border-b-2 border-green-600 text-green-600 dark:border-green-500 dark:text-green-500",
      off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
    },
  },
  plugins: [
    flowbitePlugin
  ],
}

