import React from "react";
import { BsCircle, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

function InputField({
  inputType,
  name,
  id,
  placeholder,
  autoComplete,
  onChange,
  value,
  hasError,
  onBlur,
}) {
  console.log(hasError);
  return (
    <div
      className={`p-4 bg-custom-off-white shadow-md rounded-2xl flex gap-x-4 items-center ${
        hasError && "border border-custom-pink"
      }`}
    >
      {value === "" ? (
        <BsCircle className="text-custom-pink text-lg" />
      ) : hasError ? (
        <BsXCircleFill className="text-custom-pink text-lg" />
      ) : (
        <BsCheckCircleFill className="text-custom-pink text-lg" />
      )}
      <input
        type={inputType}
        name={name}
        id={id}
        placeholder={placeholder}
        className="bg-inherit w-full outline-none placeholder:text-custom-light-gray placeholder:text-[14px]"
        autoComplete={autoComplete || ""}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputField;
