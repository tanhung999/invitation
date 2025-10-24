import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import App from '../App';
import { getGuestByName, getGuestByShortId, Guest } from '../data/guests';

const InvitePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const guestParam = searchParams.get('guest');
    const shortIdParam = searchParams.get('id');
    
    let foundGuest: Guest | undefined;
    
    if (shortIdParam) {
      // Tìm theo short ID: /invite/abc123
      foundGuest = getGuestByShortId(shortIdParam);
    } else if (guestParam) {
      // Tìm theo tên: /invite?guest=NguyenVanA
      foundGuest = getGuestByName(guestParam);
    }
    
    if (foundGuest) {
      setGuest(foundGuest);
    }
    
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-brand-primary">Đang tải thiệp mời...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Personal Welcome Banner */}
      {guest && (
        <motion.div 
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 px-4 shadow-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-lg font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              💕 Thiệp cưới dành riêng cho {guest.name}
            </motion.h2>
            <motion.p 
              className="text-sm opacity-90 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi ❤️
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Main App with top padding for banner */}
      <div className={guest ? "pt-20" : ""}>
        <App />
      </div>

      {/* Guest-specific content overlay */}
      {guest && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-brand-accent/30 p-4 max-w-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💌</span>
              </div>
              <h3 className="font-bold text-brand-primary text-sm mb-1">
                Thiệp cá nhân hóa
              </h3>
              <p className="text-xs text-brand-secondary/70 mb-2">
                {guest.group} • {guest.relationship}
              </p>
              <p className="text-xs text-gray-600">
                Chúng tôi rất vui được chào đón bạn! 🎉
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Debug info for development */}
      {import.meta.env.DEV && guest && (
        <motion.div
          className="fixed bottom-6 left-6 z-40 bg-black/80 text-white p-3 rounded-lg text-xs max-w-xs"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p><strong>Debug Info:</strong></p>
          <p>Guest: {guest.name}</p>
          <p>Group: {guest.group}</p>
          <p>Short ID: {guest.shortId}</p>
        </motion.div>
      )}
    </div>
  );
};

export default InvitePage;
