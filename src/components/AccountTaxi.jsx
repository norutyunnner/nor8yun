import React, { useState } from "react";

export default function AccountTaxi({ onClose, onSuccess }) {
  const [mode, setMode] = useState("choose");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    setError("");

    if (!phone || !password || !repeatPassword) {
      setError("Заполните все поля.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    const accounts = JSON.parse(
      localStorage.getItem("taqsiAccounts") || "[]"
    );

    const existingAccount = accounts.find(
      (account) => account.phone === phone
    );

    if (existingAccount) {
      setError("Этот номер уже зарегистрирован.");
      return;
    }

    accounts.push({
      phone,
      password,
    });

    localStorage.setItem(
      "taqsiAccounts",
      JSON.stringify(accounts)
    );

    onSuccess();
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (!phone || !password) {
      setError("Введите номер телефона и пароль.");
      return;
    }

    const accounts = JSON.parse(
      localStorage.getItem("taqsiAccounts") || "[]"
    );

    const account = accounts.find(
      (item) =>
        item.phone === phone &&
        item.password === password
    );

    if (!account) {
      setError("Номер телефона или пароль неправильный.");
      return;
    }

    onSuccess();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/15 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition text-xl"
        >
          ×
        </button>

        {mode === "choose" && (
          <div className="text-center">
            <div className="text-5xl mb-4 font-black text-blue-900 drop-shadow-[0_3px_2px_rgba(0,0,0,0.25)]">
  T8
</div>

            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Добро пожаловать
            </h2>

            <p className="text-gray-500 mb-7">
              Войдите или зарегистрируйтесь
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition"
              >
                Войти
              </button>

              <button
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className="w-full py-4 bg-gray-100 text-gray-900 rounded-2xl font-bold hover:bg-gray-200 transition"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        )}

        {mode === "login" && (
          <form onSubmit={handleLogin}>
            <button
              type="button"
              onClick={() => {
                setMode("choose");
                setError("");
              }}
              className="text-sm text-gray-500 hover:text-black mb-5"
            >
              ← Назад
            </button>

            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Вход
            </h2>

            <p className="text-gray-500 mb-6">
              Введите данные аккаунта
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Номер телефона
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+374 00 00 00 00"
                  className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Пароль
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm font-semibold text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-6 py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition"
            >
              Войти
            </button>
          </form>
        )}

        {mode === "register" && (
          <form onSubmit={handleRegister}>
            <button
              type="button"
              onClick={() => {
                setMode("choose");
                setError("");
              }}
              className="text-sm text-gray-500 hover:text-black mb-5"
            >
              ← Назад
            </button>

            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Регистрация
            </h2>

            <p className="text-gray-500 mb-6">
              Создайте новый аккаунт
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Номер телефона
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+374 00 00 00 00"
                  className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Пароль
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Придумайте пароль"
                  className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Повторите пароль
                </label>

                <input
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Повторите пароль"
                  className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm font-semibold text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-6 py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition"
            >
              Зарегистрироваться
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
