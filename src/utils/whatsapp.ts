export const CLINIC_INFO = {
  name: 'Functional Rehab Lab',
  phoneDisplay: '+91 80885 96486',
  telUrl: 'tel:+918088596486',
  whatsappRawNumber: '918088596486',
  address: {
    line1: 'Near KIMS Rd',
    line2: 'Oruvathilkotta, Anayara',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    pincode: '695029',
    country: 'India',
    fullFormatted: 'Near KIMS Rd, Oruvathilkotta, Anayara, Thiruvananthapuram, Kerala 695029',
  },
  googleMapsUrl:
    'https://www.google.com/maps/place/Functional+rehab+lab/@8.5123419,76.9070298,17z/data=!4m16!1m9!3m8!1s0x3b05bdf542872c11:0x1a00943f6a6445d6!2sFunctional+rehab+lab!8m2!3d8.5123419!4d76.9096047!9m1!1b1!16s%2Fg%2F11zynhwgjn!3m5!1s0x3b05bdf542872c11:0x1a00943f6a6445d6!8m2!3d8.5123419!4d76.9096047!16s%2Fg%2F11zynhwgjn?entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D',
};

export interface WhatsAppBookingParams {
  patientName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
  patientType: string;
  concern?: string;
}

/**
 * Builds the official WhatsApp appointment booking URL based on the required template:
 *
 * Hello Functional Rehab Lab,
 *
 * I would like to request a physiotherapy appointment.
 *
 * Name: {{patient_name}}
 * Phone: {{phone}}
 * Preferred Date: {{date}}
 * Preferred Time: {{time}}
 * Service: {{service}}
 * Patient Type: {{patient_type}}
 * Concern: {{concern}}
 *
 * Please confirm the available slot.
 *
 * Thank you.
 */
export function buildWhatsAppBookingUrl(params: WhatsAppBookingParams): string {
  const concernText = params.concern?.trim() ? params.concern.trim() : 'N/A';
  const message = `Hello Functional Rehab Lab,

I would like to request a physiotherapy appointment.

Name: ${params.patientName.trim()}
Phone: ${params.phone.trim()}
Preferred Date: ${params.preferredDate}
Preferred Time: ${params.preferredTime}
Service: ${params.service}
Patient Type: ${params.patientType}
Concern: ${concernText}

Please confirm the available slot.

Thank you.`;

  return `https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds the floating Quick WhatsApp enquiry URL
 */
export function buildQuickWhatsAppUrl(customTopic?: string): string {
  const text = customTopic
    ? `Hello Functional Rehab Lab,\nI would like to enquire about ${customTopic}.`
    : `Hello Functional Rehab Lab,\nI would like to know more about your physiotherapy services.`;

  return `https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates a random realistic booking reference like FRL-2026-4821
 */
export function generateBookingRef(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `FRL-2026-${randomDigits}`;
}
