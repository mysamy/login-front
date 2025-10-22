import Link from "next/link";

export default function Confirmation() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-green-700">
          Inscription réussie 🎉
        </h1>

        <p className="mb-6 text-gray-700">
          Un email de confirmation vient de vous être envoyé.<br />
          Cliquez sur le lien dans cet email pour activer votre compte.
        </p>

        <Link
          href="/"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Retour à la connexion
        </Link>
      </div>
    </main>
  );
}
