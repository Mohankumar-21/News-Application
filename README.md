# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```



<!-- // const categories = [
//   "technology", "business", "sports", 
//   "lifestyle", "science", "politics", 
//   "food", "entertainment", "environment"
// ]; -->


<!-- import React, { createContext, useEffect, useState, ReactNode } from "react";

type NewsArticle = {
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
  fetchNewsByCategory: (category: string) => void;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Record<string, NewsArticle[]>>({});

  const fetchNewsByCategory = async (category: string) => {
    // const apiKey = import.meta.env.VITE_PUBLIC_API_KEY;
    const apiKey = "99fe3a12aeaa46728bc58e7fd69c88db";
    console.log(apiKey);
    try {
      const url = `https://newsapi.org/v2/top-headlines?country&category=${category}&apiKey=${apiKey}&removeduplicate=1`;

      // const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&image=1&removeduplicate=1&size=10&category=${category}`;
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setArticles((prev) => ({
        ...prev,
        [category]: data.articles,  // data.results
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
    ].forEach(fetchNewsByCategory);
  }, []);

  // useEffect(() => {
  //   ["technology", "business", "sports", "lifestyle", "science", "politics", "food", "entertainment", "environment"].forEach(fetchNewsByCategory);
  // }, []);

  return (
    <NewsContext.Provider value={{ articles, fetchNewsByCategory }}>
      {children}
    </NewsContext.Provider>
  );
};

export { NewsProvider, NewsContext }; -->
