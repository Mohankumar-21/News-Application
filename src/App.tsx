import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import NewsDashBoard from "./components/NewsDashBoard";
import { NewsProvider } from "./context/NewsContext";
import Article from "./components/Article";
import Favorites from "./components/Favorites";



function App() {
  return (
    <NewsProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<NewsDashBoard />} />
          <Route path="/:id" element={<Article/>} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NewsDashBoard />} />
        </Routes>
      </Router>
    </NewsProvider>
  );
}

export default App;
