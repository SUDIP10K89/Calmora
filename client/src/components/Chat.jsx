import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Loader2 } from "lucide-react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
            const response = await axios.post("http://localhost:3000/chat", { 
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
                text: "Error: Unable to get response",
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }

        setInput("");
    };

    return (
        <div className="h-full w-full md:w-2xl mx-auto p-6 bg-gray-900 text-white  shadow-xl">
            
            <div className="mb-4 pb-3 border-b border-gray-700">
                <h2 className="text-xl font-semibold">CALMORA</h2>
                <p className="text-sm text-gray-400">I am always with you in bad times.</p>
            </div>

            <div className="h-[75vh] md:h-[400px] overflow-y-auto space-y-4 p-4 mb-4 border border-gray-700 rounded-xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-xl ${
                                msg.sender === "user"
                                    ? "bg-blue-600 text-white"
                                    : msg.isError
                                    ? "bg-red-900/50 text-red-200"
                                    : "bg-gray-700 text-gray-100"
                            } ${
                                msg.sender === "user"
                                    ? "rounded-br-none"
                                    : "rounded-bl-none"
                            }`}
                        >
                            <p className="text-sm whitespace-pre-wrap break-words">
                                {msg.text}
                            </p>
                            <span className="text-xs opacity-50 mt-1 block">
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
                        <div className="bg-gray-700 p-3 rounded-xl rounded-bl-none">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 bg-gray-800 text-white rounded-xl outline-none border border-gray-700 focus:border-blue-500 transition-colors"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
};

export default Chat;