import { useState, useEffect } from "react";
  

 
export default function WeatherInfoCard({ data, onCityChange, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [city, setCity] = useState(data.city);
   
  useEffect(() => {
    setCity(data.city);
  }, [data.city]);

  const handleSave = () => {
    setEditing(false);
    if (onCityChange && city !== data.city) {
      onCityChange(data.id, city);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    else if (e.key === "Escape") {
      setCity(data.city);
      setEditing(false);
    }
  };

  return (
    <div className="bg-white p-3 shadow relative flex flex-col gap-2">
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            autoFocus
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="border-b border-blue-400 focus:outline-none w-full"
          />
        ) : (
          <h2
            onClick={() => setEditing(true)}
            className="text-lg font-bold cursor-text overflow-x-auto whitespace-nowrap max-w-full"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {city} ✏️
          </h2>
        )}
        <button
          onClick={() => onDelete?.(data.id)}
          className="ml-2 text-red-500 font-bold hover:text-red-700"
          title="Удалить блок"
        >
          ❌
        </button>
      </div>

      <p className=" mt-1">
        {data.temp}, {data.desc}
      </p>
      <p className="text-blue-900 mt-1">
        Քամու արագությունը: {data.wind}
      </p>
      <p className="text-gray-400 mt-1 text-sm">
        Կոորդինատներ: {data.lat?.toFixed(2) ?? "--"}, {data.lon?.toFixed(2) ?? "--"}
      </p>
    </div>
  );
}


