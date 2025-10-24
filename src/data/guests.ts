// Danh sách khách mời
export interface Guest {
  id: string;
  name: string;
  shortId?: string; // ID ngắn cho URL dạng /invite/abc123
  group?: string; // Nhóm khách (gia đình, bạn bè, đồng nghiệp...)
  relationship?: string; // Mối quan hệ
  phone?: string;
  email?: string;
}

export const guestList: Guest[] = [
  // Gia đình cô dâu
  {
    id: 'bride-family-1',
    name: 'Ông Bà Nguyễn Văn A',
    shortId: 'bride001',
    group: 'Gia đình cô dâu',
    relationship: 'Ông bà nội'
  },
  {
    id: 'bride-family-2', 
    name: 'Cô Chú Nguyễn Văn B',
    shortId: 'bride002',
    group: 'Gia đình cô dâu',
    relationship: 'Cô chú'
  },
  
  // Gia đình chú rể
  {
    id: 'groom-family-1',
    name: 'Ông Bà Trần Văn C',
    shortId: 'groom001', 
    group: 'Gia đình chú rể',
    relationship: 'Ông bà ngoại'
  },
  {
    id: 'groom-family-2',
    name: 'Cô Chú Trần Văn D', 
    shortId: 'groom002',
    group: 'Gia đình chú rể',
    relationship: 'Cô chú'
  },
  
  // Bạn bè cô dâu
  {
    id: 'bride-friend-1',
    name: 'Phạm Thị E',
    shortId: 'friend001',
    group: 'Bạn bè cô dâu',
    relationship: 'Bạn thân'
  },
  {
    id: 'bride-friend-2',
    name: 'Lê Thị F',
    shortId: 'friend002', 
    group: 'Bạn bè cô dâu',
    relationship: 'Bạn học'
  },
  
  // Bạn bè chú rể
  {
    id: 'groom-friend-1',
    name: 'Hoàng Văn G',
    shortId: 'friend003',
    group: 'Bạn bè chú rể', 
    relationship: 'Bạn thân'
  },
  {
    id: 'groom-friend-2',
    name: 'Vũ Văn H',
    shortId: 'friend004',
    group: 'Bạn bè chú rể',
    relationship: 'Bạn học'
  },
  
  // Đồng nghiệp
  {
    id: 'colleague-1',
    name: 'Nguyễn Thị I',
    shortId: 'col001',
    group: 'Đồng nghiệp',
    relationship: 'Đồng nghiệp'
  },
  {
    id: 'colleague-2', 
    name: 'Trần Văn K',
    shortId: 'col002',
    group: 'Đồng nghiệp',
    relationship: 'Đồng nghiệp'
  }
];

// Helper functions
export const getGuestByName = (name: string): Guest | undefined => {
  return guestList.find(guest => guest.name === name);
};

export const getGuestByShortId = (shortId: string): Guest | undefined => {
  return guestList.find(guest => guest.shortId === shortId);
};

export const getGuestsByGroup = (group: string): Guest[] => {
  return guestList.filter(guest => guest.group === group);
};

export const getAllGroups = (): string[] => {
  const groups = guestList.map(guest => guest.group).filter((group): group is string => Boolean(group));
  return [...new Set(groups)];
};
