import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { useNavigate } from "react-router-dom";

type NewsArticle = {
  title: string;
  description: string;
  urlToImage: string;
  author?: string; 
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
    <div className="p-6 pt-20 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Favorite Articles</h2>
      {favorites.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="min-w-full bg-white rounded-lg shadow-lg">
            <div className="table w-full">
              <div className="table-header-group bg-gray-200">
                <div className="table-row">
                  <div className="table-cell p-4 text-left font-semibold">S.No</div>
                  <div className="table-cell p-4 text-left font-semibold">Image</div>
                  <div className="table-cell p-4 text-left font-semibold">Author</div>
                  <div className="table-cell p-4 text-left font-semibold">Title</div>
                  <div className="table-cell p-4 text-left font-semibold">Actions</div>
                </div>
              </div>
              <div className="table-row-group">
                {favorites.map((article, index) => (
                  <div
                    key={`${article.url}-${index}`}
                    className="table-row hover:bg-gray-100 transition duration-300 shadow-md rounded"
                    onClick={() => handleCardClick(article)}
                  >
                    <div className="table-cell p-4 text-gray-600">{index + 1}</div>
                    <div className="table-cell p-4">
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="table-cell p-4 text-gray-700">{article.author || "Unknown"}</div>
                    <div className="table-cell p-4 text-gray-800 font-semibold line-clamp-3 md:line-clamp-2">
                      {article.title}
                    </div>
                    <div className="table-cell p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromFavorites(article);
                        }}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow transition duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">You have no favorite articles yet.</p>
      )}
    </div>
  );
};

export default Favorites;
