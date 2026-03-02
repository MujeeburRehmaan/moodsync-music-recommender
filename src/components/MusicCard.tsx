import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Heart, ExternalLink } from 'lucide-react';
import { Song } from '../types';

interface MusicCardProps {
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: (song: Song) => void;
}

export const MusicCard: React.FC<MusicCardProps> = ({ song, isFavorite, onToggleFavorite }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Pause all other audio elements if needed (optional, but good UX)
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={song.albumCover}
          alt={song.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {song.previewUrl && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
          </div>
        )}
        
        <button
          onClick={() => onToggleFavorite(song)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-black/20 text-white hover:bg-black/40'
          }`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-white truncate text-lg">{song.name}</h3>
        <p className="text-white/70 truncate text-sm mb-3">{song.artist}</p>
        
        <div className="flex items-center justify-between">
          <a
            href={song.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors flex items-center gap-1 text-xs font-medium uppercase tracking-wider"
          >
            Spotify <ExternalLink size={12} />
          </a>
          
          {song.previewUrl && (
            <span className="text-[10px] text-white/30 uppercase font-bold">
              Preview Available
            </span>
          )}
        </div>
      </div>

      {song.previewUrl && (
        <audio
          ref={audioRef}
          src={song.previewUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}
    </motion.div>
  );
};
