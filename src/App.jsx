import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CityCategories from './components/CityCatgories';
import UserPost from './components/UserPost'; // ✅ Add this
import Admin from "./components/Admin"
import SubmittedPosts from './components/Form/SubmittedPosts'; // ✅ Add this

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/city-categories" element={<CityCategories />} />
      <Route path="/UserPost" element={<UserPost />} /> 
            <Route path="/Admin" element={<Admin />} />{/* ✅ Add this */}
                  <Route path="/SubmittedPosts" element={<SubmittedPosts />} />
    </Routes>
  );
}

export default App;
