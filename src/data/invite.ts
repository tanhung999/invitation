export type Venue = {
  name: string;
  address: string;
  time: string;
  mapUrl: string;
};

export type BankQR = {
  bankName: string;
  accountName: string;
  accountNo: string;
  image: string;
};

export type InviteData = {
  langDefault: 'vi' | 'en';
  couple: {
    bride: { name: string; parents?: string; intro?: string; avatar?: string };
    groom: { name: string; parents?: string; intro?: string; avatar?: string };
  };
  dateISO: string;        // ví dụ: '2025-12-07T11:30:00+07:00'
  slogan: { vi: string; en: string };
  venues: Venue[];        // có thể 1–3 địa điểm (Nhà gái / Nhà trai / Tiệc)
  timeline: { year: string; vi: string; en: string }[];
  gallery: { src: string; alt: string }[];
  banks: BankQR[];        // QR chuyển khoản
  rsvp: {
    enabled: boolean;
    mode: 'mock' | 'google_form';
    googleForm?: {
      formAction: string;        // URL action của Google Form
      fieldMap: { name: string; phone: string; attending: string; note: string };
    };
  };
  wishesWall: { enabled: boolean };
};

const data: InviteData = {
  langDefault: 'vi',
  couple: {
    bride: { 
      name: 'Nguyễn Hồng Ngọc Ny', 
      parents: 'Con ông Nguyễn Văn Thuần và bà Phạm Thị Hiệp', 
      intro: 'Cô gái xinh đẹp với nụ cười tỏa nắng',
      avatar: '/img/bride.jpg'
    },
    groom: { 
      name: 'Ngô Tấn Hưng', 
      parents: 'Con ông Ngô Hoàng Truyệt và bà Trần Thị Ly',
      intro: 'Chàng trai ấm áp với trái tim chân thành',
      avatar: '/img/groom.jpg'
    },
  },
  dateISO: '2025-12-07T11:30:00+07:00',
  slogan: {
    vi: 'Từ Sài Gòn, với tất cả yêu thương',
    en: 'From Saigon with love',
  },
  venues: [
    { 
      name: 'Nhà gái', 
      address: '494 Láng Le Bàu Cò, Bình Chánh, TP.HCM', 
      time: '08:00 30/11/2025', 
      mapUrl: 'https://maps.google.com/maps?q=10.756338075014048, 106.54395339540808' 
    },
    { 
      name: 'Nhà trai', 
      address: 'Khóm Ba Dinh, Phường Hòa Thành, Tỉnh Cà Mau', 
      time: '10:00 07/12/2025', 
      mapUrl: 'https://maps.google.com/maps?q=9.150961424723333, 105.22423011198543' 
    },
    { 
      name: 'Tiệc cưới', 
      address: 'Khóm Ba Dinh, Phường Hòa Thành, Tỉnh Cà Mau', 
      time: '11:30 07/12/2025', 
      mapUrl: 'https://maps.google.com/maps?q=9.150961424723333, 105.22423011198543' 
    },
  ],
  timeline: [
    { year: '2021', vi: 'Lần đầu gặp nhau tại một quán Bò Lá Lốt ở Sài Gòn hehe', en: 'First met at a "Bò Lá Lốt" shop in Saigon hehe' },
    { year: '2022', vi: 'Những cuộc hẹn đầu tiên và những kỷ niệm đẹp', en: 'First dates and beautiful memories' },
    { year: '2023', vi: 'Cầu hôn dưới ánh nắng hoàng hôn', en: 'Proposal under the sunset' },
    { year: '2024', vi: 'Lên kế hoạch cho ngày cưới đặc biệt', en: 'Planning for the special wedding day' },
  ],
  gallery: [
    { src: '/img/album/1.jpg', alt: 'Khoảnh khắc đầu tiên' },
    { src: '/img/album/2.jpg', alt: 'Những cuộc hẹn ngọt ngào' },
    { src: '/img/album/3.jpg', alt: 'Chuyến du lịch cùng nhau' },
    { src: '/img/album/4.jpg', alt: 'Lễ cầu hôn' },
    { src: '/img/album/5.jpg', alt: 'Chụp ảnh cưới' },
    { src: '/img/album/6.jpg', alt: 'Khoảnh khắc hạnh phúc' },
  ],
  banks: [
    { 
      bankName: 'Vietcombank', 
      accountName: 'NGO TAN HUNG', 
      accountNo: '1020394614', 
      image: '/img/qr/IMG_3545.jpeg' 
    },
    { 
      bankName: 'Capital Bank', 
      accountName: 'NGUYEN HONG NGOC NY', 
      accountNo: '9037041111804', 
      image: '/img/qr/IMG_3546.jpeg' 
    },
  ],
  rsvp: {
    enabled: true,
    mode: 'mock',
    googleForm: {
      formAction: 'https://docs.google.com/forms/u/0/d/e/XXXX/formResponse',
      fieldMap: { name: 'entry.111', phone: 'entry.222', attending: 'entry.333', note: 'entry.444' },
    },
  },
  wishesWall: { enabled: true },
};

export default data;
