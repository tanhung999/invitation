import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import inviteData from '../data/invite';
import { t } from '../utils/i18n';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Gallery: React.FC = () => {
  const { gallery } = inviteData;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : gallery.length - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage < gallery.length - 1 ? selectedImage + 1 : 0);
    }
  };

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-brand-cream to-white"
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
            {t('gallery.title')}
          </h2>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="gallery-swiper"
          >
            {gallery.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-square bg-gradient-to-br from-brand-accent to-brand-secondary">
                    {/* Placeholder for actual image */}
                    <div className="w-full h-full flex items-center justify-center text-white text-4xl font-serif">
                      📸
                    </div>
                    {/* Uncomment when you have actual images */}
                    {/* <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    /> */}
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-medium mb-2">{image.alt}</div>
                      <div className="text-sm opacity-80">Nhấn để xem</div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-4xl max-h-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                  onClick={closeLightbox}
                >
                  <X size={32} />
                </button>

                {/* Image */}
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center text-6xl">
                    📸
                  </div>
                  {/* Uncomment when you have actual images */}
                  {/* <img
                    src={gallery[selectedImage].src}
                    alt={gallery[selectedImage].alt}
                    className="w-full h-full object-contain"
                  /> */}
                </div>

                {/* Navigation */}
                {gallery.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                      onClick={goToPrevious}
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                      onClick={goToNext}
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-medium mb-2">
                      {gallery[selectedImage].alt}
                    </h3>
                    <p className="text-sm opacity-80">
                      {selectedImage + 1} / {gallery.length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Gallery;
