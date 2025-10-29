import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../ProductCard/ProductCard';
import type { Product } from '../../../types/product';

import { productService } from '../../../services/api';

interface ProductGridProps {
  filters?: {
    colors: string[];
    sizes: string[];
    priceRange: { min: number; max: number };
  };
  sortType?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  filters, 
  sortType = 'newest' 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9); 

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = () => {
    setVisibleCount(prev => prev + 6);
  };

  const filteredAndSortedProducts = () => {
    let filtered = [...products];

    if (filters) {
      if (filters.colors.length > 0) {
        filtered = filtered.filter(product => 
          filters.colors.includes(product.color)
        );
      }

      if (filters.sizes.length > 0) {
        filtered = filtered.filter(product =>
          filters.sizes.includes(product.size)
        );
      }

      filtered = filtered.filter(product =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
      );
    }

    switch (sortType) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  };

  const displayedProducts = filteredAndSortedProducts().slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filteredAndSortedProducts().length;

  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="loading-spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid-error">
        <p>{error}</p>
        <button onClick={loadProducts} className="retry-button">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      <div className="product-grid--content">
        {displayedProducts.map((product, index) => (
          <ProductCard key={`product-card-grid-${index}`} product={product} />
        ))}
      </div>

      {displayedProducts.length === 0 && (
        <div className="no-products">
          <p>Nenhum produto encontrado com os filtros selecionados.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="clear-filters-button"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {hasMoreProducts && displayedProducts.length > 0 && (
        <div className="load-more-container">
          <button onClick={loadMoreProducts} className="load-more-button">
            Carregar Mais Produtos
          </button>
        </div>
      )}
    </div>
  );
};