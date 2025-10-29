import React from 'react';

interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
}

export const SizeFilter: React.FC<SizeFilterProps> = ({
  sizes,
  selectedSizes,
  onSizeChange
}) => {
  const handleSizeToggle = (size: string) => {
    const newSelectedSizes = selectedSizes.includes(size) ? [] : [size];
    
    onSizeChange(newSelectedSizes);
  };

  return (
    <div className="size-filter">
      <h3 className="size-filter--subtitle">Tamanhos</h3>
      <div className="size-filter--options">
        {sizes.sort().map((size) => (
          <button
            key={size}
            className={`size-option ${selectedSizes.includes(size) ? 'selected' : ''}`}
            onClick={() => handleSizeToggle(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};