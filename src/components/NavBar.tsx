import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { NewsContext } from "../context/NewsContext"; 

const NavBar = ()  => {

  const context = useContext(NewsContext);
  const favoritesCount = context?.favorites.length || 0;

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <h1 className="text-xl md:text-2xl font-semibold">News Dashboard</h1>
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
      </ul>
    </nav>
  );
};

export default NavBar;
