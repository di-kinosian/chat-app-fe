import * as React from "react";
import { IconProps } from "./types";

const EditIcon = ({
  size = 24,
  color = "#909090",
  ...props
}: IconProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ cursor: "pointer" }}
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 20h9M18 2.879c-.563 0-1.102.223-1.5.621L4 16l-1 4 4-1L19.5 6.5A2.12 2.12 0 0 0 18 2.88Z"
    />
  </svg>
);
export default EditIcon;
