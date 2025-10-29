import axios from 'axios';
import type { Product } from '../types/product';

const api = axios.create({
  baseURL: 'http://localhost:5500',
  timeout: 10000,
});

export const productService = {
  getProducts: async (): Promise<{ data: Product[] }> => {
    const response = await api.get('/products');
    return response;
  },

  getProduct: async (id: string): Promise<{ data: Product }> => {
    const response = await api.get(`/products/${id}`);
    return response;
  },

  getProductsByCategory: async (category: string): Promise<{ data: Product[] }> => {
    const response = await api.get(`/products?category=${category}`);
    return response;
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);