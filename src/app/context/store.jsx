'use client';

import { createContext, useContext, Dispatch, useState, SetStateAction } from "react";

export const FilterContext = createContext(null);

export function ContextProvider({ children }) {
    
    const [filterJobType, setFilterJobType] = useState([]);
    const [filterTag, setFilterTag] = useState();
    const [filterCategory, setFilterCategory] = useState();
    const [filterExperience, setFilterExperience] = useState([]);
    const [filterCountry, setFilterCountry] = useState();
    const [title, setTitle] = useState("");
    const [openPopUp, setOpenPopUp] = useState(false);
  
    return (
        <FilterContext.Provider value={{ 
            filterJobType, setFilterJobType, 
            filterTag, setFilterTag, 
            filterCategory, setFilterCategory, 
            filterExperience, setFilterExperience,
            filterCountry, setFilterCountry,
            title, setTitle,
            openPopUp, setOpenPopUp 
        }}>
            {children}
        </FilterContext.Provider>
    );
  }