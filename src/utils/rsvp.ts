import inviteData from '../data/invite';

export type RSVPData = {
  name: string;
  phone: string;
  attending: 'yes' | 'no' | 'maybe';
  note?: string;
};

export type RSVPResponse = {
  success: boolean;
  message: string;
};

// Mock RSVP submission
export const submitRSVPMock = async (data: RSVPData): Promise<RSVPResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simulate random success/failure (90% success rate)
  const success = Math.random() > 0.1;
  
  if (success) {
    // Store in localStorage for demo purposes
    const existingRSVPs = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
    existingRSVPs.push({
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('wedding-rsvps', JSON.stringify(existingRSVPs));
    
    return {
      success: true,
      message: 'Cảm ơn bạn đã xác nhận tham dự!'
    };
  } else {
    return {
      success: false,
      message: 'Có lỗi xảy ra, vui lòng thử lại'
    };
  }
};

// Google Form submission
export const submitRSVPGoogleForm = async (data: RSVPData): Promise<RSVPResponse> => {
  if (!inviteData.rsvp.googleForm) {
    throw new Error('Google Form configuration not found');
  }
  
  const { formAction, fieldMap } = inviteData.rsvp.googleForm;
  
  const formData = new FormData();
  formData.append(fieldMap.name, data.name);
  formData.append(fieldMap.phone, data.phone);
  formData.append(fieldMap.attending, data.attending);
  formData.append(fieldMap.note, data.note || '');
  
  try {
    const response = await fetch(formAction, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Forms
    });
    
    // Since mode is 'no-cors', we can't read the response
    // But if no error is thrown, we assume success
    return {
      success: true,
      message: 'Cảm ơn bạn đã xác nhận tham dự!'
    };
  } catch (error) {
    console.error('RSVP submission error:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra, vui lòng thử lại'
    };
  }
};

// Main RSVP submission function
export const submitRSVP = async (data: RSVPData): Promise<RSVPResponse> => {
  if (!inviteData.rsvp.enabled) {
    throw new Error('RSVP is not enabled');
  }
  
  if (inviteData.rsvp.mode === 'mock') {
    return await submitRSVPMock(data);
  } else if (inviteData.rsvp.mode === 'google_form') {
    return await submitRSVPGoogleForm(data);
  } else {
    throw new Error('Invalid RSVP mode');
  }
};

// Get stored RSVPs (for demo purposes)
export const getStoredRSVPs = (): any[] => {
  return JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
};
