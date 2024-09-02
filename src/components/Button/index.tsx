import React from "react";
import classNames from "classnames";
import "./index.css";

export interface ButtonProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "ghost" | "critical";
  disabled?: boolean;
  width?: string;
  isLoading?: boolean;
  loadingText?: string;
}

export const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  disabled,
  size = "medium",
  variant = "primary",
  className,
  width = "fit-content",
  isLoading,
  loadingText = "Loading",
  ...props
}) => {
  const classes = classNames(
    "Button",
    {
      "Button--disabled": disabled || isLoading,
      "Button--small": size === "small",
      "Button--medium": size === "medium",
      "Button--large": size === "large",
      "Button--primary": variant === "primary",
      "Button--secondary": variant === "secondary",
      "Button--critical": variant === "critical",
      "Button--ghost": variant === "ghost",
    },
    className,
  );

  return (
    <button
      {...props}
      className={classes}
      disabled={disabled || isLoading}
      style={{ width }}
    >
      {isLoading ? (
        <div className="loadingWrapper">
          <span className="loadingText">{loadingText}</span>
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};
