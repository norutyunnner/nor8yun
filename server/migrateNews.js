
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env") });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrate() {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("В server/.env не найдены настройки Supabase.");
    }

    const jsonPath = path.join(__dirname, "data", "news.json");
    const news = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    if (!Array.isArray(news) || news.length === 0) {
      throw new Error("news.json пустой или имеет неверный формат.");
    }

    const ids = news.map(item => item.id);

    if (ids.some(id => !Number.isSafeInteger(id)) ||
        new Set(ids).size !== ids.length) {
      throw new Error("Есть повторяющиеся или некорректные ID.");
    }

    console.log("Новостей в JSON:", news.length);

    const { data: existing, error: readError } = await supabase
      .from("news")
      .select("id")
      .limit(1);

    if (readError) throw readError;

    if (existing.length > 0) {
      throw new Error(
        "Таблица news уже содержит записи. Перенос остановлен без изменений."
      );
    }

    const rows = news.map((item, index) => ({
      id: item.id,
      title: item.title ?? null,
      description: item.description ?? null,
      image: item.image ?? null,
      category: item.category ?? null,
      date: item.date ?? null,
      video: item.video ?? null,
      data: item.data ?? null,
      position: index
    }));

    // Отправляем небольшими порциями
    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100);
      const { error } = await supabase.from("news").insert(batch);

      if (error) {
        throw new Error(
          `Ошибка в порции ${i + 1}–${i + batch.length}: ${error.message}`
        );
      }

      console.log(`Перенесено: ${Math.min(i + 100, rows.length)} из ${rows.length}`);
    }

    const { count, error: verifyError } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true });

    if (verifyError) throw verifyError;

    console.log("Перенос завершён. Записей в PostgreSQL:", count);
    console.log("Исходный JSON сохранён. Не удаляй его пока.");
  } catch (error) {
    console.error("ОШИБКА ПЕРЕНОСА:", error.message);
    process.exitCode = 1;
  }
}

migrate();
