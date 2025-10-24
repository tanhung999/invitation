import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

// Components
import LeafFall from './components/LeafFall';
import MusicToggle from './components/MusicToggle';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Couple from './components/Couple';
import StoryTimeline from './components/StoryTimeline';
import EventSchedule from './components/EventSchedule';
import Gallery from './components/Gallery';
import RSVPForm from './components/RSVPForm';
import GiftQR from './components/GiftQR';
import WishesWall from './components/WishesWall';
import Footer from './sections/Footer';

// Utils
import { getLanguage, toggleLanguage } from './utils/i18n';

function App() {
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    // Initialize language from localStorage or default
    const savedLang = getLanguage();
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageToggle = () => {
    const newLang = toggleLanguage();
    setCurrentLang(newLang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream via-brand-blush to-brand-accent/20">
      {/* Leaf Fall Animation */}
      <LeafFall />
      
      {/* Music Toggle */}
      <MusicToggle />

      {/* Language Toggle */}
      <motion.button
        onClick={handleLanguageToggle}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md text-brand-primary rounded-full p-3 shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 flex items-center gap-2 border border-brand-accent/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
      </motion.button>

      {/* QR Generator Link */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/qr-generator"
          className="bg-white/90 backdrop-blur-md text-brand-primary rounded-full p-3 shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 flex items-center gap-2 border border-brand-accent/30"
        >
          <QrCode className="w-5 h-5" />
          <span className="text-sm font-medium">QR Generator</span>
        </Link>
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Countdown Section */}
        <Countdown />

        {/* Couple Section */}
        <Couple />

        {/* Story Timeline Section */}
        <StoryTimeline />

        {/* Event Schedule Section */}
        <EventSchedule />

        {/* Gallery Section */}
        <Gallery />

        {/* RSVP Section */}
        <RSVPForm />

        {/* Gift QR Section */}
        <GiftQR />

        {/* Wishes Wall Section */}
        <WishesWall />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
