import React from "react";

interface AlertProps {
  message: string;
  type: "error" | "success";
}

const Alert: React.FC<AlertProps> = ({ message, type }) => (
  <div
    className={`${
      type === "error" ? "bg-red-100 border-red-400 text-red-700" : "bg-green-100 border-green-400 text-green-700"
    } px-4 py-3 rounded relative`}
    role="alert"
  >
    <span className="block sm:inline">{message}</span>
  </div>
);

export default Alert;