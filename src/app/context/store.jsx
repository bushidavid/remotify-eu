'use client';

import { createContext, useContext, Dispatch, useState, SetStateAction } from "react";

export const FilterContext = createContext(null);

export function ContextProvider({ children }) {
    
    const [filter, setFilter] = useState({});
    const [title, setTitle] = useState("");
    const [openPopUp, setOpenPopUp] = useState(false);

  
    return (
      <FilterContext.Provider value={{ filter, setFilter, title, setTitle, openPopUp, setOpenPopUp }}>
        {children}
      </FilterContext.Provider>
    );
  }