import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, required = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input-field"
        required={required}
      />
    </div>
  );
};

export default InputField;
