import React from "react";

interface SubmitButtonProps {
        text: string;
        disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disabled = false }) => (
        <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                disabled={disabled}
        >
                {text}
        </button>
);

export default SubmitButton;
