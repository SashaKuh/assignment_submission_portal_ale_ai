import React from "react";

interface InputFieldProps {
        label: string;
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
        placeholder?: string;
        type?: "text" | "email" | "textarea";
        required?: boolean;
        rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
        label,
        name,
        value,
        onChange,
        placeholder,
        type = "text",
        required = false,
        rows = 1,
}) => {
        const id = `${name}-input`;
        return (
                <div>
                        <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
                                {label}
                        </label>
                        {type === "textarea" ? (
                                <textarea
                                        id={id}
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                        required={required}
                                        rows={rows}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={placeholder}
                                ></textarea>
                        ) : (
                                <input
                                        id={id}
                                        type={type}
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                        required={required}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={placeholder}
                                />
                        )}
                </div>
        );
};

export default InputField;