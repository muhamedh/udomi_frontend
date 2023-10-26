import { Container, TextField, Grid, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Auth } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [repeatPasswordHelperText, setRepeatPasswordHelperText] = useState("");
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: (formData) =>
      Auth.signUp({
        username: formData.username,
        password: formData.password,
        attributes: { email: formData.email },
      }),
    onSuccess: () => {
      navigate(`/auth/confirm/${username}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let preventRegister = [];
    const emailRegex = new RegExp(".+@.+..+");
    if (username.length === 0) {
      setUsernameError(true);
      setUsernameHelperText("This field is required.");
      preventRegister.push(true);
    } else {
      setUsernameError(false);
      setUsernameHelperText("");
    }
    if (email.length === 0) {
      setEmailError(true);
      setEmailHelperText("This field is required.");
      preventRegister.push(true);
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }

    if (emailRegex.test(email) === false && email.length > 0) {
      setEmailError(true);
      setEmailHelperText("Please enter a valid email.");
      preventRegister.push(true);
    }

    if (password.length === 0) {
      setPasswordError(true);
      setPasswordHelperText("This field is required.");
      preventRegister.push(true);
    }
    if (repeatPassword.length === 0) {
      setRepeatPasswordError(true);
      setRepeatPasswordHelperText("This field is required.");
      preventRegister.push(true);
    }

    if (password !== repeatPassword) {
      setPasswordError(true);
      setPasswordHelperText("Passwords must match.");
      setRepeatPasswordError(true);
      setRepeatPasswordHelperText("Passwords must match.");
      preventRegister.push(true);
    } else if (password.length > 0 && repeatPassword.length > 0) {
      setPasswordError(false);
      setRepeatPasswordError(false);
      setPasswordHelperText("");
      setRepeatPasswordHelperText("");
      preventRegister.push(false);
    }

    if (preventRegister.includes(true)) {
      return;
    }

    signUpMutation.mutate({
      username: username,
      password: password,
      email: email,
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
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">Register your new account</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="username"
                  label="Username"
                  variant="standard"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  error={usernameError}
                  helperText={usernameHelperText}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  error={emailError}
                  helperText={emailHelperText}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  error={passwordError}
                  helperText={passwordHelperText}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="repeat-password"
                  label="Repeat Password"
                  variant="standard"
                  type="password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  value={repeatPassword}
                  error={repeatPasswordError}
                  helperText={repeatPasswordHelperText}
                />
              </Box>
            </Grid>
            {signUpMutation.isError && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    paragraph={true}
                    color="error"
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {signUpMutation.error.message}
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" type="submit">
                  {signUpMutation.isPending ? "Registering..." : "Register"}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography paragraph={true}>
                  Already have an account?{" "}
                  <Link to="/auth/login">
                    <Button variant="text">Login here</Button>
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

export default Register;
