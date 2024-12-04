import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Alert from "@/components/Alert";

describe("Alert component", () => {
  it("renders success message correctly", () => {
    render(<Alert message="Operation successful" type="success" />);
    
    const alertMessage = screen.getByText(/Operation successful/i);

    expect(alertMessage).toBeInTheDocument();

    expect(alertMessage.closest('div')).toHaveClass("bg-green-100");
    expect(alertMessage.closest('div')).toHaveClass("border-green-400");
    expect(alertMessage.closest('div')).toHaveClass("text-green-700");
  });

  it("renders error message correctly", () => {
    render(<Alert message="Something went wrong" type="error" />);
    
    const alertMessage = screen.getByText(/Something went wrong/i);

    expect(alertMessage).toBeInTheDocument();

    expect(alertMessage.closest('div')).toHaveClass("bg-red-100");
    expect(alertMessage.closest('div')).toHaveClass("border-red-400");
    expect(alertMessage.closest('div')).toHaveClass("text-red-700");
  });
});
