import React, { createContext, useEffect, useState, ReactNode } from "react";

type NewsArticle = {
  source?: any;
  author?: string;
  content?: string;
  publishedAt?: ReactNode;
  urlToImage: any;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
};

type NewsProviderProps = {
  children: ReactNode;
};

type NewsContextType = {
  articles: Record<string, NewsArticle[]>;
  favorites: NewsArticle[];
  addToFavorites: (article: NewsArticle) => void;
  removeFromFavorites: (article: NewsArticle) => void;
  fetchNewsByCategory: (category: string) => void;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Record<string, NewsArticle[]>>({});
  const [favorites, setFavorites] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const addToFavorites = (articles: NewsArticle) => {
    setFavorites((prev) => [...prev, articles]);
  };

  const removeFromFavorites = (articles: NewsArticle) => {
    setFavorites((prev) =>
      prev.filter((article) => article.title !== articles.title)
    );
  };

  const fetchNewsByCategory = async (category: string) => {
    const apiKey = "3cb36d11053543bf94286ec85084685d";
    const proxyUrl = `https://api.allorigins.win/get?url=`;
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    const fetchUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      const articles = data.articles;
      setArticles((prev) => ({
        ...prev,
        [category]: articles,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    [
      "technology",
      "business",
      "sports",
      "science",
      "politics",
      "entertainment",
      "general",
      "health",
    ].forEach(fetchNewsByCategory);
  }, []);

  return (
    <NewsContext.Provider
      value={{
        articles,
        fetchNewsByCategory,
        addToFavorites,
        removeFromFavorites,
        favorites,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsProvider, NewsContext };
