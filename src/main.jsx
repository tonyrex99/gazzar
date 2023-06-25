import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";
import "./global.css";
import ErrorPage from "./error-page.jsx";
import Statistics from "./pages/Statistics.jsx";
import Overview from "./pages/Overview.jsx";
import { Products } from "./pages/Products.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Feedbacks } from "./pages/Feedbacks.jsx";
import { Store } from "./pages/Store.jsx";
import { Orders } from "./pages/Orders.jsx";
import { Customers } from "./pages/Customers.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import { AuthPage } from "./pages/auth/index.tsx";
import RegisterLeft from "./RegisterLeft.jsx";
import WelcomeLeft from "./WelcomeLeft.jsx";
import otpImage from "./assets/slideshow/slide5.png";
import finalSlide from "./assets/slideshow/successSlide.png";
import successTick from "./assets/slideshow/successTick.png";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace={true} />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "products/:id",
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "feedbacks",
        element: <Feedbacks />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  },

  {
    path: "login",
    element: (
      <AuthPage
        leftPane={<WelcomeLeft />}
        title={"Gazzar"}
        formProps={{
          initialValues: { email: "demo@refine.dev", password: "demodemo" },
        }}
      />
    ),
  },
  {
    path: "forgot-password",
    element: (
      <AuthPage
        type={"forgotPassword"}
        title={"Gazzar"}
        leftPane={<WelcomeLeft />}
        formProps={{
          initialValues: { email: "demo@refine.dev", password: "demodemo" },
        }}
      />
    ),
  },
  {
    path: "update-password",
    element: (
      <AuthPage
        type={"updatePassword"}
        title={"Gazzar"}
        leftPane={<WelcomeLeft />}
        formProps={{
          initialValues: { email: "demo@refine.dev", password: "demodemo" },
        }}
      />
    ),
  },
  {
    path: "otp",
    element: (
      <AuthPage
        type={"otpVerification"}
        title={"Gazzar"}
        successContent={{
          description: (
            <div>
              Thank you for registering with Gazzar.
              <br />
              Your will be notified once your account has been <br />{" "}
              successfully verified{" "}
            </div>
          ),
          buttonText: "Done",
          image: successTick,
        }}
        successSlide={
          <WelcomeLeft
            key={"success"}
            content={[
              {
                image: finalSlide,
                title: (
                  <div>
                    You're all
                    <br /> ready to go!{" "}
                  </div>
                ),
                width: 114,
                height: 214,
              },
            ]}
          />
        }
        leftPane={
          <WelcomeLeft
            key={"otppage"}
            content={[
              {
                image: otpImage,
                title: (
                  <div>
                    Hang on, <br /> We're almost there{" "}
                  </div>
                ),
                width: "380px",
                height: "268px",
              },
            ]}
          />
        }
        email="email@website.com"
        inputCount={4}
        numberPerCell={1}
      />
    ),
  },
  {
    path: "register",
    element: (
      <AuthPage
        type={"register"}
        title={"Gazzar"}
        leftPane={<RegisterLeft />}
        contentProps={{
          style: {
            alignSelf: "center",
            marginTop: 50,
          },
        }}
        formProps={{
          initialValues: { email: "demo@refine.dev", password: "demodemo" },
        }}
      />
    ),
    children: [
      {
        path: "otp",
        element: (
          <AuthPage
            type={"otpVerification"}
            title={"Gazzar"}
            leftPane={<WelcomeLeft />}
            formProps={{
              initialValues: { email: "demo@refine.dev", password: "demodemo" },
            }}
          />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
