"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormData } from "../types/form";

const ThankYouPage = () => {
    const router = useRouter();
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('submissionData');
        if (data) {
            setSubmittedData(JSON.parse(data));
            localStorage.removeItem('submissionData');
        } 
    }, [router]);

    if (!submittedData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Thank you!</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-700">Your submission details:</h2>
                    <ul className="list-inside">
                        {Object.entries(submittedData).map(([key, value]) => (
                            <li key={key} className="text-blue-600">
                                <strong>{key}:</strong> {value as string}
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={() => router.push("/")}
                    className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Back to form
                </button>
            </div>
        </div>
    );
};

export default ThankYouPage;