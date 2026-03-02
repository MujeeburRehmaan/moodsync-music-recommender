import React from 'react';
import { motion } from 'motion/react';
import { MOODS, MoodType } from '../types';

interface MoodSelectorProps {
  currentMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onSelectMood }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      {(Object.keys(MOODS) as MoodType[]).map((mood) => (
        <motion.button
          key={mood}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectMood(mood)}
          className={`
            px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300
            flex items-center gap-2
            ${currentMood === mood 
              ? 'ring-4 ring-white scale-110 z-10' 
              : 'opacity-80 hover:opacity-100'}
            ${MOODS[mood].color} ${MOODS[mood].secondaryColor}
          `}
        >
          <span>{MOODS[mood].emoji}</span>
          <span>{MOODS[mood].label}</span>
        </motion.button>
      ))}
    </div>
  );
};
