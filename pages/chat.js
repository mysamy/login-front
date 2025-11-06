import {useState, useEffect, Fragment} from "react";
import {useRouter} from "next/router";

export default function Chat() {
      const [messages, setMessages] = useState([]);
      const [input, setInput] = useState("");
      const [history, setHistory] = useState([]);
      const [conversationId, setConversationId] = useState(() => crypto.randomUUID());
      const router = useRouter();
      useEffect(() => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
                  credentials: "include",
            }).then((res) => {
                  if (!res.ok) router.push("/");
            });
      }, []);
      useEffect(() => {

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/history`, {
                   credentials: "include",
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setHistory(data);
                  })
                  .catch(console.error);
      }, []);
      const shouldShowDate = (messages, index) => {
            if (index === 0) return true;

            return new Date(messages[index]?.createdAt).toDateString() !== new Date(messages[index - 1]?.createdAt).toDateString();
      };
      const handleSend = async (e) => {
            e.preventDefault();
            if (!input.trim()) return; // vérifie que c’est pas vide
            setMessages([
                  ...messages,
                  {
                        id: crypto.randomUUID(),
                        role: "user",
                        text: input,
                        createdAt: new Date().toISOString(),
                  },
            ]);
            setInput("");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                        
                  },
                  credentials: "include",
                  body: JSON.stringify({
                        message: input,
                        conversationId,
                  }),
            });
            const data = await res.json();

            // Ajoute la réponse du bot

            setMessages((prev) => [
                  ...prev,
                  {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        text: data.reply,
                        createdAt: new Date().toISOString(),
                  },
            ]);
            const newHistory = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/history`, {
                  credentials: "include",
            }).then((res) => res.json());

            setHistory(newHistory);
      };

      const chargerConversation = async (id) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation/${id}`, {
                 credentials: "include",
            });

            const data = await res.json();
            setMessages(data); // important: on remplace, on n'ajoute pas
      };
      return (
            <main className="flex min-h-screen bg-[#1A2A3A] text-white">
                  <aside className="flex flex-col w-1/6  p-4 bg-[#1A2A3A]">
                        <button
                              className="rounded-full text-sm font-bold my-2 px-[8px] py-[15px] bg-[#3EE4F0] text-black border-2 border-[#3EE4F0] hover:bg-[#1A2A3A] hover:text-[#3EE4F0] transition-all duration-300"
                              onClick={() => {
                                    setConversationId(crypto.randomUUID());
                                    setMessages([]);
                              }}
                        >
                              Nouvelle conversation
                        </button>

                        <h2 className="text-xl font-semibold my-4 text-center">Historique</h2>

                        <div className="flex-1 bg-[#EBE9E9] rounded-md shadow-inner p-4 overflow-y-auto flex flex-col ">
                              <ul className="flex flex-1 flex-col gap-0.5">
                                    {Array.isArray(history) && history.map((item) => {
                                          const active = item.conversationId === conversationId;
                                          return (
                                                <li key={item.conversationId}>
                                                      <button
                                                            onClick={() => {
                                                                  setConversationId(item.conversationId);
                                                                  chargerConversation(item.conversationId);
                                                            }}
                                                            className={`block w-full px-2 py-1 rounded-md truncate text-left transition duration-100
            ${active ? "bg-[#3EE4F0] text-black font-semibold shadow-md" : "text-black hover:bg-[#233444] hover:text-white"}
          `}
                                                      >
                                                            {item.title}
                                                      </button>
                                                </li>
                                          );
                                    })}
                              </ul>
                        </div>
                  </aside>

                  <section className="flex-1 p-6 flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-center">Conversation avec {"l'IA"}</h2>

                        <div className="flex flex-col flex-1 bg-[#EBE9E9] rounded-md shadow-inner p-4 overflow-y-auto relative">
                              <div className="absolute top-2 left w-40">
                                    <select
                                          id="techno"
                                          name="techno"
                                          className="appearance-none mt-1  block w-full bg-[#14202E] text-white px-3 py-2 rounded-md border border-[#3EE4F0] focus:outline-none focus:ring-2 focus:ring-[#3EE4F0] cursor-pointer"
                                    >
                                          <option value="">Techno...</option>
                                          <option value="react">React</option>
                                          <option value="symfony">Symfony</option>
                                          <option value="next">Next.js</option>
                                          <option value="node">Node.js</option>
                                          <option value="worpress">Wordpress</option>
                                          <option value="vue">Vue.js</option>
                                    </select>
                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#3EE4F0]">▼</span>
                              </div>
                              <ul className="flex flex-1 flex-col gap-6">
                                    {Array.isArray(messages) && messages.map((msg, index) => (
                                          <Fragment key={msg.id}>
                                                {msg.createdAt && shouldShowDate(messages, index) && (
                                                      <div className="flex justify-center items-center my-4 text-xs text-black">
                                                            <div className="w-1/4 border-t border-black"></div>
                                                            <span className="px-2">{new Date(msg.createdAt).toDateString()}</span>
                                                            <div className="w-1/4 border-t border-black"></div>
                                                      </div>
                                                )}

                                                <li
                                                      className={`w-auto line-height-[1.5] px-5 max-w-[75%] py-2 rounded-lg ${
                                                            msg.role === "user"
                                                                  ? "self-start bg-[#1FB7C4] text-white"
                                                                  : "self-end bg-[#14202E] text-white"
                                                      }`}
                                                >
                                                      {msg.text}
                                                      <div className="text-xs opacity-60 text-right">
                                                            {new Date(msg.createdAt).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                                                      </div>
                                                </li>
                                          </Fragment>
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
