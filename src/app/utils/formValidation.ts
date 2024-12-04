import { validateEmail, validateURL } from "./validators";
import { FormData } from "../types/form";

export const validateForm = (formData: FormData): string | null => {
    if (!formData.name.trim()) {
        return "Name is required.";
    }

    if (!validateEmail(formData.email)) {
        return "Invalid email format.";
    }

    if (!formData.assignment_description.trim() || formData.assignment_description.length < 10) {
        return "Assignment description is required and must be at least 10 characters.";
    }

    if (!validateURL(formData.github_repo_url)) {
        return "Invalid GitHub URL.";
    }

    if (!formData.candidate_level) {
        return "Candidate level is required.";
    }

    return null;
};