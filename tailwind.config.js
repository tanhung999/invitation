/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#D4758C',      // rose pink - tươi tắn
          secondary: '#F4B183',    // peach coral - ấm áp
          accent: '#FFD6BA',       // cream peach - nhẹ nhàng
          gold: '#E8C547',         // warm gold - sang trọng
          sage: '#B8C5B4',         // soft sage - thanh tao
          cream: '#FFFBF5',        // warm cream - sáng mịn
          blush: '#FFE8E8',        // light blush - dịu dàng
          rose: {
            50: '#FFF5F7',
            100: '#FFE8EC',
            200: '#FFD1DC',
            300: '#FFBAC9',
            400: '#F09EB1',
            500: '#D4758C',
            600: '#B85571',
            700: '#9C3A56',
          },
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'leaf-fall': 'leafFall 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        leafFall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
