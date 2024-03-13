import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Notfound from "./Notfound";
function Trailer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return ytvideo ? (
    <div className="bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute top-[1%] right-[2%] text-3xl text-white hover:text-[#6556CD]"
      >
        <RxCross2 />
      </Link>
      <ReactPlayer
        height={500}
        width={1200}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
    </div>
  ) : (
    <Notfound />
  );
}

export default Trailer;
