import Link from "next/link";
export default function Register() {
  return (
	  <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80">
        <h1 className="text-2xl font-semibold text-center mb-6">Inscription</h1>
        <form className="flex flex-col gap-4">
          
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
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
					  { "S'inscrire" }
          </button>
          <Link
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-center inline-block"
            href="/"
          >
            Se connecter
          </Link>
        </form>
      </div>
    </main>
  );
}
