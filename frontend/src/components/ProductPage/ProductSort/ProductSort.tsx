import React from 'react';

interface ProductSortProps {
  onSortChange: (sortType: string) => void;
  currentSort: string;
  isModal?: boolean;
}

export const ProductSort: React.FC<ProductSortProps> = ({ 
  onSortChange, 
  currentSort,
  isModal = false
}) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  const sortOptions = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'price-low', label: 'Menor preço' },
    { value: 'price-high', label: 'Maior preço' },
  ];

  if (isModal) {
    const handleModalSortClick = (value: string) => {
      if (currentSort === value) {
        onSortChange('order-by'); // Desseleciona e volta ao estado inicial
      } else {
        onSortChange(value);
      }
    };

    return (
      <div className="product-sort-modal-list">
        <ul>
          {sortOptions.map(option => (
            <li key={option.value}>
              <button
                className={`sort-option-btn ${currentSort === option.value ? 'selected' : ''}`}
                onClick={() => handleModalSortClick(option.value)}
                aria-pressed={currentSort === option.value}
              >
                {option.label}
                {currentSort === option.value && <span className="checkmark">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="product-page--header--sort">
      <select 
        id="sort-select"
        className="product-page--header--sort--select" 
        value={currentSort} 
        onChange={handleSortChange}
      >
        <option value="order-by" disabled>Ordenar por:</option>
        <option value="newest">Mais recentes</option>
        <option value="price-low">Menor preço</option>
        <option value="price-high">Maior preço</option>
      </select>
    </div>
  );
};