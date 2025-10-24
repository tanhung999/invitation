import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, MessageCircle } from 'lucide-react';

interface BlessingFormProps {
  className?: string;
}

const BlessingForm: React.FC<BlessingFormProps> = ({ className = "" }) => {
  const [isGoogleFormVisible, setIsGoogleFormVisible] = useState(false);
  
  // Google Form embed URL - thay thế bằng URL thực tế của bạn
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdEXAMPLE/viewform?embedded=true";
  
  // Fallback form data (nếu không dùng Google Form)
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    relationship: '',
    phone: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage for demo
    const blessings = JSON.parse(localStorage.getItem('wedding-blessings') || '[]');
    blessings.push({
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('wedding-blessings', JSON.stringify(blessings));
    
    setIsSubmitted(true);
    setFormData({ name: '', message: '', relationship: '', phone: '' });
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className={`text-center ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-brand-accent/30 p-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-brand-primary mb-2">
            Cảm ơn bạn! 💕
          </h3>
          <p className="text-brand-secondary/80 mb-4">
            Lời chúc của bạn đã được gửi thành công. Chúng tôi rất cảm động!
          </p>
          
          <motion.button
            onClick={() => setIsSubmitted(false)}
            className="btn-secondary text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Gửi lời chúc khác
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-brand-accent/30 p-8">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-gradient mb-2">
            💌 Gửi lời chúc đến chúng tôi
          </h3>
          <p className="text-brand-primary/80">
            Chia sẻ niềm vui và gửi lời chúc mừng đến cô dâu chú rể
          </p>
        </motion.div>

        {/* Toggle between Google Form and Custom Form */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setIsGoogleFormVisible(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isGoogleFormVisible 
                  ? 'bg-white shadow-sm text-brand-primary' 
                  : 'text-gray-600 hover:text-brand-primary'
              }`}
            >
              Form tùy chỉnh
            </button>
            <button
              onClick={() => setIsGoogleFormVisible(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isGoogleFormVisible 
                  ? 'bg-white shadow-sm text-brand-primary' 
                  : 'text-gray-600 hover:text-brand-primary'
              }`}
            >
              Google Form
            </button>
          </div>
        </div>

        {isGoogleFormVisible ? (
          /* Google Form Embed */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-4">
              <p className="text-sm text-brand-primary/70 mb-4">
                Sử dụng Google Form để gửi lời chúc (cần cấu hình URL thực tế)
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
              <iframe
                src={googleFormUrl}
                width="100%"
                height="600"
                frameBorder="0"
                className="rounded-lg"
                title="Google Form - Lời chúc mừng"
              >
                <p className="text-center text-gray-500">
                  Đang tải form... Nếu không hiển thị, vui lòng 
                  <a 
                    href={googleFormUrl.replace('embedded=true', 'viewform')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline ml-1"
                  >
                    click vào đây
                  </a>
                </p>
              </iframe>
            </div>
          </motion.div>
        ) : (
          /* Custom Form */
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  Tên của bạn *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg border border-brand-accent/30 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300"
                  placeholder="Nhập tên của bạn"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  Mối quan hệ
                </label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-brand-accent/30 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300"
                >
                  <option value="">Chọn mối quan hệ</option>
                  <option value="family">Gia đình</option>
                  <option value="friend">Bạn bè</option>
                  <option value="colleague">Đồng nghiệp</option>
                  <option value="relative">Họ hàng</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-primary mb-2">
                Lời chúc mừng *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full p-3 rounded-lg border border-brand-accent/30 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Chia sẻ lời chúc mừng, kỷ niệm đẹp hoặc lời nhắn gửi đến cô dâu chú rể..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-primary mb-2">
                Số điện thoại (tùy chọn)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-brand-accent/30 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300"
                placeholder="Nhập số điện thoại (nếu muốn)"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5" />
              Gửi lời chúc mừng
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default BlessingForm;
