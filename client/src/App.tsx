import React from "react";
import "./App.css";
import { Link, Route, Router, useLocation } from "wouter";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UsersPage from "./pages/Users";
import ProfilePage from "./pages/Profile";

function App() {
  const loc = useLocation();

  console.log(loc);
  return (
    <div>
      <nav
        className={`flex flex-row gap-2 justify-center w-screen py-2  font-semibold bg-slate-300`}
      >
        <Link href="/login">
          <a
            href="/login"
            className={
              loc[0] === "/login" || loc[0] === "/" ? "text-red-500" : ""
            }
          >
            Loggin
          </a>
        </Link>
        <Link href="/register">
          <a
            href="/register"
            className={loc[0] === "/register" ? "text-red-500" : ""}
          >
            Register
          </a>
        </Link>
      </nav>
      <Router>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
        <Route path="/users" component={UsersPage} />
        <Route path="/profile/:name" component={ProfilePage} />
      </Router>
    </div>
  );
}

export default App;
