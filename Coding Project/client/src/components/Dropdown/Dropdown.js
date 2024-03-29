import React, {useState} from 'react';
import './Dropdown.css';
const Dropdown = ({drop}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="dropdown">
            <button onClick={() => setIsOpen(!isOpen)}>{drop.feature}</button>
            {isOpen ? (
            <ul className="dropdown-menu">
                {drop.options.map(option => (
                <li>
                <button>{option}</button>
                </li>
                ))}
            </ul>
      ) : null}
    </div>
    );
}

export default Dropdown;