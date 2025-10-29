import React, { useState, useEffect } from 'react';
import { ProductSort } from './ProductSort/ProductSort';
import { ProductFilters } from './ProductFilters/ProductFilters';
import { ProductGrid } from './ProductGrid/ProductGrid';
import type { Product } from '../../types/product';
import { productService } from '../../services/api';

export const ProductPage: React.FC = () => {
  const [sortType, setSortType] = useState('newest');
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: { min: 0, max: 1000 }
  });
  const [availableFilters, setAvailableFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: { min: 0, max: 1000 }
  });

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const response = await productService.getProducts();
      const products: Product[] = response.data;
      
      const uniqueColors = [...new Set(products.map(p => p.color))];
      const uniqueSizes = [...new Set(products.map(p => p.size))];
      const prices = products.map(p => p.price);
      
      setAvailableFilters({
        colors: uniqueColors,
        sizes: uniqueSizes,
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        }
      });

      setSelectedFilters(prev => ({
        ...prev,
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        }
      }));
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleSortChange = (sort: string) => {
    setSortType(sort);
  };

  const handleFilterChange = (filterType: string, value: unknown) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <main className="product-page container">
      <div className="product-page--header">
        <h1 className='product-page--header--title'>Blusas</h1>
        <ProductSort 
          onSortChange={handleSortChange} 
          currentSort={sortType} 
        />
      </div>

      <div className="product-page--content">
        <ProductFilters
          filters={availableFilters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        
        <ProductGrid 
          filters={selectedFilters}
          sortType={sortType}
        />
      </div>
    </main>
  );
};