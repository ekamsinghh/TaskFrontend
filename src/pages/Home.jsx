import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from "react-icons/lu";
import axios from 'axios';
import UserDisplay from '../components/UserDisplay';
import '../index.css';
import BackgroundLayout from '../layout/backgroundLayout';

const URL = "https://taskbackend-yd4x.onrender.com/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();
  const getUsers = async () => {
    try {
      const response = await axios.get(`${URL}/users`);
      console.log(response.data.data);
      if (response.data && response.data.data) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []); // only on mount

  return (
    <BackgroundLayout>

      
      <div className="relative z-10 flex flex-col justify-center items-center gap-10 px-4 py-20">
        
        
        <div className="flex justify-center items-center gap-2">
          <LuSparkles className="w-10 h-10 text-indigo-500 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Choose Your User to Start
          </h1>
        </div>

        {/* User Grid */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-10 gap-y-6">
          {users.map((user, index) => (
            <li key={index}>
              <UserDisplay
                name={user.name}
                profileURL={user.profileImage}
                onClick={() => {
                    setSelectedUser(user);
                    navigate(`/leaderboard/${user._id}`);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </BackgroundLayout>
  );
}

export default Home;