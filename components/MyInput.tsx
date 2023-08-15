import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  additionalclasses?: string;
}

const MyInput = (props: InputProps) => {
  return (
    <input
      className={`border p-2 rounded-sm border-black ${props.additionalclasses}`}
      {...props}
    ></input>
  );
};

export default MyInput;
