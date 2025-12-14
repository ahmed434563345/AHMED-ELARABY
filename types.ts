export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[]; // Changed from single image to array
  category: 'Running' | 'Lifestyle' | 'Basketball' | 'Custom';
  description: string;
  sizes: string[];
  offer?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped';
  paymentMethod: 'card' | 'instapay' | 'orangemoney' | 'cod';
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  shippingAddress: {
    address: string;
    city: string;
    state?: string;
    zip: string;
  };
}

export interface AnalyticsData {
  name: string;
  value: number;
}

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

export enum AppView {
  HOME = 'HOME',
  SHOP = 'SHOP',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  DESIGN_LAB = 'DESIGN_LAB',
  PROFILE = 'PROFILE'
}