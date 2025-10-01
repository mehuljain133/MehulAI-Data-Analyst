/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'selector',
    theme: {
      extend: {
        colors: {
          maroon: {
            400: "#2E2E2E",
            600: "#454545",
            800:"#242424"
          },
          navy: {
            300: "#3E99D1",
            600: "#2F4E6A",
            800:"#22272E"
          },
          "blue-gray": {
            50:"#F6F9FC",
            100:"#E3EAF0",
            700:"#44555B"
          },
          "yellow-gray": {
            50: "#FAFAF8",
            100: "#EAEAE9",
            600: "#656565",
          }
        }
      },
    },
    plugins: [],
  }