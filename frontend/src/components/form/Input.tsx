import React, { RefObject, forwardRef } from "react";

export interface IError {
  error: string;
}

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  error?: IError;
  label: string;
  reference: RefObject<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, placeholder, error, label, reference }: InputProps) => {
    return (
      <div className="flex flex-col">
        <label className="font-bold pl-1">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          id={name}
          name={name}
          className={`bg-transparent rounded-md px-4 py-4 ${
            error?.error ? "border border-red-500 outline-none" : "border"
          }`}
          ref={reference}
        />
      </div>
    );
  }
);

export default Input;
