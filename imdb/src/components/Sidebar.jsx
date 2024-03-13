import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaFire } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { RiTv2Fill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiUser3Fill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="w-[20%] h-full border-r-[1.5px] border-slate-400 p-8">
      <h1 className="text-2xl text-white font-bold flex items-center">
        <PiTelevisionSimpleFill className="text-[#6556CD]" />
        <span className="text-xl ml-2">MX Player.</span>
      </h1>
      <nav className="flex flex-col  gap-2 text-zinc-400">
        <h1 className="text-xl font-regular mt-8 mb-3 text-white">
          News Feed
        </h1>
        <Link to="/trending" className="hover:bg-[#6556CD] duration-200 p-2 flex items-center gap-3 hover:text-white rounded-lg">
          <FaFire /> Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#6556CD] duration-200 p-2 flex items-center gap-3 hover:text-white rounded-lg">
          <FaHeart />
          Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#6556CD] duration-200 p-2 flex items-center gap-3 hover:text-white rounded-lg">
          <MdLocalMovies />
          Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#6556CD] duration-200 p-2 flex items-center gap-3 hover:text-white rounded-lg">
          <RiTv2Fill />
          Tv Shows
        </Link>
        <Link to="/people" className="hover:bg-[#6556CD] duration-200 p-2 flex items-center gap-3 hover:text-white rounded-lg">
          <BsFillPeopleFill />
          People
        </Link>
      </nav>
      <hr className="bg-transparent mt-2" />
      <nav className="flex flex-col gap-2 text-zinc-400">
        <h1 className="text-xl font-regular mt-2 text-white">
          Information
        </h1>
        <Link className="hover:bg-[#6556CD] duration-200 p-2 flex items-center gap-3 hover:text-white rounded-lg">
        <RiUser3Fill /> About
        </Link>
        <Link className="hover:bg-[#6556CD] duration-200 p-2 flex items-center gap-3 hover:text-white rounded-lg">
        <FaPhone />
          Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
