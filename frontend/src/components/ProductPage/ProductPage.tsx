import React, { useState, useEffect } from 'react';
import { ProductSort } from './ProductSort/ProductSort';
import { ProductFilters } from './ProductFilters/ProductFilters';
import { ProductGrid } from './ProductGrid/ProductGrid';
import type { Product } from '../../types/product';
import { Modal } from '../UI/Modal/Modal';
import { productService } from '../../services/api';

export const ProductPage: React.FC = () => {
  const [sortType, setSortType] = useState('order-by');
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: { min: 0, max: Infinity }
  });
  const [availableFilters, setAvailableFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: { min: 0, max: 1000 }
  });
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [openFilterSections, setOpenFilterSections] = useState({
    colors: false,
    sizes: false,
    priceRange: false,
  });

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const response = await productService.getProducts();
      const products: Product[] = response.data;
      
      const uniqueColors = [...new Set(products.map(p => p.color))];
      const uniqueSizes = [...new Set(products.flatMap(p => p.size))];
      const prices = products.map(p => p.price);
      
      setAvailableFilters({
        colors: uniqueColors,
        sizes: uniqueSizes,
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        }
      });

      setSelectedFilters(prev => ({ ...prev, priceRange: { min: Math.min(...prices), max: Math.max(...prices) } }));
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleSortChange = (sort: string) => {
    setSortType(sort);
    setSortModalOpen(false); 
  };

  const handleFilterChange = (filterType: string, value: unknown) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      colors: [],
      sizes: [],
      priceRange: {
        min: availableFilters.priceRange.min,
        max: availableFilters.priceRange.max,
      },
    });
    setOpenFilterSections({ colors: false, sizes: false, priceRange: false });
  };

  const handleToggleFilterSection = (section: 'colors' | 'sizes' | 'priceRange') => {
    setOpenFilterSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
    setOpenFilterSections({ colors: false, sizes: false, priceRange: false });
  };

  return (
    <main className="product-page container">
      <div className="product-page--header">
        <h1 className='product-page--header--title'>Blusas</h1>
        <div className="product-page--header--option">
          <button onClick={() => setFilterModalOpen(true)}>Filtrar</button>
          <button className='order' onClick={() => setSortModalOpen(true)}>Ordenar</button>
        </div>
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

        <Modal
          isOpen={isFilterModalOpen}
          onClose={closeFilterModal}
          title="Filtrar"
        > 
          <div className="modal-filter-body">
            <ProductFilters
              filters={availableFilters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              isModal={true}
              openSections={openFilterSections}
              onToggleSection={handleToggleFilterSection}
            />
            {Object.values(openFilterSections).some(isOpen => isOpen) && (
              <div className="modal-filter-footer">
                <button className="apply-filters-btn" onClick={closeFilterModal}>Aplicar</button>
                <button className="clear-filters-btn" onClick={handleClearFilters}>Limpar</button>
              </div>
            )}
          </div>
        </Modal>

        <Modal isOpen={isSortModalOpen} onClose={() => setSortModalOpen(false)} title="Ordenar">
          <div className="product-page--header--sort">
            <ProductSort onSortChange={handleSortChange} currentSort={sortType} isModal={true} />
          </div>
        </Modal>
      </div>
    </main>
  );
};