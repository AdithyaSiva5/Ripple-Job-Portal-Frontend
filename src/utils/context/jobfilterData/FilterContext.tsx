import React, { createContext, useState, useContext } from 'react';

export interface FilterData {
  search:string|null
  jobRole: string | null;
  location: string | null;
  jobType: string | null;
  salaryRange: string | null;
  experienceRange: string | null;
}

interface FilterContextValue {
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

const FilterProvider: React.FC = ({ children }:any) => {
  const [filterData, setFilterData] = useState<FilterData>({
    search:null,
    jobRole: null,
    location: null,
    jobType: null,
    salaryRange: null,
    experienceRange: null,
  });

  return (
    <FilterContext.Provider value={{ filterData, setFilterData }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, useFilterContext, FilterProvider };