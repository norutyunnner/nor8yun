import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import NewsGrid from "../components/NewsGrid";
import AdUnit from "../components/AdUnit";


export default function NewsPage({ news }) {
  const { id } = useParams();

  const article = news.find(n => n.id === Number(id));

  useEffect(() => {
    if (!article) return;

    const saved = localStorage.getItem("recentlyViewed");
    let viewed = saved ? JSON.parse(saved) : [];

    viewed = viewed.filter(item => item.id !== article.id);

    viewed.unshift({
      id: article.id,
      title: article.description,
      image: article.image,
    });

    viewed = viewed.slice(0, 3);

    localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
  }, [article]);

  if (!article) {
    return <p className="text-center mt-10">Նյութը գտնված չէ...</p>;
  }

  // Превращаем [текст](ссылка) в настоящую ссылку
const renderTextWithLinks = (text) => {
  const paragraphs = text
    .split(/\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph, index) => {
    const parts = paragraph.split(
      /(\[[^\]]+\]\(https?:\/\/[^)]+\))/g
    );

    const paragraphContent = parts.map((part, i) => {
      const match = part.match(
        /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/
      );

      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {match[1]}
          </a>
        );
      }

      return part;
    });

    return (
      <div key={index}>
        <p className="mb-5">
          {paragraphContent}
        </p>

        {(index + 1) % 5 === 0 && index + 1 < paragraphs.length && (
          <div className="my-6">
            <AdUnit />
          </div>
        )}
      </div>
    );
  });
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="lg:col-span-2 space-y-6">

          {/* СТАТЬЯ */}
          <div className="bg-white p-4 rounded shadow">

            <img
              src={article.image}
              alt={article.title}
              className="w-full h-72 object-cover rounded"
            />

            <h1 className="text-2xl font-bold mt-4">
              {article.title}
            </h1>

            <p className="text-gray-600 text-sm mt-1">
              {new Date(article.date).toLocaleString()}
            </p>

            <br />

            <div className="text-gray-800 leading-7 whitespace-pre-line">
              {renderTextWithLinks(article.data)}
            </div>
          </div>

          {/* GRID ПОД СТАТЬЁЙ */}
          <div className="bg-white p-4 rounded shadow">
            <NewsGrid category={article.category} news={news} />
          </div>

        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="lg:col-span-1">
          <Sidebar news={news} />
        </div>

      </main>

      <Footer />
    </div>
  );
}
