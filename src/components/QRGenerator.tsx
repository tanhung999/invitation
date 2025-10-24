import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InviteQR from './InviteQR';
import { guestList, getAllGroups, getGuestsByGroup, Guest } from '../data/guests';

const QRGenerator: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [showNames, setShowNames] = useState(true);
  const [qrSize, setQrSize] = useState(180);
  
  const groups = ['all', ...getAllGroups()];
  
  const getFilteredGuests = (): Guest[] => {
    if (selectedGroup === 'all') {
      return guestList;
    }
    return getGuestsByGroup(selectedGroup);
  };

  const downloadQR = (guest: Guest) => {
    const canvas = document.querySelector(`#qr-${guest.id}`) as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `QR-${guest.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadAllQRs = () => {
    const guests = getFilteredGuests();
    guests.forEach((guest, index) => {
      setTimeout(() => {
        downloadQR(guest);
      }, index * 500); // Delay để tránh spam download
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gradient mb-4">
            🎯 QR Code Mời Khách
          </h1>
          <p className="text-brand-primary/80 text-lg">
            Tạo QR code cá nhân hóa cho từng khách mời
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-brand-accent/30 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Group Filter */}
            <div>
              <label className="block text-sm font-medium text-brand-primary mb-2">
                Nhóm khách:
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full p-3 rounded-lg border border-brand-accent/30 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              >
                <option value="all">Tất cả khách</option>
                {groups.slice(1).map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* QR Size */}
            <div>
              <label className="block text-sm font-medium text-brand-primary mb-2">
                Kích thước QR:
              </label>
              <input
                type="range"
                min="120"
                max="300"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-brand-primary/70">{qrSize}px</span>
            </div>

            {/* Show Names */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showNames}
                  onChange={(e) => setShowNames(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-brand-primary">
                  Hiển thị tên
                </span>
              </label>
            </div>
          </div>

          {/* Download All Button */}
          <div className="mt-4 text-center">
            <motion.button
              onClick={downloadAllQRs}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📥 Tải tất cả QR codes
            </motion.button>
          </div>
        </motion.div>

        {/* QR Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {getFilteredGuests().map((guest, index) => (
            <motion.div
              key={guest.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-accent/30 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InviteQR
                guestName={guest.name}
                size={qrSize}
                showName={showNames}
                className="w-full"
              />
              
              {/* Guest Info */}
              <div className="mt-3 text-center">
                <p className="text-xs text-brand-primary/70 mb-1">
                  {guest.group}
                </p>
                <p className="text-xs text-brand-secondary/70">
                  {guest.relationship}
                </p>
              </div>

              {/* Download Button */}
              <motion.button
                onClick={() => downloadQR(guest)}
                className="w-full mt-3 btn-secondary text-xs py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📥 Tải QR
              </motion.button>

              {/* Hidden canvas for download */}
              <canvas
                id={`qr-${guest.id}`}
                style={{ display: 'none' }}
                width={qrSize}
                height={qrSize}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* URL Preview */}
        <motion.div 
          className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-brand-accent/30 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-brand-primary mb-4">
            📋 Mẫu URL cho khách mời:
          </h3>
          <div className="space-y-2">
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-sm text-gray-700">
                {window.location.origin}/invite?guest=Ông Bà Nguyễn Văn A
              </code>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-sm text-gray-700">
                {window.location.origin}/invite/bride001
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QRGenerator;
