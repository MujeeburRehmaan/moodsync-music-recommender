import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Music, RefreshCw, Heart } from 'lucide-react';
import { Song, MoodType, MOODS } from './types';
import { MoodSelector } from './components/MoodSelector';
import { MusicCard } from './components/MusicCard';
import { FloatingEmojis } from './components/FloatingEmojis';
import { getRecommendationsByGenre } from './services/spotify';

export default function App() {
  const [mood, setMood] = React.useState<MoodType | null>(null);
  const [songs, setSongs] = React.useState<Song[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [favorites, setFavorites] = React.useState<Song[]>(() => {
    const saved = localStorage.getItem('mood-music-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  React.useEffect(() => {
    localStorage.setItem('mood-music-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchMusic = async (selectedMood: MoodType) => {
    setLoading(true);
    setError(null);
    try {
      const genre = MOODS[selectedMood].genre;
      const recommendations = await getRecommendationsByGenre(genre);
      setSongs(recommendations);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while fetching music.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
    fetchMusic(selectedMood);
    setShowFavorites(false);
  };

  const toggleFavorite = (song: Song) => {
    setFavorites(prev => {
      const isFav = prev.some(s => s.id === song.id);
      if (isFav) {
        return prev.filter(s => s.id !== song.id);
      } else {
        return [...prev, song];
      }
    });
  };

  const isFavorite = (songId: string) => favorites.some(s => s.id === songId);

  const currentMoodConfig = mood ? MOODS[mood] : null;

  return (
    <div className={`min-h-screen transition-colors duration-1000 relative overflow-x-hidden ${
      isDarkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      {/* Background Mood Color Overlay */}
      {mood && (
        <div 
          className={`fixed inset-0 opacity-40 transition-colors duration-1000 pointer-events-none z-0 ${currentMoodConfig?.color}`}
          style={{ filter: 'blur(100px)' }}
        />
      )}

      {/* Floating Emojis */}
      {mood && <FloatingEmojis emoji={currentMoodConfig!.emoji} />}

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/20"
          >
            <Music className="mr-2 text-emerald-400" size={32} />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Mood<span className="text-emerald-400">Sync</span>
            </h1>
          </motion.div>
          <p className="text-zinc-400 max-w-md mx-auto">
            How are you feeling today? Select a mood and let us curate the perfect soundtrack for your soul.
          </p>
        </header>

        <MoodSelector currentMood={mood} onSelectMood={handleMoodSelect} />

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              showFavorites 
                ? 'bg-red-500 border-red-500 text-white' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <Heart size={18} fill={showFavorites ? "currentColor" : "none"} />
            Favorites ({favorites.length})
          </button>
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 transition-all"
          >
            {isDarkMode ? '🌙 Dark' : '☀️ Light'}
          </button>

          {mood && !showFavorites && (
            <button
              onClick={() => fetchMusic(mood)}
              disabled={loading}
              className="px-4 py-2 rounded-lg border bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          )}
        </div>

        <main>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={48} className="animate-spin text-emerald-400 mb-4" />
              <p className="text-zinc-400 animate-pulse">Fetching the perfect vibes...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center max-w-lg mx-auto">
              <p className="text-red-400 font-medium mb-4">{error}</p>
              <p className="text-zinc-500 text-sm">
                Make sure you have set your Spotify Client ID and Secret in the environment variables.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(showFavorites ? favorites : songs).map((song) => (
                <MusicCard
                  key={song.id}
                  song={song}
                  isFavorite={isFavorite(song.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
              
              {showFavorites && favorites.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <Heart size={48} className="mx-auto text-zinc-700 mb-4" />
                  <p className="text-zinc-500">You haven't saved any favorites yet.</p>
                </div>
              )}

              {!showFavorites && songs.length === 0 && !mood && (
                <div className="col-span-full py-20 text-center">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Music size={40} className="text-zinc-700" />
                  </div>
                  <p className="text-zinc-500">Select a mood above to start discovering music.</p>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="mt-20 pt-8 border-t border-white/5 text-center text-zinc-600 text-sm">
          <p>© 2026 MoodSync • Powered by Spotify API</p>
        </footer>
      </div>
    </div>
  );
}
