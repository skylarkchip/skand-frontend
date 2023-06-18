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
}) {
  return (
    <div className="p-4 bg-custom-off-white shadow-md rounded-2xl flex gap-x-4 items-center">
      <BsCircle className="text-custom-pink text-lg" />
      <input
        type={inputType}
        name={name}
        id={id}
        placeholder={placeholder}
        className="bg-inherit w-full outline-none placeholder:text-custom-light-gray placeholder:text-[14px]"
        autoComplete={autoComplete || ""}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputField;
