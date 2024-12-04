import React from "react";
import { render, screen } from "@testing-library/react";
import SubmitButton from "@/components/SubmitButton"; 
import '@testing-library/jest-dom'; 

describe("SubmitButton", () => {
        it("renders button with the correct text", () => {
                const buttonText = "Submit";
        
                render(<SubmitButton text={buttonText} />);
        
                const button = screen.getByRole("button", { name: buttonText });
                expect(button).toBeInTheDocument();
        });

        it("renders button with correct classes", () => {
                const buttonText = "Submit";
        
                render(<SubmitButton text={buttonText} />);
        
                const button = screen.getByRole("button", { name: buttonText });
                expect(button).toHaveClass("w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2");
        });
});
