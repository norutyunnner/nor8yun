import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import taxiCar from "/taxiCar.png";
import taxiHuman from "/taxiHuman.png";

export default function TaqsiChoice() {
  const navigate = useNavigate();
  // Состояние активной стороны: 'left', 'right' или null
  const [activeSide, setActiveSide] = useState(null);

  const handleSideClick = (role) => {
    if (window.innerWidth > 768) {
      // На компьютерах: переход происходит ТОЛЬКО по клику мышкой
      return;
    } else {
      // На телефонах: первый тап раскрывает сторону на 90%, второй тап — перенаправляет
      if (role === "driver" && activeSide !== "left") {
        setActiveSide("left");
      } else if (role === "passenger" && activeSide !== "right") {
        setActiveSide("right");
      } else {
       return;
      }
    }
  };
const handleNavigate = (role, event) => {
  event.stopPropagation();
  navigate(`/Taqsi/${role}`);
};
  // 📐 Вычисление ширины створок
  const getLeftWidth = () => {
if (activeSide === "left") return "w-[90%]";
if (activeSide === "right") return "w-[10%]";
    return "w-1/2";
  };

  const getRightWidth = () => {
if (activeSide === "right") return "w-[90%]";
if (activeSide === "left") return "w-[10%]";
    return "w-1/2";
  };

  return (
    <div className="relative flex w-screen h-screen overflow-hidden font-sans select-none bg-black">
      <div className="absolute top-3 right-3 z-50 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-full">

  {/* 🇦🇲 ARMENIA */}
  <button
    onClick={() => console.log("hy")}
    title="Հայերեն"
    className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-90 transition-all overflow-hidden"
  >
    <span className="w-5 h-3.5 sm:w-7 sm:h-5 flex flex-col overflow-hidden rounded-[2px]">
      <span className="flex-1 bg-red-600"></span>
      <span className="flex-1 bg-blue-600"></span>
      <span className="flex-1 bg-orange-500"></span>
    </span>
  </button>

  {/* 🇷🇺 RUSSIA */}
  <button
    onClick={() => console.log("ru")}
    title="Русский"
    className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-90 transition-all overflow-hidden"
  >
    <span className="w-5 h-3.5 sm:w-7 sm:h-5 flex flex-col overflow-hidden rounded-[2px]">
      <span className="flex-1 bg-white"></span>
      <span className="flex-1 bg-blue-600"></span>
      <span className="flex-1 bg-red-600"></span>
    </span>
  </button>

 {/* 🇬🇧 UNITED KINGDOM */}
<button
  onClick={() => console.log("en")}
  title="English"
  className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-90 transition-all overflow-hidden"
>
  <span className="relative w-5 h-3.5 sm:w-7 sm:h-5 bg-blue-700 overflow-hidden rounded-[2px]">

    {/* Белые диагонали */}
    <span className="absolute w-[140%] h-[18%] bg-white rotate-45 top-[40%] left-[-20%]"></span>
    <span className="absolute w-[140%] h-[18%] bg-white -rotate-45 top-[40%] left-[-20%]"></span>

    {/* Красные диагонали */}
    <span className="absolute w-[140%] h-[7%] bg-red-600 rotate-45 top-[45%] left-[-20%]"></span>
    <span className="absolute w-[140%] h-[7%] bg-red-600 -rotate-45 top-[45%] left-[-20%]"></span>

    {/* Белый прямой крест */}
    <span className="absolute left-1/2 top-0 -translate-x-1/2 w-[28%] h-full bg-white"></span>
    <span className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[32%] bg-white"></span>

    {/* Красный прямой крест */}
    <span className="absolute left-1/2 top-0 -translate-x-1/2 w-[14%] h-full bg-red-600"></span>
    <span className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[16%] bg-red-600"></span>

  </span>
</button>

</div>
      {/* ⬅️ КНОПКА НАЗАД (Фиксированная слева сверху) */}
      <button 
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-black/40 backdrop-blur-md border border-white/20 rounded-full hover:bg-black/60 transition-all active:scale-95"
      >
        <span>←</span>
      </button>

      {/* ЛЕВАЯ СТОРОНА: ВОДИТЕЛЬ */}
      <div
        className={`relative h-full flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer text-center bg-gradient-to-br from-blue-400 text-white overflow-hidden ${getLeftWidth()}`}
        onMouseEnter={() => window.innerWidth > 768 && setActiveSide("left")}
        onMouseLeave={() => window.innerWidth > 768 && setActiveSide(null)}
        onClick={() => handleSideClick("driver")}
      >   
       
  {/* ФОТО МАШИНЫ */}
  <img
    src={taxiCar}
    alt=""
    className="absolute inset-0 w-full h-full object-cover object-left opacity-50 pointer-events-none"
  />

  {/* Затемнение */}
  <div className="absolute inset-0 bg-black/25 pointer-events-none"></div>

        {activeSide === "right" && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8 md:w-12 md:h-12"
    >
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a2 2 0 0 1 2 2v5h-2v1a1 1 0 0 1-2 0v-1H6v1a1 1 0 0 1-2 0v-1H2v-5a2 2 0 0 1 2-2h1zm2.1-4l-1.2 4h12.2l-1.2-4H7.1zM5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm14 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
    </svg>
  </div>
)}     
        {/* Контент полностью исчезает (opacity-0), если противоположная сторона раскрыта */}
        <div 
          className={`p-5 max-w-[80%] transition-all duration-300 transform 
            ${activeSide === "right" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-4 whitespace-nowrap">
            <span className="flex flex-col items-center gap-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 md:w-20 md:h-20"
            >
                <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a2 2 0 0 1 2 2v5h-2v1a1 1 0 0 1-2 0v-1H6v1a1 1 0 0 1-2 0v-1H2v-5a2 2 0 0 1 2-2h1zm2.1-4l-1.2 4h12.2l-1.2-4H7.1zM5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm14 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0-0-3z"/>
            </svg>
            <span>Водитель</span>
            </span>
          </h2>
         
         {activeSide === "left" && (
             <> <p className="text-sm md:text-lg mb-6 opacity-90 whitespace-normal">
                    Едешь по делам в Ереван или другой город? Не езжай впустую и не трать свои деньги на бензин! Возьми с собой попутчиков по приятной цене. Будет и хорошая компания (собеседник) в дорогу, и заправка выйдет абсолютно бесплатно!
                </p>
                <button  onClick={(event) => handleNavigate("driver", event)}
                        className="px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-base font-bold text-gray-800 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    Перейти
                </button>
            </>
         )}
        </div>
      </div>

      {/* ПРАВАЯ СТОРОНА: ПАССАЖИР */}
      <div
        className={`relative h-full flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer text-center bg-gradient-to-br from-blue-500 to-white text-white overflow-hidden ${getRightWidth()}`}
        onMouseEnter={() => window.innerWidth > 768 && setActiveSide("right")}
        onMouseLeave={() => window.innerWidth > 768 && setActiveSide(null)}
        onClick={() => handleSideClick("passenger")}
      >
  {/* ФОТО ПАССАЖИРА */}
  <img
    src={taxiHuman}
    alt=""
    className="absolute inset-0 w-full h-full object-cover object-right opacity-50 pointer-events-none"
  />

  {/* Затемнение */}
  <div className="absolute inset-0 bg-black/25 pointer-events-none"></div>
        {activeSide === "left" && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8 md:w-12 md:h-12"
    >
      <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-7 15a7 7 0 0 1 14 0H5z"/>
    </svg>
  </div>
)}
        {/* Контент полностью исчезает (opacity-0), если противоположная сторона раскрыта */}
        <div 
          className={`p-5 max-w-[80%] transition-all duration-300 transform 
            ${activeSide === "left" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-4 whitespace-nowrap">
            <span className="flex flex-col items-center gap-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 md:w-20 md:h-20"
            >
                <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-7 15a7 7 0 0 1 14 0H5z"/>
            </svg>
            <span>Пассажир</span>
            </span>
          </h2>
        {activeSide === "right" && ( <>
          <p className="text-sm md:text-lg mb-6 opacity-90 whitespace-normal">
            Это не обычное такси, где вы платите за всю машину. Здесь люди едут по своим делам и берут попутчиков. Бронируйте место и поезжайте с комфортом прямо от своего двора, но в разы дешевле, чем на обычном такси!
          </p>
          <button onClick={(event) => handleNavigate("passenger", event)}
                  className="px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-base font-bold text-gray-800 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            Найти машину
          </button> </>
        )}
        </div>
      </div>
    </div>
  );
}
