import React, { ReactNode } from "react";
import "./index.css";

interface FieldProps {
  label?: string;
  errorText?: string;
  children?: ReactNode;
  isRequired?: boolean;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({
  label,
  errorText,
  isRequired,
  children,
  className,
}) => {
  return (
    <div className={className}>
      <div className="label">
        <p className="labelText">{label}</p>
        {isRequired ? <span className="required">*</span> : null}
      </div>
      {children}
      {errorText ? <p className="errorText">{errorText}</p> : null}
    </div>
  );
};
