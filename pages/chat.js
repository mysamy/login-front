import {useState, useEffect} from "react";

export default function Chat() {
      const [messages, setMessages] = useState([]);
      const [input, setInput] = useState("");
      const [token, setToken] = useState(null);
      const [history, setHistory] = useState([]);
      const [conversationId, setConversationId] = useState(() => crypto.randomUUID());

      useEffect(() => {
            //apres que la page s'affiche fais ca
            const savedToken = localStorage.getItem("token");
            if (!savedToken) return;
            setToken(savedToken); // met à jour le state une fois le composant monté
      }, []); //une fois []
      useEffect(() => {
            if (!token) return;
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation`, {
                  headers: {Authorization: `Bearer ${token}`},
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setHistory(data);
                  })
                  .catch(console.error);
      }, [token]);
      console.log(data);
      async function handleSend(e) {async (e) => {
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
      return (
            <main className="flex min-h-screen bg-gray-100 text-black">
                  <aside className="w-1/6 border-r border-gray-300 p-4 bg-white">
                        <button
                              className="w-full mb-3 px-3 py-2 bg-blue-600 text-white rounded"
                              onClick={() => {
                                    setConversationId(crypto.randomUUID());
                                    setMessages([]);
                              }}
                        >
                              Nouvelle conversation
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center">Historique</h2>

                        <div className="flex-1 bg-white rounded-md shadow-inner p-4 overflow-y-auto flex flex-col">
                              <ul className="flex flex-1 flex-col gap-0.5">
                                    {history.map((item) => (
                                          <li key={item.conversationId}>
                                                <a
                                                      href="#"
                                                      onClick={() => {
                                                            setConversationId(item.conversationId);
                                                            chargerConversation(item.conversationId);
                                                      }}
                                                      className="block truncate text-blue-600 hover:underline"
                                                >
                                                      {item.title}
                                                </a>
                                          </li>
                                    ))}
                              </ul>
                        </div>
                  </aside>

                  <section className="flex-1 p-6 flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-center">Conversation avec {"l'IA"}</h2>

                        <div className="flex flex-col flex-1 bg-white rounded-md shadow-inner p-4 overflow-y-auto">
                              <ul className="flex flex-1 flex-col">
                                    {messages.map((msg, index) => (
                                          <li
                                                key={index}
                                                className={`w-auto line-height-[1.5] px-3 py-2 rounded-lg ${
                                                      msg.from === "user" ? "self-start bg-blue-500 text-white" : "self-end bg-gray-200 text-black"
                                                }`}
                                          >
                                                {msg.text}
                                          </li>
                                    ))}
                              </ul>
                        </div>

                        <form
                              className="mt-4 flex gap-2"
                              onSubmit= {handleSend}
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
