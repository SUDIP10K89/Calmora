import { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { Send, Loader2, Sun, Moon, Heart, MessageCircle } from "lucide-react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Replace the simulated API call with the actual API call
            const response = await axios.post("https://calmora-isd4.onrender.com/chat", { 
                message: input 
            });
            setMessages([...newMessages, { 
                sender: "bot", 
                text: response.data.reply 
            }]);
        } catch (error) {
            console.error(error);
            setMessages([...newMessages, { 
                sender: "bot", 
                text: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }

        setInput("");
    };

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <div className={`flex h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <div className="w-full max-w-4xl mx-auto flex flex-col p-4 md:p-6">
                {/* Header */}
                <div className={`flex items-center justify-between p-4 mb-4 ${
                    isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
                } rounded-2xl backdrop-blur-lg border`}>
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                            isDark 
                            ? 'bg-purple-600/20 text-purple-400' 
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                            <Heart className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Calmora
                            </h2>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Your caring companion, here to listen
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg ${
                            isDark 
                            ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-300' 
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>

                {/* Chat Messages */}
                <div className={`flex-1 overflow-hidden ${
                    isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
                } backdrop-blur-lg border rounded-2xl mb-4`}>
                    <div className="h-full overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {messages.length === 0 && (
                            <div className={`flex flex-col items-center justify-center h-full ${
                                isDark ? 'text-gray-500' : 'text-gray-400'
                            } space-y-4`}>
                                <Heart className="h-12 w-12" />
                                <p className="text-center max-w-sm">
                                    Welcome to MindfulChat. This is a safe space to share your thoughts and feelings.
                                </p>
                            </div>
                        )}
                        
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-4 rounded-2xl ${
                                        msg.sender === "user"
                                            ? "bg-purple-600 text-white"
                                            : msg.isError
                                            ? isDark 
                                                ? "bg-red-500/10 text-red-200 border border-red-500/20"
                                                : "bg-red-50 text-red-600 border border-red-100"
                                            : isDark
                                            ? "bg-gray-800/80 text-gray-100"
                                            : "bg-gray-100 text-gray-900"
                                    } ${
                                        msg.sender === "user"
                                            ? "rounded-br-md"
                                            : "rounded-bl-md"
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                                        {msg.text}
                                    </p>
                                    <span className="text-xs opacity-50 mt-2 block">
                                        {new Date().toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className={`p-4 rounded-2xl rounded-bl-md ${
                                    isDark ? 'bg-gray-800/80' : 'bg-gray-100'
                                }`}>
                                    <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Form */}
                <form onSubmit={sendMessage} className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Share your thoughts..."
                        className={`flex-1 p-4 rounded-xl outline-none transition-colors ${
                            isDark 
                            ? 'bg-gray-900/50 text-white border-gray-800 focus:border-purple-500 placeholder-gray-500' 
                            : 'bg-white text-gray-900 border-gray-200 focus:border-purple-600 placeholder-gray-400'
                        } border`}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-purple-600 px-6 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;