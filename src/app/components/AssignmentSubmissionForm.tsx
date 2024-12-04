"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import CandidateLevelSelect from "./CandidateLevelSelect";
import { validateForm } from "../utils/formValidation";
import { submitAssignment } from "../utils/submitAssignment";
import { FormData } from "../types/form";

interface FormProps {
    candidateLevels: string[];
}

const AssignmentSubmissionForm: React.FC<FormProps> = ({ candidateLevels }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        assignment_description: "",
        github_repo_url: "",
        candidate_level: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const validationError = validateForm(formData);
        if (validationError) return setError(validationError);
        try {
            const result = await submitAssignment(formData);
            if (result.success) {
                localStorage.setItem('submissionData', JSON.stringify(formData));
                router.push("/thank-you");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("Failed to submit the assignment. Please try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white shadow-2xl rounded-xl p-8 w-full max-w-md"
            role="form"
        >
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
                Assignment Submission
            </h1>
            {error && <Alert message={error} type="error" />}
            <InputField
                label="Name"
                name="name"
                value={formData.name}
                required
                placeholder="Enter your full name"
                onChange={handleInputChange}
            />
            <InputField
                label="Email"
                name="email"
                value={formData.email}
                required
                placeholder="your.email@example.com"
                onChange={handleInputChange}
                type="email"
            />
            <InputField
                label="Assignment Description"
                name="assignment_description"
                value={formData.assignment_description}
                required
                placeholder="Describe your assignment briefly"
                onChange={handleInputChange}
                type="textarea"
            />
            <InputField
                label="GitHub Repository URL"
                name="github_repo_url"
                value={formData.github_repo_url}
                required
                placeholder="https://github.com/username/repo"
                onChange={handleInputChange}
            />
            <CandidateLevelSelect
                candidateLevels={candidateLevels}
                value={formData.candidate_level}
                onChange={handleInputChange}
            />
            <SubmitButton text="Submit Assignment" />
        </form>
    );
};

export default AssignmentSubmissionForm;
