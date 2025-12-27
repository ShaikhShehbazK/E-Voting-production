import { useContext, useEffect, useState } from 'react';
import Candidate from './Candidate';
import { AuthContext } from '../store/store';
import EmptyCMess from './EmptyCMess';
import { useNavigate } from 'react-router-dom';

const CandidateList = () => {
  const Api = import.meta.env.VITE_API_URL;
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [candidateList, setCandidatesList] = useState([]);

  useEffect(() => {
    fetch(`${Api}/candidate`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Always protect state from bad API shape
        setCandidatesList(Array.isArray(data.response) ? data.response : []);
      })
      .catch((error) => {
        console.error('Error fetching candidate data:', error);
      });
  }, [Api]);

  const handleAddButtonClick = () => {
    navigate('/addCandidate');
  };

  return (
    <>
      {candidateList.length === 0 ? (
        <EmptyCMess />
      ) : (
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
