/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.jsx",
    "./src/navigation/tabs.jsx",
    "./src/components/Topbar.jsx",
    "./src/screens/application/HomeScreen.jsx",
    "./src/screens/application/PostDetailScreen.jsx",
    "./src/screens/application/UploadScreen.jsx",
    "./src/screens/application/SettingScreen.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

