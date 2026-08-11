import { Link } from "react-router-dom";

export default function RecentlyViewed() {
  const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-sm font-bold mb-3">| Դուք արդեն դիտել եք |</h3>
       
       {viewed.length === 0 ? (
        <p className="text-gray-500 text-sm italic">
          Այստեղ կտեսնեք ձեր դիտած վերջին 3 նորությունները։
        </p>
      ) : (
      <ul >
        {viewed.map(item => (
        <li key={item.id} className="line-clamp-2">
          <Link to={`/news/${item.id}`} 
              className="text-blue-800 hover:underline hover:text-black">
              ✓ {item.title}
          </Link>
        </li>
        ))}
      </ul> )}
    </div>
  );
}
