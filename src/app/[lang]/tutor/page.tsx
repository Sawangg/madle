import type { Metadata } from "next";
import { getInternshipTutorTable } from "@db/prepared/internships";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import { CustomTable } from "@src/app/modules/CustomTable";
import StudentPreview from "@src/app/modules/StudentPreview";

export const metadata: Metadata = {
  title: "Madle - Tutor part",
  description: "Madle internship platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale } }>) {
  const dictionary = await getDictionary(params.lang);

  // Column key and its name in the table (based on language)
  // (Be sure that the key is exactly the same as the one in the data or the value won't be displayed)
  const column: Record<string, string> = {
    dateStart: dictionary.adm.column.datestart,
    dateEnd: dictionary.adm.column.dateend,
    studentName: dictionary.adm.column.student,
    title: dictionary.adm.column.title,
    company: dictionary.adm.column.company,
    status: dictionary.adm.column.status,
  };
  const data = (await getInternshipTutorTable.execute()).map((internship) => ({
    ...internship,
    dateStart: internship.dateStart.toISOString().split("T")[0],
    dateEnd: internship.dateEnd.toISOString().split("T")[0],
    studentName: internship.studentName ?? "",
  }));

  return (
    <main className={"px-20 py-16 text-blue-900"}>
      <h1 className={"py-7 text-4xl font-semibold italic"}>{dictionary.tutor.title}</h1>
      <section>
        <CustomTable columns={column} data={data} lang={params.lang} />
      </section>
      <section>
        <h2 className={"py-4 text-2xl underline"}>Preview</h2>
        <StudentPreview studentName={"John Doe"} studentYear={"M2 APP LSI"} />
      </section>
    </main>
  );
}
