import React, { useState } from 'react';

interface ColorFilterProps {
  colors: string[];
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  isModal?: boolean;
}

export const ColorFilter: React.FC<ColorFilterProps> = ({
  colors,
  selectedColors,
  onColorChange,
  isModal = false
}) => {
  const [showAllColors, setShowAllColors] = useState(false);
  const initialColorLimit = 5;
  const handleColorToggle = (color: string) => {
    const newSelectedColors = selectedColors.includes(color) ? [] : [color];
    
    onColorChange(newSelectedColors);
  };
  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors);
  };
  const visibleColors = isModal || showAllColors ? colors : colors.slice(0, 5);

  return (
    <div className="color-filter">
      <h3 className="color-filter--subtitle">Cores</h3>
      <div className="color-filter--options">        
        {visibleColors.map((color) => (
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
      {!isModal && colors.length > initialColorLimit && (
        <button 
          className="color-filter--view-all"
          onClick={toggleShowAllColors}
        >
          <span className={`arrow ${showAllColors ? 'up' : ''}`}>
            {showAllColors ? 'Ver menos' : 'Ver todas as cores'}
          </span>
        </button>
      )}
    </div>
  );
};