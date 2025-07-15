import React from 'react';

const UserDisplay = ({ name, profileURL,onClick }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 blur-lg opacity-75 group-hover:scale-105 transition-transform duration-500"></div>

        <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-border z-10"></div>

        <img
          src={profileURL}
          alt="profile"
          onClick= {onClick}
          className="relative z-20 w-full h-full rounded-full object-cover border-2 border-white shadow-xl group-hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
      </div>

      
      <p className="text-white text-sm sm:text-base lg:text-lg font-semibold text-center">
        {name}
      </p>
    </div>
  );
};

export default UserDisplay;
