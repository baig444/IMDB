/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Axios from "../utils/Axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Cards from "./Cards";
import { FaArrowLeft } from "react-icons/fa";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";

function Movies() {
  const navigate = useNavigate();
  const [movies, setmovies] = useState([]);
  const [category, setcategory] = useState("popular");
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);

  document.title = "Mx Player|| movies " + category.toUpperCase();
  const getMovies = async () => {
    try {
      const res = await Axios.get(`/movie/${category}?page=${page}`);
      if (res.data.results.length > 0) {
        setmovies((prev) => [...prev, ...res.data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = () => {
    if (movies.length === 0) {
      getMovies();
    } else {
      setpage(1);
      setmovies([]);
    }
  };

  useEffect(() => {
    refresh();
    getMovies();
  }, [category]);
  return movies.length > 0 ? (
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
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={getMovies}
        hasMore={true}
        loader={<Loading />}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movies;
