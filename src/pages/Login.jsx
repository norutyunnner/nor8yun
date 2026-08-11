import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } else {
      alert("Wrong login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow space-y-3 w-80">

        <input
          placeholder="Username"
          className="border w-full p-2"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border w-full p-2"
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2"
        >
          Login
        </button>

      </div>
    </div>
  );
}

console.log(import.meta.env.VITE_API_URL);