
export default function Footer() {
 return(
  <footer className="bg-blue-500 border-t mt-12">
  <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-white text-sm ">
    <p>© 2026 | Nor8yun | . Все права защищены.</p>
    <div className="flex gap-4 mt-2 md:mt-0 ">
      <a href="" className=" hover:text-blue-900 transition-transform duration-200 transform hover:scale-110 font-medium">Facebook</a>
      <a href="#" className="hover:text-red-700 transition-transform duration-200 transform hover:scale-110 font-medium">Instagram</a>
      <a href="#" className="hover:text-blue-200 transition-transform duration-200 transform hover:scale-110 font-medium">Telegram</a>
      <a href="#" className="hover:text-black transition-transform duration-200 transform hover:scale-110 font-medium">| Политика конфиденциальности</a>
    </div>
  </div>
  </footer>
 );
}