import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Music, Music2, Disc3 } from 'lucide-react';

// Danh sách nhạc - thêm bài khác vào đây nếu có
const audioTracks = [
  '/audio/track.mp3',
  // '/audio/track2.mp3', // Thêm bài khác nếu có
  // '/audio/track3.mp3',
];

const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Hàm phát nhạc
  const playCurrentTrack = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // console.log(`Attempting to play track: ${audio.src}`);
    try {
      // Đặt volume để tránh bị chặn
      audio.volume = 0.3;
      await audio.play();
      setIsPlaying(true);
      localStorage.setItem('wedding-music-playing', 'true');
      // console.log('Music started playing.');
    } catch (error) {
      // console.warn('Autoplay prevented or failed to play:', error);
      setIsPlaying(false);
      localStorage.setItem('wedding-music-playing', 'false');
    }
  }, []);

  // Hàm dừng nhạc
  const pauseCurrentTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    localStorage.setItem('wedding-music-playing', 'false');
    // console.log('Music paused.');
  }, []);

  // Chuyển sang bài tiếp theo
  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioTracks.length);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Cập nhật src khi currentTrackIndex thay đổi
    audio.src = audioTracks[currentTrackIndex];
    audio.load();

    const handleLoadedData = () => {
      // console.log('Audio loaded successfully for track:', audio.src);
      setIsLoaded(true);
    };
    
    const handleCanPlay = () => {
      // console.log('Audio can play for track:', audio.src);
      setIsLoaded(true);
    };

    const handleEnded = () => {
      // console.log('Track ended. Moving to next track.');
      setIsPlaying(false);
      nextTrack(); // Chuyển sang bài tiếp theo
    };
    
    const handleError = (e: Event) => {
      // console.error('Failed to load audio file:', e);
      setIsLoaded(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrackIndex, nextTrack]);

  // Tự động phát nhạc khi load trang
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Cố gắng phát nhạc tự động khi load trang
    const savedState = localStorage.getItem('wedding-music-playing');
    // console.log('Page loaded, saved state:', savedState);
    
    // Luôn cố gắng phát nhạc tự động (trừ khi user đã tắt)
    if (savedState !== 'false') {
      // console.log('Attempting auto-play on page load');
      
      // Thử phát ngay lập tức
      const tryAutoPlay = async () => {
        try {
          // Thêm volume để tránh bị chặn
          audio.volume = 0.3;
          await audio.play();
          setIsPlaying(true);
          localStorage.setItem('wedding-music-playing', 'true');
          // console.log('Auto-play successful!');
        } catch (error) {
          // console.log('Auto-play blocked by browser, waiting for user interaction');
          // Hiển thị gợi ý cho user
          setShowHint(true);
          setTimeout(() => setShowHint(false), 5000); // Ẩn sau 5 giây
        }
      };

      // Thử phát sau khi audio sẵn sàng
      if (isLoaded) {
        tryAutoPlay();
      } else {
        // Đợi audio load xong
        const handleCanPlay = () => {
          audio.removeEventListener('canplay', handleCanPlay);
          tryAutoPlay();
        };
        audio.addEventListener('canplay', handleCanPlay);
      }
    }
  }, [isLoaded, playCurrentTrack]);

  // Tự động phát nhạc sau khi user tương tác lần đầu
  useEffect(() => {
    if (hasUserInteracted && !isPlaying) {
      const savedState = localStorage.getItem('wedding-music-playing');
      if (savedState !== 'false') {
        // console.log('Auto-playing after user interaction');
        playCurrentTrack();
      }
    }
  }, [hasUserInteracted, isPlaying, playCurrentTrack]);

  // Reset saved state để test autoplay
  useEffect(() => {
    // Xóa saved state cũ để test autoplay
    const savedState = localStorage.getItem('wedding-music-playing');
    if (savedState === 'false') {
      // console.log('Resetting music state for testing');
      localStorage.removeItem('wedding-music-playing');
    }
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) {
      // console.error('Audio ref not found');
      return;
    }

    // Đánh dấu user đã tương tác
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      // console.log('User first interaction detected');
    }

    // console.log('Toggle music clicked, isLoaded:', isLoaded, 'isPlaying:', isPlaying);

    try {
      if (isPlaying) {
        pauseCurrentTrack();
      } else {
        // Đảm bảo audio được load trước khi phát
        if (!isLoaded) {
          // console.log('Audio not loaded, loading first...');
          audio.load();
          await new Promise<void>((resolve) => {
            const handleCanPlayThrough = () => {
              audio.removeEventListener('canplaythrough', handleCanPlayThrough);
              resolve();
            };
            audio.addEventListener('canplaythrough', handleCanPlayThrough);
          });
          setIsLoaded(true);
        }
        playCurrentTrack();
      }
    } catch (error) {
      // console.error('Failed to toggle music:', error);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        crossOrigin="anonymous"
      />
      
      {/* Hint message */}
      {showHint && (
        <motion.div
          className="fixed bottom-20 right-6 z-50 bg-white/90 backdrop-blur-md text-brand-primary px-4 py-2 rounded-full shadow-lg border border-brand-accent/30 text-sm font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          🎵 Click để bật nhạc nền
        </motion.div>
      )}
      
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-brand-primary to-brand-secondary backdrop-blur-md text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          rotate: isPlaying ? 360 : 0 // Hiệu ứng xoay khi đang phát
        }}
        transition={{ 
          delay: 1,
          rotate: { 
            duration: isPlaying ? 3 : 0, // 3 giây cho 1 vòng xoay
            ease: "linear", 
            repeat: isPlaying ? Infinity : 0 // Xoay vô hạn khi đang phát
          }
        }}
      >
        {!isLoaded ? (
          <Music2 size={24} className="animate-pulse" />
        ) : isPlaying ? (
          <Disc3 size={24} className="animate-spin" />
        ) : (
          <Music size={24} />
        )}
      </motion.button>
    </>
  );
};

export default MusicToggle;
