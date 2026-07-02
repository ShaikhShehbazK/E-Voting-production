import axios from 'axios';
import { useEffect, useState } from 'react';

const VoteCount = () => {
  const Api = import.meta.env.VITE_API_URL;
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVoteCount = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Api}/candidate/vote/count`, {
          withCredentials: true,
        });
        setCandidates(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching vote count:', error);
        setCandidates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoteCount();
  }, [Api]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 sm:px-8 py-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-xl rounded-2xl border border-blue-200 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center">Vote Count</h2>

      {isLoading ? (
        // Loading skeleton
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Party</th>
                <th className="px-4 py-2 border text-right">Votes</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-2 border">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </td>
                  <td className="px-4 py-2 border text-right">
                    <div className="h-4 bg-gray-300 rounded w-1/4 ml-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : candidates.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No vote data available</p>
        </div>
      ) : (
        // Data table
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Party</th>
              <th className="px-4 py-2 border text-right">Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{candidate.name}</td>
                <td className="px-4 py-2 border">{candidate.party}</td>
                <td className="px-4 py-2 border text-right font-semibold">{candidate.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VoteCount;
