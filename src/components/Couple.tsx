import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import inviteData from '../data/invite';
import { t } from '../utils/i18n';

const Couple: React.FC = () => {
  const { couple } = inviteData;

  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-white via-brand-blush/20 to-white"
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
            {t('couple.title')}
          </h2>
          <div className="flex justify-center mb-6 gap-3">
            <Heart className="w-6 h-6 text-brand-primary fill-brand-primary/40 animate-float" />
            <Heart className="w-8 h-8 text-brand-secondary fill-brand-secondary/40 animate-float" style={{ animationDelay: '0.3s' }} />
            <Heart className="w-6 h-6 text-brand-gold fill-brand-gold/40 animate-float" style={{ animationDelay: '0.6s' }} />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Bride */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mb-6">
              <motion.div
                className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-brand-rose-200 via-brand-rose-300 to-brand-primary overflow-hidden shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.08, boxShadow: '0 25px 50px -12px rgba(212, 117, 140, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                {couple.bride.avatar ? (
                  <img
                    src={couple.bride.avatar}
                    alt={couple.bride.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-serif">
                    {couple.bride.name.charAt(0)}
                  </div>
                )}
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-brand-gold to-brand-secondary rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </motion.div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif text-brand-primary mb-2">
              {couple.bride.name}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {t('couple.bride')}
            </p>
            {couple.bride.parents && (
              <p className="text-sm text-gray-500 mb-4">
                {couple.bride.parents}
              </p>
            )}
            {couple.bride.intro && (
              <p className="text-gray-600 italic">
                "{couple.bride.intro}"
              </p>
            )}
          </motion.div>

          {/* Groom */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mb-6">
              <motion.div
                className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-brand-secondary via-brand-gold to-brand-primary overflow-hidden shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.08, boxShadow: '0 25px 50px -12px rgba(244, 177, 131, 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                {couple.groom.avatar ? (
                  <img
                    src={couple.groom.avatar}
                    alt={couple.groom.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-serif">
                    {couple.groom.name.charAt(0)}
                  </div>
                )}
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-gold rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </motion.div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif text-brand-primary mb-2">
              {couple.groom.name}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {t('couple.groom')}
            </p>
            {couple.groom.parents && (
              <p className="text-sm text-gray-500 mb-4">
                {couple.groom.parents}
              </p>
            )}
            {couple.groom.intro && (
              <p className="text-gray-600 italic">
                "{couple.groom.intro}"
              </p>
            )}
          </motion.div>
        </div>

        {/* Connection Line */}
        <motion.div
          className="flex items-center justify-center mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-brand-gold"></div>
            <motion.div
              className="mx-4 p-3 bg-gradient-to-br from-brand-primary to-brand-gold rounded-full shadow-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Heart className="w-8 h-8 text-white fill-white" />
            </motion.div>
            <div className="w-24 h-0.5 bg-gradient-to-l from-transparent via-brand-gold to-brand-secondary"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Couple;
