import React from 'react';

interface PriceRange {
  min: number;
  max: number;
}

interface PriceFilterProps {
  priceRange: PriceRange;
  selectedPriceRange: PriceRange;
  onPriceChange: (range: PriceRange) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRange,
  selectedPriceRange,
  onPriceChange
}) => {
  const priceRanges = [
    { label: 'de R$0 até R$50', min: 0, max: 50 },
    { label: 'de R$51 até R$150', min: 51, max: 150 },
    { label: 'de R$151 até R$300', min: 151, max: 300 },
    { label: 'de R$301 até R$500', min: 301, max: 500 },
    { label: 'a partir de R$501', min: 501, max: Infinity },
  ];

  const defaultPriceRange = priceRange;

  const handlePriceRangeChange = (range: PriceRange) => {
    const isCurrentlySelected = selectedPriceRange.min === range.min && selectedPriceRange.max === range.max;
    const newSelectedRange = isCurrentlySelected ? defaultPriceRange : range;
    onPriceChange(newSelectedRange);
  };

  return (
    <div className="price-filter">
      <h3 className="price-filter--subtitle">Faixa de Preço</h3>
      <div className="price-filter--options">
        {priceRanges.map((range, index) => {
          const isSelected = selectedPriceRange.min === range.min && selectedPriceRange.max === range.max;
          return (
            <button
              key={range.label}              
              className={`filter-option filter-option-${index} ${isSelected ? 'selected' : ''}`}
              onClick={() => handlePriceRangeChange(range)}
              aria-label={`Filtrar por preço: ${range.label}`}
            >
              <span className="filter-dot"></span>
              <span className="filter-name">{range.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};