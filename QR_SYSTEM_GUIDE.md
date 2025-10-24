# 🎯 Hệ thống QR Mời Khách - Hướng dẫn sử dụng

## 📋 Tổng quan

Hệ thống cho phép tạo QR code cá nhân hóa cho từng khách mời, với các tính năng:

- ✅ QR code riêng cho từng khách
- ✅ Trang thiệp cá nhân hóa 
- ✅ Form chúc mừng với Google Form
- ✅ Quản lý danh sách khách mời
- ✅ Tải QR code hàng loạt

## 🚀 Cách sử dụng

### 1. Truy cập QR Generator

```
http://localhost:3000/qr-generator
```

### 2. Cấu hình danh sách khách mời

Chỉnh sửa file `src/data/guests.ts`:

```typescript
export const guestList: Guest[] = [
  {
    id: 'guest-1',
    name: 'Nguyễn Văn A',
    shortId: 'guest001',
    group: 'Gia đình cô dâu',
    relationship: 'Ông bà nội'
  },
  // Thêm khách khác...
];
```

### 3. Tạo QR codes

1. Vào trang QR Generator
2. Chọn nhóm khách (hoặc "Tất cả")
3. Điều chỉnh kích thước QR
4. Click "Tải tất cả QR codes" để download

### 4. URL mẫu cho khách mời

**Theo tên:**
```
https://wedding.hungngo.vn/invite?guest=NguyenVanA
```

**Theo ID ngắn:**
```
https://wedding.hungngo.vn/invite/guest001
```

## 🎨 Tính năng cá nhân hóa

### Trang thiệp cá nhân hóa (`/invite`)

- Hiển thị tên khách mời ở banner
- Thông tin nhóm và mối quan hệ
- Thiệp chính với tất cả nội dung

### Form chúc mừng

- **Form tùy chỉnh**: Form React với validation
- **Google Form**: Nhúng Google Form thực tế

## 📱 Cách triển khai

### 1. Cấu hình Google Form (tùy chọn)

1. Tạo Google Form với các câu hỏi:
   - Tên khách mời
   - Lời chúc mừng
   - Mối quan hệ
   - Số điện thoại (tùy chọn)

2. Lấy embed URL:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSdEXAMPLE/viewform?embedded=true
   ```

3. Cập nhật trong `src/components/BlessingForm.tsx`:
   ```typescript
   const googleFormUrl = "YOUR_GOOGLE_FORM_URL_HERE";
   ```

### 2. Cấu hình domain

Cập nhật base URL trong `src/components/InviteQR.tsx`:

```typescript
const baseUrl = "https://wedding.hungngo.vn"; // Thay đổi domain thực tế
```

### 3. Deploy

```bash
npm run build
# Upload thư mục dist/ lên server
```

## 🎯 Workflow sử dụng

### Bước 1: Chuẩn bị danh sách khách
1. Cập nhật `src/data/guests.ts`
2. Thêm thông tin khách mời

### Bước 2: Tạo QR codes
1. Vào `/qr-generator`
2. Tải QR codes cho từng nhóm
3. In QR codes lên thiệp

### Bước 3: Gửi thiệp
1. Gửi thiệp có QR code cho khách
2. Khách quét QR → vào trang cá nhân hóa
3. Khách có thể gửi lời chúc

### Bước 4: Thu thập lời chúc
1. Xem lời chúc trong Wishes Wall
2. Export dữ liệu từ localStorage (nếu cần)

## 🔧 Cấu hình nâng cao

### Thêm nhóm khách mới

```typescript
// Trong src/data/guests.ts
{
  id: 'new-group-1',
  name: 'Tên khách',
  shortId: 'new001',
  group: 'Nhóm mới',
  relationship: 'Mối quan hệ'
}
```

### Tùy chỉnh QR code

```typescript
// Trong src/components/InviteQR.tsx
<QRCodeCanvas 
  value={url} 
  size={size}
  level="M" // L, M, Q, H
  includeMargin={true}
  imageSettings={{
    src: '/favicon.svg', // Logo giữa QR
    height: 24,
    width: 24,
    excavate: true,
  }}
/>
```

### Thêm thông tin khách

```typescript
interface Guest {
  id: string;
  name: string;
  shortId?: string;
  group?: string;
  relationship?: string;
  phone?: string;
  email?: string;
  // Thêm fields mới
  address?: string;
  notes?: string;
}
```

## 📊 Quản lý dữ liệu

### Xem lời chúc đã gửi

```javascript
// Trong browser console
const blessings = JSON.parse(localStorage.getItem('wedding-blessings') || '[]');
console.log(blessings);
```

### Export dữ liệu

```javascript
// Export to JSON
const data = {
  blessings: JSON.parse(localStorage.getItem('wedding-blessings') || '[]'),
  rsvps: JSON.parse(localStorage.getItem('wedding-rsvps') || '[]')
};
console.log(JSON.stringify(data, null, 2));
```

## 🎨 Tùy chỉnh giao diện

### Thay đổi màu sắc QR

```css
/* Trong src/styles/tailwind.css */
.qr-code {
  --qr-primary: #D4758C;
  --qr-secondary: #F4B183;
}
```

### Thêm animation

```typescript
// Trong src/components/InviteQR.tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
```

## 🚨 Lưu ý quan trọng

1. **Backup dữ liệu**: Dữ liệu lưu trong localStorage, cần backup định kỳ
2. **SEO**: Thêm meta tags cho trang `/invite`
3. **Analytics**: Thêm Google Analytics để track
4. **Security**: Validate input từ form chúc mừng
5. **Performance**: Optimize images và lazy load

## 📞 Hỗ trợ

Nếu cần hỗ trợ, vui lòng liên hệ hoặc tạo issue trên repository.

---

**Chúc bạn có một đám cưới tuyệt vời! 💕**
