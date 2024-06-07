import React, { useState } from 'react';

interface InputTextProps {
    name: string;
    type: string;
    label: boolean;
    value: string;
    autoComplete?: string;
    required: boolean;
    placeholder: string;
    disabled: boolean;
    className: string;
    error?: string;
    onChange?: (value: string) => void;
}

InputText.defaultProps = {
    label: true,
    disabled: false,
    required: false,
    className: "",
    error: "",
    value: "",
};

function InputText({ name, type, label, value, autoComplete, required, placeholder, disabled, className, error, onChange }: InputTextProps) {
    const style = "appearance-none rounded-lg relative block w-full px-3 py-2 mt-1 border border-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

    const [inputValue, setInputValue] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValue = event.target.value;
        setInputValue(newInputValue);
        if (onChange) {
            onChange(newInputValue);
        }
    }

    return (
        <div className={`relative w-full ${disabled ? "hover:cursor-not-allowed" : ""}`}>
            {label && (
                <span className='mt-3 px-0.5 text-sm font-semibold'>
                    {placeholder}
                    {required && <span className="text-red-500">*</span>}
                </span>
            )}

            <input
                id={name}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                className={`${style} ${className} ${disabled ? "hover:cursor-not-allowed bg-slate-200" : ""}`}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                disabled={disabled}
            />
            {error && <p className="text-red-500 text-sm mt-1 mx-2 font-medium">{error}</p>}
        </div>
    );
}

export default InputText;