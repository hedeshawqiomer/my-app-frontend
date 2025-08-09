import { Navigate } from "react-router-dom";
import { isAuthed } from "../utills/Auth"; // Adjust the import path as necessary

export default function ProtectedRoute({ children }) {
  return isAuthed() ? children : <Navigate to="/AdminLogin" replace />;
}
