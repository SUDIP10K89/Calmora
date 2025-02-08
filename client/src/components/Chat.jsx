import { useState } from "react";
import axios from "axios";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);

        try {
            const response = await axios.post("http://localhost:3000/chat", { message: input });
            setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
        } catch (error) {
            console.error(error);
            setMessages([...newMessages, { sender: "bot", text: "Error: Unable to get response" }]);
        }

        setInput("");
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-md">
            <div className="h-96 overflow-y-auto space-y-2 p-2 border border-gray-700 rounded-lg">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-right" : "bg-gray-700 text-left"}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 bg-gray-800 text-white rounded-l-lg outline-none border border-gray-700"
                />
                <button onClick={sendMessage} className="bg-blue-500 px-4 py-2 rounded-r-lg">Send</button>
            </div>
        </div>
    );
};

export default Chat;
