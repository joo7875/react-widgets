import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => { 
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {

        console.log('useEffect');
        const onBodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        }

        // body.addEventListener is called "first" then React events are called next
        // Don't want the body event listener to do anything if Dropdown events occur
        // Events occur outside of Dropdown, Do body event to close the dropdown
        document.body.addEventListener('click', onBodyClick);


        return () => {
            console.log('useEffect return');
            document.body.removeEventListener('click', onBodyClick);
        };

    }, []);

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null; // null means don't render anything in React
        }

        return (
            <div key={option.value} className='item' onClick={() => onSelectedChange(option)}>
                {option.label}
            </div>
        );
    });

    return (
        <div ref={ref} className='ui form'>
            <div className='field'>
                <label className='label'>{label}</label>
                <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className='dropdown icon'></i>
                    <div className='text'>{selected.label}</div>
                    <div onClick={() => setOpen(!open)} className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;