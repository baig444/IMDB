/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function HorizontalCards({ data, title }) {
  return (
    <div className="w-[100%] flex h-[40vh] overflow-y-hidden px-4">
      {data.map((item, i) => (
        <Link 
        to={`/${item.media_type || title }/details/${item.id}`}
          key={i}
          className="min-w-[17%] bg-zinc-900 mr-5 rounded-md hover:scale-105 duration-300"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
            alt=""
            className="w-full object-cover h-[55%]"
          />
          <h1 className="text-white text-xl mx-2">
            {item.original_title || item.original_name}
          </h1>
          <p className="text-zinc-400 text-[15px] mx-2">
            {item.overview.slice(0, 40)}...
            <Link className="text-blue-400">More</Link>
          </p>
        </Link>
      ))}
    </div>
  );
}

export default HorizontalCards;
