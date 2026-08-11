import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

const API = import.meta.env.VITE_API_URL;

export default function WeatherMapWidget({ items,setItems }) {

const fetchWeather = async (lat, lon, name) => {

  const exists = items.some(
    item =>
      Math.abs(item.lat - lat) < 0.01 &&
      Math.abs(item.lon - lon) < 0.01
  );

  if (!exists && items.length >= 10) {
    alert("Максимум 10 городов");
    return;
  }

  try {
    const res = await fetch(`${API}/weather?lat=${lat}&lon=${lon}`
    );

    if (!res.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await res.json();

    const newMarker = {
      id: Date.now() + Math.random(),
      city: name,
      lat,
      lon,
      temp: `${Math.round(data.main.temp)}°C`,
      desc: data.weather[0].description,
      wind: `${data.wind.speed} м/с`,
    };

    setItems(prev => {
      const exists = prev.find(
        item =>
          Math.abs(item.lat - lat) < 0.01 &&
          Math.abs(item.lon - lon) < 0.01
      );

      if (exists) {
        return prev.map(item =>
          Math.abs(item.lat - lat) < 0.01 &&
          Math.abs(item.lon - lon) < 0.01
            ? newMarker
            : item
        );
      }

      return [...prev, newMarker];
    });

  } catch (err) {
    console.error("Ошибка при получении погоды:", err);
  }
};


  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const cityName = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
        fetchWeather(lat, lng, cityName);
      },
    });
    return null;
  }

  return (
    <MapContainer center={[40.1792, 44.4991]} zoom={7} scrollWheelZoom={true} className="w-full h-60 rounded-lg z-0" style={{ minHeight: "200px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
        {items.map(item => (
          <Marker key={item.id} position={[item.lat, item.lon]}>
            <Popup>
              {item.city}: {item.temp}, {item.desc}, Ветер: {item.wind}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}


