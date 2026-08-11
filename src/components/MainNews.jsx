import { useState, useEffect, useRef } from "react";
import WeatherMapWidget from "./WeatherBlok/WeatherMapWidget";
import WeatherInfoGrid from "./WeatherBlok/WeatherInfoGrid";

const API = import.meta.env.VITE_API_URL;

export default function MainNews() {
  const days = ["Կիր", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շաբ"];
  const months = ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս",
    "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"];

  const defaultCities = [
    { id: Date.now() + Math.random(), city: "Երևան", lat: 40.1792, lon: 44.4991 },
    { id: Date.now() + Math.random(), city: "Գյումրի", lat: 40.7897, lon: 43.8476 },
  ];
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("weatherItems");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [now, setNow] = useState(new Date());

  const itemsRef = useRef(items);

useEffect(() => {
  itemsRef.current = items;
}, [items]);

  // === Функция для загрузки defaultCities, если localStorage пуст ===
  const loadDefaultCities = async () => {
    try {
      const promises = defaultCities.map(async (c) => {
        const res = await fetch(`${API}/weather?lat=${c.lat}&lon=${c.lon}`);
        const data = await res.json();
        return {
          id: c.id,
          city: c.city,
          lat: c.lat,
          lon: c.lon,
          temp: `${Math.round(data.main.temp)}°C`,
          desc: data.weather[0].description,
          wind: `${data.wind.speed} м/с`,
        };
      });
      const results = await Promise.all(promises);
      setItems(results);
    } catch (err) {
      console.error("Ошибка загрузки начальной погоды:", err);
    }
  };
useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const updated = await Promise.all(
        itemsRef.current.map(async (c) => {
          const res = await fetch(`${API}/weather?lat=${c.lat}&lon=${c.lon}`
          );

          const data = await res.json();

          return {
            ...c,
            temp: `${Math.round(data.main.temp)}°C`,
            desc: data.weather[0].description,
            wind: `${data.wind.speed} м/с`,
          };
        })
      );

      setItems(updated);
    } catch (err) {
      console.error("Ошибка обновления:", err);
    }
  }, 30000);

  return () => clearInterval(interval);
}, []);

  // === Первый запуск ===
useEffect(() => {
  if (items.length === 0) {
    loadDefaultCities();
  }
}, [items.length]);


  // === Сохраняем в localStorage при каждом изменении items ===
  useEffect(() => {
    localStorage.setItem("weatherItems", JSON.stringify(items));
  }, [items]);

  // === Обновление часов каждую минуту ===
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <article className="bg-white p-4 rounded-xl shadow flex flex-col gap-4 relative overflow-hidden">
      <WeatherMapWidget items={items} setItems={setItems} />
      <WeatherInfoGrid items={items} setItems={setItems} />

      <div className="absolute bottom-0 left-0 w-full text-[12px] text-gray-600 
        bg-white/60 backdrop-blur-sm px-3 py-1 border-t border-gray-200 flex justify-center">
        {days[now.getDay()]}, {now.getDate()} {months[now.getMonth()]} {now.getFullYear()} •{" "}
        {now.getHours().toString().padStart(2, "0")}:{now.getMinutes().toString().padStart(2, "0")}
      </div>
    </article>
  );
}

//  localStorage.clear()





