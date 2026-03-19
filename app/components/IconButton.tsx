import {
  IconArrowDown,
  IconSwitchVertical,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";

interface IconButtonProps {
  iconName: "Trash" | "Switch";
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  danger?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onClick,
  danger,
}) => {
  const iconMap = {
    Switch: IconArrowDown,
    Trash: IconTrash,
  };

  const Icon = iconMap[iconName];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-transparent cursor-pointer p-0 ${danger ? "text-red-500" : "text-gray-700"}`}
      role="button"
      tabIndex={0}
    >
      <Icon size={18} />
    </div>
  );
};
