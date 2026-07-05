export type SiteSettings = {
  id: number;
  phone: string;
  phone_2: string;
  email: string;
  address: string;
  address_en: string;
  telegram_url: string;
  whatsapp_url: string;
  linkedin_url: string;
  instagram_url: string;
  footer_note_1: string;
  footer_note_1_en: string;
  footer_note_2: string;
  footer_note_2_en: string;
};

export type Hero = {
  id: number;
  title_main: string;
  title_main_en: string;
  title_highlight: string;
  title_highlight_en: string;
  subtitle: string;
  subtitle_en: string;
  cta_text: string;
  cta_text_en: string;
  cta_link: string;
  background_image_url: string | null;
};

export type HeroFeature = {
  id: string;
  icon: string;
  title: string;
  title_en: string;
  subtitle: string;
  subtitle_en: string;
  sort_order: number;
  is_visible: boolean;
};

export type Direction = {
  id: string;
  icon: string;
  title: string;
  title_en: string;
  image_url: string | null;
  button_text: string;
  button_text_en: string;
  button_link: string;
  enable_lightning_effect: boolean;
  sort_order: number;
  is_visible: boolean;
};

export type DirectionItem = {
  id: string;
  direction_id: string;
  text: string;
  text_en: string;
  sort_order: number;
  is_visible: boolean;
};

export type DirectionWithItems = Direction & { items: DirectionItem[] };

export type AboutContent = {
  id: number;
  heading: string;
  heading_en: string;
  paragraph_1: string;
  paragraph_1_en: string;
  paragraph_2: string;
  paragraph_2_en: string;
};

export type AboutStat = {
  id: string;
  icon: string;
  number_text: string;
  number_text_en: string;
  label_text: string;
  label_text_en: string;
  sort_order: number;
  is_visible: boolean;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  company: string | null;
  email: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
