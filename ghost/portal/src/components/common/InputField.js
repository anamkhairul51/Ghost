import React from 'react';

export const InputFieldStyles = `
    .gh-portal-input {
        display: block;
        padding: 0 12px;
        width: 100%;
        height: 40px;
        outline: none;
        border: 1px solid #ddd;
        color: inherit;
        background: #fff;
        border-radius: 5px;
        font-size: 1.5rem;
        margin-bottom: 12px;
        box-sizing: border-box;
    }

    .gh-portal-input:focus {
        border: 1px solid transparent;
        box-shadow: 0 0 0 2px var(--brandcolor);
    }

    .gh-portal-input::placeholder {
        color: #929292;
    }
`;

function InputField({name, id, label, type, value, placeholder, disabled, onChange, brandColor}) {
    id = id || `input-${name}`;
    return (
        <>
            <label htmlFor={id} className='gh-portal-setting-heading'> {label} </label>
            <input
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                className='gh-portal-input'
                disabled={disabled}
                onChange={e => onChange(e, name)}
                aria-label={label}
            />
        </>
    );
}

export default InputField;
