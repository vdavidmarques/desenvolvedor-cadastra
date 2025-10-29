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
    const newSelectedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    onSizeChange(newSelectedSizes);
  };

  return (
    <div className="size-filter">
      <h3 className="size-filter--subtitle">Tamanhos</h3>
      <div className="size-filter--options">
        {sizes.map((size, index) => (
          <button
            key={`size-filter-${index}`}
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