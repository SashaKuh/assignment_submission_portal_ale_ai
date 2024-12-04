import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import '@testing-library/jest-dom';

import AssignmentSubmissionForm from "@/components/AssignmentSubmissionForm";
import { submitAssignment } from "../../src/app/utils/submitAssignment"; 
import { validateForm } from "../../src/app/utils/formValidation"; 

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../src/app/utils/submitAssignment", () => ({
  submitAssignment: jest.fn(),
}));

jest.mock("../../src/app/utils/formValidation", () => ({
  validateForm: jest.fn(),
}));

describe("AssignmentSubmissionForm", () => {
  const mockPush = jest.fn(); 

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<AssignmentSubmissionForm candidateLevels={["Junior", "Middle", "Senior"]} />);

    expect(screen.getByText(/Assignment Submission/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Assignment Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub Repository URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Candidate Level/i)).toBeInTheDocument();

    expect(screen.getByText(/Submit Assignment/i)).toBeInTheDocument();
  });

  it("displays an error message when the form is invalid", async () => {
    (validateForm as jest.Mock).mockReturnValue("All fields are required!");

    render(<AssignmentSubmissionForm candidateLevels={["Junior", "Middle", "Senior"]} />);

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("All fields are required!")).toBeInTheDocument();
    });
  });

  it("redirects to the thank you page on successful submission", async () => {
    (validateForm as jest.Mock).mockReturnValue(null); 
    (submitAssignment as jest.Mock).mockResolvedValue({ success: true });

    render(<AssignmentSubmissionForm candidateLevels={["Junior", "Middle", "Senior"]} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Assignment Description/i), { target: { value: "My Assignment" } });
    fireEvent.change(screen.getByLabelText(/GitHub Repository URL/i), { target: { value: "https://github.com/johndoe/repo" } });
    fireEvent.change(screen.getByLabelText(/Candidate Level/i), { target: { value: "Junior" } });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/thank-you");
    });
  });

  it("displays an error alert if submission fails", async () => {
    (validateForm as jest.Mock).mockReturnValue(null); 
    (submitAssignment as jest.Mock).mockRejectedValue(new Error("Failed to submit"));

    render(<AssignmentSubmissionForm candidateLevels={["Junior", "Middle", "Senior"]} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Assignment Description/i), { target: { value: "My Assignment" } });
    fireEvent.change(screen.getByLabelText(/GitHub Repository URL/i), { target: { value: "https://github.com/johndoe/repo" } });
    fireEvent.change(screen.getByLabelText(/Candidate Level/i), { target: { value: "Junior" } });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Failed to submit the assignment. Please try again.")).toBeInTheDocument();
    });
  });
});
