import React from 'react';

interface ProductSortProps {
  onSortChange: (sortType: string) => void;
  currentSort: string;
}

export const ProductSort: React.FC<ProductSortProps> = ({ 
  onSortChange, 
  currentSort 
}) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="product-page--header--sort">
      <select 
        id="sort-select"
        className="product-page--header--sort--select" 
        value={currentSort} 
        onChange={handleSortChange}
      >
        <option value="Ordenar por:">Ordenar por:</option>
        <option value="newest">Mais recentes</option>
        <option value="price-low">Menor preço</option>
        <option value="price-high">Maior preço</option>
      </select>
    </div>
  );
};