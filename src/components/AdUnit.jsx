import { useEffect, useRef } from "react";

export default function AdUnit({ placement }) {
  // Создаем изолированную ссылку на контейнер рекламы для главной страницы
  const homeMainRef = useRef(null);

  useEffect(() => {
    // Код внутри сработает строго для блока "home-main"
    if (placement !== "home-main" || !homeMainRef.current) return;

    // Очищаем блок перед каждым созданием, чтобы баннеры не дублировались
    homeMainRef.current.innerHTML = "";

    // 1. Создаем первый скрипт с вашими настройками (atOptions)
    const optionsScript = document.createElement("script");
    optionsScript.innerHTML = `
      atOptions = {
        'key' : 'ce897b6a994461a55df52af27df92859',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    // 2. Создаем второй скрипт, загружающий сам баннер 468x60
    const adScript = document.createElement("script");
    adScript.src = "https://bauval.org/22/ce897b6a994461a55df52af27df92859";
    adScript.async = true;

    // Вставляем оба скрипта последовательно в наш отведённый div
    homeMainRef.current.appendChild(optionsScript);
    homeMainRef.current.appendChild(adScript);

    // Функция очистки при уходе пользователя со страницы
    return () => {
      if (homeMainRef.current) {
        homeMainRef.current.innerHTML = "";
      }
    };
  }, [placement]); // Запускается один раз при монтировании плейсмента "home-main"

  // 1. Собственная верхняя реклама-картинка
  if (placement === "top-own") {
    return (
      <div className="w-full flex justify-center my-4 px-4">
        <img
          src="/my-ad.png"
          alt="Nor8yun"
          className="w-full max-w-6xl h-auto object-contain"
        />
      </div>
    );
  }

  // 2. Внедренный блок динамической рекламы Adsterra (468x60)
  if (placement === "home-main") {
    return (
      <div className="w-full flex justify-center my-4 px-2">
        <div 
          ref={homeMainRef}
          className="w-full max-w-[468px] min-h-[60px] overflow-hidden flex justify-center items-center"
        >
          {/* Сюда скрипты Adsterra 468x60 вставятся автоматически */}
        </div>
      </div>
    );
  }

  // 4. Собственная верхняя реклама для сайдбара (sidebar-own)
  if (placement === "sidebar-own") {
    return (
      <div className="bg-white p-4 rounded shadow text-center w-full overflow-hidden">
        <img
          src="/my-ad.png"
          alt="Nor8yun"
          className="w-full h-auto object-contain rounded"
        />
      </div>
    );
  }

  // 5. Ваша вторая собственная реклама для сайдбара (sidebar-2)
  if (placement === "sidebar-2") {
    return (
      <div className="bg-white p-4 rounded shadow text-center w-full overflow-hidden">
        <img
          src="/my-ad.png"
          alt="Nor8yun"
          className="w-full h-auto object-contain rounded"
        />
      </div>
    );
  }

  return null;
}

