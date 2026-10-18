export type Language = 'fa' | 'en';

export interface Product {
  id: string;
  nameFa: string;
  nameEn: string;
  subtitleFa: string;
  subtitleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  price: number; // in Toman
  priceFormattedFa: string;
  priceFormattedEn: string;
  image: string;
  imageType: 'image' | 'leaves-black' | 'leaves-green';
  category: 'orthodox' | 'green' | 'premium' | 'traditional';
  weights: string[];
  selectedWeight: string;
  harvest: string;
  tastingNotesFa: string[];
  tastingNotesEn: string[];
  brewTimeFa: string;
  brewTimeEn: string;
  waterTemp: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  weight: string;
}
