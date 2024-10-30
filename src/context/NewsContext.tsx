import React, { createContext, useEffect, useState, ReactNode } from "react";

type NewsArticle = {
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
    const apiKey = import.meta.env.VITE_PUBLIC_API_KEY;
    try {
      const url = `https://newsapi.org/v2/top-headlines?country&category=${category}&apiKey=${apiKey}&removeduplicate=1`;

      // const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&image=1&removeduplicate=1&size=10&category=${category}`;

      const response = await fetch(url);
      const data = await response.json();
      setArticles((prev) => ({
        ...prev,
        [category]: data.articles,
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
