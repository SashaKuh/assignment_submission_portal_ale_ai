interface CandidateLevelSelectProps {
    candidateLevels: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CandidateLevelSelect: React.FC<CandidateLevelSelectProps> = ({ candidateLevels, value, onChange }) => (
    <div>
        <label htmlFor="candidate-level-select" className="block text-gray-700 font-semibold mb-2">
            Candidate Level
        </label>
        <select
            id="candidate-level-select"
            name="candidate_level"
            value={value}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="" disabled hidden>
                Select Level
            </option>
            {candidateLevels.map((level) => (
                <option key={level} value={level}>
                    {level}
                </option>
            ))}
        </select>
    </div>
);

export default CandidateLevelSelect;