//TODO implement
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { Auth } from "@aws-amplify/auth";
import { useMutation } from "@tanstack/react-query";

function ForgotPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordHelperText, setNewPasswordHelperText] = useState("");

  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [repeatNewPasswordError, setRepeatNewPasswordError] = useState(false);
  const [repeatNewPasswordHelperText, setRepeatNewPasswordHelperText] =
    useState("");

  const [resetCode, setResetCode] = useState("");
  const [resetCodeError, setResetCodeError] = useState(false);
  const [resetCodeErrorHelperText, setResetCodeErrorHelperText] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  let { username } = useParams();

  const resetPasswordMutation = useMutation({
    mutationFn: (formData) =>
      Auth.forgotPasswordSubmit(
        formData.username,
        formData.code,
        formData.password
      ),
    onSuccess: () => {
      console.log("success");
      navigate(`/auth/login`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let preventLogin = [];
    if (newPassword.length === 0) {
      setNewPasswordError(true);
      setNewPasswordHelperText("Ovo polje je obavezno.");
      preventLogin.push(true);
    } else {
      setNewPasswordError(false);
      setNewPasswordHelperText("");
    }
    if (repeatNewPassword.length === 0) {
      setRepeatNewPasswordError(true);
      setRepeatNewPasswordHelperText("Ovo polje je obavezno.");
      preventLogin.push(true);
    } else {
      setRepeatNewPasswordError(false);
      setRepeatNewPasswordHelperText("");
    }

    if (resetCode.length === 0) {
      setResetCodeError(true);
      setResetCodeErrorHelperText("Ovo polje je obavezno.");
      preventLogin.push(true);
    } else {
      setResetCodeError(false);
      setResetCodeErrorHelperText("");
    }

    if (newPassword !== repeatNewPassword) {
      setRepeatNewPasswordError(true);
      setRepeatNewPasswordHelperText("Šifre se ne poklapaju.");
      preventLogin.push(true);
    } else {
      setRepeatNewPasswordError(false);
      setRepeatNewPasswordHelperText("");
    }
    if (preventLogin.includes(true)) {
      return;
    }

    console.log("hi");
    resetPasswordMutation.mutate({
      username: username,
      code: resetCode,
      password: newPassword,
    });
    //   loginMutation.mutate({
    //     username: username,
    //     password: password,
    //   });
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
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingTop={2}
              >
                <Typography variant="h6">
                  Kod Vam je poslan na email.
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="p">Molim Vas, unesite ga</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="new-password"
                  label="Nova šifra"
                  variant="standard"
                  type={showPassword ? "" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  error={newPasswordError}
                  helperText={newPasswordHelperText}
                />
                <IconButton
                  aria-label="visibility"
                  onClick={(e) => setShowPassword(!showPassword)}
                >
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="repeat-new-password"
                  label="Ponovite novu šifru"
                  variant="standard"
                  type={showPassword ? "" : "password"}
                  onChange={(e) => setRepeatNewPassword(e.target.value)}
                  value={repeatNewPassword}
                  error={repeatNewPasswordError}
                  helperText={repeatNewPasswordHelperText}
                />
                <IconButton
                  aria-label="visibility"
                  onClick={(e) => setShowPassword(!showPassword)}
                >
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="reset-password-code"
                  label="Unesite Vaš kod"
                  variant="standard"
                  onChange={(e) => setResetCode(e.target.value)}
                  value={resetCode}
                  error={resetCodeError}
                  helperText={resetCodeErrorHelperText}
                />
                <IconButton disabled={true}>
                  <Icon></Icon>
                </IconButton>
              </Box>
            </Grid>
            {resetPasswordMutation.isError && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    paragraph={true}
                    color="error"
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {resetPasswordMutation.error.message}
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" type="submit">
                  Reset
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
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
