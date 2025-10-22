import Link from "next/link";

export default function Login() {
      return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
                  <div className="bg-white p-8 rounded-2xl shadow-md w-80">
                        <h1 className="text-2xl font-semibold text-center mb-6">Connexion</h1>
                        <form
                              className="flex flex-col gap-4"
                              onSubmit={async (e) => {
                                    e.preventDefault(); // empêche le rechargement

                                    const email = e.target[0].value;
                                    const password = e.target[1].value;
                                console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
                                console.log("URL du backend utilisée :", `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`);
                                  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "");
                                           
                                    try {
                                          const res = await fetch(`${baseUrl}/login`, {
                                                method: "POST",
                                                headers: {"Content-Type": "application/json"},
                                                body: JSON.stringify({email, password}),
                                          });

                                          const data = await res.json();
                                          console.log("Réponse du backend :", data);

                                          alert("Connexion réussie !");
                                    } catch (error) {
                                          console.error("Erreur :", error);
                                          alert("Erreur lors de la connexion");
                                    }
                              }}
                        >
                              <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    required
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                                    Se connecter
                              </button>
                              <Link
                                    href="/register"
                                    className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition text-center inline-block"
                              >
                                    {"S'inscrire"}
                              </Link>
                        </form>
                  </div>
            </main>
      );
}
