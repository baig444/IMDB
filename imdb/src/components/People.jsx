/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "../utils/Axios"
import { FaArrowLeft } from "react-icons/fa"
import Topnav from "./Topnav"
import InfiniteScroll from "react-infinite-scroll-component"
import Loading from "./Loading"
import Cards from "./Cards"


function People() {
  const navigate = useNavigate()
    const [people, setpeople] = useState([])
    const [category, setcategory] = useState("popular")
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(1)

    document.title = "Mx Player || people " + category.toUpperCase()
    const getPeople = async () => {
      try {
        const res = await Axios.get(
          `/person/${category}?page=${page}`
        )
        if (res.data.results.length > 0) {
          setpeople((prev) => [...prev, ...res.data.results])
          setpage(page + 1)
        }else{
          sethasMore(false)
        }
      }catch (error) {
        console.log(error)
      }
    }

    const refresh = () => {
      if (people.length === 0) {
        getPeople()
      }else{
        setpage(1)
        setpeople([])
      }
    }

    useEffect(() => {
      refresh()
      getPeople()
    }, [category])
  return people.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
        <h1 className="text-xl font-semibold text-zinc-400 flex items-center gap-6">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD]"
          />
          Movies ({category.toUpperCase()})
        </h1>
        <Topnav />
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={true}
        loader={<Loading />}
      >
        <Cards data={people} title="People" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  )
}

export default People
