import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import inviteData from '../data/invite';
import { t } from '../utils/i18n';

const StoryTimeline: React.FC = () => {
  const { timeline } = inviteData;

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-brand-cream to-white"
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
            {t('story.title')}
          </h2>
          <div className="flex justify-center mb-6">
            <Heart className="w-8 h-8 text-brand-accent animate-float" />
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-accent to-brand-secondary"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative flex items-start mb-12"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-brand-accent">
                  <span className="text-sm font-bold text-brand-primary">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {item.vi}
                    </p>
                  </motion.div>
                </div>

                {/* Decorative Element */}
                <motion.div
                  className="absolute -right-4 top-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                >
                  <Heart className="w-6 h-6 text-brand-accent/50" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StoryTimeline;
