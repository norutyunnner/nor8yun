import RecentlyViewed from "./RecentlyViewed";
import AdUnit from "./AdUnit";
import PopularToday from "./PopularToday";


export default function Sidebar({ news }) {
    
 return (
  <div className="space-y-6 lg:sticky lg:top-24">
     
      <AdUnit />

      <PopularToday news={news} />

      <AdUnit />

      <RecentlyViewed news={news} />

      <AdUnit />

  </div> 
  )
}

