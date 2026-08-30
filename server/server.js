import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();


const apiKey = process.env.WEATHER_API_KEY;

app.use(cors());
app.use(express.json());

// ===== FILE HELP =====
const newsPath = path.resolve("./data/news.json");

const getNews = () => {
  try {
    const file = fs.readFileSync(newsPath, "utf-8");
    return JSON.parse(file || "[]");
  } catch (err) {
    console.log("NEWS READ ERROR:", err);
    return [];
  }
};


const saveNews = (data) => {
  fs.writeFileSync(newsPath, JSON.stringify(data, null, 2));
};

// ===== AUTH =====
const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(403).json({ message: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USER ||
    password !== process.env.ADMIN_PASS
  ) {
    return res.status(401).json({ message: "Wrong credentials" });
  }

  const token = jwt.sign(
    { user: username, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// ===== NEWS =====

// GET all news
app.get("/news", (req, res) => {
  try {
    res.json(getNews());
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET one news
app.get("/news/:id", (req, res) => {
  try {
    const news = getNews();
    const item = news.find(n => n.id === Number(req.params.id));

    if (!item) return res.status(404).json({ message: "Not found" });

    res.json(item);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE news
app.post("/news", auth, (req, res) => {
  if (req.body.category === "Գլխավոր") {
    return res.status(403).json({
      message: "Creating news in 'Գլխավոր' is not allowed"
    });
  }

  const news = getNews();

  const newItem = {
    id: Date.now(),
    ...req.body
  };

  const first = news[0] || null;
  const rest = news.slice(1);

  const updated = [
    first,
    newItem,
    ...rest
  ];

  saveNews(updated);

  res.json(newItem);
});

// DELETE news
app.delete("/news/:id", auth, (req, res) => {
  let news = getNews();

  const id = Number(req.params.id);
  news = news.filter(item => item.id !== id);

  saveNews(news);

  res.json({ message: "Deleted" });
});

// UPDATE news
app.put("/news/:id", auth, (req, res) => {
  let news = getNews();

  const id = Number(req.params.id);

  const currentNews = news.find(item => item.id === id);

  if (!currentNews) {
    return res.status(404).json({ message: "Not found" });
  }

  // Запрещаем менять категорию на "Գլխավոր"
  if (
    currentNews.category !== "Գլխավոր" &&
    req.body.category === "Գլխավոր"
  ) {
    return res.status(403).json({
      message: "Cannot move news to 'Գլխավոր'"
    });
  }

  news = news.map(item =>
    item.id === id ? { ...item, ...req.body } : item
  );

  saveNews(news);

  res.json({ message: "Updated" });
});

// ===== WEATHER =====
app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: "lat & lon required" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${apiKey}`
    );

    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Weather error" });
  }
});

// ===== SITEMAP =====
app.get("/sitemap.xml", (req, res) => {
  const news = getNews();

  const baseUrl = "https://nor8yun.armenian.workers.dev";

  const urls = [
    `
    <url>
      <loc>${baseUrl}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    `,
    ...news.map(item => `
    <url>
      <loc>${baseUrl}/news/${item.id}</loc>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    `)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  res.type("application/xml");
  res.send(sitemap);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});



