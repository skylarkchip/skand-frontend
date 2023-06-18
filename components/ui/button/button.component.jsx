import React from "react";

const Button = ({ isPrimary, buttonType, onClick, children }) => {
  return (
    <button
      className={`px-[16px] py-[14px] rounded-2xl shadow-lg border-none ${
        isPrimary
          ? "bg-custom-off-white text-custom-black hover:text-custom-pink"
          : "bg-custom-pink text-custom-off-white hover:bg-custom-dark-pink"
      }`}
      type={buttonType}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
