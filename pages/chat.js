import {useState} from "react";

export default function Chat() {
      const [messages, setMessages] = useState([]);
      const [input, setInput] = useState("");

      return (
            <main className="flex min-h-screen bg-gray-100 text-black">
                  <section className="w-1/3 border-r border-gray-300 p-4 bg-white">
                        <h2 className="text-xl font-semibold mb-4 text-center">Historique</h2>

                        <div className="flex-1 bg-white rounded-md shadow-inner p-4 overflow-y-auto"></div>
                  </section>

                  <section className="flex-1 p-6 flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-center">Conversation avec {"l'IA"}</h2>

                        <div className="flex-1 bg-white rounded-md shadow-inner p-4 overflow-y-auto">
                              <ul>
                                    {messages.map((msg, index) => (
                                          <li
                                                key={index}
                                                className={`max-w-xs px-3 py-2 rounded-lg ${
                                                      msg.from === "user" ? "self-end bg-blue-500 text-white" : "self-start bg-gray-200 text-black"
                                                }`}
                                          >
                                                {msg.text}
                                          </li>
                                    ))}
                              </ul>
                        </div>

                        <form
                              className="mt-4 flex gap-2"
                              onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (!input.trim()) return; // vérifie que c’est pas vide
                                    setMessages([...messages, {from: "user", text: input}]);
                                    setInput("");
                                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
                                          method: "POST",
                                          headers: {"Content-Type": "application/json"},
                                          body: JSON.stringify({message: input}),
                                    });
                                    setTimeout(() => {
                                          setMessages((prev) => [...prev, {from: "bot", text: "Ceci est une réponse automatique 🤖"}]);
                                    }, 1000);
                              }}
                        >
                              <input
                                    value={input}
                                    type="text"
                                    placeholder="Écris ton message..."
                                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setInput(e.target.value)}
                              />
                              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Envoyer
                              </button>
                        </form>
                  </section>
            </main>
      );
}
