import type { Metadata } from "next";
import { getAllInternshipsWithStudentName } from "@db/prepared/internships";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import { CustomTable } from "@src/app/modules/CustomTable";

export const metadata: Metadata = {
  title: "Madle - Admin part",
  description: "Madle administration platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale } }>) {
  const dictionary = await getDictionary(params.lang);

  /* CustomTable data + column name based on language */

  // Column key and its name in the table (based on language)
  // (Be sure that the key is exactly the same as the one in the data or the value won't be displayed)
  const column: Record<string, string> = {
    dateStart: dictionary.adm.column.datestart,
    dateEnd: dictionary.adm.column.dateend,
    company: dictionary.adm.column.company,
    studentName: dictionary.adm.column.student,
    title: dictionary.adm.column.title,
    status: dictionary.adm.column.status,
  };

  const data = (await getAllInternshipsWithStudentName.execute()).map((internship) => ({
    ...internship,
    dateStart: internship.dateStart.toISOString().split("T")[0],
    dateEnd: internship.dateEnd.toISOString().split("T")[0],
    studentName: internship.studentName ?? "",
  }));

  return (
    <main className="px-20 py-16 text-blue-900">
      <h1 className="py-7 text-4xl font-semibold italic">{dictionary.adm.title}</h1>
      <section>
        <h2 className="py-4 text-2xl underline">{dictionary.adm.internshiptitle}</h2>
        <CustomTable columns={column} data={data} lang={params.lang} adminPage />
      </section>
    </main>
  );
}
