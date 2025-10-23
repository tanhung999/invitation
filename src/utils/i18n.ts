import inviteData from '../data/invite';

type Language = 'vi' | 'en';

const translations = {
  vi: {
    // Common
    'common.loading': 'Đang tải...',
    'common.error': 'Có lỗi xảy ra',
    'common.success': 'Thành công',
    'common.cancel': 'Hủy',
    'common.confirm': 'Xác nhận',
    'common.close': 'Đóng',
    'common.copy': 'Sao chép',
    'common.share': 'Chia sẻ',
    'common.back_to_top': 'Về đầu trang',
    
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.story': 'Câu chuyện',
    'nav.events': 'Sự kiện',
    'nav.gallery': 'Thư viện ảnh',
    'nav.rsvp': 'Xác nhận tham dự',
    'nav.gift': 'Quà cưới',
    'nav.wishes': 'Lời chúc',
    
    // Hero
    'hero.subtitle': 'Cùng chúng tôi chia vui',
    'hero.rsvp_btn': 'Xác nhận tham dự',
    'hero.map_btn': 'Xem bản đồ',
    
    // Countdown
    'countdown.title': 'Đếm ngược đến ngày cưới',
    'countdown.days': 'Ngày',
    'countdown.hours': 'Giờ',
    'countdown.minutes': 'Phút',
    'countdown.seconds': 'Giây',
    'countdown.today': 'Hôm nay rồi! Hẹn gặp bạn tại tiệc cưới',
    
    // Couple
    'couple.title': 'Cô dâu & Chú rể',
    'couple.bride': 'Cô dâu',
    'couple.groom': 'Chú rể',
    
    // Story
    'story.title': 'Câu chuyện của chúng tôi',
    
    // Events
    'events.title': 'Lịch trình sự kiện',
    'events.map_btn': 'Xem bản đồ',
    
    // Gallery
    'gallery.title': 'Thư viện ảnh',
    
    // RSVP
    'rsvp.title': 'Xác nhận tham dự',
    'rsvp.subtitle': 'Vui lòng xác nhận sự tham dự của bạn',
    'rsvp.name': 'Họ và tên',
    'rsvp.name_placeholder': 'Nhập họ và tên của bạn',
    'rsvp.phone': 'Số điện thoại',
    'rsvp.phone_placeholder': 'Nhập số điện thoại',
    'rsvp.attending': 'Sẽ tham dự?',
    'rsvp.attending_yes': 'Có, tôi sẽ tham dự',
    'rsvp.attending_no': 'Không, tôi không thể tham dự',
    'rsvp.attending_maybe': 'Chưa chắc chắn',
    'rsvp.note': 'Ghi chú',
    'rsvp.note_placeholder': 'Nhập ghi chú (tùy chọn)',
    'rsvp.submit': 'Gửi xác nhận',
    'rsvp.submitting': 'Đang gửi...',
    'rsvp.success': 'Cảm ơn bạn đã xác nhận tham dự!',
    'rsvp.error': 'Có lỗi xảy ra, vui lòng thử lại',
    
    // Gift
    'gift.title': 'Quà cưới',
    'gift.subtitle': 'Nếu bạn muốn tặng quà cưới, có thể chuyển khoản vào các tài khoản sau',
    'gift.copy_success': 'Đã sao chép số tài khoản',
    'gift.copy_error': 'Không thể sao chép số tài khoản',
    
    // Wishes
    'wishes.title': 'Sổ lời chúc',
    'wishes.subtitle': 'Gửi lời chúc mừng đến cô dâu chú rể',
    'wishes.name': 'Tên của bạn',
    'wishes.name_placeholder': 'Nhập tên của bạn',
    'wishes.message': 'Lời chúc',
    'wishes.message_placeholder': 'Nhập lời chúc của bạn',
    'wishes.submit': 'Gửi lời chúc',
    'wishes.submitting': 'Đang gửi...',
    'wishes.success': 'Cảm ơn bạn đã gửi lời chúc!',
    'wishes.error': 'Có lỗi xảy ra, vui lòng thử lại',
    'wishes.no_wishes': 'Chưa có lời chúc nào',
    
    // Footer
    'footer.thank_you': 'Cảm ơn bạn đã dành thời gian chia vui cùng chúng tôi',
    'footer.share_btn': 'Chia sẻ thiệp cưới',
    'footer.share_success': 'Đã sao chép link thiệp cưới',
  },
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.copy': 'Copy',
    'common.share': 'Share',
    'common.back_to_top': 'Back to top',
    
    // Navigation
    'nav.home': 'Home',
    'nav.story': 'Our Story',
    'nav.events': 'Events',
    'nav.gallery': 'Gallery',
    'nav.rsvp': 'RSVP',
    'nav.gift': 'Gift',
    'nav.wishes': 'Wishes',
    
    // Hero
    'hero.subtitle': 'Join us in celebration',
    'hero.rsvp_btn': 'RSVP',
    'hero.map_btn': 'View Map',
    
    // Countdown
    'countdown.title': 'Countdown to the wedding',
    'countdown.days': 'Days',
    'countdown.hours': 'Hours',
    'countdown.minutes': 'Minutes',
    'countdown.seconds': 'Seconds',
    'countdown.today': "Today's the day! See you at the wedding",
    
    // Couple
    'couple.title': 'Bride & Groom',
    'couple.bride': 'Bride',
    'couple.groom': 'Groom',
    
    // Story
    'story.title': 'Our Story',
    
    // Events
    'events.title': 'Event Schedule',
    'events.map_btn': 'View Map',
    
    // Gallery
    'gallery.title': 'Photo Gallery',
    
    // RSVP
    'rsvp.title': 'RSVP',
    'rsvp.subtitle': 'Please confirm your attendance',
    'rsvp.name': 'Full Name',
    'rsvp.name_placeholder': 'Enter your full name',
    'rsvp.phone': 'Phone Number',
    'rsvp.phone_placeholder': 'Enter your phone number',
    'rsvp.attending': 'Will you attend?',
    'rsvp.attending_yes': 'Yes, I will attend',
    'rsvp.attending_no': 'No, I cannot attend',
    'rsvp.attending_maybe': 'Maybe',
    'rsvp.note': 'Note',
    'rsvp.note_placeholder': 'Enter a note (optional)',
    'rsvp.submit': 'Submit RSVP',
    'rsvp.submitting': 'Submitting...',
    'rsvp.success': 'Thank you for confirming your attendance!',
    'rsvp.error': 'An error occurred, please try again',
    
    // Gift
    'gift.title': 'Wedding Gift',
    'gift.subtitle': 'If you would like to give a wedding gift, you can transfer to the following accounts',
    'gift.copy_success': 'Account number copied',
    'gift.copy_error': 'Failed to copy account number',
    
    // Wishes
    'wishes.title': 'Wishes Wall',
    'wishes.subtitle': 'Send your wishes to the bride and groom',
    'wishes.name': 'Your Name',
    'wishes.name_placeholder': 'Enter your name',
    'wishes.message': 'Message',
    'wishes.message_placeholder': 'Enter your message',
    'wishes.submit': 'Send Wish',
    'wishes.submitting': 'Sending...',
    'wishes.success': 'Thank you for your wishes!',
    'wishes.error': 'An error occurred, please try again',
    'wishes.no_wishes': 'No wishes yet',
    
    // Footer
    'footer.thank_you': 'Thank you for taking the time to celebrate with us',
    'footer.share_btn': 'Share wedding invitation',
    'footer.share_success': 'Wedding invitation link copied',
  }
};

let currentLanguage: Language = inviteData.langDefault;

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
  localStorage.setItem('wedding-language', lang);
};

export const getLanguage = (): Language => {
  const saved = localStorage.getItem('wedding-language') as Language;
  return saved || inviteData.langDefault;
};

export const t = (key: string): string => {
  const lang = getLanguage();
  return translations[lang][key as keyof typeof translations[typeof lang]] || key;
};

export const toggleLanguage = (): Language => {
  const newLang = currentLanguage === 'vi' ? 'en' : 'vi';
  setLanguage(newLang);
  return newLang;
};
