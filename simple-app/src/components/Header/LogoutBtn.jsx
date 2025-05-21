import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authslice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-red-600 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
