import { motion } from 'framer-motion';
import { ChevronUp, Share2, Heart } from 'lucide-react';
import { shareUrl } from '../utils/fmt';
import { t } from '../utils/i18n';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = 'Thiệp cưới của Nguyễn Hồng Ngọc Ny & Ngô Tấn Hưng';
    const text = 'Mời bạn tham dự lễ cưới của chúng tôi!';

    const success = await shareUrl(url, title, text);
    
    if (success) {
      // Show success message (you can implement a toast notification here)
      console.log('Link copied to clipboard');
    }
  };

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-brand-primary to-brand-secondary text-white py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Main Message */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-brand-accent animate-float" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              {t('footer.thank_you')}
            </h2>
            <p className="text-lg text-brand-accent/80 max-w-2xl mx-auto leading-relaxed">
              Chúng tôi rất mong được chia sẻ ngày đặc biệt này cùng với bạn. 
              Hẹn gặp bạn tại lễ cưới!
            </p>
          </motion.div>

          {/* Share Button */}
          <motion.button
            onClick={handleShare}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2 mx-auto mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Share2 className="w-5 h-5" />
            {t('footer.share_btn')}
          </motion.button>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-8 h-8 border-2 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
            </motion.div>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-6 h-6 border-2 border-brand-accent/50 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-brand-accent rounded-full"></div>
              </div>
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-10 h-10 border-2 border-white/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-sm text-white/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>© 2025 Thiệp cưới. Made with ❤️</p>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-40 bg-brand-primary/80 backdrop-blur-sm text-white rounded-full p-3 shadow-lg hover:bg-brand-primary transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
