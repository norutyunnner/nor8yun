import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import KnopkiMenyu from "./KnopkiMenyu";

export default function Header({ setActiveCategory }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (e, category) => {
    e.preventDefault();
    setOpen(false);

    if (setActiveCategory) {
      setActiveCategory(category);
    }

    if (category === "Գլխավոր") {
      if (window.location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else {
      navigate(`/category/${category}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="bg-gray-100 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <img
          src="/N8.png"
          alt="N8"
          className="h-10 hidden md:block lg:hidden"
        />

        <Link to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition transform hover:scale-90 lg:block md:hidden"
        >
          | Նոր8յուն |
        </Link>

        <KnopkiMenyu dlyaBalshix onClickLink={handleLinkClick} />

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="hover:scale-120 transition duration-200"
          >
            <img src="/N8.png" alt="N8" className="h-10 active:scale-70 transition" />
          </button>
        </div>
      </div>

      {open && <KnopkiMenyu dlyaMobil onClickLink={handleLinkClick} />}
    </header>
  );
}


