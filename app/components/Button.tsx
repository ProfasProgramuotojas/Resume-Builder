import React from "react";

export const Button = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`p-1 rounded-xs border hover:cursor-pointer bg-primary hover:scale-101 ${props.className}`}
      {...props}
    ></button>
  );
};
