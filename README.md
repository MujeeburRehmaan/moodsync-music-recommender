# 🎵 MoodSync - Mood-Based Music Recommender

MoodSync is a dynamic, interactive web application that curates the perfect soundtrack for your soul based on your current mood. Powered by the Spotify Web API, it offers a seamless blend of music discovery and immersive UI animations.

![MoodSync Preview](https://picsum.photos/seed/music-app/1200/600)

## ✨ Features

- **Mood-Driven Discovery**: Select from Happy 😊, Sad 😢, Energetic ⚡, Chill 🌊, or Angry 🔥.
- **Dynamic Atmosphere**: The entire UI (background colors, floating emojis) adapts instantly to your selected mood.
- **Spotify Integration**: Real-time track discovery using the Spotify Search API.
- **Demo Mode Fallback**: Automatically switches to curated mock data if the Spotify API is restricted (403 Forbidden).
- **Interactive Player**: Preview tracks directly within the app (where available).
- **Personalized Favorites**: Save your favorite tracks to your browser's local storage.
- **Theme Support**: Toggle between a sleek Dark Mode and a clean Light Mode.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Backend**: Node.js, Express
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React
- **API**: Spotify Web API

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- A Spotify Developer account

### 2. Get Spotify API Credentials
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Create a new app.
3. Set the **Redirect URI** to your app's URL (e.g., `http://localhost:3000/callback`).
4. Copy your **Client ID** and **Client Secret**.

### 3. Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install
```

### 4. Environment Variables
Create a `.env` file in the root directory and add:
```env
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
```

### 5. Run the Application
```bash
# Start the development server (Full-stack mode)
npm run dev
```
The app will be available at `http://localhost:3000`.

## 🔑 Troubleshooting (403 Forbidden)

If you see a `403 Forbidden` error, it means your Spotify App is in **Development Mode**. To fix this:
1. Go to your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Open your app and go to **"Users and Access"**.
3. Add the **email address** of your Spotify account to the list.
4. Save and wait 1-2 minutes for the changes to take effect.

## 📝 License
This project is licensed under the Apache-2.0 License.
