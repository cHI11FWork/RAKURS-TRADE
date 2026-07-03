export type SiteSettings = {
  id: number;
  phone: string;
  email: string;
  address: string;
  telegram_url: string;
  whatsapp_url: string;
  linkedin_url: string;
  footer_note_1: string;
  footer_note_2: string;
};

export type Hero = {
  id: number;
  title_main: string;
  title_highlight: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  background_image_url: string | null;
};

export type HeroFeature = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  sort_order: number;
  is_visible: boolean;
};

export type Direction = {
  id: string;
  icon: string;
  title: string;
  image_url: string | null;
  button_text: string;
  button_link: string;
  enable_lightning_effect: boolean;
  sort_order: number;
  is_visible: boolean;
};

export type DirectionItem = {
  id: string;
  direction_id: string;
  text: string;
  sort_order: number;
  is_visible: boolean;
};

export type DirectionWithItems = Direction & { items: DirectionItem[] };

export type AboutContent = {
  id: number;
  heading: string;
  paragraph_1: string;
  paragraph_2: string;
};

export type AboutStat = {
  id: string;
  icon: string;
  number_text: string;
  label_text: string;
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
