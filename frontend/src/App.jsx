import { useEffect, useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';

import Navbar from './component/Navbar';
import Logout from './component/Logout';
import axios from 'axios';
import { AuthContext } from './store/store';
import MainPage from './component/MainPage';
import Profile from './component/Profile';
import CandidateList from './component/CandidateList';
import VoteCount from './component/VoteCount';
import UpdateCandidate from './component/UpdateCandidate';
import Signup from './component/Signup';
import FAQ from './component/FAQ';
import HowItWorks from './component/HowItWorks';
import Contact from './component/Contact';
import ProtectedRoute from './component/ProtectedRoute';
import LoadingOverlay from './component/LoadingOverlay';
axios.defaults.withCredentials = true;

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/result" element={<VoteCount />} />
        <Route path="/candidate" element={<CandidateList />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/updateCandidate" element={<UpdateCandidate mode="edit" />} />
        <Route path="/addCandidate" element={<UpdateCandidate mode="create" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/howItWorks" element={<HowItWorks />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Toaster />
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userRole, setUserRole] = useState();
  const [candidateId, setCandidateId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const Api = import.meta.env.VITE_API_URL;
  
  // Track pending requests to prevent flicker
  const pendingRequests = useRef(0);
  const loadingTimeoutRef = useRef(null);

  // Set up Axios interceptors
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Increment pending requests
        pendingRequests.current += 1;
        
        // Clear any existing timeout
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
        
        // Show loading overlay immediately
        setIsLoading(true);
        
        return config;
      },
      (error) => {
        pendingRequests.current = Math.max(0, pendingRequests.current - 1);
        if (pendingRequests.current === 0) {
          setIsLoading(false);
        }
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Decrement pending requests
        pendingRequests.current = Math.max(0, pendingRequests.current - 1);
        
        // Hide loading overlay when all requests complete
        if (pendingRequests.current === 0) {
          // Small delay to prevent flicker on fast requests
          loadingTimeoutRef.current = setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }
        
        return response;
      },
      (error) => {
        // Decrement pending requests even on error
        pendingRequests.current = Math.max(0, pendingRequests.current - 1);
        
        // Hide loading overlay when all requests complete
        if (pendingRequests.current === 0) {
          loadingTimeoutRef.current = setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }
        
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Initial authentication check
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem('token'));

        if (token) {
          setIsLoggedIn(true);
          const header = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          try {
            const response = await axios.get(`${Api}/profile`, header);
            console.log(response.data.userData);
            setUserRole(response.data.userData.role);
          } catch (error) {
            // If profile fetch fails, user might not be authenticated
            setIsLoggedIn(false);
            localStorage.removeItem('token');
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error('Error checking session:', error);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [Api]);

  // Show overlay if loading or auth checking
  const showOverlay = isLoading || authLoading;

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          userRole,
          setUserRole,
          candidateId,
          setCandidateId,
        }}
      >
        {showOverlay && <LoadingOverlay />}
        <Navbar />
        <Routing />
      </AuthContext.Provider>
    </>
  );
}

export default App;
