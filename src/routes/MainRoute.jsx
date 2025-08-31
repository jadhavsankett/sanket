import Home from '../pages/Home'
import About from '../pages/About'
import Collection from '../pages/Collection'
import NotFound from '../pages/NotFound'
import { Route, Routes } from 'react-router-dom'
// import Loader from '../componets/Loader'
// import AboutPopup from '../componets/About/AboutPopup'

const MainRoute = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/loader" replace />} />
        <Route path="/loader" element={<Loader />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default MainRoute
