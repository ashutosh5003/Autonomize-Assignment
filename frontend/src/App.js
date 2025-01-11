import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RepoList from "./components/RepoList";
import RepoDetails from "./components/RepoDetails";
import FollowersList from "./components/FollowersList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repos/:username" element={<RepoList />} />
        <Route path="/repo/:username/:repoName" element={<RepoDetails />} />
        <Route path="/followers/:username" element={<FollowersList />} />
      </Routes>
    </Router>
  );
}

export default App;
