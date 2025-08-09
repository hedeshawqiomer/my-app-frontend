import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CityCategories from './components/CityCatgories';
import UserPost from './components/UserPost';
import Admin from "./components/Admin";
import SubmittedPosts from "./components/SubmittedPosts";
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/city-categories" element={<CityCategories />} />
      <Route path="/UserPost" element={<UserPost />} /> 
      <Route path="/SubmittedPosts" element={<SubmittedPosts />} />

      {/* Login page (public) */}
      <Route path="/AdminLogin" element={<AdminLogin />} />

      {/* Admin page (protected) */}
      <Route
        path="/Admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
