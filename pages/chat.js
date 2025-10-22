export default function Chat() {
	return (
		 <main className="flex min-h-screen bg-gray-100 text-black">
      <section className="w-1/3 border-r border-gray-300 p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Mes messages</h2>
        
        <div className="flex-1 bg-white rounded-md shadow-inner p-4 overflow-y-auto">
          
        </div>
      </section>

      <section className="flex-1 p-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-center">Réponse de {"l'IA"}</h2>

        <div className="flex-1 bg-white rounded-md shadow-inner p-4 overflow-y-auto">
          
        </div>

        <form className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Écris ton message..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </form>
      </section>
    </main>
	)
}