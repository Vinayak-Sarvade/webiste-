export interface SweetItem {
  id: string;
  name: string;
  category: 'Premium Sweet' | 'Traditional' | 'Bengali Sweet' | 'South Indian' | 'Milk Sweet' | 'Fresh Sweet' | 'Speciality' | 'Barfi';
  pricePerKg: number;
  description: string;
  image: string;
  isSpeciality?: boolean;
  badge?: string;
  shelfLife: string;
  ingredients: string[];
}

export interface GiftBox {
  id: string;
  name: string;
  price: number;
  weight: string;
  varietiesCount: number;
  features: string[];
  description: string;
  image: string;
  popular?: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  tag: string;
  description: string;
  highlight: string;
  icon: string;
  code?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date?: string;
  location?: string;
  sweetMentioned?: string;
}

export interface CartItem {
  id: string; // unique item-variant key
  itemId: string;
  name: string;
  type: 'sweet' | 'gift_box';
  weightOption?: '250g' | '500g' | '1kg';
  unitPrice: number;
  quantity: number;
  image: string;
  categoryOrWeight: string;
}

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  notes: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  appliedCoupon: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  isGuest?: boolean;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendedSweets?: string[];
  suggestedActions?: Array<{
    label: string;
    actionType: 'add_sweet' | 'view_section' | 'apply_coupon';
    targetId?: string;
  }>;
}

