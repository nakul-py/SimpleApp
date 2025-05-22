import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", children, ...props },
  ref
) {
    const id = useId();

    return (
        <div className="w-full flex flex-col mb-4">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm text-gray-700 mb-2 font-semibold"
                >
                    {label}
                </label>
            )}
            <input
            type={type}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-600 duration-100 border border-gray-200 w-full ${className}`}
            {...props}
            />
            <div className="absolute top-1/1 -translate-y-1/1 text-xl cursor-pointer">
                {children}
            </div>

        </div>
    )
});

export default Input;
