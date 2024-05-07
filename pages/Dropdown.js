import React from 'react';


const Dropdown = ({ label, options = [], value, onChange }) => {
    const dropdownClassName = label == 'Discipline' ? 'DropdownRequired' : 'Dropdown';
    return (
        <div className={dropdownClassName}>
            <label>{label}:</label>
            {label === 'Discipline' ? <p className='Required'>*Required</p> : null}
            
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
