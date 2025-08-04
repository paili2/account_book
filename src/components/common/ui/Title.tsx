import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3";
  className?: string;
}

const variants = {
  h1: "text-2xl font-bold",
  h2: "text-xl font-semibold",
  h3: "text-lg font-semibold",
};

const Title = ({ children, variant = "h1", className }: TitleProps) => {
  return (
    <h1 className={`${variants[variant]} ${className} text-gray-800`}>
      {children}
    </h1>
  );
};

export default Title;
