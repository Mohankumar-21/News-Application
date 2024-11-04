import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import ChatBot from "./ChatBot";
import { AiOutlineWechat } from 'react-icons/ai';

const NavBar = () => {
  const context = useContext(NewsContext);
  const favoritesCount = context?.favorites.length || 0;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-200 to-purple-200 text-white px-6 py-4 flex justify-between items-center  top-0 left-0 w-full z-50 shadow-lg">
      <h1 className="text-lg md:text-2xl text-black font-semibold">News Dashboard</h1>
      <ul className="flex space-x-4 md:space-x-10 md:mr-8 font-medium">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-600 pb-1 text-black"
                : "hover:text-blue-700 transition-colors text-black"
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
                ? "border-b-2 border-blue-600 pb-1 text-black"
                : "hover:text-blue-700 transition-colors text-black"
            }
          >
            Bookmarks
          </NavLink>
          <span className="ml-1.5  bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
            {favoritesCount}
          </span>
        </li>
        <li>
          <button onClick={toggleChat} className="flex text-blue-600 items-center text-purble hover:text-blue-700">
            <AiOutlineWechat size={24} color="blue" /> ?
          </button>
        </li>
      </ul>
      {isChatOpen && <ChatBot closeChat={toggleChat} />}
    </nav>
  );
};

export default NavBar;
