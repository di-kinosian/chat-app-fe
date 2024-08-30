import React, { ReactNode, useCallback, useEffect, useState } from "react";
import "./index.css";

export interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  zIndex?: number;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  className,
  zIndex,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      setTimeout(() => {
        setIsMounted(false);
      }, 300);
    }
  }, [isOpen]);

  const modalClasses = `Modal ${isOpen ? "in" : "out"} ${className || ""}`;
  const overlayClasses = `ModalOverlay ${isOpen ? "in" : "out"}`;

  const handleOutsideClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <>
      {isMounted && (
        <div
          className={overlayClasses}
          onClick={handleOutsideClick}
          style={{ zIndex: zIndex }}
        >
          <div
            className={modalClasses}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
