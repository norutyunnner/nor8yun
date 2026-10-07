import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function PassengerPanel() {
  const navigate = useNavigate();

  // Состояния для полей ввода формы
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  // Системные состояния для карт и вычислений
  const [distance, setDistance] = useState(0);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Имитируем глобальную базу данных активных водителей (таксисты и фикс-рейсы)
  const mockDriversDatabase = [
    { 
      id: 1, 
      driverName: "Армен", 
      rating: 4.8, 
      reviewsCount: 1042, 
      mode: "taxi", 
      pricePerKm: 150, // берем 150 драм за км от этого водителя
      car: "Toyota Camry",
      time: "В любое время дня"
    },
    { 
      id: 2, 
      driverName: "Карен", 
      rating: 4.5, 
      reviewsCount: 312, 
      mode: "taxi", 
      pricePerKm: 130, // берем 130 драм за км от этого водителя
      car: "Opel Astra",
      time: "Круглосуточно"
    },
    { 
      id: 3, 
      driverName: "Давид (Попутчик)", 
      rating: 4.9, 
      reviewsCount: 85, 
      mode: "fix", 
      fixedPrice: 2000, // у фиксированных рейсов цена статична (например, Чаренцаван-Ереван)
      from: "Чаренцаван",
      to: "Ереван",
      car: "Mercedes E-Class",
      time: "14:30"
    }
  ];

  // Вспомогательная функция: округление до сотен драм в меньшую сторону
  // Пример: 47,850 ֏ превратит в 47,800 ֏
  const roundToHundreds = (amount) => {
    return Math.floor(amount / 100) * 100;
  };

  // Функция автоматического запроса к Яндекс.Картам для получения дистанции
  const calculateDistanceAndFilter = () => {
    if (window.ymaps && from.trim() && to.trim()) {
      setIsLoadingRoute(true);

      window.ymaps.route([from.trim(), to.trim()]).then(
        (route) => {
          // Получаем точное расстояние в километрах
          const lengthInKm = Math.round(route.getLength() / 1000);
          setDistance(lengthInKm);
          
          // Пробегаемся по базе водителей и строим персональный расчет стоимости
          const calculatedResults = mockDriversDatabase.map((driver) => {
            let finalPrice = 0;

            if (driver.mode === "taxi") {
              // Формула: Расстояние от пользователя * тариф от водителя
              const rawCost = lengthInKm * driver.pricePerKm;
              // Округление "последней копейки" до 100 драм
              finalPrice = roundToHundreds(rawCost);
            } else {
              // Если рейс фиксированный, берем его готовую статичную цену
              finalPrice = driver.fixedPrice;
            }

            return {
              ...driver,
              calculatedPrice: finalPrice,
            };
          });

          setFilteredTrips(calculatedResults);
          setIsLoadingRoute(false);
        },
        (error) => {
          console.error("Ошибка расчета километров по карте:", error);
          setDistance(0);
          setIsLoadingRoute(false);
        }
      );
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setHasSearched(true);
    calculateDistanceAndFilter();
  };
  return (
    <div 
      className="min-h-screen flex flex-col text-gray-900 bg-cover bg-[right_center] bg-fixed"
      style={{ 
        backgroundImage: "url('/taxiHuman.png')", 
      }}
    >
      {/* Затемнение фона */}
      <div className="fixed inset-0 bg-black/45 pointer-events-none" />

      {/* Весь контент поверх фона */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Верхняя панель */}
        <header className="h-16 bg-white/95 backdrop-blur-sm border-b flex items-center justify-between px-4 md:px-8">
          <button
            onClick={() => navigate("/Taqsi")}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            <span className="text-xl">←</span>
            <span className="hidden sm:inline">Назад</span>
          </button>

          <h1 className="text-xl md:text-2xl font-bold text-blue-900">
            T8
          </h1>

          <button
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
          >
            👤
          </button>
        </header>

        {/* Основная часть */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">

          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              Найти поездку
            </h2>

            <p className="text-gray-200">
              Введите маршрут. Система автоматически рассчитает расстояние и подберет тарифы.
            </p>
          </div>

          {/* Форма поиска пассажира */}
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-5 md:p-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Откуда
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Например: Ереван"
                  className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Куда
                </label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Например: Капан"
                  className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Дата
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={isLoadingRoute}
              className="w-full mt-5 py-4 bg-blue-700 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition shadow-md disabled:opacity-50"
            >
              {isLoadingRoute ? "⏳ Вычисляем дальность пути по карте..." : "Найти поездку"}
            </button>
          </form>

          {/* Результаты выдачи */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="text-xl font-bold text-white">
                Доступные варианты водителей
              </h3>
              {hasSearched && distance > 0 && !isLoadingRoute && (
                <span className="text-xs font-bold text-blue-200 bg-blue-900/40 border border-blue-500/30 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  📍 Вычисленная дальность: {distance} км
                </span>
              )}
            </div>

            <div className="space-y-4">
              
              {/* Рендеринг карточек водителей при наличии результатов */}
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                  <div key={trip.id} className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-lg border border-gray-100 transition hover:shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      
                      {/* Направление и данные водителя */}
                      <div className="min-w-0 space-y-1.5">
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          {from} → {to}
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg font-black text-gray-800">{trip.driverName}</span>
                          <span className="text-xs bg-amber-500 text-white font-bold px-2 py-0.5 rounded-lg flex items-center gap-0.5 shadow-sm">
                            ⭐ {trip.rating}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">({trip.reviewsCount} оценок от людей)</span>
                        </div>

                        <div className="text-xs text-gray-500 font-medium flex items-center gap-3">
                          <span>🚗 {trip.car}</span>
                          <span>•</span>
                          <span>🕒 {trip.time}</span>
                        </div>

                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${
                          trip.mode === 'taxi' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {trip.mode === 'taxi' ? `🚕 Такси (${trip.pricePerKm} ֏/км)` : '📍 Фиксированная стоимость рейса'}
                        </span>
                      </div>

                      {/* Итоговый прайсинг, места и бронь */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-4 sm:gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                        
                        <div>
                          <div className="text-xs text-gray-400 font-medium mb-0.5">
                            Итоговая цена
                          </div>
                          <div className="text-2xl font-black text-blue-900 whitespace-nowrap">
                            {trip.calculatedPrice.toLocaleString()} ֏
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400 font-medium mb-0.5">
                            Своб. места
                          </div>
                          <div className="text-xl font-bold text-center md:text-left">
                            4
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => alert(`Вы успешно забронировали машину у водителя ${trip.driverName} за ${trip.calculatedPrice} ֏!`)}
                          className="w-full sm:w-auto px-8 py-3.5 bg-gray-950 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition whitespace-nowrap shadow-md active:scale-95"
                        >
                          Забронировать
                        </button>

                      </div>
                    </div>
                  </div>
                ))
              ) : (
                /* Состояние до нажатия кнопки поиска */
                !hasSearched && (
                  <div className="bg-white/70 rounded-3xl p-6 text-center text-gray-500 font-medium text-sm">
                    Введите точки отправления и назначения, чтобы запустить расчет километров и стоимости.
                  </div>
                )
              )}

              {/* Состояние, если ничего не нашлось */}
              {hasSearched && filteredTrips.length === 0 && !isLoadingRoute && (
                <div className="bg-white/95 rounded-3xl p-8 text-center text-gray-500 font-medium">
                  По данному направлению свободных машин не найдено.
                </div>
              )}

            </div>
          </div>

        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
}
