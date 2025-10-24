import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("Vérification en cours...");

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      console.log("🔍 Token reçu :", token);
      console.log("🔍 URL appelée :", `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify?token=${token}`);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify?token=${token}`,
          { method: "GET" }
        );

        console.log("📡 Réponse brute :", res);

        let data;
        try {
          data = await res.json();
          console.log("📦 Données JSON :", data);
        } catch (jsonError) {
          console.error("⚠️ Erreur lors du parsing JSON :", jsonError);
          throw new Error("Erreur de parsing JSON");
        }

        if (res.ok) {
          setMessage("✅ Email vérifié avec succès !");
          setTimeout(() => router.push("/index"), 2000);
        } else {
          setMessage(`❌ ${data.error || "Lien invalide ou expiré"}`);
        }
      } catch (error) {
        console.error("🚨 Erreur pendant la requête :", error);
        setMessage("❌ Erreur de connexion au serveur");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-xl font-semibold">{message}</h1>
    </main>
  );
}


// benhamidasamy@hotmail.fr