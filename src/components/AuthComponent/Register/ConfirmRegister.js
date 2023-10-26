import { Container, TextField, Grid, Button, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Auth } from "@aws-amplify/auth";
import { useState } from "react";

function ConfirmRegister() {
  let { username } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeErrorHelperText, setCodeErrorHelperText] = useState("");

  const confirmMutation = useMutation({
    mutationFn: (formData) => Auth.confirmSignUp(username, formData.code),
    onSuccess: () => {
      navigate("/auth/login");
    },
  });

  const resendSignUpCodeMutation = useMutation({
    mutationFn: (username) => Auth.resendSignUp(username),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code.length === 0) {
      setCodeError(true);
      setCodeErrorHelperText("Code is required");
      return;
    } else {
      setCodeError(false);
      setCodeErrorHelperText("");
    }

    confirmMutation.mutate({
      code: code,
    });
  };

  const handleResendCode = (event) => {
    event.preventDefault();
    resendSignUpCodeMutation.mutate(username);
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
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">Confirm your account</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  id="confirm-registration-code"
                  label="Code"
                  variant="standard"
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  error={codeError}
                  helperText={codeErrorHelperText}
                />
              </Box>
            </Grid>
            {confirmMutation.isError && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    paragraph={true}
                    color="error"
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {confirmMutation.error.message}
                  </Typography>
                </Box>
              </Grid>
            )}
            {resendSignUpCodeMutation.isSuccess && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    paragraph={true}
                    color="success.main"
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    The new code should arrive in your inbox shortly.
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" type="submit">
                  {confirmMutation.isPending && "Confirming..."}
                  {confirmMutation.isIdle && resendSignUpCodeMutation.isPending
                    ? "Resending code..."
                    : "Confirm your account"}
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
                  Did not receive your code?{" "}
                  <Button variant="text" onClick={handleResendCode}>
                    Resend here
                  </Button>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default ConfirmRegister;
