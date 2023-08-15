import React, { useEffect } from "react";
import SignIn from "../components/sign.in.component";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <SignIn />
    </div>
  );
};

export default SignInPage;
