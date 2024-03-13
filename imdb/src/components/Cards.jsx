/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function Cards({ data, title }) {
  return (
    <div className=" relative w-full flex flex-wrap mt-8 gap-y-6 gap-6 bg-[#1F1E24] px-[3%]">
      {data.map((item, i) => (
        <Link
          to={`/${item.media_type || title}/details/${item.id}`}
          className=" relative w-[30vh] mb-[5%] hover:scale-105 duration-300"
          key={i}
        >
          <img
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.75)] rounded-md"
            src={`https://image.tmdb.org/t/p/w500/${
              item.poster_path || item.backdrop_path || item.profile_path
            }`}
            alt=""
          />
          <h1 className="text-zinc-400 text-xl mt-3 font-semibold">
            {item.title || item.original_name}
          </h1>

          {title !== "People" && (
            <div className="absolute right-[3%] bottom-[30%] rounded-full h-[7vh] w-[7vh] bg-yellow-400 text-white flex justify-center items-center">
              {(item.vote_average * 10).toFixed(0)}%
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
