/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./containers/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      boxShadow: {
        custom: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      },
      backgroundColor: {
        btn: "#ea1d2c",
      },
      minWidth: {
        btn: 300,
      },
      width: {
        btn: 300,
      },
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 22,
        "2xl": 28,
        "3xl": 34,
      },
      colors: {
        light: {
          text: "#11181C",
          background: "#f9f8f8",
          tint: "#0a7ea4",
          icon: "#687076",
          tabIconDefault: "#687076",
          tabIconSelected: "#0a7ea4",
        },
        dark: {
          text: "#ECEDEE",
          background: "#f9f8f8",
          tint: "#fff",
          icon: "#9BA1A6",
          tabIconDefault: "#9BA1A6",
          tabIconSelected: "#fff",
        },
      },
    },
  },
  plugins: [],
};
