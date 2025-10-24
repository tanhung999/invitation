import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import InvitePage from './pages/InvitePage';
import QRGenerator from './components/QRGenerator';
import QRDemo from './components/QRDemo';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Main wedding invitation page */}
        <Route path="/" element={<App />} />
        
        {/* Personalized invitation page */}
        <Route path="/invite" element={<InvitePage />} />
        
        {/* QR Generator page (for admin) */}
        <Route path="/qr-generator" element={<QRGenerator />} />
        
        {/* QR Demo page */}
        <Route path="/qr-demo" element={<QRDemo />} />
        
        {/* Fallback to main page */}
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
