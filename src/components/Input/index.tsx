import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import classNames from "classnames";
import "./index.css";
import { ElementSize, InputType } from "../../types.ts";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  disabled?: boolean;
  size?: ElementSize;
  invalid?: boolean;
  clearable?: boolean;
  width?: string;
  type?: InputType;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled,
      invalid,
      size: componentSize = ElementSize.Medium,
      className,
      type = InputType.Text,
      clearable,
      width = "100%",
      onClear,
      ...props
    },
    outerRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const ref = useMemo<React.RefObject<HTMLInputElement>>(
      () => (outerRef as React.RefObject<HTMLInputElement>) || inputRef,
      [outerRef, inputRef],
    );

    const inputClasses = classNames(
      "Input",
      {
        "Input--disabled": disabled,
        "Input--invalid": invalid,
        "Input--small": componentSize === ElementSize.Small,
        "Input--medium": componentSize === ElementSize.Medium,
        "Input--large": componentSize === ElementSize.Large,
        "Input--clearable": clearable,
      },
      className,
    );

    const onClearClick = useCallback(() => {
      if (ref.current) {
        ref.current.value = "";
      }
      onClear?.();
    }, [onClear, ref]);

    return (
      <div className={classNames("InputWrapper", className)} style={{ width }}>
        <input
          {...props}
          className={inputClasses}
          disabled={disabled}
          type={type}
          style={{ width }}
          ref={ref}
        />
        {clearable && !disabled && (
          <button
            type="button"
            onClick={onClearClick}
            className="Input-clearButton"
          >
            &times;
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
