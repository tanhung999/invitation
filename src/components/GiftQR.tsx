import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, CreditCard } from 'lucide-react';
import inviteData from '../data/invite';
import { copyToClipboard } from '../utils/fmt';
import { t } from '../utils/i18n';

const GiftQR: React.FC = () => {
  const { banks } = inviteData;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAccount = async (accountNo: string, index: number) => {
    const success = await copyToClipboard(accountNo);
    
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const getBankLogo = (bankName: string) => {
    // Simple bank logo simulation with initials
    const initials = bankName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
    
    return initials;
  };

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-white via-brand-blush/20 to-brand-cream"
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
            {t('gift.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('gift.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {banks.map((bank, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white to-brand-rose-50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-brand-accent/40"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: '0 25px 50px -12px rgba(212, 117, 140, 0.25)',
                borderColor: 'rgba(212, 117, 140, 0.5)'
              }}
            >
              {/* Bank Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white font-bold text-lg">
                    {getBankLogo(bank.bankName)}
                  </span>
                </motion.div>
                <h3 className="text-xl font-serif text-brand-primary mb-2">
                  {bank.bankName}
                </h3>
              </div>

              {/* Account Info */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tên tài khoản
                  </label>
                  <p className="text-lg font-medium text-gray-800">
                    {bank.accountName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Số tài khoản
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-mono font-bold text-brand-primary flex-1">
                      {bank.accountNo}
                    </p>
                    <motion.button
                      onClick={() => handleCopyAccount(bank.accountNo, index)}
                      className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {copiedIndex === index ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="inline-block bg-white p-4 rounded-2xl shadow-lg border border-brand-accent/20">
                  <div className="w-48 h-48">
                    <img
                      src={bank.image}
                      alt={`QR Code ${bank.bankName}`}
                      className="w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Quét mã QR để chuyển khoản
                </p>
              </div>

              {/* Copy Success Message */}
              {copiedIndex === index && (
                <motion.div
                  className="mt-4 p-2 bg-green-50 text-green-700 text-sm text-center rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {t('gift.copy_success')}
                </motion.div>
              )}
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
            <CreditCard className="w-8 h-8 text-brand-accent/50" />
          </motion.div>
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-6 h-6 border-2 border-brand-secondary/50 rounded-full"></div>
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            <CreditCard className="w-8 h-8 text-brand-primary/30" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GiftQR;
