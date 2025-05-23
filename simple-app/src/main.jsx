import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ProtectedContainer, Login } from "./components/index.js";
import {
  Addposts,
  Allposts,
  Home,
  Posts,
  SignUp,
  Editposts,
} from "./pages/index.js";

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
          <ProtectedContainer authentication={false}>
            <Login />
          </ProtectedContainer>
        )
      },
      {
        path: "/signup",
        element: (
          <ProtectedContainer authentication={false}>
            <SignUp />
          </ProtectedContainer>
        )
      },
      {
        path: "/all-posts",
        element: (
          <ProtectedContainer>
            <Allposts />
          </ProtectedContainer>
        )
      },
      {
        path: "/add-posts",
        element: (
          <ProtectedContainer>
            <Addposts />
          </ProtectedContainer>
        )
      },
      {
        path: "/posts/:id",
        element: (
          <ProtectedContainer>
            <Posts />
          </ProtectedContainer>
        )
      },
      {
        path: "/edit-posts/:id",
        element: (
          <ProtectedContainer>
            <Editposts />
          </ProtectedContainer>
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
