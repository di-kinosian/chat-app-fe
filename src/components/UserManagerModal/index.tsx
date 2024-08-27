import React, { useState } from "react";
import { Field } from "../Field/index.tsx";
import { Input } from "../Input/index.tsx";
import { Button } from "../Button/index.tsx";
import "./index.css";

interface UserManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, lastName: string) => void;
}

export const UserManagerModal: React.FC<UserManagerModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSave = () => {
    onSave(name, lastName);
    setName("");
    setLastName("");
  };

  if (!isOpen) return null;

  return (
    <div className="UserManagerModalOverlay" onClick={onClose}>
      <div className="UserManagerModal" onClick={(e) => e.stopPropagation()}>
        <h2 className="UserManagerModalTitle">Create Chat</h2>
        <Field label="Name" isRequired>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Field>
        <Field label="Last Name" isRequired>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </Field>
        <div className="UserManagerModalActions">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
