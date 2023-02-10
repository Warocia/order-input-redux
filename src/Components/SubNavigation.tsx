import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {SubNavigationOption} from '../Model/SubNavigationOption';

interface SubNavigationProps {
  options: SubNavigationOption[];
  toggleActiveOption: (activeOption : SubNavigationOption) => void;
}

const SubNavigation: React.FC<SubNavigationProps> = ({ options, toggleActiveOption }) => {
  const [activeOption, setActiveOption] = useState(options[0]);

  return (
    <div>
      <ul style={{ marginTop:'20px', display: 'flex', justifyContent: 'center' }}>
        {options.map((option) => (
          <div key={option.option}>
            <Button style={{ marginLeft:'5px' }}
              type="button"
              onClick={() => {
                setActiveOption(option);
                toggleActiveOption(option);
              }}
              className={activeOption === option ? 'active' : ''}
            >
              {option.title}
            </Button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SubNavigation;

