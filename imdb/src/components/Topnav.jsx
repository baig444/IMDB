/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Axios from "../utils/Axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Topnav() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);

  const getSearch = async () => {
    try {
      const data = await Axios.get(`/search/multi?query=${query}`);
      setSearch(data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);
  return (
    <div className="w-full h-[10vh] relative  flex items-center justify-center">
      <CiSearch className="text-2xl text-zinc-400" />
      <input
        className="w-[50%] h-[40px] bg-transparent border-none outline-none text-white text-xl px-4"
        type="text"
        placeholder="search anything"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      {query.length > 0 && (
        <RxCross2
          className="text-2xl text-zinc-400 cursor-pointer"
          onClick={() => setQuery("")}
        />
      )}

      <div className=" z-9 w-[60%] absolute max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto">
        {search.length > 0 &&
          search.map((item) => (
            <Link
              to={`/${item.media_type || "tv"}/details/${item.id}`}
              key={item}
              className="w-full flex items-center p-6 justify-start border-b-2 border-zinc-100 bg-slate-300 hover:bg-zinc-300 text-zinc-600 hover:text-black duration-200"
            >
              <img
              className="w-[10vh] h-[10vh] object-cover rounded-md mr-2 shadow-lg" 
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt=""
              />
              <span>
                {item.name ||
                  item.title ||
                  item.original_name ||
                  item.original_title}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Topnav;
