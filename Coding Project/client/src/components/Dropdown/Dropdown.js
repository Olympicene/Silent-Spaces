import React, {useState} from 'react';
import './Dropdown.css';
const Dropdown = ({drop, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOptionSelect = (option) => {
        onChange(option); // Call the onChange callback with the selected option
        setIsOpen(false); // Close the dropdown after selecting an option
    };
    return (
        <div className="dropdown">
            <button onClick={() => setIsOpen(!isOpen)}>{drop.feature}</button>
            {isOpen ? (
            <ul className="dropdown-menu">
                {drop.options.map((option, index) => (
                    <li>
                        <button onClick={() => handleOptionSelect(option)}>{option}</button>
                    </li>
                ))}
            </ul>
      ) : null}
    </div>
    );
}

export default Dropdown;