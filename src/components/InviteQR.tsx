import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';

interface InviteQRProps {
  guestName: string;
  size?: number;
  showName?: boolean;
  className?: string;
}

const InviteQR: React.FC<InviteQRProps> = ({ 
  guestName, 
  size = 180, 
  showName = true,
  className = ""
}) => {
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/invite?guest=${encodeURIComponent(guestName)}`;
  
  return (
    <motion.div 
      className={`text-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-4 rounded-2xl shadow-lg border border-brand-accent/30 inline-block">
        <QRCodeCanvas 
          value={url} 
          size={size}
          level="M"
          includeMargin={true}
          imageSettings={{
            src: '/favicon.svg',
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
        {showName && (
          <motion.p 
            className="mt-3 text-brand-primary font-medium text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {guestName}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default InviteQR;
