import { redirect } from "next/navigation";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";

export default async function AdminLoginPage({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionary(params.lang as Locale);
  console.log(dictionnary);
  const session = await auth();
  if (session) return redirect("/admin");

  return (
    <main className="flex h-screen items-center justify-center">
      <p>Login</p>
    </main>
  );
}
