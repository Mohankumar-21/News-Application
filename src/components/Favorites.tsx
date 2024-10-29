import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { useNavigate } from "react-router-dom";

type NewsArticle = {
  title: string;
  description: string;
  urlToImage: string;
  content?: string;
  url: string;
};

const Favorites: React.FC = () => {
  const context = useContext(NewsContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>Loading...</div>;
  }

  const { favorites, removeFromFavorites } = context;

  const handleCardClick = (article: NewsArticle) => {
    navigate(`/article`, { state: { article } });
  };

  return (
    <div className="p-4 pt-20">
      <h2 className="text-2xl font-semibold mb-6">Your Favorite Articles</h2>
      {favorites.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 text-center xl:grid-cols-4">
          {favorites.map((article, index) => (
            <div
              key={`${article.url}-${index}`}
              className="border-2 border-blue-200 p-4 rounded shadow cursor-pointer transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-2"
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

              <p className="text-gray-600 line-clamp-5 text-justify">{article.description}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(article); 
                }}
                className="px-4 py-2 mt-3 text-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow-md hover:shadow-lg focus:outline-none transition duration-200 ease-in-out"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have no favorite articles yet.</p>
      )}
    </div>
  );
};

export default Favorites;
