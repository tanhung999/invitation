import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTimeUntil } from '../utils/fmt';
import inviteData from '../data/invite';
import { t } from '../utils/i18n';

interface TimeUnit {
  value: number;
  label: string;
}

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntil(inviteData.dateISO));
  const [isWeddingDay, setIsWeddingDay] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeUntil(inviteData.dateISO);
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0) {
        setIsWeddingDay(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits: TimeUnit[] = [
    { value: timeLeft.days, label: t('countdown.days') },
    { value: timeLeft.hours, label: t('countdown.hours') },
    { value: timeLeft.minutes, label: t('countdown.minutes') },
    { value: timeLeft.seconds, label: t('countdown.seconds') },
  ];

  if (isWeddingDay) {
    return (
      <motion.section
        className="py-20 bg-gradient-to-br from-brand-blush via-brand-rose-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="bg-gradient-to-br from-white to-brand-blush/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto border border-brand-accent/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary mb-6">
              {t('countdown.today')}
            </h2>
            <div className="text-lg text-gray-600">
              🎉 Hẹn gặp bạn tại tiệc cưới! 🎉
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-brand-blush via-brand-rose-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary mb-4">
            {t('countdown.title')}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="bg-gradient-to-br from-white to-brand-rose-50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-brand-accent/40 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ 
                scale: 1.08, 
                boxShadow: '0 20px 40px -12px rgba(212, 117, 140, 0.3)',
                borderColor: 'rgba(212, 117, 140, 0.5)'
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Countdown;
