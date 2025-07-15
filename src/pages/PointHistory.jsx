import React, { useState, useEffect } from 'react';
import BackgroundLayout from '../layout/BackgroundLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PointHistory = () => {
  const { id: userid } = useParams(); 
  const [pointHistory, setPointHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHistory = async () => {
    try {
      const response = await axios.get(`https://taskbackend-yd4x.onrender.com/api/user/history/${userid}`);
      setPointHistory(response.data.history || []);
    } catch (err) {
      console.log('Error fetching point history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center px-4 pt-16 gap-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400">
          🧾 Points History
        </h1>

        {loading ? (
          <p className="text-white animate-pulse">Loading history...</p>
        ) : pointHistory.length === 0 ? (
          <p className="text-gray-400 italic">No point history found for this user.</p>
        ) : (
          <ul className="w-full max-w-3xl space-y-4">
            {pointHistory.map((entry, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow"
              >
                <div className="flex flex-col">
                  <span className="text-white text-sm font-semibold">{entry.description}</span>
                  <span className="text-lg font-bold text-green-400"> Claimed</span>
                  <span className="text-gray-100 text-sm">{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
                <span className={`text-lg font-bold ${entry.points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {entry.points > 0 ? `+${entry.points}` : entry.points}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </BackgroundLayout>
  );
};

export default PointHistory;
