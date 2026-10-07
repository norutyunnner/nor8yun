import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import TaxiForm from "../components/taqsi/TaxiForm";
import RideForm from "../components/taqsi/RideForm";

export default function DriverPanel() {
  const navigate = useNavigate();

  const [isFemaleDriver, setIsFemaleDriver] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState("");
  const [pricePerKm, setPricePerKm] = useState(50);
  const [carSize, setCarSize] = useState("small");
  const [tripType, setTripType] = useState("taxi");
  const [showProfile, setShowProfile] = useState(false);

  const [name, setName] = useState("");
const [editingName, setEditingName] = useState(false);
const [phone, setPhone] = useState("");

  const handleCreateTrip = (event) => {
    event.preventDefault();

    console.log({
      tripType,
      from,
      to: tripType === "ride" ? to : "",
      date,
      time,
      seats,
      price,
      pricePerKm,
      carSize,
      isFemaleDriver,
    });

    alert("Поездка создана!");
  };

  return (
    <div
      className="min-h-screen flex flex-col text-gray-900 bg-cover bg-[left_center] bg-fixed"
      style={{
        backgroundImage: "url('/taxiCar.png')",
      }}
    >
      <div className="fixed inset-0 bg-black/45 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">

        <header className="relative h-16 bg-white/90 backdrop-blur-sm border-b flex items-center justify-between px-4 md:px-8">

          <button
            onClick={() => navigate("/Taqsi")}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            <span className="text-xl">←</span>
            <span className="hidden sm:inline">Назад</span>
          </button>

          <h1 className="text-xl md:text-2xl font-bold text-blue-800">
            T8
          </h1>

          <div className="relative md:hidden">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
            >
              👤
            </button>
          </div>
        </header>

        {showProfile && (
          <div className="fixed inset-0 z-[100] md:hidden">

            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowProfile(false)}
            />

            <div className="relative z-10 w-[calc(100%-32px)] max-w-md mx-auto mt-20 bg-white rounded-3xl shadow-2xl overflow-hidden">

              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h3 className="text-xl font-bold">
                  Ваши данные
                </h3>

                <button
                  onClick={() => setShowProfile(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl hover:bg-gray-200 transition"
                >
                  ×
                </button>
              </div>

              <div className="p-5">

                <div className="w-full h-44 rounded-2xl bg-gray-200 overflow-hidden mb-4">
                  <img
                    src="/taxiCar.png"
                    alt="Автомобиль"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center mb-5">
                  <p className="text-sm text-gray-500 mb-1">
                    Номер автомобиля
                  </p>

                  <p className="text-2xl font-bold tracking-wider">
                    35 XX 555
                  </p>
                </div>

<div className="space-y-3 text-sm">

  {/* ИМЯ */}
  <div className="border-b pb-3">

    {!editingName ? (
      <button
        type="button"
        onClick={() => setEditingName(true)}
        className="w-full flex items-center justify-between gap-3 text-left py-1"
      >
        <span className="text-gray-800">
          Имя
        </span>

        <span className="font-semibold text-gray-800">
          {name || "Не указано"}
        </span>
      </button>
    ) : (
      <div className="w-full flex items-center justify-between gap-3">

        <span className="text-gray-800">
          Имя
        </span>

        <div className="flex items-center gap-2 min-w-0">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            autoFocus
            className="w-36 bg-gray-100 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setEditingName(false)}
            className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
          >
            ✓
          </button>

        </div>

      </div>
    )}

  </div>

  {/* ТЕЛЕФОН */}
  <div className="flex items-center justify-between py-1">

    <span className="text-gray-800">
      Телефон
    </span>

    <span className="font-semibold text-gray-800">
      {phone || "+374 XX XX XX XX"}
    </span>

  </div>

</div>

              </div>
            </div>
          </div>
        )}

        <main className="flex-1 w-full px-4 md:px-8 lg:px-12 py-8">

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,800px)_420px] gap-16 items-start justify-between">

            {/* ЛЕВАЯ ЧАСТЬ */}
            <div>

              <div className="mb-6 text-center md:text-left">

                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Создать поездку
                </h2>

                <p className="text-gray-200">
                  Укажите маршрут и условия поездки.
                </p>

              </div>

              {/* ВЫБОР ТИПА */}
              <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-lg p-2 mb-5">

                <div className="grid grid-cols-2 gap-2">

                  <button
                    type="button"
                    onClick={() => setTripType("taxi")}
                    className={`py-3 rounded-2xl font-bold transition ${
                      tripType === "taxi"
                        ? "bg-blue-900 text-white"
                        : "bg-gray-100/90 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🚕 Такси
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripType("ride")}
                    className={`py-3 rounded-2xl font-bold transition ${
                      tripType === "ride"
                        ? "bg-blue-900 text-white"
                        : "bg-gray-100/90 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    👥 Попутка
                  </button>

                </div>
              </div>

              {/* ОСНОВНОЙ БЛОК */}
              <form
                onSubmit={handleCreateTrip}
                className="bg-white/55 backdrop-blur-sm rounded-3xl shadow-lg p-5 md:p-7 space-y-5"
              >

                {tripType === "taxi" && (
                  <TaxiForm
                    from={from}
                    setFrom={setFrom}
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                    seats={seats}
                    setSeats={setSeats}
                    pricePerKm={pricePerKm}
                    setPricePerKm={setPricePerKm}
                    carSize={carSize}
                    setCarSize={setCarSize}
                    isFemaleDriver={isFemaleDriver}
                    setIsFemaleDriver={setIsFemaleDriver}
                  />
                )}

                {tripType === "ride" && (
                  <RideForm
                    from={from}
                    setFrom={setFrom}
                    to={to}
                    setTo={setTo}
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                    seats={seats}
                    setSeats={setSeats}
                    price={price}
                    setPrice={setPrice}
                    isFemaleDriver={isFemaleDriver}
                    setIsFemaleDriver={setIsFemaleDriver}
                  />
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 active:scale-[0.99] transition"
                >
                  Создать поездку
                </button>

              </form>
            </div>

            {/* ПРАВАЯ ЧАСТЬ */}
            <div className="space-y-5 pt-0">

              {/* ВАШИ ДАННЫЕ — ТОЛЬКО ПК */}
              <div className="hidden md:block bg-white/5 backdrop-blur-sm rounded-3xl shadow-lg p-5">

                <h3 className="text-xl font-bold mb-4 text-gray-200 ">
                  Ваши данные
                </h3>

                <div className="w-full h-44 rounded-2xl bg-gray-200 overflow-hidden mb-4">

                  <img
                    src="/taxiCar.png"
                    alt="Автомобиль"
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="text-center mb-5">

                  <p className="text-sm text-gray-200 mb-1">
                    Номер автомобиля
                  </p>

                  <p className="text-2xl font-bold tracking-wider text-gray-200 ">
                    35 XX 555
                  </p>

                </div>

<div className="space-y-3 text-sm">

<div className="border-b pb-3">

  {!editingName ? (
    <button
      type="button"
      onClick={() => setEditingName(true)}
      className="w-full flex items-center justify-between gap-3 text-left"
    >
      <span className="text-gray-300">
        Имя
      </span>

      <span className="font-semibold text-gray-200">
        {name || "Не указано"}
      </span>
    </button>
  ) : (
    <div className="w-full flex items-center justify-between gap-3">

      <span className="text-gray-300">
        Имя
      </span>

      <div className="flex items-center gap-2 min-w-0">

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          autoFocus
          className="w-36 bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={() => setEditingName(false)}
          className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
        >
          ✓
        </button>

      </div>

    </div>
  )}

</div>

  {/* ТЕЛЕФОН */}
  <div className="flex items-center justify-between">

    <span className="text-gray-300">
      Телефон
    </span>

    <span className="font-semibold text-gray-200">
      {phone || "+374 XX XX XX XX"}
    </span>

  </div>

</div>

              </div>

              {/* ВАШИ ЗАЯВКИ */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-lg p-5 w-full lg:w-[calc(100%+120px)] lg:-ml-[120px]">

                <h3 className="text-xl font-bold mb-4 text-gray-500">
                  Ваши заявки
                </h3>

                <div className="text-center py-6">

                  <div className="text-4xl mb-3">
                    📋
                  </div>

                  <p className="font-semibold mb-1">
                    Пока заявок нет
                  </p>

                  <p className="text-sm text-gray-500">
                    Здесь будут отображаться заявки пассажиров.
                  </p>

                </div>

              </div>

            </div>
          </div>
        </main>

        <Footer />

      </div>
    </div>
  );
}