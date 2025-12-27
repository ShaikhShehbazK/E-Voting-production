import { useEffect, useState } from 'react';
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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userRole, setUserRole] = useState(null);
  // const [authLoading, setAuthLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userRole, setUserRole] = useState();
  const [candidateId, setCandidateId] = useState();
  const Api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const header = {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Pass the token in Authorization header
        },
      };
      if (token) {
        setIsLoggedIn(true);
      }

      axios.get(`${Api}/profile`, header).then((response) => {
        console.log(response.data.userData);
        setUserRole(response.data.userData.role);
      });
    } catch (error) {
      setIsLoggedIn(false);
      console.error('Error checking session:', error);
    }
  }, [Api]);

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
        <Navbar />
        <Routing />
      </AuthContext.Provider>
    </>
  );
}

export default App;
