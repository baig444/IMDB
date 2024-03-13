import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import Tv from './components/Tv'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PersonDetails from './components/PersonDetails'
import Trailer from './components/Trailer'
import Notfound from './components/Notfound'
import Preloader from './components/Preloader'
function App() {
  return (
    <div className=" bg-[#1F1E24] w-screen h-screen flex">
      <Preloader/> 
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/trending" element={<Trending />}/>
      <Route path="/popular" element={<Popular />}/>
      <Route path="/movie" element={<Movies />}/>
      <Route path="/movie/details/:id" element={<MovieDetails />}>
        <Route path='/movie/details/:id/trailer' element={<Trailer />}/>
      </Route>
      <Route path="/tv" element={<Tv />}/>
      <Route path="/tv/details/:id" element={<TvDetails />}/>
      <Route path="/people" element={<People />}/>
      <Route path="/people/details/:id" element={<PersonDetails />}/>
      <Route path="*" element={<Notfound/>}/>
      </Routes>
    </div>
  )
}

export default App
