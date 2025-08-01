import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CityCategories from './components/CityCatgories';
import UserPost from './components/UserPost'; // ✅ Add this
import Admin from "./components/admin"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/city-categories" element={<CityCategories />} />
      <Route path="/UserPost" element={<UserPost />} /> 
            <Route path="/admin" element={<Admin />} />{/* ✅ Add this */}
    </Routes>
  );
}

export default App;
