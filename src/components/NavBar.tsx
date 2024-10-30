import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext"; 
import ChatBot from "./ChatBot"; 
import { AiOutlineWechat } from 'react-icons/ai'; 

const NavBar = ()  => {
  const context = useContext(NewsContext);
  const favoritesCount = context?.favorites.length || 0;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <h1 className="text-sm md:text-2xl font-semibold">News Dashboard</h1>
      <ul className="flex space-x-4 md:space-x-10 md:mr-8 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-white pb-1 text-gray-100"
                : "hover:text-rose-500 transition-colors"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-white pb-1 text-gray-100"
                : "hover:text-rose-500 transition-colors"
            }
          >
            Bookmarks
          </NavLink>
          <span className="ml-1.5 bg-white text-blue-600 rounded-full px-2 py-0.5 text-xs">
            {favoritesCount}
          </span>
        </li>
        <li>
          <button onClick={toggleChat} className="flex items-center">
            <AiOutlineWechat size={24} />?
          </button>
        </li>
      </ul>
      {isChatOpen && <ChatBot closeChat={toggleChat} />}
    </nav>
  );
};

export default NavBar;
