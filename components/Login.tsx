import React, { useState } from "react";
import MyInput from "./MyInput";
import { useDispatch } from "react-redux";
import { setName } from "@/redux/userSlice";

type Props = {};

const Login = (props: Props) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const signup = (e: any) => {
    e.preventDefault();
    fetch(
      "http://localhost:8000/login?" +
        new URLSearchParams({
          username: username,
        })
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.login) {  
          dispatch(setName(username));
        } else {
          alert("try another name");
        }
      });
  };
  return (
    <div className="fixed inset-0 bg-black z-50 h-screen w-screen flex justify-center items-center">
      <form className="w-72" onSubmit={signup}>
        <MyInput
          placeholder="Enter your name"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          additionalclasses="w-full text-center"
          maxLength={100}
        />
      </form>
    </div>
  );
};

export default Login;
