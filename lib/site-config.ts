export const siteConfig = {
  name: "Haidar Shoes",
  tagline: "Crafted For Every Step.",
  description:
    "Haidar Shoes is a premium footwear brand crafting stylish, comfortable shoes for men, women and kids — trusted across Punjab for quality and value.",
  address: {
    line: "X35C+5CG, Dokota Road, Mitro, Punjab, Pakistan",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=X35C%2B5CG+Dokota+Road+Mitro+Punjab+Pakistan",
  },
  contact: {
    whatsapp: "923142965191",
    phone: "+92 314 2965191",
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

/** Standard prefill used across every WhatsApp button on the site. */
export const DEFAULT_WHATSAPP_MESSAGE = "Hello Haidar Shoes!\nI'm interested in this product.";

export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encoded}`;
}
