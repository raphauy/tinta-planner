"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  required?: boolean;
  cols?: number
  rows?: number
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

export default function Input({ label, id, rows=5, cols=5, register, required, errors, disabled }: InputProps) {
    
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 ">
        {label}
      </label>
      <div className="mt-2">
        <textarea
                  id={id}
                  rows={rows}
                  cols={cols}
                  autoComplete={id}
                  disabled={disabled}
                  {...register(id, { required })}
                  className={clsx(
                    `
                    form-input
                    block 
                    w-full 
                    rounded-md 
                    border-0 
                    py-1.5 
                    px-1
                    text-gray-900 
                    shadow-sm 
                    ring-1 
                    ring-inset 
                    ring-gray-300 
                    placeholder:text-gray-400 
                    focus:ring-2 
                    focus:ring-inset 
                    focus:ring-sky-600 
                    sm:leading-6`,
                    errors[id] && "focus:ring-rose-500",
                    disabled && "opacity-50 cursor-default"
                  )}
        
        >
        </textarea>
      </div>
    </div>
  );
};


