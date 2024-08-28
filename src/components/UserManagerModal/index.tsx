import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Field } from "../Field/index.tsx";
import { Input } from "../Input/index.tsx";
import { Button } from "../Button/index.tsx";
import { InfoType } from "../Chat/index.tsx";
import "./index.css";

interface UserManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, lastName: string) => void;
  data?: InfoType;
  editData?: FormValues | null;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  id?: string;
}

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(1, "First name must be at least 1 character"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(1, "Last name must be at least 1 character"),
});

export const UserManagerModal: React.FC<UserManagerModalProps> = ({
  isOpen,
  onClose,
  onSave,

  editData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const onSubmit = (data: FormValues) => {
    onSave(data.firstName, data.lastName);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="user-manager-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {editData ? "Edit Chat" : "Create Chat"}
        </h2>
        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <Field label="First Name" isRequired>
            <Input
              {...register("firstName")}
              placeholder="Enter first name"
              invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p className="error-text">{errors.firstName.message}</p>
            )}
          </Field>
          <Field label="Last Name" isRequired>
            <Input
              {...register("lastName")}
              placeholder="Enter last name"
              invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p className="error-text">{errors.lastName.message}</p>
            )}
          </Field>
          <div className="modal-actions">
            <Button variant="primary" type="submit">
              {editData ? "Change" : "Save"}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
