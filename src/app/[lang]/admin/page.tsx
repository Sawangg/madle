import { redirect } from "next/navigation";
import { isAdmin } from "@actions/isAdmin";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";

export default async function AdminHomePage({ params }: Readonly<{ params: { lang: Locale } }>) {
  const session = await auth();
  const admin = await isAdmin(session!.user!.email!);
  if (!admin) return redirect("/");

  const dictionnary = await getDictionary(params.lang);
  console.log(dictionnary);

  return (
    <div className="p-4">
      <p>Admin page</p>
    </div>
  );
}
