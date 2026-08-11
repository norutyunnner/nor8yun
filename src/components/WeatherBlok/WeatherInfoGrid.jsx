import WeatherInfoCard from "./WeatherInfoCard";

export default function WeatherInfoGrid({ items, setItems }) {
  const handleCityChange = (id, newCity) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, city: newCity } : item))
    );
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
      {items.map((item) => (
        <WeatherInfoCard
          key={item.id}
          data={item}
          onCityChange={handleCityChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}


