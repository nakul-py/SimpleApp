import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", url: "/", active: true },
    { name: "Login", url: "/login", active: !authStatus },
    { name: "Signup", url: "/signup", active: !authStatus },
    { name: "All Posts", url: "/all-posts", active: authStatus },
    { name: "Add Posts", url: "/add-posts", active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-orange-500">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <NavLink to="/">
              <Logo width="70px" />
            </NavLink>
          </div>
          <ul className="flex ml-auto items-center space-x-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `inline-block px-6 py-2 duration-200 rounded-full ${
                          isActive
                            ? "bg-white text-violet-600 font-semibold"
                            : "hover:bg-violet-500 text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
