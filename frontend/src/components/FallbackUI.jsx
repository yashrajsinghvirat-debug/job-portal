import React from 'react';

const FallbackUI = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Job Portal
          </h1>
          <div className="text-gray-600 mb-6">
            <p className="mb-2">Welcome to the Job Portal application.</p>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            <p className="text-sm text-gray-500">
              If you're seeing this message, the application is loading.
              Please wait a moment or refresh the page.
            </p>
          </div>
          <div className="space-y-4">
            <a
              href="/jobs"
              className="inline-block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </a>
            <a
              href="/login"
              className="inline-block w-full text-center bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="inline-block w-full text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackUI;
