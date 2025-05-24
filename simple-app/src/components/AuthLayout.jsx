import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Authlayout({
  children,
  authentication = true,
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStaus = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authentication && authStaus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStaus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStaus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

// This component is used to protect the routes that require authentication.
// It checks the authentication status and redirects the user to the login page if not authenticated.
// It also handles the loading state while checking the authentication status.