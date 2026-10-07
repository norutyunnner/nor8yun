import React from "react";

export default function RideForm({
  from,
  setFrom,
  to,
  setTo,
  date,
  setDate,
  time,
  setTime,
  seats,
  setSeats,
  price,
  setPrice,
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

      {/* КУДА */}
      <div>
        <label className="block text-sm font-semibold mb-1.5">
          Куда
        </label>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            📍
          </span>

          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Например: Гюмри"
            className="w-full pl-10 pr-3 py-3 bg-gray-100/90 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* РАССТОЯНИЕ ДО ПАССАЖИРА */}
{/* РАССТОЯНИЕ ДО ПАССАЖИРА */}
<div>
  <label className="block text-sm font-semibold mb-1.5">
    Откуда могу забрать
  </label>

  <div className="grid grid-cols-2 gap-2">

    {/* ВОЗЛЕ МАШИНЫ */}
    <button
      type="button"
      className="py-2.5 px-2 rounded-xl bg-blue-900 text-white text-sm font-semibold"
    >
      Возле машины
    </button>

    {/* ВЫБОР РАССТОЯНИЯ */}
    <select
      defaultValue="100"
      className="w-full py-2.5 px-2 rounded-xl bg-gray-100/90 text-gray-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="100">100 м</option>
      <option value="500">500 м</option>
      <option value="1000">1 км</option>
      <option value="2000">2 км</option>
      <option value="3000">3 км</option>
      <option value="5000">5 км</option>
      <option value="10000">10 км</option>
    </select>

  </div>
</div>

      {/* ДАТА + ВРЕМЯ */}
      <div className="grid grid-cols-2 gap-2">

        <div>
          <label className="block text-sm font-semibold mb-1.5">
            Дата
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-2.5 py-3 bg-gray-100/90 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">
            Время
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-2.5 py-3 bg-gray-100/90 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>

      </div>

      {/* ПАССАЖИРЫ + ЦЕНА */}
      <div className="grid grid-cols-2 gap-2">

        <div>
          <label className="block text-sm font-semibold mb-1.5">
            Пассажиров
          </label>

          <input
            type="number"
            min="1"
            max="8"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full px-3 py-3 bg-gray-100/90 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">
            Цена за пассажира
          </label>

          <div className="relative">

            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="3000"
              className="w-full px-3 py-3 pr-9 bg-gray-100/90 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-semibold">
              ֏
            </span>

          </div>
        </div>

      </div>

      {/* БАГАЖ */}
      <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer w-fit">

        <input
          type="checkbox"
          className="w-4 h-4 accent-blue-900"
        />

        <span>
          Есть место для багажа
        </span>

      </label>

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
    </>
  );
}