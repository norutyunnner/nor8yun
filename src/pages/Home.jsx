import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import FullScreenAd from "../components/FullScreenAd";
import HeroNews from "../components/HeroNews";
import FloatingAd from "../components/FloatingAd";
import NewsGrid from "../components/NewsGrid";
import VideoWithAds from "../components/VideoWithAds"
import Sidebar from "../components/Sidebar";
import MainNews from "../components/MainNews";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const { category } = useParams();

  const [newsList, setNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Գլխավոր");

useEffect(() => {
  const getNews = async () => {
    try {
      const res = await fetch(`${API}/news`);

      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await res.json();
      setNews(data);

    } catch (error) {
      console.error(error);
    }
  };

  getNews();
}, []);

  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory("Գլխավոր");
    }
  }, [category]);

  const heroNews =
    newsList.length > 0
      ? activeCategory === "Գլխավոր"
        ? newsList[0]
        : newsList.find(news => news.category === activeCategory)
      : null;

  let heroTitle = "";

  if (heroNews) {
    if (activeCategory === "Գլխավոր") {
      heroTitle = heroNews.title;
    } else {
      switch (activeCategory) {
        case "Քաղաքական":
          heroTitle = "Վերջին Քաղաքական նորություններ";
          break;
        case "Տնտեսություն":
          heroTitle = "Վերջին Տնտեսական նորություններ";
          break;
        case "Սպորտ":
          heroTitle = "Վերջին Սպորտային նորություններ";
          break;
        case "Մշակույթ":
          heroTitle = "Վերջին Մշակույթի նորություններ";
          break;
        case "Հանրայն":
          heroTitle = "Վերջին Հանրային նորություններ";
          break;
        case "Աշխարհ":
          heroTitle = "Վերջին Միջազգային նորություններ";
          break;
        default:
          heroTitle = `Վերջին ${activeCategory}`;
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <FullScreenAd />

      <Header setActiveCategory={setActiveCategory} />

      {heroNews && (
        <HeroNews
          id={heroNews.id}
          image={heroNews.image}
          title={heroTitle}
          description={heroNews.description}
        />
      )}

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          {activeCategory === "Գլխավոր"
            ? <MainNews />
            : newsList.length > 0 && (
                <NewsCard 
                  id={newsList[0].id}
                  image={newsList[0].image}
                  title={newsList[0].title}
                  description={newsList[0].description}
                />
              )
          }

          {newsList[0]?.video && (
          <VideoWithAds video={newsList[0].video} />
        )}

          <NewsGrid category={activeCategory} news={newsList} />
        </div>

        <div className="lg:col-span-1">
          <Sidebar news={newsList} />
        </div>

      </main>

      <Footer />

      <FloatingAd 
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Ih5M4F2rStsazMh_GQTQ8GONLPNH242ufg&s" 
        link="https://example.com" 
        delay={5000}
      />
    </div>
  );
}