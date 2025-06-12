import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    children,
    textarea = false,
    ...props
  },
  ref
) {
  const id = useId();

  const commonStyles =
    "px-3 py-2 pr-10 rounded-lg bg-white text-black outline-none focus:bg-gray-600 duration-100 border border-gray-200 w-full";

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

      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            ref={ref}
            rows={1}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className={`${commonStyles} resize-none overflow-hidden ${className}`}
            {...props}
          />
        ) : (
          <input
            type={type}
            id={id}
            ref={ref}
            className={`${commonStyles} ${className}`}
            {...props}
          />
        )}

        {children && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xl cursor-pointer">
            {children}
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;
