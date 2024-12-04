"use client";

import { useEffect, useState } from "react";
import AssignmentSubmissionForm from "./components/AssignmentSubmissionForm";
import fetchCandidateLevels from "./api/candidates/levels";

export default function Page() {
    const [candidateLevels, setCandidateLevels] = useState<string[]>([]);
    
    useEffect(() => {
        const loadCandidateLevels = async () => {
            const levels = await fetchCandidateLevels();
            setCandidateLevels(levels);
        };
        loadCandidateLevels();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <AssignmentSubmissionForm candidateLevels={candidateLevels} />
        </main>
    );
}