/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FilterSection } from './FilterSection';
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
  isModal?: boolean;
  openSections?: { colors: boolean; sizes: boolean; priceRange: boolean };
  onToggleSection?: (section: 'colors' | 'sizes' | 'priceRange') => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  selectedFilters,
  isModal = false,
  openSections,
  onToggleSection,
}) => {
  if (isModal && openSections && onToggleSection) {
    return (
      <aside className="product-filters" data-is-modal={true}>
        <FilterSection title="Cores" isOpen={openSections.colors} onToggle={() => onToggleSection('colors')}>
          <ColorFilter
            colors={filters.colors}
            selectedColors={selectedFilters.colors}
            onColorChange={(colors) => onFilterChange('colors', colors)}
            isModal={isModal}
          />
        </FilterSection>
        <FilterSection title="Tamanhos" isOpen={openSections.sizes} onToggle={() => onToggleSection('sizes')}>
          <SizeFilter
            sizes={filters.sizes}
            selectedSizes={selectedFilters.sizes}
            onSizeChange={(sizes) => onFilterChange('sizes', sizes)}
          />
        </FilterSection>
        <FilterSection
          title="Faixa de preço"
          isOpen={openSections.priceRange}
          onToggle={() => onToggleSection('priceRange')}>
          <PriceFilter
            priceRange={filters.priceRange}
            selectedPriceRange={selectedFilters.priceRange}
            onPriceChange={(range) => onFilterChange('priceRange', range)}
          />
        </FilterSection>
      </aside>
    );
  }

  return (
    <aside className="product-filters" data-is-modal={false}>
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