import { Link } from "react-router-dom";

export default function NewsCard({id, image, title, description }) {
  return (
    <article className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">

      <img 
        src={image || "/fallback.jpg"}
        className="w-full h-60 object-cover rounded-lg"
        alt={title}
      />

      <h2 className="text-xl font-bold mt-4">{title}</h2>

      <p className="text-gray-700 mt-2 line-clamp-3">{description}</p>

      <Link to={`/news/${id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Իմանալ ավելին
      </Link>

    </article>
  );
}

