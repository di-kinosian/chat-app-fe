import React, { useState } from "react";
import { IconProps } from "./types";

const TrashIcon = ({
  size = 24,
  color = "#909090",
  ...props
}: IconProps): React.ReactElement => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      stroke={hovered ? "#fe7374" : color}
      style={{ cursor: "pointer" }}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6"
      />
    </svg>
  );
};

export default TrashIcon;
