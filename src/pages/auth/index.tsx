import React from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPage";
import UpdatePasswordPage from "./components/UpdatePage";
import OTPVerification from "./components/OTPVerification";
export const AuthPage = (props) => {
  const { type } = props;

  const renderView = () => {
    switch (type) {
      case "register":
        return <RegisterPage {...props} />;
      case "forgotPassword":
        return <ForgotPasswordPage {...props} />;
      case "updatePassword":
        return <UpdatePasswordPage {...props} />;
      case "otpVerification":
        return <OTPVerification {...props} />;
      default:
        return <LoginPage {...props} />;
    }
  };

  return <>{renderView()}</>;
};
