/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { asyncloadtv } from "../store/action/tvActions";
import { removetv } from "../store/reducers/tvSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import HorizontalCards from "../components/HorizontalCards";
import Loading from "./Loading";

function TvDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/w500/${info.detail.poster_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[150vh] px-[10%]"
    >
      {/* part1 Navigation  */}

      <nav className="w-full h-[10vh] text-zinc-200 flex items-center gap-6">
        <Link>
          <FaArrowLeft
            className="hover:text-[#6556CD] text-xl"
            onClick={() => navigate(-1)}
          />
        </Link>
        <a target="_blank" href={info.detail.homepage}>
          <FaEarthAfrica />
        </a>
        <a
          target="_blank"
          href={`https://www/wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <FaExternalLinkAlt />
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.detail.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* part2 Poster and details  */}
      <div className="w-full flex">
        <img
          className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.75)] rounded-md"
          src={`https://image.tmdb.org/t/p/w500/${
            info.detail.poster_path ||
            info.detail.backdrop_path ||
            info.detail.profile_path
          }`}
          alt=""
        />
        <div className="content ml-10">
          <h1 className="text-white text-5xl font-semibold">
            {info.detail.title || info.detail.name}

            <small>({info.detail.release_date})</small>
          </h1>
          <div className="flex mt-2 text-zinc-100 items-center gap-x-5">
            <span className=" rounded-full h-[7vh] w-[7vh] bg-yellow-400 text-white flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed(0)}%
            </span>
            <h1 className="font-semibold text-xl">User scrore</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((i) => i.name).join(", ")}</h1>
          </div>
          <h1 className="text-2xl font-semibold text-zinc-200 italic mt-2">
            {info.detail.tagline}
          </h1>

          <h1 className="text-xl font-semibold text-zinc-200 italic">
            Overview
          </h1>
          <p className="text-white mb-8">{info.detail.overview}</p>

          <Link
            className="py-3 px-6 bg-[#6556CD] rounded-md text-white"
            to={`${pathname}/trailer`}
          >
            Play Trailer
          </Link>
        </div>
      </div>
      {/* part3 platforms */}

      <div className="w-[80%] flex flex-col gap-y-5 mt-10 mb-5">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((i) => (
              <img
                title={i.provider_name}
                key={i.logo_path}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${i.logo_path}`}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((i) => (
              <img
                title={i.provider_name}
                key={i.logo_path}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${i.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available for Rent</h1>
            {info.watchproviders.rent.map((i) => (
              <img
                title={i.provider_name}
                key={i.logo_path}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${i.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>
      {/* part 4 Season and episodes */}

      <h1 className="text-3xl font-semibold text-zinc-200 mb-5">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
        {
          info.detail.seasons.map((sea)=>{
            <div className="w-[15vw]">
            <img
             key={sea.poster_path}
             className="h-[40vh] w-[15vw] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.75)] rounded-md"
             src={`https://image.tmdb.org/t/p/w500/${sea.poster_path}`} alt="" />
             <h1>
              {sea.name}
              </h1>
            </div>
          })
        }
      </div>



      {/* part5 Recommendation */}

      <h1 className="text-3xl font-semibold text-zinc-200 mb-5">
        Recommendations & Similar
      </h1>
      <HorizontalCards
        data={info.recommendations ? info.recommendations : info.similar}
      />
      <Outlet/>
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
