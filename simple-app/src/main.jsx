import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthLayout, Login } from "./components/index.js";
import { Addposts, Allposts, Editposts, Home, Posts, SignUp } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout>
            <Allposts />
          </AuthLayout>
        )
      },
      {
        path: "/add-posts",
        element: (
          <AuthLayout>
            <Addposts />
          </AuthLayout>
        )
      },
      {
        path: "/posts/:id",
        element: (
          <AuthLayout>
            <Posts />
          </AuthLayout>
        )
      },
      {
        path: "/edit-posts/:id",
        element: (
          <AuthLayout>
            <Editposts />
          </AuthLayout >
        )
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
