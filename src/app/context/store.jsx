'use client';

import { createContext, useContext, Dispatch, useState, SetStateAction } from "react";

export const FilterContext = createContext(null);

export function ContextProvider({ children }) {
    
    const [filter, setFilter] = useState({});
    const [title, setTitle] = useState("");

  
    return (
      <FilterContext.Provider value={{ filter, setFilter, title, setTitle }}>
        {children}
      </FilterContext.Provider>
    );
  }