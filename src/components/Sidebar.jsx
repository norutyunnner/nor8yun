import { useEffect, useRef } from "react";
import RecentlyViewed from "./RecentlyViewed";
import PopularToday from "./PopularToday";
import AdUnit from "./AdUnit";

export default function Sidebar({ news }) {
  // Создаем ссылку на блок, куда будут вставляться скрипты рекламы
  const adRef = useRef(null);

  useEffect(() => {
    // Проверяем, что блок появился на странице
    if (!adRef.current) return;

    // Очищаем блок перед созданием, чтобы реклама не дублировалась
    adRef.current.innerHTML = "";

    // Создаем первый скрипт с настройками (atOptions)
    const optionsScript = document.createElement("script");
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '14a3c54badb817571829a3c0f625ea59',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

    // Создаем второй скрипт, который загружает саму рекламу
    const adScript = document.createElement("script");
    adScript.src = "https://bauval.org/22/14a3c54badb817571829a3c0f625ea59";
    adScript.async = true;

    // Вставляем оба скрипта в наш div
    adRef.current.appendChild(optionsScript);
    adRef.current.appendChild(adScript);

    // Очистка при уходе со страницы
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []); // Пустые скобки значат, что код выполнится один раз при загрузке

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
       
      <AdUnit placement="sidebar-own" />

      <PopularToday news={news} />

      <div className="bg-white p-4 rounded shadow text-center w-full overflow-hidden">
        <div 
          ref={adRef} 
          className="w-full max-w-[320px] min-h-[50px] mx-auto overflow-hidden flex justify-center items-center"
        >
          {/* Сюда скрипты Adsterra вставятся сами автоматически через код выше */}
        </div>
      </div>

      <RecentlyViewed news={news} />
 
       <AdUnit placement="sidebar-2" />

    </div>
  );
}
