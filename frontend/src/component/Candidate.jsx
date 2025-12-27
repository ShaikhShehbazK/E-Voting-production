import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/store';
import axios from 'axios';
import toast from 'react-hot-toast';
import defaultImage from '/image2.webp';
import PropTypes from 'prop-types';

const Candidate = ({ name, party, userRole, _id, image }) => {
  const { setCandidateId, isLoggedIn } = useContext(AuthContext);
  const Api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleId = (id) => {
    setCandidateId(id);
    navigate('/updateCandidate');
  };

  const handleVoteButtonClick = async (voteId) => {
    if (!isLoggedIn) {
      toast('You must Login before Vote', { duration: 3000 });
      navigate('/login');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const header = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(`${Api}/candidate/vote/${voteId}`, {}, header);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data || 'Voting failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const header = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.delete(`${Api}/candidate/${id}`, header);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error('Delete failed');
    }
  };

  const handleControl = () => {
    if (userRole === 'admin') {
      return (
        <>
          <Link to="/updateCandidate">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
              onClick={() => handleId(_id)}
            >
              Edit
            </button>
          </Link>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => handleDelete(_id)}
          >
            Delete
          </button>
        </>
      );
    }

    return (
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        onClick={() => handleVoteButtonClick(_id)}
      >
        Vote
      </button>
    );
  };

  return (
    <div className="flex justify-center my-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg">
        <div className="flex items-center gap-4 p-4 border-b">
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
            src={image || defaultImage}
            alt="candidate"
          />

          <div className="flex-1">
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-xs uppercase opacity-60">{party}</div>
          </div>

          {handleControl()}
        </div>
      </div>
    </div>
  );
};

Candidate.propTypes = {
  name: PropTypes.string,
  party: PropTypes.string,
  userRole: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  image: PropTypes.string,
};

Candidate.defaultProps = {
  name: 'Unknown',
  party: 'Independent',
};

export default Candidate;

// import { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../store/store';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import defaultImage from '/image2.webp';

// const Candidate = ({ name, party, userRole, _id, image }) => {
//   const { setCandidateId, isLoggedIn } = useContext(AuthContext);
//   const Api = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate();
//   const handleId = async (Id) => {
//     setCandidateId(Id);
//     navigate('/updateCandidate');
//   };

//   const handleVoteButtonClick = async (voteId) => {
//     if (!isLoggedIn) {
//       toast('You must Login before Vote', {
//         duration: 3000,
//       });
//       navigate('/login');
//     } else {
//       try {
//         const token = JSON.parse(localStorage.getItem('token'));

//         const header = {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ Pass the token in Authorization header
//           },
//         };
//         const response = await axios.post(`${Api}/candidate/vote/${voteId}`, {}, header);
//         console.log(response.data.message);
//         toast.success(response.data.message);
//         // ⏳ Reload after 1 seconds
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       } catch (error) {
//         console.log(error.response.data);
//         toast.error('Error: ' + error.response.data);
//         // toast.error(error.response?.data?.error || "Voting failed");
//       }
//     }
//   };

//   const handleDelete = async (Id2) => {
//     console.log(Id2);
//     try {
//       const token = JSON.parse(localStorage.getItem('token'));

//       const header = {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ Pass the token in Authorization header
//         },
//       };

//       const response = await axios.delete(`${Api}/candidate/${Id2}`, header);
//       console.log(response.data.message);
//       toast.success(response.data.message);
//       // ⏳ Reload after 1 seconds
//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);
//     } catch (error) {
//       console.log(error);
//       toast.error('Error: ' + error);
//     }
//   };

//   const handleControl = () => {
//     if (userRole === 'admin') {
//       return (
//         <>
//           <Link to="/updateCandidate">
//             <button
//               className="badge badge-success bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
//               onClick={() => handleId(_id)}
//             >
//               Edit
//             </button>
//           </Link>
//           <button
//             className="badge badge-success bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
//             onClick={() => handleDelete(_id)}
//           >
//             Delete
//           </button>
//         </>
//       );
//     } else {
//       return (
//         <button
//           className="badge badge-success bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
//           onClick={() => handleVoteButtonClick(_id)}
//         >
//           Vote
//         </button>
//       );
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center my-6">
//         <div className="w-full max-w-md">
//           <ul className="bg-base-100 rounded-xl shadow-lg">
//             <li className="flex items-center gap-4 px-6 py-4 border-b last:border-b-0">
//               {image ? (
//                 <img
//                   className="w-12 h-12 rounded-full object-cover border-2 border-primary"
//                   src={image}
//                   alt=""
//                 />
//               ) : (
//                 <img
//                   className="w-12 h-12 rounded-full object-cover border-2 border-primary"
//                   src={defaultImage}
//                   alt=""
//                 />
//               )}

//               <div className="flex-1">
//                 <div className="text-lg font-semibold">{name}</div>
//                 <div className="text-xs uppercase font-semibold opacity-60">{party}</div>
//               </div>
//               {handleControl()}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Candidate;
