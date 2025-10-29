import React from 'react';

interface ColorFilterProps {
  colors: string[];
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
}

export const ColorFilter: React.FC<ColorFilterProps> = ({
  colors,
  selectedColors,
  onColorChange
}) => {
  const handleColorToggle = (color: string) => {
    const newSelectedColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    
    onColorChange(newSelectedColors);
  };

  return (
    <div className="color-filter">
      <h3 className="color-filter--subtitle">Cores</h3>
      <div className="color-filter--options">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-option ${selectedColors.includes(color) ? 'selected' : ''}`}
            onClick={() => handleColorToggle(color)}
            aria-label={`Filtrar por cor ${color}`}
          >
            <span className="color-dot" style={{ backgroundColor: color }}></span>
            <span className="color-name">{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
};