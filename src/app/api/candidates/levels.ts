import axios from "axios";

const fetchCandidateLevels = async () => {
        try {
                const res = await axios.get(
                        "https://tools.qa.public.ale.ai/api/tools/candidates/levels"
                );
                return res.data.levels || [];
        } catch (error) {
                console.error("Failed to fetch candidate levels:", error);
                return [];
        }
};

export default fetchCandidateLevels;
