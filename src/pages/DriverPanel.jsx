import React, { useRef, useState } from "react";
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
  const [hasLuggageSpace, setHasLuggageSpace] = useState(false);
 const [pickupDistance, setPickupDistance] = useState("0");

  const [carNumber, setCarNumber] = useState({
    region: "35",
    letters: "XX",
    digits: "555",
  });
  const [editingCarNumber, setEditingCarNumber] = useState(false);
  const [carPhoto, setCarPhoto] = useState("/taxiCar.png");
  const carPhotoInputRef = useRef(null);

  // Driver's own trips, kept in React state for now.
  const [myTrips, setMyTrips] = useState([]);

  const handleCarPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Выберите файл изображения.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setCarPhoto(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const updateCarNumber = (field, value) => {
    let cleanValue = value;

    if (field === "region" || field === "digits") {
      cleanValue = value.replace(/\D/g, "").slice(0, field === "region" ? 2 : 3);
    } else {
      cleanValue = value.replace(/[^a-zA-ZԱ-Ֆա-ֆ]/g, "").toUpperCase().slice(0, 2);
    }

    setCarNumber((previous) => ({ ...previous, [field]: cleanValue }));
  };

  const displayedCarNumber = `${carNumber.region || "__"} ${carNumber.letters || "__"} ${carNumber.digits || "___"}`;

  const renderCarNumber = (mobile = false) => {
    const labelClass = mobile ? "text-sm text-gray-500 mb-1" : "text-sm text-gray-200 mb-1";
    const numberClass = mobile
      ? "text-2xl font-bold tracking-wider text-gray-900"
      : "text-2xl font-bold tracking-wider text-gray-100";

    return (
      <div className="text-center mb-5">
        <p className={labelClass}>Номер автомобиля</p>
        {!editingCarNumber ? (
          <button
            type="button"
            onClick={() => setEditingCarNumber(true)}
            className={`mx-auto inline-flex items-center justify-center gap-2 rounded-xl px-3 py-1 transition ${
              mobile ? "hover:bg-gray-100" : "hover:bg-white/10"
            }`}
            title="Изменить номер автомобиля"
          >
            <span className={numberClass}>{displayedCarNumber}</span>
            <span className={mobile ? "text-blue-600" : "text-blue-300"} aria-hidden="true">✎</span>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <input
              aria-label="Две цифры номера"
              inputMode="numeric"
              value={carNumber.region}
              onChange={(e) => updateCarNumber("region", e.target.value)}
              placeholder="35"
              maxLength={2}
              className={`w-14 rounded-lg border px-2 py-2 text-center text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500 ${
                mobile ? "border-gray-300 bg-gray-100 text-gray-900" : "border-white/20 bg-white/10 text-white"
              }`}
            />
            <input
              aria-label="Две буквы номера"
              value={carNumber.letters}
              onChange={(e) => updateCarNumber("letters", e.target.value)}
              placeholder="XX"
              maxLength={2}
              className={`w-14 rounded-lg border px-2 py-2 text-center text-lg font-bold uppercase outline-none focus:ring-2 focus:ring-blue-500 ${
                mobile ? "border-gray-300 bg-gray-100 text-gray-900" : "border-white/20 bg-white/10 text-white"
              }`}
            />
            <input
              aria-label="Три цифры номера"
              inputMode="numeric"
              value={carNumber.digits}
              onChange={(e) => updateCarNumber("digits", e.target.value)}
              placeholder="555"
              maxLength={3}
              className={`w-16 rounded-lg border px-2 py-2 text-center text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500 ${
                mobile ? "border-gray-300 bg-gray-100 text-gray-900" : "border-white/20 bg-white/10 text-white"
              }`}
            />
            <button
              type="button"
              onClick={() => setEditingCarNumber(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white transition hover:bg-blue-700"
              aria-label="Подтвердить номер"
              title="Сохранить номер"
            >
              ✓
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderCarPhoto = () => (
    <div className="relative mb-4 h-44 w-full overflow-hidden rounded-2xl bg-gray-200">
      <img src={carPhoto} alt="Автомобиль" className="h-full w-full object-cover" />
      <button
        type="button"
        onClick={() => carPhotoInputRef.current?.click()}
        className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-xl text-white shadow-lg transition hover:bg-blue-200"
        aria-label="Изменить фотографию автомобиля"
        title="Изменить фотографию"
      >
        [ ]
      </button>
    </div>
  );


const handleCreateTrip = (event) => {
  event.preventDefault();

  // Проверяем данные водителя
  const missing = [];

  if (!name.trim()) {
    missing.push("Имя водителя");
  }

  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length < 8) {
    missing.push("Действующий номер телефона");
  }

  if (!carPhoto || carPhoto === "/taxiCar.png") {
    missing.push("Фотография своей машины");
  }

  const validCarNumber =
    carNumber.region.trim() !== "" &&
    carNumber.letters.trim() !== "" &&
    carNumber.digits.trim() !== "" &&
    `${carNumber.region} ${carNumber.letters} ${carNumber.digits}` !== "35 XX 555";

  if (!validCarNumber) {
    missing.push("Настоящий номер машины");
  }

  // Не создаём поездку, если профиль не заполнен
  if (missing.length > 0) {
    alert(
      "Перед созданием поездки заполни данные:\n\n" +
      missing.map((item) => "• " + item).join("\n")
    );

    setShowProfile(true);
    return;
  }

  // Сохраняем данные водителя вместе с поездкой
  const newTrip = {
    id: Date.now(),
    tripType,
    from: from.trim(),
    to: tripType === "ride" ? to.trim() : "",
    date,
    time,
    seats,
    price,
    pricePerKm,
    carSize,
    isFemaleDriver,
    status: "Активна",
    frozen: false,

    driver: {
      name: name.trim(),
      phone: phone.trim(),
      carPhoto,
      carNumber: { ...carNumber },
    },
  };

  setMyTrips((previousTrips) => [newTrip, ...previousTrips]);

  alert("Поездка создана!");

  setFrom("");
  setTo("");
  setDate("");
  setTime("");
  setSeats(1);
  setPrice("");
};


  const deleteTrip = (tripId) => {
    setMyTrips((previousTrips) => previousTrips.filter((trip) => trip.id !== tripId));
  };

  const toggleFreezeTrip = (tripId) => {
    setMyTrips((previousTrips) =>
      previousTrips.map((trip) =>
        trip.id === tripId
          ? { ...trip, frozen: !trip.frozen }
          : trip
      )
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col text-gray-900 bg-cover bg-[left_center] bg-fixed"
      style={{ backgroundImage: "url('/taxiCar.png')" }}
    >
      <div className="fixed inset-0 bg-black/45 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <input
          ref={carPhotoInputRef}
          type="file"
          accept="image/*"
          onChange={handleCarPhotoChange}
          className="hidden"
          aria-label="Выбрать фотографию автомобиля"
        />

        <header className="relative h-16 bg-white/90 backdrop-blur-sm border-b flex items-center justify-between px-4 md:px-8">
          <button
            onClick={() => navigate("/Taqsi")}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            <span className="text-xl">←</span>
            <span className="hidden sm:inline">Назад</span>
          </button>

          <h1 className="text-xl md:text-2xl font-bold text-blue-800">T8</h1>

          <div className="relative md:hidden">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
              aria-label="Открыть профиль"
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
                <h3 className="text-xl font-bold">Мои данные</h3>
                <button
                  onClick={() => setShowProfile(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xl hover:bg-gray-200 transition"
                  aria-label="Закрыть профиль"
                >
                  ×
                </button>
              </div>
              <div className="p-5">
                {renderCarPhoto()}
                {renderCarNumber(true)}
                <div className="space-y-3 text-sm">
                  <div className="border-b pb-3">
                    {!editingName ? (
                      <button
                        type="button"
                        onClick={() => setEditingName(true)}
                        className="w-full flex items-center justify-between gap-3 text-left py-1"
                      >
                        <span className="text-gray-800">Имя</span>
                        <span className="font-semibold text-gray-800">{name || "Не указано"}</span>
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-3">
                        <span className="text-gray-800">Имя</span>
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
                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-800">Телефон</span>
                    <span className="font-semibold text-gray-800">{phone || "+374 XX XX XX XX"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 w-full px-4 md:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,800px)_420px] gap-8 items-start justify-between">
            <div>
              <div className="mb-5 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Создать поездку</h2>
                <p className="text-gray-200">Укажите маршрут и условия поездки.</p>
              </div>

              <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-lg p-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTripType("taxi")}
                    className={`py-2.5 rounded-2xl font-bold transition ${
                      tripType === "taxi" ? "bg-blue-900 text-white" : "bg-gray-100/90 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🚕 Такси
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType("ride")}
                    className={`py-2.5 rounded-2xl font-bold transition ${
                      tripType === "ride" ? "bg-blue-900 text-white" : "bg-gray-100/90 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    👥 Попутка
                  </button>
                </div>
              </div>

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
                    pickupDistance={pickupDistance}
                    setPickupDistance={setPickupDistance}
                    isFemaleDriver={isFemaleDriver}
                    setIsFemaleDriver={setIsFemaleDriver}
                    hasLuggageSpace={hasLuggageSpace}
                    setHasLuggageSpace={setHasLuggageSpace}
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

            <div className="space-y-4 pt-0">
              <div className="hidden md:block bg-white/5 backdrop-blur-sm rounded-3xl shadow-lg p-5">
                <h3 className="text-xl font-bold mb-4 text-gray-200">Мои данные</h3>
                {renderCarPhoto()}
                {renderCarNumber(false)}
                <div className="space-y-3 text-sm">
                  <div className="border-b border-white/10 pb-3">
                    {!editingName ? (
                      <button
                        type="button"
                        onClick={() => setEditingName(true)}
                        className="w-full flex items-center justify-between gap-3 text-left"
                      >
                        <span className="text-gray-300">Имя</span>
                        <span className="font-semibold text-gray-200">{name || "Не указано"}</span>
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-3">
                        <span className="text-gray-300">Имя</span>
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
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Телефон</span>
                    <span className="font-semibold text-gray-200">{phone || "+374 XX XX XX XX"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 w-full lg:w-[calc(100%+120px)] lg:-ml-[120px]">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-white">Мои поездки</h3>
                  {myTrips.length > 0 && (
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">
                      {myTrips.length}
                    </span>
                  )}
                </div>

                {myTrips.length === 0 ? (
                  <div className="text-center py-5 text-gray-200">
                    <div className="text-3xl mb-2">📋</div>
                    <p className="font-semibold mb-1">Пока заявок нет</p>
                    <p className="text-sm text-gray-300">Созданные поездки появятся здесь.</p>
                  </div>
                ) : (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
  {myTrips.map((trip) => (
                      <article
                        key={trip.id}
                        className={`relative rounded-xl border p-3 transition ${
                          trip.frozen
                            ? "border-amber-300/40 bg-amber-950/30 opacity-75"
                            : "border-white/15 bg-black/50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 pr-1">
                          <h4 className="font-bold text-white text-sm">
                            {trip.tripType === "taxi" ? "🚕 Такси" : "👥 Попутка"}
                          </h4>
                          {trip.isFemaleDriver && (
  <span
    title="Женщина-водитель"
    aria-label="Женщина-водитель"
    className="inline-flex items-center justify-center
               w-9 h-9 rounded-full
               bg-pink-500 text-white
               border-2 border-pink-300
               text-2xl font-extrabold
               shadow-lg shadow-pink-500/50"
  >
    ♀
  </span>
)}
                        </div>

<div className="mt-2 grid grid-cols-2 gap-x-3 items-center">
  {/* СЛЕВА — ОТКУДА И КУДА */}
  <div className="text-sm text-gray-100">
    <p className="font-semibold">
      {trip.from || "Место отправления не указано"}
    </p>

    {trip.tripType === "ride" && (
      <p className="mt-0.5 text-gray-300">
        → {trip.to || "Место назначения не указано"}
      </p>
    )}
  </div>

  {/* СПРАВА — ДАТА И ВРЕМЯ */}
  <div className="text-right text-xs text-gray-300">
    {trip.date && (
      <p>📅 {trip.date}</p>
    )}

    {trip.time && (
      <p className="mt-1">🕒 {trip.time}</p>
    )}
  </div>
</div>
                        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-gray-200">
                          <div>
                            <span className="text-gray-400">Свободно мест</span>
                            <p className="font-semibold text-sm">{trip.seats}</p>
                          </div>

<div className="text-right">
  <span className="text-gray-400">
    {trip.tripType === "taxi" ? "Размер багажа" : "Место для багажа"}
  </span>

  <p className="font-semibold text-sm">
    {trip.tripType === "taxi"
      ? trip.carSize === "small"
        ? "Маленький"
        : trip.carSize === "medium"
          ? "Средний"
          : trip.carSize === "large"
            ? "Большой"
            : trip.carSize || "—"
      : trip.hasLuggageSpace
        ? "Есть"
        : "Нет"}
  </p>
</div>
                          <div>
                            <span className="text-gray-400">Цена</span>
                            <p className="font-semibold text-sm">
                              {trip.tripType === "taxi"
                                ? `${trip.pricePerKm} / км`
                                : trip.price
                                  ? `${trip.price}`
                                  : "—"}
                            </p>
                          </div>

{trip.tripType === "ride" && (
  <div className="text-right">
    <span className="text-gray-400">Заберу</span>

    <p className="font-bold text-sm text-white">
      {trip.pickupDistance === "0"
        ? "возле машины"
        : trip.pickupDistance
          ? `за ${
              Number(trip.pickupDistance) >= 1000
                ? `${Number(trip.pickupDistance) / 1000} км`
                : `${trip.pickupDistance} м`
            }`
          : "Не указано"}
    </p>
  </div>
)}
</div>

<div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  {/* Кнопки слева */}
  <div className="flex min-w-0 flex-1 flex-wrap gap-2">
    <button
      onClick={() => toggleFreezeTrip(trip.id)}
      className="min-w-0 flex-1 rounded-lg bg-amber-500/20 px-3 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-500/30 sm:flex-none"
    >
      {trip.frozen ? "Разморозить" : "Заморозить"}
    </button>

    <button
      onClick={() => deleteTrip(trip.id)}
      className="min-w-0 flex-1 rounded-lg bg-red-500/60 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500/30 sm:flex-none"
    >
      Удалить поездку
    </button>
  </div>

  {/* Статус справа на большом экране */}
  <div className="flex items-center justify-between gap-3 sm:shrink-0 sm:justify-end">
    <span className="text-xs text-gray-400 sm:hidden">
      Статус поездки:
    </span>

    <div className="text-right">
      <span className="hidden text-xs text-gray-400 sm:block">
        Статус
      </span>
      <p
        className={`text-sm font-semibold whitespace-nowrap ${
          trip.frozen ? "text-amber-300" : "text-emerald-300"
        }`}
      >
        {trip.frozen ? "Заморожена" : "Активна"}
      </p>
    </div>
  </div>
</div>


                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
