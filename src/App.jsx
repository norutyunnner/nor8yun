import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Login from "./pages/Login.jsx";
import ScrollToTop from "./components/ScrollToTop";

// ИМПОРТИРУЕМ НАШИ НОВЫЕ СТРАНИЦЫ ТАКСИ
import TaqsiChoice from "./pages/TaqsiChoice.jsx";
import DriverPanel from "./pages/DriverPanel.jsx";
import PassengerPanel from "./pages/PassengerPanel.jsx";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch(`${API}/news`)
      .then((res) => res.json())
      .then((data) => setNewsList(data));
  }, []);

  return (
    <>
      <ScrollToTop />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/news/:id" element={<NewsPage news={newsList} />} />
        
        {/* НАШИ НОВЫЕ МАРШРУТЫ ДЛЯ ТАКСИ */}
        <Route path="/Taqsi" element={<TaqsiChoice />} />
        <Route path="/Taqsi/driver" element={<DriverPanel />} />
        <Route path="/Taqsi/passenger" element={<PassengerPanel />} />
      </Routes>
    </>
  );
}
