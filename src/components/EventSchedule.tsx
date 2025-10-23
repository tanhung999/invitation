import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import inviteData from '../data/invite';
import { t } from '../utils/i18n';

const EventSchedule: React.FC = () => {
  const { venues } = inviteData;

  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-white via-brand-blush/30 to-white"
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
            {t('events.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              className="bg-gradient-to-br from-white via-brand-rose-50 to-brand-blush rounded-3xl p-8 shadow-xl border border-brand-accent/40 hover:border-brand-primary/30 transition-colors duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(212, 117, 140, 0.25)' }}
            >
              {/* Event Type */}
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-4 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {venue.name.includes('Tiệc') ? (
                    <Calendar className="w-8 h-8 text-white" />
                  ) : (
                    <Clock className="w-8 h-8 text-white" />
                  )}
                </motion.div>
                <h3 className="text-2xl font-serif text-brand-primary mb-2">
                  {venue.name}
                </h3>
              </div>

              {/* Time */}
              <div className="text-center mb-4">
                <p className="text-lg text-gray-600 font-medium">
                  {venue.time}
                </p>
              </div>

              {/* Address */}
              <div className="text-center mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {venue.address}
                </p>
              </div>

              {/* Map Button */}
              <motion.button
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg text-white py-3 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(venue.mapUrl, '_blank')}
              >
                <MapPin className="w-4 h-4" />
                {t('events.map_btn')}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center mt-16 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-12 h-12 border-2 border-brand-accent/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
            </div>
          </motion.div>
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-8 h-8 border-2 border-brand-secondary/30 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-brand-secondary rounded-full"></div>
            </div>
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-16 h-16 border-2 border-brand-primary/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-primary/30 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EventSchedule;
