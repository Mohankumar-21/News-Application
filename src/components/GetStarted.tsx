
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backimg from '../assets/bg-11.png';

const GetStarted:React.FC = () => {
  const navigate = useNavigate();


  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 w-full md:w-1/2 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get Instant Access to the Latest News
        </h1>
        <p className="text-lg mb-6">
          Stay informed and updated with real-time news at your fingertips.
          Discover stories from around the world with just one click.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-200 transition duration-200"
        >
          Get Started
        </button>
      </div>
      <div className="hidden md:flex items-center justify-center w-1/2  bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://source.unsplash.com/featured/?news')" }}>
         <img src={backimg} alt="News Image" className=' rotate-12' />
      </div>
    </div>
  );
};

export default GetStarted;
