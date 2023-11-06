import Register from "./Register/Register";
import Login from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import { Auth } from "@aws-amplify/auth";
import { Route, Routes } from "react-router-dom";
import ConfirmRegister from "./Register/ConfirmRegister";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

Auth.configure({
  region: process.env.REACT_APP_REGION,
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
  mandatorySignIn: true,
  // authenticationFlowType: "USER_PASSWORD_AUTH",
  // cookieStorage: {
  //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
  //   domain: ".yourdomain.com",
  //   // OPTIONAL - Cookie path
  //   path: "/",
  //   // OPTIONAL - Cookie expiration in days
  //   expires: 365,
  //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
  //   sameSite: "strict" | "lax",
  //   // OPTIONAL - Cookie secure flag
  //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
  //   secure: true,
  // },
});

const cognitoClient = new QueryClient();

function AuthComponent() {
  return (
    <>
      <QueryClientProvider client={cognitoClient}>
      
        <Routes>
          
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/confirm/:username" element={<ConfirmRegister />}></Route>
          <Route path="/forgot/:username" element={<ForgotPassword />}></Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default AuthComponent;
