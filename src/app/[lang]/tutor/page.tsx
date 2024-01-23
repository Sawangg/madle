import React from "react";
import { getInternshipTutorTable } from "@db/prepared/internships";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import type { Dictionary } from "@public/locales/dictionary";
import { CustomTable } from "@src/app/modules/CustomTable";
import PreviewTutor from "@src/app/modules/PreviewTutor";

export default async function Page({ params }: Readonly<{ params: { lang: string } }>) {
  const dictionary = (await getDictionnary(params.lang as Locale)) as unknown as Dictionary;

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
    studentName: ((internship.studentFirstName ?? "") + " " + (internship.studentLastName ?? "")).trim(),
    studentFirstName: internship.studentFirstName ?? "",
    studentLastName: internship.studentLastName ?? "",
  }));

  return (
    <main className={"px-20 py-16 text-blue-900"}>
      <h1 className={"py-7 text-4xl font-semibold italic"}>{dictionary.tutor.title}</h1>
      <section>
        <CustomTable columns={column} data={data} dictionary={dictionary} />
      </section>
      <section>
        <PreviewTutor data={data} />
      </section>
    </main>
  );
}
