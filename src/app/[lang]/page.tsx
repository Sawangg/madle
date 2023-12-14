import { getDictionnary, type Locale } from "@lib/getDictionnary";

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);
  console.log(dictionnary);

  return (
    <body className="min-h-screen min-w-screen overflow-x-hidden">
      <main className="">
        <p>Hello world</p>
      </main>
    </body>
  );
}
