import React, { useState } from 'react';

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
  const [localRange, setLocalRange] = useState<PriceRange>(selectedPriceRange);

  const handleMinPriceChange = (value: number) => {
    const newRange = { ...localRange, min: value };
    setLocalRange(newRange);
    onPriceChange(newRange);
  };

  const handleMaxPriceChange = (value: number) => {
    const newRange = { ...localRange, max: value };
    setLocalRange(newRange);
    onPriceChange(newRange);
  };

  return (
    <div className="price-filter">
      <h3 className="price-filter--subtitle">Faixa de Preço</h3>
      
      <div className="price-filter--inputs">
        <div className="price-input-group">
          <label htmlFor="min-price">Mínimo (R$)</label>
          <input
            id="min-price"
            type="number"
            value={localRange.min}
            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
            min={priceRange.min}
            max={priceRange.max}
          />
        </div>
        
        <div className="price-input-group">
          <label htmlFor="max-price">Máximo (R$)</label>
          <input
            id="max-price"
            type="number"
            value={localRange.max}
            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
            min={priceRange.min}
            max={priceRange.max}
          />
        </div>
      </div>
      
      <div className="price-filter--range">
        <span>R$ {priceRange.min}</span>
        <span>R$ {priceRange.max}</span>
      </div>
    </div>
  );
};