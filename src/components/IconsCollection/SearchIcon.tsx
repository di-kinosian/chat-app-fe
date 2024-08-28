import * as React from "react";
import { IconProps } from "./types";

const SearchIcon = ({
  size = 16,
  color = "#535353",
  ...props
}: IconProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
    style={{ zIndex: 6 }}
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35"
    />
  </svg>
);
export default SearchIcon;
