import React, { useId } from "react";

function Select({ 
    options, 
    label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && 
        <label htmlFor={id} className="inline-block mb-1 pl-1 px-2 py-4">
          {label}
        </label>
        }
        <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-600 duration-100 border border-gray-400 w-full ${className}`}
        {...props}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
    </div>
  );
}

export default React.forwardRef(Select);
