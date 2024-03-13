import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { removeperson } from "../store/reducers/personSlice";
import { useEffect } from "react";
import { asyncloadperson } from "../store/action/peopleActions";
import { FaArrowLeft } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import Loading from "./Loading";

function PersonDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[10%] w-screen flex flex-col">
      {/* part1 Navigation  */}

      <nav className="w-full h-[10vh] text-zinc-200 flex items-center gap-6">
        <Link>
          <FaArrowLeft
            className="hover:text-[#6556CD] text-xl"
            onClick={() => navigate(-1)}
          />
        </Link>
      </nav>
      <div className="w-full flex">
        {/* part2 left poster and Details */}

       <div className="w-[25%] flex flex-col ">
       <img
          className="h-[40vh] w-[62%] object-contain shadow-[8px_17px_38px_2px_rgba(0,0,0,0.75)] rounded-md"
          src={`https://image.tmdb.org/t/p/w500/${
            info.detail.poster_path ||
            info.detail.backdrop_path ||
            info.detail.profile_path
          }`}
          alt=""
        />
        
        {/* Social Media Links */}

        <div className="text-2xl text-white flex gap-x-10 mt-3">
        <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
        <FaFacebookSquare className="hover:text-[#6556CD]" />
        </a>
        <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
        <FaInstagram className="hover:text-[#6556CD]" />
        </a>
        <a target="_blank" href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
        <FaXTwitter className="hover:text-[#6556CD]" />
        </a>
        </div>
        {/* Personal Information  */}
        <h1 className="text-2xl text-white mt-2">{info.detail.name}</h1>
        <h1 className="text-xl text-white mt-2">{info.detail.known_for_department}</h1>
        <h1 className="text-xl text-white mt-2">{info.detail.gender === 2 ? "male" : "Female"}</h1>
        <h1 className="text-xl text-white mt-2">Birtday: {info.detail.birthday}</h1>
        <h1 className="text-xl text-white mt-2">Deathday: {info.detail.deathday ? info.detail.deathday : "Still Alive"}</h1>
        <h1 className="text-xl text-yellow-400 mt-2">Place of Birth: {info.detail.place_of_birth}</h1>
       </div>

       {/* part3 right Details and Information   */}
       <div className="w-[75%] h-full">
       <h1 className="text-3xl text-white">Biography</h1>
       <p className="text-white">{info.detail.biography}</p>
       </div>

      </div>
    </div>
  ): <Loading/>
}

export default PersonDetails
