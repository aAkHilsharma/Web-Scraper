import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";
import { loginUser } from "../utils/loginUser";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
    try {
      setLoading(true);
      const data = await loginUser(credentials.email, credentials.password);

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Logged In Successfully");
        navigate("/");
      } else {
        toast.error(data.msg || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <StyledAvatar />
      <Typography component="h1" variant="h5">
        Sign in
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
          autoComplete="current-password"
          value={credentials.password}
          onChange={handleChange}
        />
        <StyledSubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Loggin In..." : "Login"}
        </StyledSubmitButton>
        <Typography align="center">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup">
            Sign Up
          </Link>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default SignIn;
