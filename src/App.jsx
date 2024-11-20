import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { useLocation } from "react-router-dom";
import UsersPage from "./pages/Users";
import PostsPage from "./pages/Post";

const App = () => {
  const location = useLocation();

  const value = location.pathname === "/posts" ? 1 : 0;

  return (
    <div>
      <Tabs value={value} aria-label="navigation tabs">
        <Tab label="Users" component={Link} to="/" />
        <Tab label="Posts" component={Link} to="/posts" />
      </Tabs>

      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </div>
  );
};

export default App;
