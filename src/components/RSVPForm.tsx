import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitRSVP, RSVPData } from '../utils/rsvp';
import inviteData from '../data/invite';
import { t } from '../utils/i18n';

interface RSVPFormData {
  name: string;
  phone: string;
  attending: 'yes' | 'no' | 'maybe';
  note: string;
}

const RSVPForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RSVPFormData>({
    defaultValues: {
      attending: 'yes',
      note: '',
    },
  });

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await submitRSVP(data as RSVPData);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!inviteData.rsvp.enabled) {
    return null;
  }

  return (
    <motion.section
      id="rsvp"
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
            {t('rsvp.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('rsvp.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-brand-cream to-white rounded-3xl p-8 shadow-xl border border-brand-accent/20">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('rsvp.name')} *
                </label>
                <input
                  {...register('name', { required: 'Vui lòng nhập họ và tên' })}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
                  placeholder={t('rsvp.name_placeholder')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('rsvp.phone')} *
                </label>
                <input
                  {...register('phone', { required: 'Vui lòng nhập số điện thoại' })}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
                  placeholder={t('rsvp.phone_placeholder')}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Attending */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('rsvp.attending')} *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'yes', label: t('rsvp.attending_yes') },
                    { value: 'no', label: t('rsvp.attending_no') },
                    { value: 'maybe', label: t('rsvp.attending_maybe') },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        {...register('attending', { required: true })}
                        type="radio"
                        value={option.value}
                        className="mr-3 text-brand-primary focus:ring-brand-primary"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('rsvp.note')}
                </label>
                <textarea
                  {...register('note')}
                  id="note"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors resize-none"
                  placeholder={t('rsvp.note_placeholder')}
                />
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
                    {t('rsvp.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('rsvp.submit')}
                  </>
                )}
              </motion.button>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <motion.div
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span>{submitMessage}</span>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RSVPForm;
