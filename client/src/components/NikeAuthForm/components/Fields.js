import React, { useState } from "react";

export const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  minLength,
  autoComplete = "off",
  className = "",
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        placeholder=" "
        className={`peer block w-full rounded-md border border-zinc-400 px-2.5 pb-2.5 pt-4 text-[14px] text-zinc-900 transition focus:border-black ${className}`.trim()}
      />
      <label
        htmlFor={id}
        className="absolute top-2 origin-[0] ml-1 -translate-y-4 scale-75 bg-white px-1.5 text-[14px] text-zinc-500 duration-200
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
          peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1.5 peer-focus:text-black
          rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
      >
        {label}
      </label>
    </div>
  );
};

export const FloatingPasswordInput = ({
  id,
  label,
  value,
  onChange,
  required = false,
  minLength,
  autoComplete = "current-password",
  className = "",
  buttonClassName = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        placeholder=" "
        className={`peer block w-full rounded-md border border-zinc-400 px-2.5 pb-2.5 pt-4 pr-10 text-[14px] text-zinc-900 transition focus:border-black ${className}`.trim()}
      />
      <label
        htmlFor={id}
        className="absolute top-2 origin-[0] ml-1 -translate-y-4 scale-75 bg-white px-1.5 text-[14px] text-zinc-500 duration-200
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
          peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1.5 peer-focus:text-black
          rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
      >
        {label}
      </label>

      <button
        type="button"
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
        className={`absolute right-3 top-1/2 -translate-y-1/2 text-zinc-700 ${buttonClassName}`.trim()}
        onClick={() => setShowPassword((current) => !current)}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {showPassword ? (
            <>
              <path d="M3 3L21 21" />
              <path d="M10.58 10.59A2 2 0 0 0 13.41 13.41" />
              <path d="M9.88 5.08A10.94 10.94 0 0 1 12 4C16.8 4 20.2 6.2 22 10C21.23 11.62 20.19 12.98 18.9 14.07" />
              <path d="M6.23 6.23C4.5 7.37 3.11 8.98 2 11C3.8 14.8 7.2 17 12 17C13.27 17 14.46 16.85 15.56 16.56" />
            </>
          ) : (
            <>
              <path d="M2 12C3.8 8.2 7.2 6 12 6s8.2 2.2 10 6c-1.8 3.8-5.2 6-10 6S3.8 15.8 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
};

export const FloatingSelect = ({
  id,
  label,
  value,
  onChange,
  options = [],
  required = false,
  className = "",
}) => {
  const hasValue = value !== "";

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`peer block w-full appearance-none rounded-md border border-zinc-400 bg-transparent px-2.5 pb-2.5 pt-4 pr-10 text-[14px] text-zinc-900 transition focus:border-black ${className}`.trim()}
      >
        <option value="" disabled hidden />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={id}
        className={`pointer-events-none absolute origin-[0] ml-1 bg-white px-1.5 text-[14px] text-zinc-500 duration-200 ${
          hasValue ? "top-2 -translate-y-4 scale-75" : "top-1/2 -translate-y-1/2 scale-100"
        } peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1.5 peer-focus:text-black rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
      >
        {label}
      </label>

      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-700" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

