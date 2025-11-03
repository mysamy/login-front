import {useState, useEffect} from "react";

export default function Chat() {
      const [messages, setMessages] = useState([]);
      const [input, setInput] = useState("");
      const [token, setToken] = useState(null);
      const [conversationId, setConversationId] = useState(() => crypto.randomUUID());
      useEffect(() => {
            //apres que la page s'affiche fais ca
            const savedToken = localStorage.getItem("token");
            setToken(savedToken); // met à jour le state une fois le composant monté
      }, []); //une fois []
      return (
            <main className="flex min-h-screen bg-gray-100 text-black">
                  <aside className="w-1/6 border-r border-gray-300 p-4 bg-white">
                        <button className="w-full mb-3 px-3 py-2 bg-blue-600 text-white rounded" onClick={() => {
    setConversationId(crypto.randomUUID());
    setMessages([]);
                        }}
                        >
                              Nouvelle conversation
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center">Historique</h2>

                        <div className="flex-1 bg-white rounded-md shadow-inner p-4 overflow-y-auto gap-0.5">
                              <ul className="flex flex-col gap-1">
                                    {messages
                                          .filter((msg) => msg.from === "user")
                                          .map((msg, index) => (
                                                <li key={index} className={"bg-gray-100 $"}>
                                                      <a className="block  truncate">{msg.text}</a>
                                                </li>
                                          ))}
                              </ul>
                        </div>
                  </aside>

                  <section className="flex-1 p-6 flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-center">Conversation avec {"l'IA"}</h2>

                        <div className="flex-1 bg-white rounded-md shadow-inner p-4 overflow-y-auto">
                              <ul className="flex">
                                    {messages.map((msg, index) => (
                                          <li
                                                key={index}
                                                className={`w-3/4 line-height:1.5 px-3 py-2 rounded-lg ${
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
                                          headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`,
                                          },
                                          body: JSON.stringify({
                                                message: input,
                                                conversationId,
                                          }),
                                    });
                                    const data = await res.json();

                                    // Ajoute la réponse du bot
                                    console.log("Réponse IA :", data.reply);
                                    setMessages((prev) => [...prev, {from: "bot", text: data.reply}]);
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
