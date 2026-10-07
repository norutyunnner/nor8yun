
export default function Footer() {
  
  return (
    <footer className="bg-blue-500 border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            © 2026 | Nor8yun | Все права защищены.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="Facebook"
              className="transition-transform duration-200 hover:scale-125 hover:text-blue-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1z" />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="transition-transform duration-200 hover:scale-125 hover:text-pink-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Telegram"
              className="transition-transform duration-200 hover:scale-125 hover:text-blue-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.5c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8l3.1-14.6c.3-1.4-.5-2-1.3-1.4zM8.1 13.3l10.6-6.7c.5-.3 1-.1.6.2l-8.7 7.9-.3 3.2-1.7-4.6-3.6-1.1 3.1-1.1z" />
              </svg>
            </a>
          </div>

          <div className="w-full md:w-auto text-center md:border-t-0 border-t border-blue-400 pt-4 md:pt-0">
            <a
              href="#"
              className="text-sm font-medium hover:text-black transition-colors duration-200"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}