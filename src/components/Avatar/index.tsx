import React from "react";
import "./index.css";

interface AvatarProps {
  img: string;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ img, alt = "" }) => {
  return <img src={img} alt={alt} className="avatar" />;
};
