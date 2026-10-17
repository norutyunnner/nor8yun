
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const apiKey = process.env.WEATHER_API_KEY;

app.use(cors());
app.use(express.json());

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("В настройках сервера отсутствуют ключи Supabase.");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ===== DATABASE HELP =====
async function getNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("position", { ascending: true });

  if (error) throw error;
  return data;
}

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
app.get("/news", async (req, res) => {
  try {
    res.json(await getNews());
  } catch (error) {
    console.error("GET NEWS ERROR:", error.message);
    res.status(500).json({ message: "Could not load news" });
  }
});

// GET one news
app.get("/news/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Not found" });

    res.json(data);
  } catch (error) {
    console.error("GET ONE NEWS ERROR:", error.message);
    res.status(500).json({ message: "Could not load news" });
  }
});

// CREATE news
app.post("/news", auth, async (req, res) => {
  try {
    if (req.body.category === "Գլխավոր") {
      return res.status(403).json({
        message: "Creating news in 'Գլխավոր' is not allowed"
      });
    }

    const news = await getNews();

    // Shift everything except the first (main) news down by one.
    for (let i = 1; i < news.length; i++) {
      const { error } = await supabase
        .from("news")
        .update({ position: i + 1 })
        .eq("id", news[i].id);

      if (error) throw error;
    }

    const newItem = {
      id: Date.now(),
      title: req.body.title ?? null,
      description: req.body.description ?? null,
      image: req.body.image ?? null,
      category: req.body.category ?? null,
      date: req.body.date ?? new Date().toISOString(),
      video: req.body.video ?? null,
      data: req.body.data ?? null,
      position: news.length > 0 ? 1 : 0
    };

    const { data, error } = await supabase
      .from("news")
      .insert(newItem)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error("CREATE NEWS ERROR:", error.message);
    res.status(500).json({ message: "Could not create news" });
  }
});

// DELETE news
app.delete("/news/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const news = await getNews();
    const current = news.find(item => item.id === id);

    if (!current) {
      return res.status(404).json({ message: "Not found" });
    }

    if (current.category === "Գլխավոր") {
      return res.status(403).json({
        message: "Deleting the main news is not allowed"
      });
    }

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) throw error;

    const remaining = news.filter(item => item.id !== id);

    // Restore consecutive positions after deletion.
    for (let i = 0; i < remaining.length; i++) {
      const { error: positionError } = await supabase
        .from("news")
        .update({ position: i })
        .eq("id", remaining[i].id);

      if (positionError) throw positionError;
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE NEWS ERROR:", error.message);
    res.status(500).json({ message: "Could not delete news" });
  }
});

// UPDATE news
app.put("/news/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const { data: current, error: findError } = await supabase
      .from("news")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (findError) throw findError;
    if (!current) {
      return res.status(404).json({ message: "Not found" });
    }

    if (
      current.category !== "Գլխավոր" &&
      req.body.category === "Գլխավոր"
    ) {
      return res.status(403).json({
        message: "Cannot move news to 'Գլխավոր'"
      });
    }

    const allowedFields = [
      "title",
      "description",
      "image",
      "category",
      "date",
      "video",
      "data"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    const { error: updateError } = await supabase
      .from("news")
      .update(updates)
      .eq("id", id);

    if (updateError) throw updateError;

    res.json({ message: "Updated" });
  } catch (error) {
    console.error("UPDATE NEWS ERROR:", error.message);
    res.status(500).json({ message: "Could not update news" });
  }
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
app.get("/sitemap.xml", async (req, res) => {
  try {
    const news = await getNews();
    const baseUrl = "https://nor8yun.am";

    const urls = [
      `<url>
        <loc>${baseUrl}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>`,
      ...news.map(item => `<url>
        <loc>${baseUrl}/news/${item.id}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`)
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    res.type("application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("SITEMAP ERROR:", error.message);
    res.status(500).send("Could not generate sitemap");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
