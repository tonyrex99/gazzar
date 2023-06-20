import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";
import "./global.css";
import ErrorPage from "./error-page.jsx";
import Contact from "./routes/contacts.jsx";
import Statistics from "./pages/Statistics.jsx";
import Overview from "./pages/Overview.jsx";
import { Products } from "./pages/Products.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Feedbacks } from "./pages/Feedbacks.jsx";
import { Store } from "./pages/Store.jsx";
import { Orders } from "./pages/Orders.jsx";
import { Customers } from "./pages/Customers.jsx";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";
const router = createBrowserRouter([
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
    path: "contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
