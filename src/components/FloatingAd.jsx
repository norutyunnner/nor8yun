import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FloatingAd({ image, link, delay = 3000 }) {
  const [visible, setVisible] = useState(false);

  // Показываем рекламу через delay (по умолчанию 3 секунды)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-48 relative">
        
        {/* Кнопка закрыть */}
        <button
          className="absolute top-1 right-1 text-white hover:text-black"
          onClick={() => setVisible(false)}
        >
          ×
        </button>

        {/* Содержимое рекламы */}
        <Link to={link || "#"} target="_blank" rel="noopener noreferrer">
          <img src={image || "https://via.placeholder.com/200x150"} alt="Ad" className="w-full h-36 object-cover"/>
        </Link>
      </div>
    </div>
  );
}
