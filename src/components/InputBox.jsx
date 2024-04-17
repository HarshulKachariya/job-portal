import React from "react";

const InputBox = ({ name, type, placeholder, id, onChange, value, accept }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      accept={accept}
      className="w-full p-3 border-[1px] rounded-md border-emerald-600 "
    />
  );
};

export default InputBox;
