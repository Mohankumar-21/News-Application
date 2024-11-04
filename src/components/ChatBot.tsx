import React, { useState, useEffect } from "react";

interface ChatBotProps {
  closeChat: () => void;
}

interface Message {
  type: "user" | "bot";
  text: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ closeChat }) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const welcomeMessage: Message = {
      type: "bot",
      text: "Hi, how can I help you today?",
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { type: "user", text: input };
    setMessages([...messages, userMessage]);

    await fetchBotResponse(input);
    setInput("");
  };

  const fetchBotResponse = async (query: string) => {
    setLoading(true);
    const apiKey = "3cb36d11053543bf94286ec85084685d";
    const proxyUrl = `https://api.allorigins.win/get?url=`;
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
    // const fetchUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const articles = data.articles;

      if (articles && articles.length > 0) {
        const article = articles[0];
        const botResponse = `${article.title}: ${article.description} - Read more: ${article.url}`;
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: botResponse },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Sorry, I couldn’t find any news articles related to that.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "There was an error retrieving the news." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 w-80 h-96 bg-gray-900 text-white shadow-lg rounded-lg p-4 border border-gray-700">
      <button
        onClick={closeChat}
        className="absolute top-2 right-2 bg-red-600 rounded-full h-8 w-8 flex items-center justify-center text-white hover:bg-red-700 transition duration-200"
      >
        X
      </button>
      <div className="overflow-y-auto h-72 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-2 rounded-lg ${
                msg.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              <p className="text-xs">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-400 text-center">Loading...</p>}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-600 rounded-l w-full p-2 bg-gray-800 text-sm text-violet-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search any news here..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-r text-sm hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
