import React from 'react';
import loginImage2 from '../../public/image2.webp';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 pointer-events-auto">
      {/* Login-style card */}
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md md:max-w-lg flex flex-col justify-center p-8 mx-4 pointer-events-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-2">Loading</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Please wait while we fetch your data
        </p>
        <div className="w-32 md:w-40 mx-auto mb-4">
          <img
            src={loginImage2}
            alt="Loading illustration"
            className="w-full h-auto object-contain"
          />
        </div>
        {/* Spinner */}
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-center text-gray-500 text-sm">Authenticating...</p>
      </div>
    </div>
  );
}
