/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Topnav from "./Topnav"
import Dropdown from "./Dropdown"
import { useEffect, useState } from "react"
import Axios from "../utils/Axios"
import Loading from "./Loading"
import Cards from "./Cards"
import InfiniteScroll from "react-infinite-scroll-component"
const Popular = () => {
    const navigate = useNavigate()
    const [category, setcategory] = useState("all")
    const [popular, setpopular] = useState([])
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(1)

    document.title = "Mx Player || Popular " + category.toUpperCase()
    const getPopular = async () => {
      try {
        const res = await Axios.get(
          `/trending/${category}/day?page=${page}`
        )
        if (res.data.results.length > 0) {
          setpopular((prev) => [...prev, ...res.data.results])
          setpage(page + 1)
        }else{
          sethasMore(false)
        }
      }catch (error) {
        console.log(error)
      }
    }

    const refresh = () => {
      if (popular.length === 0) {
        getPopular()
      }else{
        setpage(1)
        setpopular([])
      }
    }

    useEffect(() => {
      refresh()
      getPopular()
    },[category])
  return popular.length > 0 ?  (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
      <h1 className="text-xl font-semibold text-zinc-400 flex items-center gap-6">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD]"
          />
          Popular {category.toUpperCase()}
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
      dataLength={popular.length}
      next={getPopular}
      hasMore={true}
      loader={<Loading />}
      >
      <Cards data={popular} title="Popular" />
      </InfiniteScroll>
    </div>
  ): <Loading/>
}

export default Popular
