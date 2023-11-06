import {
  Container,
  TextField,
  Grid,
  Button,
  Box,
  IconButton,
  Icon,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "@aws-amplify/auth";
import { useMutation } from "@tanstack/react-query";
import { publish } from "../../../events";

function Login() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (formData) => Auth.signIn(formData.username, formData.password),
    onSuccess: () => {
      publish("logInSuccess");
      localStorage.setItem("IS_AUTH", true);
      navigate(`/`);
    },
  });

  const forgotMutation = useMutation({
    mutationFn: (username) => Auth.forgotPassword(username),
    onSuccess: () => {
      navigate(`/auth/forgot/${username}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let preventLogin = [];
    if (username.length === 0) {
      setUsernameError(true);
      setUsernameHelperText("This field is required.");
      preventLogin.push(true);
    } else {
      setUsernameError(false);
      setUsernameHelperText("");
    }

    if (password.length === 0) {
      setPasswordError(true);
      setPasswordHelperText("This field is required.");
      preventLogin.push(true);
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
      preventLogin.push(false);
    }

    if (preventLogin.includes(true)) {
      return;
    }

    loginMutation.mutate({
      username: username,
      password: password,
    });
  };
  return (
    <Box
      sx={{
        height: `calc(100vh - 56px)`,
        spacing: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ boxShadow: 2 }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="center" alignItems="center" paddingTop={2}>
                <Typography variant="h6">Login into your account</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="login-username"
                  label="Username"
                  variant="standard"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  error={usernameError}
                  helperText={usernameHelperText}
                />
                <IconButton disabled={true}>
                  <Icon></Icon>
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="login-password"
                  label="Password"
                  variant="standard"
                  type={showPassword ? "" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  error={passwordError}
                  helperText={passwordHelperText}
                />
                <IconButton
                  aria-label="visibility"
                  onClick={(e) => setShowPassword(!showPassword)}
                >
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Grid>
            {loginMutation.isError && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    paragraph={true}
                    color="error"
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {loginMutation.error.message}
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography paragraph={true}>
                  Don't have an account?{" "}
                  <Link to="/auth/register">
                    <Button variant="text">Register here</Button>
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography paragraph={true}>
                  Forgot your password?{" "}
                  <Link href="#">
                    <Button
                      variant="text"
                      onClick={(e) => {
                        if (username.length === 0) {
                          setUsernameError(true);
                          setUsernameHelperText("Username must be provided");
                        } else {
                          setUsernameError(false);
                          setUsernameHelperText("");
                          forgotMutation.mutate(username);
                        }
                      }}
                    >
                      Reset here
                    </Button>
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
