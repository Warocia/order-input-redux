import React, { useState } from 'react';
import './SearchableDropdown.css';
interface Option{
    value: number;
    label: string;
  }

type Props = {
    options: Option[],
    selectedId: number | null,
    onValueChanged: (selectedValue?: number) => void
  };

export const SearchableDropdown: React.FC<Props> = ({ options, selectedId, onValueChanged }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(options.find(option => option.value === selectedId) || null);
  
    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
    const handleOptionSelect = (option: Option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
      onValueChanged(option.value);
    };
  
    return (
      <div className="searchable-dropdown">
        {!isDropdownOpen && (
        <div
          className="searchable-dropdown__selected-option"
          onClick={toggleDropdown}
        >
          {selectedOption ? selectedOption.label : 'Select an option'}
        </div>)}
        {isDropdownOpen && (
          <div className="searchable-dropdown__options">
            <input
              type="text"
              className=".dropdown-search-input"
              placeholder="Search options"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="searchable-dropdown__option"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
