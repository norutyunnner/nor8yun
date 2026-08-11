import { Link } from "react-router-dom";

export default function HeroNews({id, image, title, description }) {
  
  return (
    <Link to={`/news/${id}`}>
    <article className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
      {/* Крупная картинка */}
      <img
        src={image || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"}
        alt={title || "Главная новость"}
        className="w-full h-80 object-cover"
      />

      {/* Контент */}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-900">{title || "Օրվա գլխավոր"}</h2>
        <p className="mt-4 text-gray-700">{description}</p>
      </div>
    </article>
    </Link>
  );
}
