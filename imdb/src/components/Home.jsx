/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from "./Sidebar"
import Topnav from "./Topnav"
import Axios from "../utils/Axios"
import { useEffect, useState } from "react";
import Header from "./Header";
import HorizontalCards from "./HorizontalCards";
import Dropdown from './Dropdown'
import Loading from "./Loading";

function Home() {
    document.title = "MovieExpo. || Home"

    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("all");

    const headerWallpaper = async () => {
      try {
        const data = await Axios.get(`/trending/all/day?language=en-US`,{
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzI1YjMyNTFhMzIyMWYxOWNmZmQyY2QyNzc5NDM1ZSIsInN1YiI6IjY1ZTljMmE4MzM5NmI5MDE4Njg0YWU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TIYrrovWv_4jt1AHFpL4amNYduyu33Ka3AVm22n_XL0'
          }
        })
        let randomdata = data.data.results[Math.floor(Math.random() * data.data.results.length)]
        setWallpaper(randomdata)
      }
      catch(error) {
        console.log(error);
      }
    }

    const GetTrending = async () => {
      try {
        const data = await Axios.get(`/trending/${category}/day`,{
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzI1YjMyNTFhMzIyMWYxOWNmZmQyY2QyNzc5NDM1ZSIsInN1YiI6IjY1ZTljMmE4MzM5NmI5MDE4Njg0YWU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TIYrrovWv_4jt1AHFpL4amNYduyu33Ka3AVm22n_XL0'
          }
        })
        setTrending(data.data.results) 
        console.log(data.data.results)
      }
      catch(error) {
        console.log(error);
      }
    }

    useEffect(() => {
      GetTrending()
     !wallpaper && headerWallpaper()
    },[category])

  return wallpaper && trending ? (
    <>
    <Sidebar />
     <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
      <Topnav />
      <Header data={wallpaper}  />
      <div className="mb-8 flex justify-between items-center mt-2 px-4">
        <h1 className="text-3xl font-bold text-zinc-200">Trending</h1>
        <Dropdown title="Filter" options={["tv", "movie","all"]} func={(e)=>setCategory(e.target.value)}/>
     </div>
      <HorizontalCards data={trending} title={category}/>
      </div> 
    </>
  ) : <Loading />
}

export default Home
