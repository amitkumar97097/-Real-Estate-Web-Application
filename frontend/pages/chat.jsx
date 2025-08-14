import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([{ from: "Agent", body: "Hi! Is this still available?" }]);
  const [text, setText] = useState("");

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000");
    setSocket(s);

    s.on("chat:receive", (m) => setMessages((prev) => [...prev, m]));

    return () => {
      s.off("chat:receive");
      s.disconnect();
    };
  }, []);

  const send = () => {
    if (!socket || !text.trim()) return;
    const m = { from: "You", body: text };
    setMessages((prev) => [...prev, m]);
    socket.emit("chat:send", m);
    setText("");
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="border rounded-xl p-3">Conversations (demo)</div>
      <div className="md:col-span-2 border rounded-xl p-3">
        <div className="h-72 overflow-y-auto space-y-2 bg-slate-50 rounded-xl p-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl max-w-[75%] ${m.from === "You" ? "bg-blue-100 ml-auto" : "bg-white"}`}
            >
              {m.body}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input
            className="border p-2 rounded flex-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={send} className="px-3 py-2 bg-blue-600 text-white rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
