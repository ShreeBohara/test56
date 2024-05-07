import React from 'react';


const Dropdown = ({ label, options = [], value, onChange }) => {
    return (
        <div className="Dropdown">
            <label>{label}:</label>
            {label === 'Discipline' ? <p>Discipline</p> : null}
            
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
