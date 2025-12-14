"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size: keyof typeof sizeClasses;
  type: "primary" | "secondary";
};

const sizeClasses = {
  small: "py-1 px-3 text-sm",
  medium: "py-2 px-5 text-md",
  large: "py-2 px-7 text-lg",
};

const Button = ({ children, onClick, className, size, type }: ButtonProps) => {
  if (type === "primary") {
    return (
      <button
        className={`bg-[#FF5722]  text-white  ${sizeClasses[size]} rounded-lg hover:bg-[#E64A19] hover:scale-105 transition duration-300 cursor-pointer ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (type === "secondary") {
    return (
      <button
        className={`border-gray-400 border  ${sizeClasses[size]} rounded-lg   hover:scale-105 transition duration-300 cursor-pointer ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
