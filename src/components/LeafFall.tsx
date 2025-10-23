import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LeafProps {
  delay: number;
  duration: number;
  x: number;
  size: number;
  rotation: number;
}

const Leaf: React.FC<LeafProps> = ({ delay, duration, x, size, rotation }) => {
  // Random màu cho mỗi lá
  const colors = [
    'linear-gradient(135deg, #FFD6BA, #F4B183)',
    'linear-gradient(135deg, #D4758C, #F09EB1)',
    'linear-gradient(135deg, #E8C547, #FFD6BA)',
    'linear-gradient(135deg, #FFBAC9, #FFD1DC)',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute pointer-events-none opacity-70"
      style={{
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: randomColor,
        borderRadius: '50% 0',
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 4px 8px rgba(212, 117, 140, 0.2)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: window.innerHeight + 100,
        opacity: [0, 0.7, 0.7, 0],
        rotate: rotation + 360,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

const LeafFall: React.FC = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const [leaves, setLeaves] = useState<LeafProps[]>([]);

  useEffect(() => {
    // Generate random leaves
    const generateLeaves = () => {
      const newLeaves: LeafProps[] = [];
      for (let i = 0; i < 12; i++) {
        newLeaves.push({
          delay: Math.random() * 8,
          duration: 8 + Math.random() * 4, // 8-12 seconds
          x: Math.random() * 100,
          size: 20 + Math.random() * 15, // 20-35px
          rotation: Math.random() * 360,
        });
      }
      setLeaves(newLeaves);
    };

    generateLeaves();

    // Handle visibility change
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf, index) => (
        <Leaf key={index} {...leaf} />
      ))}
    </div>
  );
};

export default LeafFall;
