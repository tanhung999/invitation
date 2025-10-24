import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Users, Heart } from 'lucide-react';
import InviteQR from './InviteQR';
import { guestList } from '../data/guests';

const QRDemo: React.FC = () => {
  const demoGuests = guestList.slice(0, 3); // Lấy 3 khách đầu tiên để demo

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gradient mb-4">
            🎯 Demo QR System
          </h1>
          <p className="text-brand-primary/80 text-lg max-w-2xl mx-auto">
            Hệ thống QR mời khách cá nhân hóa - Demo với 3 khách mẫu
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-accent/30 p-6 text-center">
            <QrCode className="w-8 h-8 text-brand-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-brand-primary mb-1">
              {guestList.length}
            </h3>
            <p className="text-brand-secondary/70">Tổng khách mời</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-accent/30 p-6 text-center">
            <Users className="w-8 h-8 text-brand-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-brand-primary mb-1">
              {new Set(guestList.map(g => g.group)).size}
            </h3>
            <p className="text-brand-secondary/70">Nhóm khách</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-accent/30 p-6 text-center">
            <Heart className="w-8 h-8 text-brand-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-brand-primary mb-1">
              💕
            </h3>
            <p className="text-brand-secondary/70">Cá nhân hóa</p>
          </div>
        </motion.div>

        {/* Demo QR Codes */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {demoGuests.map((guest, index) => (
            <motion.div
              key={guest.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-brand-accent/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="text-center">
                <InviteQR
                  guestName={guest.name}
                  size={150}
                  showName={true}
                />
                
                <div className="mt-4">
                  <h4 className="font-bold text-brand-primary text-sm mb-1">
                    {guest.name}
                  </h4>
                  <p className="text-xs text-brand-secondary/70 mb-2">
                    {guest.group}
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    {guest.relationship}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">URL mẫu:</p>
                      <code className="text-xs text-brand-primary break-all">
                        /invite?guest={encodeURIComponent(guest.name)}
                      </code>
                    </div>
                    
                    {guest.shortId && (
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Short URL:</p>
                        <code className="text-xs text-brand-primary">
                          /invite/{guest.shortId}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/qr-generator"
              className="btn-primary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <QrCode className="w-5 h-5" />
              Tạo QR hàng loạt
            </motion.a>
            
            <motion.a
              href="/invite?guest=Demo Guest"
              className="btn-secondary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
              Xem trang mời demo
            </motion.a>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div 
          className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-accent/30 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-xl font-bold text-brand-primary mb-4 text-center">
            📋 Hướng dẫn sử dụng
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-brand-primary mb-2">
                1. Cấu hình khách mời
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Chỉnh sửa file <code>src/data/guests.ts</code> để thêm/sửa thông tin khách mời.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-brand-primary mb-2">
                2. Tạo QR codes
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Vào trang QR Generator để tạo và tải QR codes cho từng khách.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-brand-primary mb-2">
                3. In thiệp mời
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                In QR codes lên thiệp mời và gửi cho khách.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-brand-primary mb-2">
                4. Thu thập lời chúc
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Khách quét QR sẽ vào trang cá nhân hóa và có thể gửi lời chúc.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QRDemo;
