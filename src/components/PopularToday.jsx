import { Link } from "react-router-dom";

export default function PopularToday({ news }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-sm font-bold mb-3">| Թոփ նորություններ |</h3>

      <ul className="space-y-2 text-sm">
        {news.slice(0, 4).map(item => (
          <li key={item.id} className="line-clamp-2">
            <Link
              to={`/news/${item.id}`} 
              className="text-blue-900 hover:underline hover:text-blue-600"
            >
             • {item.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
