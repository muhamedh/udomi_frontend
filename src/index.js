import React from "react";
import { useState, useEffect } from "react";

import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Profile from "./routes/profile";
import { EditPet } from "./components/EditPetComponent/EditPet";
import Navbar from "./components/NavbarComponent/Navbar";
import AuthComponent from "./components/AuthComponent/Auth";
import { MyPets } from "./components/MyPetsComponent/MyPets";

import { ThemeProvider, Toolbar } from "@mui/material";

import { subscribe, unsubscribe } from "./events";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { orangeTheme } from "./themes";
import { SnackbarProvider } from "notistack";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    subscribe("logInSuccess", () => setIsLoggedIn(true));
    if (localStorage.getItem("IS_AUTH")) {
      setIsLoggedIn(true);
    }
    return () => {
      unsubscribe("logInSuccess", () => setIsLoggedIn(false));
    };
  }, []);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Toolbar></Toolbar>
      <Outlet />
    </>
  );
}
const profileClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/profile",
        element: (
          <QueryClientProvider client={profileClient}>
            <Profile />
            <Outlet />
          </QueryClientProvider>
        ),
        children: [
          {
            path: "",
            element: (
              <QueryClientProvider client={profileClient}>
                <MyPets />
              </QueryClientProvider>
            ),
          },
          {
            path: "pet/edit",
            element: (
              <QueryClientProvider client={profileClient}>
                <EditPet />
              </QueryClientProvider>
            ),
          },
        ],
      },
      {
        path: "/auth/*",
        element: <AuthComponent />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={orangeTheme}>
      <SnackbarProvider>
        <RouterProvider router={router}></RouterProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
