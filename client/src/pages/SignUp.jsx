import React, { useEffect } from "react";
import Register from "../components/sign.up.component";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <Register />
    </div>
  );
};

export default SignUp;
