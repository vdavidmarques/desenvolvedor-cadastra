/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ColorFilter } from './ColorFilter/ColorFilter';
import { SizeFilter } from './SizeFilter/SizeFilter';
import { PriceFilter } from './PriceFilter/PriceFilter';

interface FilterOptions {
  colors: string[];
  sizes: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filterType: string, value: any) => void;
  selectedFilters: {
    colors: string[];
    sizes: string[];
    priceRange: { min: number; max: number };
  };
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  selectedFilters
}) => {
  return (
    <aside className="product-filters">
      
      <ColorFilter
        colors={filters.colors}
        selectedColors={selectedFilters.colors}
        onColorChange={(colors) => onFilterChange('colors', colors)}
      />
      
      <SizeFilter
        sizes={filters.sizes}
        selectedSizes={selectedFilters.sizes}
        onSizeChange={(sizes) => onFilterChange('sizes', sizes)}
      />
      
      <PriceFilter
        priceRange={filters.priceRange}
        selectedPriceRange={selectedFilters.priceRange}
        onPriceChange={(range) => onFilterChange('priceRange', range)}
      />
    </aside>
  );
};