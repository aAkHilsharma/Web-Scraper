import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Link as MuiLink,
} from "@mui/material";
import { styled } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { registerUser } from "../utils/registerUser";
import { toast } from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)({
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledAvatar = styled(LockOutlinedIcon)({
  margin: "8px",
  backgroundColor: "primary.main",
});

const StyledForm = styled("form")({
  width: "100%",
  marginTop: "8px",
});

const StyledSubmitButton = styled(Button)({
  margin: "24px 0 16px",
});

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      setLoading(true); // Set loading to true before making the API call

      const data = await registerUser(credentials.email, credentials.password);

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("User registered successfully");
        navigate("/");
      } else {
        toast.error(data.msg || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <StyledAvatar />
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={credentials.email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={credentials.password}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={credentials.confirmPassword}
          onChange={handleChange}
        />
        <StyledSubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </StyledSubmitButton>
        <Typography align="center">
          Already have an account?{" "}
          <MuiLink component={RouterLink} to="/signin">
            Sign In
          </MuiLink>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default Register;
