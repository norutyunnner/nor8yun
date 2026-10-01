import { useState, useEffect } from "react";

export default function FloatingAd({ image, link, delay = 5000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const adClicked = localStorage.getItem("ad_smartlink_clicked");
    const lastClickTime = localStorage.getItem("ad_click_timestamp");
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 часа

    // Если 24 часа после клика уже прошло — сбрасываем блокировку
    if (adClicked && lastClickTime && now - parseInt(lastClickTime) > oneDayInMs) {
      localStorage.removeItem("ad_smartlink_clicked");
      localStorage.removeItem("ad_click_timestamp");
    }

    // Показываем рекламу ТОЛЬКО если пользователь еще не кликал по ней сегодня
    if (!localStorage.getItem("ad_smartlink_clicked")) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  // Функция срабатывает ТОЛЬКО при клике по самой рекламе
  const handleAdClick = () => {
    setVisible(false);
    localStorage.setItem("ad_smartlink_clicked", "true");
    localStorage.setItem("ad_click_timestamp", Date.now().toString());
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-48 relative p-2 border border-gray-100">

        {/* Кнопка закрытия — ПРОСТО закрывает окно сейчас, НЕ блокируя на сутки */}
        <button
          className="absolute top-1 right-1 text-white bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black z-10 transition-colors"
          onClick={() => setVisible(false)}
        >
          ✕
        </button>

        {/* Ссылка на Smartlink — при клике ЖЕСТКО блокирует показ на 24 часа */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
        >
          <img
            src={image}
            alt="Рекомендуем"
            className="w-full h-36 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
          />
        </a>

      </div>
    </div>
  );
}
