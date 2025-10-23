import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import inviteData from '../data/invite';
import { t } from '../utils/i18n';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

interface WishFormData {
  name: string;
  message: string;
}

const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WishFormData>();

  useEffect(() => {
    // Load wishes from localStorage
    const storedWishes = localStorage.getItem('wedding-wishes');
    if (storedWishes) {
      try {
        setWishes(JSON.parse(storedWishes));
      } catch (error) {
        console.error('Failed to parse wishes:', error);
      }
    }
  }, []);

  const onSubmit = async (data: WishFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));

      const newWish: Wish = {
        id: Date.now().toString(),
        name: data.name,
        message: data.message,
        timestamp: new Date().toISOString(),
      };

      const updatedWishes = [newWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem('wedding-wishes', JSON.stringify(updatedWishes));

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

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
          {/* Wish Form */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-brand-cream to-white rounded-3xl p-8 shadow-xl border border-brand-accent/20">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('wishes.name')} *
                    </label>
                    <input
                      {...register('name', { required: 'Vui lòng nhập tên của bạn' })}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
                      placeholder={t('wishes.name_placeholder')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('wishes.message')} *
                    </label>
                    <textarea
                      {...register('message', { required: 'Vui lòng nhập lời chúc' })}
                      id="message"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors resize-none"
                      placeholder={t('wishes.message_placeholder')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 disabled:bg-gray-400 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('wishes.submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('wishes.submit')}
                    </>
                  )}
                </motion.button>

                {/* Status Message */}
                <AnimatePresence>
                  {submitStatus !== 'idle' && (
                    <motion.div
                      className={`p-4 rounded-xl flex items-center gap-3 ${
                        submitStatus === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="w-5 h-5" />
                      <span>
                        {submitStatus === 'success' ? t('wishes.success') : t('wishes.error')}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
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
