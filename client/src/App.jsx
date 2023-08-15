import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="">
        <Toaster />
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
