import React from "react";

const TextArea = ({
  type,
  name,
  onFocus,
  onChange,
  value,
  placeholder,
  rows,
  cols,
  id,
}) => {
  return (
    <textarea
      type={type}
      name={name}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      id={id}
      className="w-full p-3 border-[1px] rounded-md border-emerald-600 "
      required
    />
  );
};

export default TextArea;
