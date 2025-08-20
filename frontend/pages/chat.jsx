import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([
    { from: "Agent", body: "Hi! Is this still available?" },
  ]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const serverUrl =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:5000";

    const s = io(serverUrl, {
      transports: ["websocket"], // ensures stability
      reconnection: true,        // auto reconnect
    });

    setSocket(s);

    s.on("chat:receive", (m) => setMessages((prev) => [...prev, m]));

    return () => {
      s.off("chat:receive");
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!socket || !text.trim()) return;
    const m = { from: "You", body: text };
    setMessages((prev) => [...prev, m]);
    socket.emit("chat:send", m);
    setText("");
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Sidebar for Conversations */}
      <div className="border rounded-xl p-3 bg-white shadow-sm">
        <h2 className="font-semibold text-lg mb-2">Conversations</h2>
        <p className="text-sm text-gray-500">Demo Chat with Agent</p>
      </div>

      {/* Chat Window */}
      <div className="md:col-span-2 border rounded-xl p-3 bg-white shadow-sm">
        <div className="h-72 overflow-y-auto space-y-2 bg-slate-50 rounded-xl p-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl max-w-[75%] text-sm shadow-sm ${
                m.from === "You"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-white border"
              }`}
            >
              <span className="block font-medium text-xs text-gray-500 mb-1">
                {m.from}
              </span>
              {m.body}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="flex gap-2 mt-3">
          <input
            className="border p-2 rounded flex-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            onClick={send}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
