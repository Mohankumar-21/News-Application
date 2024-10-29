import { useLocation } from "react-router-dom";

const Article: React.FC = () => {
  const location = useLocation();
  const article = location.state?.article;

  if (!article || !article.title || !article.publishedAt) {
    return <div>No article found.</div>;
  }

  const truncateContent = (content: string, maxWords: number) => {
    const words = content.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return content;
  };

  const displayContent = article.content
    ? truncateContent(article.content, 500)
    : "Content is currently unavailable.";

  const displayDescription =
    article.description && !article.description.includes("[+")
      ? truncateContent(article.description, 500)
      : "Description is currently unavailable.";

  return (
    <div className="p-4 pt-20 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/2 mb-4 md:mb-0">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
          )}
        </div>

        <div className="md:w-1/2 flex flex-col justify-between  border rounded-lg border-gray-300 px-5 py-3 shadow-md">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              {article.title}
            </h1>
            <p className="text-gray-600 mb-1">
              <span className="font-bold text-black">Published:</span>{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            {article.author && (
              <p className="text-gray-600 mb-4">
                <span className="font-bold text-black">Author:</span>{" "}
                {article.author}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 border rounded-lg border-gray-300 p-4 shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Content</h2>
        <p className="text-gray-800 mb-4">{displayContent}</p>
      </div>

      {article.description && (
        <div className="mt-6 border rounded-lg border-gray-300 p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-800 mb-4">{displayDescription}</p>
          <div className="flex justify-end mt-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
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
