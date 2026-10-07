import React from "react";

export default function TaxiForm({
  from,
  setFrom,
  date,
  setDate,
  time,
  setTime,
  seats,
  setSeats,
  pricePerKm,
  setPricePerKm,
  carSize,
  setCarSize,
  isFemaleDriver,
  setIsFemaleDriver,
}) {
  return (
    <>
      {/* ОТКУДА */}
      <div>
        <label className="block text-sm font-semibold mb-1.5">
          Откуда
        </label>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            📍
          </span>

          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Например: Ереван"
            className="w-full pl-10 pr-3 py-3 bg-gray-100/90 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* ЦЕНА ЗА КИЛОМЕТР */}
      <div>
        <label className="block text-sm font-semibold mb-1.5">
          Цена за километр
        </label>

        <div className="relative">
          <input
            type="number"
            min="50"
            max="200"
            value={pricePerKm}
            onChange={(e) => setPricePerKm(e.target.value)}
            className="w-full px-3 py-3 pr-10 bg-gray-100/90 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-semibold">
            ֏
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          От 50 ֏ до 200 ֏ за километр
        </p>
      </div>

      {/* ПОЛ ВОДИТЕЛЯ */}
      <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer w-fit">
        <input
          type="checkbox"
          checked={isFemaleDriver}
          onChange={(e) => setIsFemaleDriver(e.target.checked)}
          className="w-4 h-4 accent-blue-900"
        />

        <span>Я женщина</span>
      </label>

{/* ПАССАЖИРЫ + РАЗМЕР БАГАЖА */}
<div>
  <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-3">

    {/* ЧИСЛО ПАССАЖИРОВ */}
    <div>
      <label className="block text-sm font-semibold mb-1.5">
        Число пассажиров
      </label>

      <input
        type="number"
        min="1"
        max="8"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
        className="w-full px-3 py-2.5 bg-gray-100/90 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* РАЗМЕР БАГАЖА */}
    <div className="min-w-0">
      <label className="block text-sm font-semibold mb-1.5">
        Размер багажа
      </label>

      <div className="grid grid-cols-3 gap-2">

        <button
          type="button"
          onClick={() => setCarSize("small")}
          className={`min-w-0 px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
            carSize === "small"
              ? "bg-blue-900 text-white"
              : "bg-gray-100/90 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Маленький
        </button>

        <button
          type="button"
          onClick={() => setCarSize("medium")}
          className={`min-w-0 px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
            carSize === "medium"
              ? "bg-blue-900 text-white"
              : "bg-gray-100/90 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Средний
        </button>

        <button
          type="button"
          onClick={() => setCarSize("large")}
          className={`min-w-0 px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
            carSize === "large"
              ? "bg-blue-900 text-white"
              : "bg-gray-100/90 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Большой
        </button>

      </div>
    </div>

  </div>
</div>

    </>
  );
}