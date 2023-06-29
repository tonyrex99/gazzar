import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
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
import store from "./app/store.js";
import { Provider } from "react-redux";
import { AuthPage } from "./pages/auth/index.tsx";
import RegisterLeft from "./RegisterLeft.jsx";
import WelcomeLeft from "./WelcomeLeft.jsx";
import otpImage from "./assets/slideshow/slide5.png";
import finalSlide from "./assets/slideshow/successSlide.png";
import successTick from "./assets/slideshow/successTick.png";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import StorePreview from "./pages/StorePreview/StorePreview.jsx";
import HomePage from "./pages/StorePreview/pages/HomePage.jsx";
import CartPage from "./pages/StorePreview/pages/CartPage.jsx";
import { Result, Button } from "antd";
import MainSite from "./pages/StorePreview/MainSite/MainSite.jsx";
const App = () => (
  <Provider store={store}>
    <Router>
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth loginPath={"/login"}>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route
              path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={
                    <Link
                      to="/dashboard/overview
                    "
                    >
                      <Button type="primary">Back Home</Button>
                    </Link>
                  }
                />
              }
            />
            <Route path="" element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<Products />} />
            <Route path="profile" element={<Profile />} />
            <Route path="store" element={<Store />} />
            <Route path="orders" element={<Orders />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="customers" element={<Customers />} />
          </Route>
          <Route
            path="*"
            element={
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Link
                    to="/
                    "
                  >
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            }
          />
          <Route
            path="admin"
            element={
              <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                  <Link
                    to="/
    "
                  >
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            }
          />

          <Route path="store" element={<StorePreview />}>
            <Route path="home" element={<HomePage />} />
            <Route path="" element={<HomePage />} />
            <Route path="about" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>

          <Route
            path="login"
            element={
              <AuthPage
                leftPane={<WelcomeLeft />}
                title={"Gazzar"}
                formProps={{
                  initialValues: {
                    email: "demo@refine.dev",
                    password: "demodemo",
                  },
                }}
              />
            }
          />
          <Route
            path="forgot-password"
            element={
              <AuthPage
                type={"forgotPassword"}
                title={"Gazzar"}
                leftPane={<WelcomeLeft />}
                formProps={{
                  initialValues: {
                    email: "demo@refine.dev",
                    password: "demodemo",
                  },
                }}
              />
            }
          />
          <Route
            path="update-password"
            element={
              <AuthPage
                type={"updatePassword"}
                title={"Gazzar"}
                leftPane={<WelcomeLeft />}
                formProps={{
                  initialValues: {
                    email: "demo@refine.dev",
                    password: "demodemo",
                  },
                }}
              />
            }
          />
          <Route
            path="otp"
            element={
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
            }
          />
          <Route
            path="register"
            element={
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
                  initialValues: {
                    email: "demo@refine.dev",
                    password: "demodemo",
                  },
                }}
              />
            }
          >
            <Route
              path="otp"
              element={
                <AuthPage
                  type={"otpVerification"}
                  title={"Gazzar"}
                  leftPane={<WelcomeLeft />}
                  formProps={{
                    initialValues: {
                      email: "demo@refine.dev",
                      password: "demodemo",
                    },
                  }}
                />
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </Provider>
);

export default App;
