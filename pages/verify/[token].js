// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function VerifyPage() {
//   const router = useRouter();
//   const { token } = router.query;
//   const [message, setMessage] = useState("Vérification en cours...");

//   useEffect(() => {
//     if (!token) return;

//     const verifyEmail = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setMessage("✅ Email vérifié avec succès !");
//           setTimeout(() => router.push("/login"), 2000);
//         } else {
//           setMessage(`❌ ${data.error || "Lien invalide ou expiré"}`);
//         }
//       } catch {
//         setMessage("❌ Erreur de connexion au serveur");
//       }
//     };

//     verifyEmail();
//   }, [token, router]);

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen text-center">
//       <h1 className="text-xl font-semibold">{message}</h1>
//     </main>
//   );
// }
import { useRouter } from 'next/router';

export default function VerifyPage() {
  const router = useRouter();
  const { token } = router.query;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Page de vérification</h1>
      <p>Token reçu : {token || 'Aucun token'}</p>
    </div>
  );
}