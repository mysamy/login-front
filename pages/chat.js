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

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/history`, {
                  headers: {Authorization: `Bearer ${token}`},
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setHistory(data);
                  })
                  .catch(console.error);
      }, [token]);
      function shouldShowDate(messages, index) {
            if (index === 0) return true;

            const d1 = messages[index]?.createdAt;
            const d2 = messages[index - 1]?.createdAt;

            console.log("🕓 Compare dates:", {
                  index,
                  current: d1,
                  prev: d2,
            });

            return new Date(d1).toDateString() !== new Date(d2).toDateString();
      }
      async function handleSend(e) {
            e.preventDefault();
            if (!input.trim()) return; // vérifie que c’est pas vide
            setMessages([...messages, {role: "user", text: input}]);
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

            setMessages((prev) => [...prev, {role: "assistant", text: data.reply}]);
            const newHistory = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/history`, {
                  headers: {Authorization: `Bearer ${token}`},
            }).then((res) => res.json());

            setHistory(newHistory);
      }

      async function chargerConversation(id) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation/${id}`, {
                  headers: {Authorization: `Bearer ${token}`},
            });

            const data = await res.json();
            setMessages(data); // important: on remplace, on n'ajoute pas
      }
      return (
            <main className="flex min-h-screen bg-[#1A2A3A] text-white">
                  <aside className="flex flex-col w-1/6  p-4 bg-[#1A2A3A]">
                        <button
                              className="rounded-full text-lg font-bold my-2 px-[8px] py-[15px] bg-[#3EE4F0] text-black border-2 border-[#3EE4F0] hover:bg-[#1A2A3A] hover:text-[#3EE4F0] transition-all duration-300"
                              onClick={() => {
                                    setConversationId(crypto.randomUUID());
                                    setMessages([]);
                              }}
                        >
                              Nouvelle conversation
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center">Historique</h2>

                        <div className="flex-1 bg-[#EBE9E9] rounded-md shadow-inner p-4 overflow-y-auto flex flex-col ">
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

                        <div className="flex flex-col flex-1 bg-[#EBE9E9] rounded-md shadow-inner p-4 overflow-y-auto">
                              <ul className="flex flex-1 flex-col gap-5">
                                    {messages.map((msg, index) => (
                                          <>
                                                {msg.createdAt && shouldShowDate(messages, index) && (
                                                      <div className="flex items-center my-4 text-xs text-gray-300">
                                                            <div className="flex-1 border-t border-gray-500"></div>
                                                            <span className="px-2">{new Date(msg.createdAt).toDateString()}</span>
                                                            <div className="flex-1 border-t border-gray-500"></div>
                                                      </div>
                                                )}

                                                <li
                                                      className={`w-auto line-height-[1.5] px-3 max-w-[75%] py-2 rounded-lg ${
                                                            msg.role === "user"
                                                                  ? "self-start bg-[#1FB7C4] text-white"
                                                                  : "self-end bg-[#14202E] text-white"
                                                      }`}
                                                >
                                                      {msg.text}
                                                      <div className="text-xs opacity-60 mt-1 text-right">
                                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                      </div>
                                                </li>
                                          </>
                                    ))}
                              </ul>
                        </div>

                        <form className="mt-4 flex gap-2" onSubmit={handleSend}>
                              <input
                                    value={input}
                                    type="text"
                                    placeholder="Écris ton message..."
                                    className="flex-1 border-3 border-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EE4F0]"
                                    onChange={(e) => setInput(e.target.value)}
                              />
                              <button
                                    type="submit"
                                    className="rounded-full text-lg font-bold  px-[30px] py-[15px] bg-[#3EE4F0] text-black border-2 border-[#3EE4F0] hover:bg-[#1A2A3A] hover:text-[#3EE4F0] transition-all duration-300"
                              >
                                    Envoyer
                              </button>
                        </form>
                  </section>
            </main>
      );
}
