import React from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className={`filter-section ${isOpen ? 'open' : ''}`}>
      <button className="filter-section--header" onClick={onToggle}>
        <h3 className="filter-section--subtitle">{title}</h3>
        <span className={`arrow ${isOpen ? 'up' : ''}`}></span>
      </button>
      {isOpen && <div className="filter-section--content">{children}</div>}
    </div>
  );
};
