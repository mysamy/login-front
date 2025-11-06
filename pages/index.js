import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
      const router = useRouter();
      
        const getLogin = async(e) => {
                                    e.preventDefault(); 
                                    const email = e.target[0].value;
                                    const password = e.target[1].value;
                                    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "");

                                    try {
                                          const res = await fetch(`${baseUrl}/login`, {
                                                method: "POST",
                                                credentials: "include",
                                                headers: {"Content-Type": "application/json"},
                                                body: JSON.stringify({email, password}),
                                          });

                                          const data = await res.json();
                                          if (res.ok) {
                                        
                                           router.push("/chat"); 
                                                
                                          } else {
                                                alert(data.error || "Erreur de connexion");
                                          }
                                    } catch (error) {
                                          console.error("Erreur :", error);
                                          alert("Erreur lors de la connexion");
                                    }
      };
      return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
                  <div className="bg-white p-8 rounded-2xl shadow-md w-80">
                        <h1 className="text-2xl font-semibold text-center mb-6">Connexion</h1>
                        <form
                              className="flex flex-col gap-4"
                              onSubmit={getLogin}
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
