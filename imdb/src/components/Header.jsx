/* eslint-disable react/prop-types */
import { HiSpeakerphone } from "react-icons/hi";
import { GrMultimedia } from "react-icons/gr";
import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="w-full h-[60vh] flex flex-col items-start justify-end p-[5%]"
    >
      <h1 className="text-white text-4xl font-bold">{data.original_title}</h1>
      <p className="text-white w-[50%]">
        {data.overview.slice(0, 150)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">More</Link>
      </p>
      <div className="text-white flex items-center gap-8 mt-2">
        <p className="flex items-center gap-2">
          <HiSpeakerphone className="text-[#FFFF00]" />
          {data.release_date || "N/A"}
        </p>
        <p className="flex items-center gap-2">
          <GrMultimedia className="text-[#FFFF00]" />
          {data.media_type}
        </p>
      </div>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="bg-[#6556CD] text-white p-3 rounded-sm mt-4">
        Watch trailer
      </Link>
    </div>
  );
}

export default Header;
