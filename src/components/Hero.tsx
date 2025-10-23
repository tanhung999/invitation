import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar } from 'lucide-react';
import inviteData from '../data/invite';
import { formatDateVN } from '../utils/fmt';
import { t } from '../utils/i18n';

const Hero: React.FC = () => {
  const { couple, dateISO, venues } = inviteData;
  const weddingDate = formatDateVN(dateISO);
  const mainVenue = venues.find(v => v.name.includes('Tiệc')) || venues[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/img/hero-bg.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay - gradient tươi sáng hơn */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-rose-400/50 via-brand-secondary/40 to-brand-gold/30" />
        {/* Thêm layer sáng mịn */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Hearts */}
          <div className="flex justify-center mb-6 gap-3">
            <Heart className="w-6 h-6 text-brand-gold fill-brand-gold/50 animate-float" />
            <Heart className="w-8 h-8 text-brand-accent fill-brand-accent/50 animate-float" style={{ animationDelay: '0.3s' }} />
            <Heart className="w-6 h-6 text-brand-gold fill-brand-gold/50 animate-float" style={{ animationDelay: '0.6s' }} />
          </div>

          {/* Couple Names */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-4 tracking-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {couple.bride.name}
            </motion.div>
            <motion.div
              className="text-2xl md:text-3xl lg:text-4xl text-brand-gold my-2 drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              &
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {couple.groom.name}
            </motion.div>
          </h1>

          {/* Slogan */}
          <motion.p
            className="text-lg md:text-xl text-white/95 mb-8 font-light drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Wedding Date */}
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-lg">{weddingDate}</span>
          </motion.div>

          {/* Location */}
          {mainVenue && (
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{mainVenue.address}</span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.button
              className="bg-gradient-to-r from-brand-gold to-brand-secondary text-white px-8 py-3 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const rsvpSection = document.getElementById('rsvp');
                rsvpSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('hero.rsvp_btn')}
            </motion.button>

            {mainVenue?.mapUrl && (
              <motion.button
                className="bg-white/20 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white hover:text-brand-primary px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(mainVenue.mapUrl, '_blank')}
              >
                {t('hero.map_btn')}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
