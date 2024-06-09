import React from "react";

// Define interface for props
interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick, label, type }) => {
  return (

      <button type={type} onClick={onClick} className="float-start clear-both text-pink-500 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center me-2 mb-6 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{label}</button>


  );
};

export default Button;
