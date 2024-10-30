import React, { useState, useContext, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Loader from "./Loader"; 

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

  const articlesPerPage = 8; 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true); 

  if (!context) return <Loader />; 

  const { articles, addToFavorites, removeFromFavorites, favorites } = context;

  useEffect(() => {
   
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [articles]);

  const filteredArticles = (articles[selectedCategory] || []).filter(
    (article: any) =>
      article.title &&
      article.description &&
      article.title !== "[Removed]" &&
      article.description !== "[Removed]" &&
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

 
  const displayedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
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
    navigate(`/article`, { state: { article } });
  };

  const isFavorite = (article: NewsArticle) => {
    return favorites.some((favorite) => favorite.url === article.url);
  };

  const handleAddToFavorites = (e: React.MouseEvent<HTMLButtonElement>, article: NewsArticle) => {
    e.stopPropagation(); 
    console.log("Added to favorites:", article);
    isFavorite(article) ? removeFromFavorites(article) : addToFavorites(article);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (currentPage > 1) {
      buttons.push(1);
    }

    for (let i = start; i <= end; i++) {
      if (!buttons.includes(i)) {
        buttons.push(i); 
      }
    }

    if (end < totalPages) {
      buttons.push(totalPages);
    }

    return buttons;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

      {loading ? ( 
        <Loader />
      ) : (
        <>
          <div className="grid gap-5 mt-7 sm:grid-cols-2 lg:grid-cols-3 text-center xl:grid-cols-4">
            {displayedArticles.length > 0 ? (
              displayedArticles.map((article: any, index: number) => (
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

          <div className="flex justify-center mt-7 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
              <FaChevronLeft />
            </button>

            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-full ${
                  currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsDashboard;
