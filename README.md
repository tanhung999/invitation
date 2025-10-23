# Wedding Invitation Website

Một website thiệp cưới hiện đại, đẹp mắt với phong cách Autumn Leaf, được xây dựng bằng React + TypeScript + Tailwind CSS.

## ✨ Tính năng

- 🎨 **Giao diện đẹp**: Phong cách Autumn Leaf với tone hồng/kem/nâu ấm
- 🍂 **Hiệu ứng lá rơi**: Animation lá rơi tự nhiên bằng Framer Motion
- 🎵 **Nhạc nền**: Phát nhạc nền với nút điều khiển
- ⏰ **Đếm ngược**: Countdown đến ngày cưới
- 📅 **Lịch trình sự kiện**: Thông tin chi tiết về các sự kiện
- 📸 **Thư viện ảnh**: Gallery với lightbox
- 💌 **RSVP**: Form xác nhận tham dự (mock + Google Form)
- 💰 **QR chuyển khoản**: Thông tin tài khoản và QR code
- 💝 **Sổ lời chúc**: Wall để khách gửi lời chúc
- 🌐 **Song ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- 📱 **PWA**: Progressive Web App với offline support
- ♿ **A11y**: Tối ưu cho người khuyết tật

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

## 📁 Cấu trúc dự án

```
invitation/
├── public/                 # Static assets
│   ├── audio/             # Nhạc nền
│   ├── manifest.webmanifest
│   └── favicon.svg
├── src/
│   ├── components/        # React components
│   ├── data/             # Dữ liệu cấu hình
│   ├── sections/         # Section wrappers
│   ├── styles/           # CSS styles
│   └── utils/            # Utility functions
└── package.json
```

## ⚙️ Cấu hình dữ liệu

Tất cả dữ liệu thiệp cưới được cấu hình trong file `src/data/invite.ts`:

### Cấu trúc dữ liệu chính:

```typescript
interface InviteData {
  langDefault: 'vi' | 'en';
  couple: {
    bride: { name: string; parents?: string; intro?: string; avatar?: string };
    groom: { name: string; parents?: string; intro?: string; avatar?: string };
  };
  dateISO: string;
  slogan: { vi: string; en: string };
  venues: Venue[];
  timeline: { year: string; vi: string; en: string }[];
  gallery: { src: string; alt: string }[];
  banks: BankQR[];
  rsvp: {
    enabled: boolean;
    mode: 'mock' | 'google_form';
    googleForm?: GoogleFormConfig;
  };
  wishesWall: { enabled: boolean };
}
```

### Cách thay đổi dữ liệu:

1. **Thông tin cặp đôi**: Sửa `couple.bride` và `couple.groom`
2. **Ngày cưới**: Sửa `dateISO` (format ISO 8601)
3. **Địa điểm**: Sửa array `venues`
4. **Câu chuyện**: Sửa array `timeline`
5. **Ảnh**: Thêm ảnh vào `gallery`
6. **Thông tin ngân hàng**: Sửa array `banks`

## 🎨 Tùy chỉnh giao diện

### Màu sắc (tailwind.config.js):
```javascript
colors: {
  brand: {
    primary: '#7f1d1d',    // garnet
    secondary: '#b45309',   // amber burnt  
    accent: '#d4a373',      // brown sugar
    cream: '#fefcf7',       // cream background
  }
}
```

### Font chữ:
- Tiêu đề: Playfair Display (serif)
- Nội dung: Inter (sans-serif)

## 📱 PWA và SEO

- **Manifest**: Cấu hình trong `public/manifest.webmanifest`
- **Service Worker**: Cache static assets cho offline
- **Meta tags**: SEO và Open Graph tags trong `index.html`

## 🔧 RSVP Configuration

### Mock Mode (mặc định):
```typescript
rsvp: {
  enabled: true,
  mode: 'mock'
}
```

### Google Form Mode:
```typescript
rsvp: {
  enabled: true,
  mode: 'google_form',
  googleForm: {
    formAction: 'https://docs.google.com/forms/u/0/d/e/FORM_ID/formResponse',
    fieldMap: {
      name: 'entry.111',
      phone: 'entry.222', 
      attending: 'entry.333',
      note: 'entry.444'
    }
  }
}
```

## 📂 Thêm ảnh

1. Tạo thư mục `public/img/` với các subfolder:
   - `bride.jpg` - Ảnh cô dâu
   - `groom.jpg` - Ảnh chú rể  
   - `hero-bg.jpg` - Ảnh nền hero
   - `album/` - Ảnh gallery
   - `qr/` - QR code ngân hàng

2. Cập nhật đường dẫn trong `src/data/invite.ts`

## 🎵 Nhạc nền

Thêm file MP3 vào `public/audio/track.mp3` (khuyến nghị: nhạc instrumental nhẹ nhàng)

## 🌐 Deploy

### GitHub Pages:
1. Build project: `npm run build`
2. Deploy folder `dist/` lên GitHub Pages
3. Cập nhật base path trong `vite.config.ts` nếu cần

### Netlify/Vercel:
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`

## 📝 Lưu ý

- Tất cả ảnh trong code là placeholder, cần thay thế bằng ảnh thực
- Nhạc nền cần file MP3 thực tế
- QR code cần ảnh thực từ ngân hàng
- Test kỹ trên mobile và desktop
- Kiểm tra accessibility (A11y)

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes  
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

---

**Made with ❤️ for your special day!**
