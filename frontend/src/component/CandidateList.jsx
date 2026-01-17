import { useContext, useEffect, useState } from 'react';
import Candidate from './Candidate';
import { AuthContext } from '../store/store';
import EmptyCMess from './EmptyCMess';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidateList = () => {
  const Api = import.meta.env.VITE_API_URL;
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [candidateList, setCandidatesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${Api}/candidate`, header);
        // Always protect state from bad API shape
        setCandidatesList(Array.isArray(response.data.response) ? response.data.response : []);
      } catch (error) {
        console.error('Error fetching candidate data:', error);
        setCandidatesList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [Api]);

  const handleAddButtonClick = () => {
    navigate('/addCandidate');
  };

  // Show loader while loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Loading candidates...</p>
        {/* Skeleton loaders */}
        <div className="w-full max-w-md space-y-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-4 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="w-20 h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show empty state only after loading completes
  if (candidateList.length === 0) {
    return <EmptyCMess />;
  }

  // Show data after loading completes
  return (
    <>
      {candidateList.map(
        (candidate) =>
          candidate?.name && (
            <Candidate key={candidate._id} {...candidate} userRole={userRole} />
          ),
      )}

      {userRole === 'admin' && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleAddButtonClick}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Candidate
          </button>
        </div>
      )}
    </>
  );
};

export default CandidateList;

// import React, { useContext, useEffect, useState } from 'react';
// import Candidate from './Candidate';
// import { AuthContext } from '../store/store';
// import EmptyCMess from './EmptyCMess';
// import { useNavigate } from 'react-router-dom';

// const CandidateList = () => {
//   const Api = import.meta.env.VITE_API_URL;
//   const { userRole } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [candidateList, setCandidatesList] = useState([]);

//   useEffect(() => {
//     // const token = JSON.parse(localStorage.getItem('token'));

//     // const header = {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`, // ✅ Pass the token in Authorization header
//     //   },
//     // };

//     fetch(`${Api}/candidate`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.response);
//         // setCandidatesList(data.response);
//         setCandidatesList(Array.isArray(data.response) ? data.response : []);
//       })
//       .catch((error) => {
//         console.error('Error fetching candidate data:', error);
//       });
//   }, []);

//   const handleAddButtonClick = () => {
//     navigate('/addCandidate');
//   };

//   return (

//     <>
//       {candidateList.length === 0 ? (
//         <EmptyCMess />
//       ) : (
//         <>
//           {candidateList.map((candidate) => (
//             <Candidate
//               key={candidate._id}
//               {...candidate}
//               userRole={userRole}
//               // candidatesName={candidate.name}
//               // party={candidate.party}
//               // image={candidate.image}
//               // candidate_Id={candidate._id}
//             />
//           ))}
//           {userRole === 'admin' ? (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={handleAddButtonClick}
//                 className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Add Candidate
//               </button>
//             </div>
//           ) : (
//             ''
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default CandidateList;
