import axios from 'axios';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../store/store';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const Api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserRole } = useContext(AuthContext);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.post(`${Api}/logout`);
        console.log(response.data);
        localStorage.removeItem('token'); // 🧹 Delete the token
        toast.success('logout Successfully');
        setIsLoggedIn(false); // ❌ Update your auth state
        setUserRole(null); // 🧽 Clear any other user info
        navigate('/login');
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
    };
    checkLoginStatus();
  }, [Api, navigate, setIsLoggedIn, setUserRole]);
}

export default Logout;
