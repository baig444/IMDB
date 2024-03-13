/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Topnav from "./Topnav";
import { useEffect, useState } from "react";
import axios from "../utils/Axios";
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
function Trending() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "IMDB || Trending " +  category.toUpperCase();

  const getTrending = async () => {
    try {
      const data = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.data.results.length > 0) {
        settrending((prev) => [...prev, ...data.data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(trending);

  const refresh = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
    }
  };

  useEffect(() => {
    refresh();
    getTrending();
  }, [category, duration]);
  return trending.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
        <h1 className="text-xl font-semibold text-zinc-400 flex items-center gap-6">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD]"
          />
          Trending {category.toUpperCase()}
        </h1>

        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setcategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setduration(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={true}
        loader={<Loading />}
      >
        <Cards data={trending} title="Trending" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
