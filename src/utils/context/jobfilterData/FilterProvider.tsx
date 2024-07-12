import React, { useState } from 'react';
import { FilterContext, FilterData } from './FilterContext';

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

export default FilterProvider; 
