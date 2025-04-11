
import React, { createContext, useContext, useState } from 'react';

interface FilterState {
  startDate?: Date;
  endDate?: Date;
  shop?: string;
  category?: string;
  region?: string;
}

interface FilterContextType {
  filters: FilterState;
  updateFilters: (newFilters: FilterState & { reset?: boolean }) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({});

  const updateFilters = (newFilters: FilterState & { reset?: boolean }) => {
    if (newFilters.reset) {
      setFilters({});
    } else {
      setFilters(prev => ({ ...prev, ...newFilters }));
    }
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};
