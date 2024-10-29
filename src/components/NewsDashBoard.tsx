import React, { useState, useContext, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import SearchBar from "./SearchBar";

const categories = [
  "general",
  "technology",
  "business",
  "sports",
  "science",
  "politics",
  "entertainment",
  "health",
];

type NewsArticle = {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
  url: string;
};

const NewsDashboard: React.FC = () => {
  const context = useContext(NewsContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const navigate = useNavigate();

  if (!context) return <div>Loading...</div>;

  const { articles, addToFavorites, removeFromFavorites, favorites } = context;

  const filteredArticles = (articles[selectedCategory] || []).filter(
    (article: any) =>
      article.title &&
      article.description &&
      article.title !== "[Removed]" &&
      article.description !== "[Removed]" &&
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getRepeatedDescription = (description: string) => {
    const words = description.split(" ");
    while (words.length < 50) {
      words.push(...words);
    }
    return words.slice(0, 50).join(" ");
  };

  const handleCardClick = (article: NewsArticle) => {
    console.log("Card clicked:", article);
    navigate(`/article`, { state: { article } });
  };

  const isFavorite = (article : NewsArticle) => {
    return favorites.some((favorite) => favorite.url === article.url);
  }

  const handleAddToFavorites = (e: React.MouseEvent<HTMLButtonElement>, article: NewsArticle) => {
    e.stopPropagation(); 
    console.log("Added to favorites:", article);
    isFavorite(article) ? removeFromFavorites(article) : addToFavorites(article);

  };

  return (
    <div className="p-4 pt-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-grow md:flex-[1_3_0%]">
          <SearchBar onSearch={handleSearchChange} />
        </div>

        {!isMobile && (
          <div className="flex flex-wrap justify-between flex-[2_3_0%]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {isMobile && (
          <FaBars
            onClick={() => setShowCategories(!showCategories)}
            className="text-3xl cursor-pointer text-blue-500"
          />
        )}
      </div>

      {isMobile && showCategories && (
        <div className="flex flex-wrap flex-col gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowCategories(false);
              }}
              className={`px-4 py-2 rounded ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 mt-7 sm:grid-cols-2 lg:grid-cols-3 text-center xl:grid-cols-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article: any, index: number) => (
            <div
              key={`${article.url}-${index}`}
              className="border-2 border-blue-200 p-4 rounded shadow transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-2 hover:scale-lg cursor-pointer"
              onClick={() => handleCardClick(article)}
            >
              <h3 className="font-semibold text-justify text-lg line-clamp-2">
                {article.title}
              </h3>

              {article.urlToImage && (
                <div className="my-4 w-full h-40">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}

              <p className="text-gray-600 line-clamp-5 text-justify">
                {getRepeatedDescription(article.description)}
              </p>

              <button
                onClick={(e) => handleAddToFavorites(e, article)} 
                className="px-4 py-2 mt-3 text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-200 ease-in-out"
              >
                {isFavorite(article) ? "Remove from Bookmarks" : "Add to Bookmarks"}
              </button>
            </div>
          ))
        ) : (
          <div>No articles found.</div>
        )}
      </div>
    </div>
  );
};

export default NewsDashboard;
