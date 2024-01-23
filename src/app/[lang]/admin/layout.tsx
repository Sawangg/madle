import type React from "react";
import type { Metadata } from "next";
import { auth, signOut } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";

export const metadata: Metadata = {
  title: "Madle — Admin",
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionnary = await getDictionary(params.lang as Locale);
  const session = await auth();

  return (
    <main className="min-h-screen min-w-screen overflow-x-hidden">
      {children}
      <footer>
        {session && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="fixed bottom-4 right-4"
          >
            <button>{dictionnary.admin.signout}</button>
          </form>
        )}
      </footer>
    </main>
  );
}
