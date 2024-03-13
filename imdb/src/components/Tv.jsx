/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import  Axios  from "../utils/Axios"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"
import Cards from "./Cards"
import Dropdown from "./Dropdown"
import Topnav from "./Topnav"
import { FaArrowLeft } from "react-icons/fa"


function Tv() {
    const navigate = useNavigate()
    const [tvShow, settvShow] = useState([])
    const [category, setcategory] = useState("airing_today")
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(1)

    document.title = "Mx Player || tv show " + category.toUpperCase()
    const gettvShows = async () => {
      try {
        const res = await Axios.get(
          `/tv/${category}?page=${page}`
        )
        if (res.data.results.length > 0) {
          settvShow((prev) => [...prev, ...res.data.results])
          setpage(page + 1)
        }else{
          sethasMore(false)
        }
      }catch (error) {
        console.log(error)
      }
    }

    const refresh = () => {
      if (tvShow.length === 0) {
        gettvShows()
      }else{
        setpage(1)
        settvShow([])
      }
    }

    useEffect(() => {
      refresh()
      gettvShows()
    }, [category])
    
  return tvShow.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
      <h1 className="text-xl font-semibold text-zinc-400 flex items-center gap-6">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD]"
          />
          Tv Show {category.toUpperCase()}
        </h1>
        <Topnav />

        <Dropdown title="Category" options={["airing_today","on_the_air","popular","top_rated"]} func={(e)=>setcategory(e.target.value)}/>
      </div>
      <InfiniteScroll
      dataLength={tvShow.length}
      next={gettvShows}
      hasMore={true}
      loader={<Loading />}
      >
      <Cards data={tvShow} title="tv" />
      </InfiniteScroll>
    </div> 
    ): <Loading/>
}

export default Tv
