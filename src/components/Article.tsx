import { useLocation } from "react-router-dom";
import { FaShareAlt, FaStar } from "react-icons/fa"; 

const Article: React.FC = () => {
  const location = useLocation();
  const article = location.state?.article;

  if (!article || !article.title || !article.publishedAt) {
    return <div className="text-center p-8">No article found.</div>;
  }

  const truncateContent = (content: string, maxWords: number) => {
    const words = content.split(" ");
    return words.length > maxWords ? `${words.slice(0, maxWords).join(" ")}...` : content;
  };

  const displayContent = article.content ? truncateContent(article.content, 500) : "Content is currently unavailable.";
  const displayDescription = article.description && !article.description.includes("[+") ? truncateContent(article.description, 500) : "Description is currently unavailable.";

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="text-left md:text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">{article.title}</h1>
        <div className="flex justify-center text-gray-600 mb-2">
          {article.author && (
            <p className="mr-4">
              <span className="font-semibold">Author:</span> {article.author}
            </p>
          )}
          <p>
            <span className="font-semibold">Published:</span> {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>


      <div className="flex justify-center space-x-4 mb-4">
        <button title="Share">
          <FaShareAlt className="text-gray-700 hover:text-blue-600 transition-colors duration-300" size={20} />
        </button>
        <button title="Rate">
          <FaStar className="text-gray-700 hover:text-yellow-500 transition-colors duration-300" size={20} />
        </button>
     
      </div>

 
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-72 md:h-96 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-6"
        />
      )}

  
      <div className="p-6 border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Content</h2>
        <p className="text-gray-700 leading-relaxed">{displayContent}</p>
      </div>

      {/* Description Section */}
      {article.description && (
        <div className="p-6 border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{displayDescription}</p>
          <div className="flex justify-end">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-500 transition duration-300"
            >
              Read More
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
