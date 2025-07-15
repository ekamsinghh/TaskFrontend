import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundLayout from '../layout/backgroundLayout';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Leaderboard = () => {
  const  userId  = useParams(); 
  const userid = userId.id
  
  const navigate = useNavigate();

  const [leaderboardData, setLeaderboardData] = useState([]);

  const heights = ['h-44', 'h-60', 'h-36'];

  const handleClick = async () => {
    try{
      const response = await axios.patch(`https://taskbackend-yd4x.onrender.com/api/user/${userid}`);
      if(response.data.Success){
        loadData();
        toast.success("Collected Points🎉");
      }
    }
    catch(err){
        console.log(err);
        toast.error("Some Error Occured");
    }
  }
  const loadData = async () => {
    try {
      const response = await axios.get('https://taskbackend-yd4x.onrender.com/api/users');
      const users = response.data.data.map((user) => ({
        ...user,
        id: String(user._id), // ensure all IDs are strings
      }));
      // Sort descending by points
      users.sort((a, b) => b.points - a.points);
      setLeaderboardData(users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (leaderboardData.length < 3) {
    return (
      <BackgroundLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-white text-xl animate-pulse">Loading leaderboard...</p>
        </div>
      </BackgroundLayout>
    );
  }

  const podiumOrder = [leaderboardData[1], leaderboardData[0], leaderboardData[2]]; // 🥈 🥇 🥉
  const podiumOrderMobile = [leaderboardData[0], leaderboardData[1], leaderboardData[2]];
  const rest = leaderboardData.slice(3);

  return (
    <BackgroundLayout>

      <div className="flex flex-col items-center px-4 pt-16 gap-10">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text mb-2 relative md:-top-3 top-3">
          🏆 Leaderboard 🏆
        </h1>

        
        <div className="hidden md:flex gap-6 justify-center items-end">
          {podiumOrder.map((user, index) => {
            const isCurrentUser = user.id === userid;
            return (
              <motion.div
                key={user.id}
                className={`relative w-28 ${heights[index]} rounded-xl shadow-xl border 
                ${isCurrentUser ? 'border-green-400 ring-2 ring-green-500' : 'border-white/10'} 
                bg-white/10 backdrop-blur-md flex flex-col items-center justify-end`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                </div>
                <div className="absolute top-2 left-2 text-xs text-white font-semibold">#{[2, 1, 3][index]}</div>
                <div className="absolute top-2 right-2 text-2xl">
                  {['🥈', '🥇', '🥉'][index]}
                </div>
                <div className="flex flex-col items-center mt-12 mb-3">
                  <p className="text-white font-semibold text-sm text-center">{user.name}</p>
                  <p className="text-yellow-400 text-xs font-medium">{user.points} pts</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        
        <ul className="w-full max-w-3xl space-y-6 md:hidden -mb-3">
          {podiumOrderMobile.map((user, index) => {
            const isCurrentUser = user.id === userid;
            return (
              <motion.li
                key={user.id}
                className={`flex items-center justify-between bg-white/5 backdrop-blur-lg px-6 py-4 rounded-xl shadow-md border 
                ${isCurrentUser ? 'border-green-400 ring-2 ring-green-500' : 'border-white/10'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold">#{index + 1}</span>
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                  <p className="text-white text-base font-medium flex gap-2 items-center">
                    {user.name}
                    <span className="text-xl">{['🥇', '🥈', '🥉'][index]}</span>
                  </p>
                </div>
                <p className="text-yellow-400 text-lg font-semibold">{user.points} pts</p>
              </motion.li>
            );
          })}
        </ul>

        
        <ul className="w-full max-w-3xl space-y-6">
          {rest.map((user, index) => {
            const rank = index + 4;
            const isCurrentUser = user.id === userid;
            return (
              <motion.li
                key={user.id}
                className={`flex items-center justify-between bg-white/5 backdrop-blur-lg px-6 py-4 rounded-xl shadow-md border 
                ${isCurrentUser ? 'border-green-400 ring-2 ring-green-500' : 'border-white/10'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold">#{rank}</span>
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                  <p className="text-white text-base font-medium">{user.name}</p>
                </div>
                <p className="text-yellow-400 text-lg font-semibold">{user.points} pts</p>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div className="absolute top-5  right-5 md:top-10 md:right-10">
        <button 
        className=" text-white text-xl md:text-3xl font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 border-3 border-white px-10 py-1 rounded-3xl cursor-pointer hover:scale-110 active:scale-100"
        onClick= {handleClick}
        >
            Claim
        </button>
      </div>
      <div className="absolute top-5  left-5 md:top-10 md:left-10">
        <button 
        className=" text-white text-xl md:text-3xl font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 border-3 border-white px-10 py-1 rounded-3xl cursor-pointer hover:scale-110 active:scale-100"
        onClick= {() => navigate(`/history/${userid}`)}
        >
        ⏱️ History
        </button>
      </div>
    </BackgroundLayout>
  );
};

export default Leaderboard;
