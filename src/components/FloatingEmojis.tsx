import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingEmojisProps {
  emoji: string;
  count?: number;
}

interface EmojiItem {
  id: number;
  x: number;
  duration: number;
  delay: number;
  size: number;
}

export const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ emoji, count = 15 }) => {
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);

  useEffect(() => {
    const newEmojis = Array.from({ length: count }).map((_, i) => ({
      id: Math.random(),
      x: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 20 + Math.random() * 40,
    }));
    setEmojis(newEmojis);
  }, [emoji, count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {emojis.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.5, 0.5, 0],
              x: `${item.x + Math.sin(item.id) * 10}vw`
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              position: 'absolute',
              fontSize: `${item.size}px`,
              left: `${item.x}vw`
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
