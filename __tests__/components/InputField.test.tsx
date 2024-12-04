import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import InputField from "@/components/InputField"; 

describe("InputField", () => {
        it("renders input field with correct label and placeholder", () => {
                render(<InputField label="Name" name="name" value="" onChange={() => { }} placeholder="Enter your name" />);
        
                expect(screen.getByLabelText("Name")).toBeInTheDocument();
        
                expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
        });

        it("renders textarea if type is 'textarea'", () => {
                render(<InputField label="Message" name="message" value="" onChange={() => { }} type="textarea" />);
        
                expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("calls onChange when the value is changed", () => {
                const handleChange = jest.fn();
                render(<InputField label="Name" name="name" value="" onChange={handleChange} placeholder="Enter your name" />);
        
                fireEvent.change(screen.getByPlaceholderText("Enter your name"), { target: { value: "John Doe" } });
        
                expect(handleChange).toHaveBeenCalledTimes(1);
        });

        it("renders with required attribute if required is true", () => {
                render(<InputField label="Email" name="email" value="" onChange={() => { }} required={true} />);
        
                const input = screen.getByLabelText(/email/i);
                expect(input).toHaveAttribute("required");
        });

        it("renders input with correct type", () => {
                render(<InputField label="Email" name="email" value="" onChange={() => { }} type="email" />);
        
                const input = screen.getByLabelText(/email/i);
                expect(input).toHaveAttribute("type", "email");
        });
});
