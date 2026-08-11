export default function KnopkiMenyu({ dlyaBalshix, onClickLink }) {
  const menu = [
    "Գլխավոր",
    "Քաղաքական",
    "Տնտեսություն",
    "Հանրայն",
    "Աշխարհ",
    "Մշակույթ",
    "Սպորտ",
  ];

  const classesDesktop = "hover:text-blue-500 hover:scale-110 active:scale-90 transition-transform duration-200 ease-in-out";
  const classesMobile = "hover:text-blue-700 transform hover:scale-98 transition-transform duration-200 ease-in-out";

  const containerClass = dlyaBalshix
    ? "hidden md:flex gap-6 font-medium"
    : "md:hidden bg-blue-100 px-4 pb-4 flex flex-col gap-4 font-medium shadow";

  const linkClass = dlyaBalshix ? classesDesktop : classesMobile;

  return (
    <nav className={containerClass}>
      {menu.map((item) => (
        <a
          key={item}
          href="#"
          onClick={(e) => onClickLink && onClickLink(e, item)}
          className={linkClass}
        >
          {item}
        </a>
      ))}
    </nav>
  );
}

