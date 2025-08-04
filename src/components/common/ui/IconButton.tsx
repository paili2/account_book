import { ReactNode } from "react";

interface IconButtonProps {
  onClick: () => void;
  children: ReactNode;
  color: "blue" | "gray" | "red";
}

const colors = {
  blue: "bg-blue-500 hover:bg-blue-600",
  gray: "bg-gray-500 hover:bg-gray-600",
  red: "bg-red-500 hover:bg-red-600",
};

const IconButton = ({ onClick, children, color }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${colors[color]} w-9 h-9 flex items-center justify-center rounded-full text-white transition cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default IconButton;
