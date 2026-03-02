export interface Song {
  id: string;
  name: string;
  artist: string;
  albumCover: string;
  previewUrl: string | null;
  externalUrl: string;
}

export type MoodType = 'happy' | 'sad' | 'energetic' | 'chill' | 'angry';

export interface MoodConfig {
  label: string;
  emoji: string;
  color: string;
  genre: string;
  secondaryColor: string;
}

export const MOODS: Record<MoodType, MoodConfig> = {
  happy: {
    label: 'Happy',
    emoji: '😊',
    color: 'bg-yellow-400',
    secondaryColor: 'text-yellow-900',
    genre: 'pop',
  },
  sad: {
    label: 'Sad',
    emoji: '😢',
    color: 'bg-blue-500',
    secondaryColor: 'text-blue-100',
    genre: 'acoustic',
  },
  energetic: {
    label: 'Energetic',
    emoji: '⚡',
    color: 'bg-orange-500',
    secondaryColor: 'text-orange-100',
    genre: 'dance',
  },
  chill: {
    label: 'Chill',
    emoji: '🌊',
    color: 'bg-teal-400',
    secondaryColor: 'text-teal-900',
    genre: 'lo-fi',
  },
  angry: {
    label: 'Angry',
    emoji: '🔥',
    color: 'bg-red-600',
    secondaryColor: 'text-red-100',
    genre: 'rock',
  },
};
