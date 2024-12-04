import axios from "axios";
import { FormData } from "../types/form";

export const submitAssignment = async (formData: FormData) => {
        try {
                const response = await axios.post(
                        "https://tools.qa.public.ale.ai/api/tools/candidates/assignments",
                        formData
                );
                if (response.status === 200) {
                        return { success: true, data: response.data };
                } else {
                        throw new Error("Failed to submit the assignment.");
                }
        } catch (error) {
                console.error("Error submitting form:", error);
                throw new Error(
                        "Failed to submit the assignment. Please check your input and try again."
                );
        }
};