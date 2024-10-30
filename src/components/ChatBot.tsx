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
      text: "Hi, How can I help u?",
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
    const apiKey = "164fcfb152c34b74b53e21221877ea07";
    const proxyUrl = `https://api.allorigins.win/get?url=`;
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&apiKey=${apiKey}`;
    const fetchUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`;

    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      const articles = JSON.parse(data.contents).articles;

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
    <div className="fixed bottom-10 right-10 w-80 h-96 bg-gray-800 text-white shadow-lg rounded-lg p-4">
      <button
        onClick={closeChat}
        className="absolute top-2 right-2 bg-red-600 rounded-full h-8 w-8 p-1 text-white"
      >
        X
      </button>
      <div className="overflow-y-auto h-72 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`max-w-[75%] ${
                msg.type === "user" ? "text-right" : "text-left"
              } px-2 py-1 overflow-hidden`}
            >
              <p
                className={
                  msg.type === "user"
                    ? "text-blue-400 text-xs"
                    : "text-gray-200 text-xs text-pretty"
                }
              >
                {msg.text}
              </p>
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
          className="border text-violet-300 rounded-l w-full p-2 bg-gray-700 text-sm"
          placeholder="Search any news here..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-r text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
