import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("Vérification en cours...");

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify`,
          {
          method: "GET",
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("✅ Email vérifié avec succès !");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          setMessage(`❌ ${data.error || "Lien invalide ou expiré"}`);
        }
      } catch {
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
