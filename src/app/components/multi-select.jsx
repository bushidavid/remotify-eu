import React, { useState, useEffect } from 'react';

const MultiSelect = ({ options, defaultSelected = [], labelKey = 'label', valueKey = 'value' }) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultSelected);

  useEffect(() => {
    // Simulating fetching default selected items from a database
    const fetchDefaultSelected = async () => {
      // In a real scenario, you would fetch this data from your API or database
      const fetchedDefaultSelected = defaultSelected;
      setSelectedOptions(fetchedDefaultSelected);
    };

    fetchDefaultSelected();
  }, [defaultSelected]);

  const handleOptionToggle = (option) => {
    setSelectedOptions((prevSelected) => {
      const isSelected = prevSelected.some(item => item[valueKey] === option[valueKey]);
      if (isSelected) {
        return prevSelected.filter(item => item[valueKey] !== option[valueKey]);
      } else {
        return [...prevSelected, option];
      }
    });
  };


  const isOptionSelected = (option) => {
    return selectedOptions.some(item => item[valueKey] === option[valueKey]);
  };

  return (
    <div className="relative w-64">
      <select
        multiple
        className="w-full p-2 text-gray-700 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
      >
        {options.map((option) => (
          <option
            key={option[valueKey]}
            value={option[valueKey]}
            className={`px-4 py-2 ${
              isOptionSelected(option)
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-white text-gray-700'
            }`}
            onClick={() => handleOptionToggle(option)}
          >
            {option[valueKey]}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 fill-current text-gray-400"
          viewBox="0 0 20 20"
        >
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default MultiSelect;