import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // const token = JSON.parse(localStorage.getItem('token'));
  
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
