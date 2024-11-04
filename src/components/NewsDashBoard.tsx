import React, { useState, useContext, useEffect, useMemo } from "react";
import { NewsContext } from "../context/NewsContext";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Loader from "./Loader";

const categories = [
  { name: "General", icon: "🌍" },
  { name: "Technology", icon: "💻" },
  { name: "Business", icon: "💼" },
  { name: "Sports", icon: "⚽" },
  { name: "Science", icon: "🔬" },
  { name: "Politics", icon: "🏛️" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Health", icon: "💉" },
];
type ExploreLink = {
  title: string;
  url: string;
  icon: string; 
};

const exploreMoreLinks: ExploreLink[] = [
  { title: "Latest Tech News", url: "/category/technology", icon: "💻" },
  { title: "Business Insights", url: "/category/business", icon: "💼" },
  { title: "Sports Highlights", url: "/category/sports", icon: "⚽" },
  { title: "Health Tips", url: "/category/health", icon: "💉" },
  { title: "Entertainment Buzz", url: "/category/entertainment", icon: "🎬" },
];
type NewsArticle = {
  title: string;
  description: string;
  urlToImage?: string;
  content?: string;
  url: string;
  author?: string;
  source?: { name: string; logo?: string };
};

const NewsDashboard: React.FC = () => {
  const context = useContext(NewsContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("General");
  const navigate = useNavigate();

  const articlesPerPage = 5;
  const tredingsPgae =7 // Show 5 articles initially
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  if (!context) return <Loader />;

  const { articles, addToFavorites, removeFromFavorites, favorites } = context;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [articles]);

  const filteredArticles = useMemo(
    () =>
      (articles[selectedCategory.toLowerCase()] || []).filter(
        (article: NewsArticle) =>
          article.title &&
          article.urlToImage &&
          article.description &&
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [articles, selectedCategory, searchQuery]
  );

  const totalArticles = filteredArticles.length;
  const displayedArticles = filteredArticles.slice(
    0,
    currentPage * articlesPerPage
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCardClick = (article: NewsArticle) => {
    navigate(`/article`, { state: { article } });
  };

  const isFavorite = (article: NewsArticle) => {
    return favorites.some((favorite) => favorite.url === article.url);
  };

  const handleAddToFavorites = (
    e: React.MouseEvent<HTMLButtonElement>,
    article: NewsArticle
  ) => {
    e.stopPropagation();
    isFavorite(article)
      ? removeFromFavorites(article)
      : addToFavorites(article);
  };

  const trendingArticles = useMemo(() => {
    return Object.values(articles)
      .flat() 
      .slice(0, currentPage*tredingsPgae ); 
  }, [articles,currentPage]);

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Load more articles
  };



  return (
    <div className="p-4 pt-5 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <SearchBar onSearch={handleSearchChange} className="w-64 mx-auto" />
      </div>

      <div className="flex overflow-x-auto mt-4 mb-6 py-3 px-2 rounded justify-around sticky top-0 z-10 bg-gray-100 space-x-4 lg:px-16 shadow-sm ">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition duration-200 ease-in-out shadow-md ${
              selectedCategory === category.name
                ? "bg-blue-600 text-white"
                : "bg-gradient-to-r from-indigo-200 to-purple-200 text-gray-900 hover:bg-blue-400"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="capitalize">{category.name}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <div className="flex-grow mr-4 w-full md:w-3/4">
            <div className="grid mx-auto gap-5 mt-7 text-center md:ml-20">
              {displayedArticles.length === 0 ? (
                <div className="text-gray-500 text-xl font-semibold mt-10">
                  No articles available.
                </div>
              ) : (
                displayedArticles.map((article, index) => (
                  <div
                    key={`${article.url}-${index}`}
                    className="p-4 rounded shadow-sm border-b-2 hover:shadow-md transition-all transform hover:-translate-y-2 cursor-pointer flex bg-white"
                    onClick={() => handleCardClick(article)}
                  >
                    <div className="flex-grow mr-4 w-2/4">
                      {article.author && (
                        <p className="text-gray-500 text-sm mt-1 mb-1 ml-1 text-left">
                          <span className="font-semibold">Author:</span>{" "}
                          {article.author}
                        </p>
                      )}
                      <h3 className="font-semibold text-justify text-lg line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-justify mt-2 line-clamp-1">
                        {article.content || article.description}
                        {article.content && article.content.length > 50
                          ? "..."
                          : ""}
                      </p>
                      {article.publishedAt &&
                        (typeof article.publishedAt === "string" ||
                          typeof article.publishedAt === "number") && (
                          <p className="text-gray-500 text-sm mt-2 text-left">
                            <span className="font-semibold">Published on:</span>{" "}
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </p>
                        )}
                      <button
                        onClick={(e) => handleAddToFavorites(e, article)}
                        className="mt-2 flex ml-1 text-blue-500 hover:text-blue-600"
                      >
                        <span className="mr-1">⭐</span>
                        <span className="mr-1">💡</span>
                        {isFavorite(article) ? (
                          <FaBookmark className="inline mt-1" />
                        ) : (
                          <FaRegBookmark className="inline mt-1" />
                        )}
                      </button>
                    </div>
                    <div className="w-1/4 flex justify-center">
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-center">
              {currentPage * articlesPerPage < totalArticles && (
                <button
                  onClick={handleShowMore}
                  className="mt-5 mx-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full"
                >
                  Browse Recommended News
                </button>
              )}
            </div>
          </div>

          <div className="hidden md:block md:w-1/4 space-y-4 mx-5">
          
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl  font-semibold mb-4 border-b pb-2">
                Explore More
              </h2>
              <ul className="space-y-2 ">
              {exploreMoreLinks.map((link) => (
                  <li key={link.title} className="flex items-center mb-3">
                    <span className="text-xl">{link.icon}</span>
                    <a
                      href={link.url}
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Trending Now
              </h2>
              {trendingArticles.length > 0 ? (
                trendingArticles.map((article, index) => (
                  <div
                    key={`${article.url}-${index}`}
                    onClick={() => handleCardClick(article)}
                    className="flex items-start mb-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 rounded p-2"
                  >
                    {article.urlToImage && (
                      <img
                        src={article?.urlToImage}
                        alt={article.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    {
                      article.title && (
                        <div className="ml-2">
                        <h3 className="font-medium text-sm">{article.title}</h3>
                        <p className="text-xs text-gray-500">{article.source?.name}</p>
                      </div>
                      )
                    }
                   
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No trending articles available.</p>
              )}
            </div>

   
    
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDashboard;
