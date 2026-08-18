import { Link } from "react-router-dom";
import { getRealCategory } from "../utils/getRealCategory";
import AdUnit from "./AdUnit";

export default function NewsGrid({ category, news }) {

  const now = new Date();

  const filteredNews = news.filter((item) => {
    const newsDate = new Date(item.date);
    const diffHours = (now - newsDate) / (1000 * 60 * 60);

    if (category === "Գլխավոր") {
      return diffHours <= 72;
    }

    return (
      diffHours <= 24 * 7 &&
      getRealCategory(item.category) === category
    );
  });

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {filteredNews.length === 0 ? (
     <p className="text-gray-500 text-sm italic">
      Больше новостей в этой категории пока нет.
     </p>
 ) : (
   filteredNews.map((item) => (
   <div key={item.id} className="bg-white p-4 rounded shadow hover:shadow-md">
   <AdUnit />
    <Link to={`/news/${item.id}`}
    className="block hover:opacity-90 transition"
  >
  <img
    src={item.image}
    alt={item.title}
    className="h-40 w-full object-cover rounded"
  />

  <h3 className="font-bold mt-2">{item.title}</h3>

  <p className="text-sm text-gray-600">{item.description}</p>

  {/* Цветная категория */}
  <span
    className={`px-2 py-1 rounded text-xs font-semibold ${
      getRealCategory(item.category) === "Սպորտ"
        ? "bg-blue-100"
        : getRealCategory(item.category) === "Քաղաքական"
        ? "bg-blue-100"
        : getRealCategory(item.category) === "Տնտեսություն"
        ? "bg-blue-100"
        : getRealCategory(item.category) === "Մշակույթ"
        ? "bg-blue-100"
        : getRealCategory(item.category) === "Աշխարհ"
        ? "bg-blue-100"
        : getRealCategory(item.category) === "Հանրայն"
        ? "bg-blue-100"
        : "bg-gray-200 text-gray-700"
    }`}
  >
    {getRealCategory(item.category)}
  </span>
  </Link>
</div>

        ))
      )}
    </div>
  );
}



