export const siteConfig = {
  name: "Haidar Shoes",
  tagline: "Step Into Style & Comfort",
  description:
    "Haidar Shoes is a premium footwear brand crafting stylish, comfortable shoes for men, women and kids — trusted across Punjab for quality and value.",
  address: {
    line: "X35C+5CG, Dokota Road, Mitro, Punjab, Pakistan",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=X35C%2B5CG+Dokota+Road+Mitro+Punjab+Pakistan",
  },
  contact: {
    whatsapp: "923001234567", // replace with real WhatsApp business number
    phone: "+92 300 1234567",
  },
  hours: [
    { day: "Monday – Saturday", time: "10:00 AM – 10:00 PM" },
    { day: "Sunday", time: "2:00 PM – 10:00 PM" },
  ],
  social: {
    instagram: "https://instagram.com/haidarshoes",
    facebook: "https://facebook.com/haidarshoes",
    tiktok: "https://tiktok.com/@haidarshoes",
  },
};

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encoded}`;
}
