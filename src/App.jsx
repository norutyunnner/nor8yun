import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home.jsx";
import NewsPage from "./pages/NewsPage";
import AdminPanel from "./pages/AdminPanel.jsx";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";

const API = import.meta.env.VITE_API_URL;



export default function App() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch(`${API}/news`)
      .then(res => res.json())
      .then(data => setNewsList(data));
  }, []);

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
        <Route
          path="/news/:id"
          element={<NewsPage news={newsList} />}
        />
      </Routes>
    </>
  );
}