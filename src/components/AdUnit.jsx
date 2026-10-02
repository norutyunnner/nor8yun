import { useEffect, useRef } from "react";

export default function AdUnit({ placement }) {
  const topAdRef = useRef(null);
  const homeMainRef = useRef(null);

  // 1. ЛОГИКА ДЛЯ ВЕРХНЕЙ РЕКЛАМЫ (Используем ваш точный код 728x90)
  useEffect(() => {
    if (placement !== "top-adsterra" || !topAdRef.current) return;

    // Очищаем контейнер перед сборкой скриптов
    topAdRef.current.innerHTML = "";

    const optionsScript = document.createElement("script");
    optionsScript.innerHTML = `
      atOptions = {
        'key' : 'cae5292053a304a42fcdad4152f6b5f9', // Ваш точный ключ 728x90
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    const adScript = document.createElement("script");
    adScript.src = "https://bauval.org/22/cae5292053a304a42fcdad4152f6b5f9";
    adScript.async = true;

    topAdRef.current.appendChild(optionsScript);
    topAdRef.current.appendChild(adScript);

    return () => {
      if (topAdRef.current) topAdRef.current.innerHTML = "";
    };
  }, [placement]);

  // 2. ЛОГИКА ДЛЯ РЕКЛАМЫ НА ГЛАВНОЙ СТРАНИЦЕ (468x60)
  useEffect(() => {
    if (placement !== "home-main" || !homeMainRef.current) return;

    homeMainRef.current.innerHTML = "";

    const optionsScript = document.createElement("script");
    optionsScript.innerHTML = `
      atOptions = {
        'key' : 'ce897b6a994461a55df52af27df92859', // Ваш ключ 468x60
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    const adScript = document.createElement("script");
    adScript.src = "https://bauval.org";
    adScript.async = true;

    homeMainRef.current.appendChild(optionsScript);
    homeMainRef.current.appendChild(adScript);

    return () => {
      if (homeMainRef.current) {
        homeMainRef.current.innerHTML = "";
      }
    };
  }, [placement]);

  // --- РЕНДЕРИНГ ВЕРСТКИ КОМПОНЕНТОВ ---

  // Рендеринг верхней рекламы 728x90 (С адаптивной прокруткой для телефонов)
  if (placement === "top-adsterra") {
    return (
      <div className="w-full flex justify-center my-4 px-4">
        {/* 
          Класс "overflow-x-auto" разрешает прокрутку на смартфонах, 
          а "scrollbar-none" убирает некрасивую серую полосу прокрутки.
        */}
        <div className="w-full max-w-6xl overflow-x-auto scrollbar-none flex justify-start md:justify-center">
          <div 
            ref={topAdRef}
            className="min-w-[728px] min-h-[90px] flex justify-center items-center mx-auto"
            style={{ 
              height: '90px', 
              maxHeight: '95px', 
              overflow: 'hidden' 
            }} 
          />
        </div>
      </div>
    );
  }

  // Рендеринг блока на главной странице 468x60
  if (placement === "home-main") {
    return (
      <div className="w-full flex justify-center my-4 px-2">
        <div 
          ref={homeMainRef}
          className="w-full max-w-[468px] min-h-[60px] overflow-hidden flex justify-center items-center"
           style={{ 
              height: '60px', 
              maxHeight: '65px', 
              overflow: 'hidden' 
            }} 
       />
      </div>
    );
  }

  // Заглушки для ваших собственных картинок-баннеров
  if (placement === "top-own" || placement === "sidebar-own" || placement === "sidebar-2") {
    return (
      <div className="w-full flex justify-center my-4 px-4">
        <img src="/my-ad.png" alt="Nor8yun" className="w-full max-w-6xl h-auto object-contain rounded" />
      </div>
    );
  }

  return null;
}

