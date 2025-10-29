export interface Product {
  id: number;
  name: string;
  price: number;
  parcelamento: number[];
  color: string;
  size: string[];
  image: string;
  date: string;
  description: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
}

export interface FilterOptions {
  colors: string[];
  sizes: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SortOption {
  value: string;
  label: string;
}