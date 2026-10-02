import { useEffect, useState } from "react";

export default function FullScreenAd() {
  const [visible, setVisible] = useState(false);
  
/*localStorage.removeItem("fullscreen_ad_last_shown");
localStorage.removeItem("ad_smartlink_clicked");
localStorage.removeItem("ad_click_timestamp");
*/

  useEffect(() => {
    const lastShown = localStorage.getItem("fullscreen_ad_last_shown");
    const now = Date.now();

    // Первый визит — показываем через 3 секунды
    if (!lastShown) {
      const timer = setTimeout(() => {
        setVisible(true);
        localStorage.setItem(
          "fullscreen_ad_last_shown",
          Date.now().toString()
        );
      }, 3000);

      return () => clearTimeout(timer);
    }

    // Следующий показ — через 10 минут
    const tenMinutes = 10 * 60 * 1000;
    const elapsed = now - parseInt(lastShown);
    const remaining = tenMinutes - elapsed;

    if (remaining <= 0) {
      setVisible(true);
      localStorage.setItem(
        "fullscreen_ad_last_shown",
        now.toString()
      );

      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
      localStorage.setItem(
        "fullscreen_ad_last_shown",
        Date.now().toString()
      );
    }, remaining);

    return () => clearTimeout(timer);
  }, []);

  // Adsterra
  useEffect(() => {
    if (!visible) return;

    window.atOptions = {
      key: "5286cf56e0b0ac2dd30d2a7dcb868d7d",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");

    script.src =
      "https://bauval.org/22/5286cf56e0b0ac2dd30d2a7dcb868d7d";

    script.async = true;

    const container = document.getElementById("adsterra-container");

    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[60]">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-xl">

        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-800 hover:scale-75 text-3xl"
          onClick={() => setVisible(false)}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-3 text-center">
       !!! Հարգելի՛ հաճախորդ !!!
        </h2>

        <p className="text-gray-700 text-center">
       Մեր կայքի գովազդային բոլոր փաթեթները ձեռք են բերվում adsterra.com կայքից։ 
       Խարդախություններից և անարդարություններից զերծ մնալու համար խնդրում ենք երբեք չտրամադրել Ձեր անձնական կամ բանկային քարտի տվյալները անհայտ անձանց։</p>
        <div
          id="adsterra-container"
          className="flex justify-center mb-4 overflow-hidden"
          style={{
            minHeight: "250px",
            width: "100%",
          }}
        ></div>
            <p className="text-gray-700 text-center">Սիրով՝ nor8yun.am լրատվական։</p>

      </div>
    </div>
  );
}
