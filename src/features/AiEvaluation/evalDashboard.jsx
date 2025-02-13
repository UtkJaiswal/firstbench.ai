import React from 'react';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-6 bg-gray-100 min-h-screen">
      
      <div className="col-span-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-600 font-semibold">Peer to Peer</h2>
        <div className="flex items-center mt-4">
          <span className="text-green-500 text-2xl font-bold">↑ 70%</span>
          <span className="text-gray-500 ml-2">Ahead from</span>
        </div>
        <div className="mt-4">
          <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
            Density Chart
          </div>
        </div>
      </div>
      
      {/* Scoreboard */}
      <div className="col-span-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-600 font-semibold">Scoreboard</h2>
        <div className="mt-4 text-center">
          <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm">Score - 9/10</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-200 h-24 rounded-md flex items-center justify-center">Radar Chart 1</div>
          <div className="bg-gray-200 h-24 rounded-md flex items-center justify-center">Radar Chart 2</div>
        </div>
      </div>
      
      {/* Quick Access */}
      <div className="col-span-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-600 font-semibold">Quick Access</h2>
        <div className="mt-4 space-y-3">
          <button className="w-full py-2 bg-purple-500 text-white rounded-lg">Create Notes</button>
          <div className="bg-gray-200 p-2 rounded-lg">
            <h3 className="font-semibold text-gray-500">History / Attempts</h3>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>Geography essay</li>
              <li>Hindi essay</li>
              <li>Economics essay</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="col-span-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-600 font-semibold">Personalize Feedback</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex justify-between bg-gray-100 p-2 rounded-lg">
              <span className="text-gray-600">Content Quality</span>
              <span className="text-blue-500 font-bold">95%</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Suggested Improvement */}
      <div className="col-span-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-600 font-semibold">Suggested Improvement</h2>
        <div className="mt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex justify-between bg-red-100 p-2 rounded-lg">
              <span className="text-red-500">The evidence is weak</span>
              <button className="text-red-500 font-bold">&gt;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
