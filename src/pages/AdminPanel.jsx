import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AdminPanel() {
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [isMainEditing, setIsMainEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Գլխավոր");
  const [data, setData] = useState("");

  const [videoType, setVideoType] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("");

  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
  loadNews();
}, []);

const loadNews = async () => {
  const res = await fetch(`${API}/news`);
  const data = await res.json();
  setNews(data);
};

const deleteNews = async (id) => {
  if (!confirm("Удалить новость?")) return;
  const res = await fetch(`${API}/news/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    if (res.ok) {
    loadNews();
  }
};
  const editNews = (item) => {
  setIsMainEditing(item.category === "Գլխավոր");
  setEditingId(item.id);

  setTitle(item.title || "");
  setDescription(item.description || "");
  setImage(item.image || "");
  setCategory(item.category || "Գլխավոր");
  setData(item.data || "");

  if (item.video?.type === "youtube") {
    setVideoType("youtube");
    setYoutubeId(item.video.youtubeId || "");
    setVideoUrl("");
  }

  if (item.video?.type === "mp4") {
    setVideoType("mp4");
    setVideoUrl(item.video.url || "");
    setYoutubeId("");
  }
};

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const updateNews = async () => {
    setIsMainEditing(false);
  const body = {
    title,
    description,
    image,
    category,
    data,
  };

  if (videoType === "youtube") {
    body.video = {
      type: "youtube",
      youtubeId,
    };
  }

  if (videoType === "mp4") {
    body.video = {
      type: "mp4",
      url: videoUrl,
    };
  }

  const res = await fetch(`${API}/news/${editingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    alert("Новость обновлена");

    setEditingId(null);

    setTitle("");
    setDescription("");
    setImage("");
    setCategory("Գլխավոր");
    setData("");
    setVideoType("");
    setVideoUrl("");
    setYoutubeId("");

    loadNews();
  }
 };

  const createNews = async () => {
    setIsMainEditing(false);

      if (category === "Գլխավոր") {
        alert("Нельзя создавать новости в категории 'Գլխավոր'");
        return;
      }

    const body = {
      title,
      description,
      image,
      category,
      data,
      date: new Date().toISOString(),
    };

    if (videoType === "youtube") {
      body.video = {
        type: "youtube",
        youtubeId,
      };
    }

    if (videoType === "mp4") {
      body.video = {
        type: "mp4",
        url: videoUrl,
      };
    }
      
    const res = await fetch(`${API}/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Новость создана");

      setTitle("");
      setDescription("");
      setImage("");
      setCategory("Գլխավոր");
      setData("");
      setVideoType("");
      setVideoUrl("");
      setYoutubeId("");

      loadNews();
    } else {
      alert("Ошибка");
    }
  };
    
    const filteredNews = news.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">

      <h1 className="text-2xl font-bold">
        {editingId ? "Редактирование новости" : "Создать новость"}
      </h1>
       <p>Заголовок</p>
      <input
        className="border p-2 w-full"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
       <p>Краткое описание</p>
      <input
        className="border p-2 w-full"
        placeholder="Краткое описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
         <p>Ссылка на картинку</p>
      <input
        className="border p-2 w-full"
        placeholder="Ссылка на картинку"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {!editingId && (
        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Գլխավոր</option>
          <option>Քաղաքական</option>
          <option>Տնտեսություն</option>
          <option>Հանրայն</option>
          <option>Աշխարհ</option>
          <option>Մշակույթ</option>
          <option>Սպորտ</option>
        </select>
      )}

      <textarea
        rows="10"
        className="border p-2 w-full"
        placeholder="Полный текст новости"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <h2 className="font-bold">
        Видео (необязательно)
      </h2>

      <select
        className="border p-2 w-full"
        value={videoType}
        onChange={(e) => setVideoType(e.target.value)}
      >
        <option value="">Без видео</option>
        <option value="youtube">YouTube</option>
        <option value="mp4">MP4</option>
      </select>

      {videoType === "youtube" && (
        <input
          className="border p-2 w-full"
          placeholder="YouTube ID"
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
        />
      )}

      {videoType === "mp4" && (
        <input
          className="border p-2 w-full"
          placeholder="MP4 URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      )}
       
       <hr />

      <h2 className="text-xl font-bold">
        Все новости
      </h2>

      <input
        className="border p-2 w-full"
        placeholder="Поиск по заголовку"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={editingId ? updateNews : createNews}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        {editingId ? "Сохранить изменения" : "Создать новость"}
      </button>
      {editingId && (
        <button
          onClick={() => {
            setEditingId(null);
            setTitle("");
            setDescription("");
            setImage("");
            setCategory("Գլխավոր");
            setData("");
            setVideoType("");
            setVideoUrl("");
            setYoutubeId("");
          }}
          className="bg-gray-500 text-white px-5 py-2 rounded ml-2"
        >
          Отмена
        </button>
        )}
  
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
  {filteredNews.map(item => (
    <div
      key={item.id}
      className={`p-4 rounded border ${
        item.category === "Գլխավոր"
          ? "bg-blue-300 border-red-500"
          : "bg-white"
      }`}
    >
      <h3 className="font-bold">
        {item.title}
      </h3>

      <p>
        {item.description}
      </p>

      <div className="flex gap-2 mt-3">
          <button
            onClick={() => editNews(item)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Редактировать
          </button>

          {item.category !== "Գլխավոր" && (
            <button
              onClick={() => deleteNews(item.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Удалить
            </button>
          )}

       </div>
      </div>
        ))}
      </div>

    </div>
  );
}