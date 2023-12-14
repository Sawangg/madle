import { redirect } from "next/navigation";
import { auth } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";

export default async function AdminLoginPage({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);
  console.log(dictionnary);
  const session = await auth();
  if (session) return redirect("/admin");

  return (
    <main className="flex h-screen items-center justify-center">
      <p>Login</p>
    </main>
  );
}
