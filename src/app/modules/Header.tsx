import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import { Button } from "@src/ui/Button";

export type HeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  lang: Locale;
};

export const Header: React.FC<HeaderProps> = async ({ lang }) => {
  const dictionary = await getDictionary(lang);
  const session = await auth();

  return (
    <header className="grid grid-cols-3 items-center gap-4 bg-blue-900 p-2 px-10 text-center shadow-xl">
      <Link href="/">
        <Image src="/assets/MadleLogo.svg" alt="MadleLogo" width="100" height="100" />
      </Link>
      <h1 className="text-3xl font-semibold uppercase italic text-white">Madle</h1>
      {session && (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="text-end"
        >
          <Button color="red" type="submit">
            {dictionary.admin.signout}
          </Button>
        </form>
      )}
    </header>
  );
};
