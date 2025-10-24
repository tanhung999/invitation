import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import inviteData from '../data/invite';
import { t } from '../utils/i18n';
import BlessingForm from './BlessingForm';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    // Load wishes from localStorage
    const storedWishes = localStorage.getItem('wedding-wishes');
    const storedBlessings = localStorage.getItem('wedding-blessings');
    
    let allWishes: Wish[] = [];
    
    if (storedWishes) {
      try {
        allWishes = [...allWishes, ...JSON.parse(storedWishes)];
      } catch (error) {
        console.error('Failed to parse wishes:', error);
      }
    }
    
    if (storedBlessings) {
      try {
        const blessings = JSON.parse(storedBlessings);
        const blessingWishes = blessings.map((blessing: any) => ({
          id: blessing.id.toString(),
          name: blessing.name,
          message: blessing.message,
          timestamp: blessing.submittedAt,
        }));
        allWishes = [...allWishes, ...blessingWishes];
      } catch (error) {
        console.error('Failed to parse blessings:', error);
      }
    }
    
    // Sort by timestamp (newest first)
    allWishes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setWishes(allWishes);
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!inviteData.wishesWall.enabled) {
    return null;
  }

  return (
    <motion.section
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary mb-4">
            {t('wishes.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('wishes.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Blessing Form */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BlessingForm />
          </motion.div>

          {/* Wishes Display */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {wishes.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">{t('wishes.no_wishes')}</p>
              </div>
            ) : (
              <AnimatePresence>
                {wishes.map((wish, index) => (
                  <motion.div
                    key={wish.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-brand-accent/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {wish.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-800">{wish.name}</h4>
                          <span className="text-xs text-gray-500">
                            {formatDate(wish.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{wish.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WishesWall;
