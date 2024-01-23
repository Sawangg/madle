import type React from "react";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import { CustomTable } from "@src/app/modules/CustomTable";
import StudentPreview from "@src/app/modules/StudentPreview";

export default async function Page({ params }: Readonly<{ params: { lang: string } }>) {
  const dictionary = await getDictionary(params.lang as Locale);

  // Column key and its name in the table (based on language)
  // (Be sure that the key is exactly the same as the one in the data or the value won't be displayed)
  const column = {
    date: dictionary.tutor.column.date,
    company: dictionary.tutor.column.company,
    contact: dictionary.tutor.column.contact,
    internship: dictionary.tutor.column.internship,
    document: dictionary.tutor.column.document,
    content: dictionary.tutor.column.content,
    status: dictionary.tutor.column.status,
  };
  const data = [
    {
      date: "2022-01-01",
      company: "DBA inc",
      contact: "John Doe",
      internship: "Architect",
      document: "Resume",
      content: "...",
      status: "check",
    },
    {
      date: "2022-02-01",
      company: "ZAB com",
      contact: "Emily Dupont",
      internship: "Marketing digital",
      document: "Cover Letter",
      content: "...",
      status: "not check",
    },
  ];

  return (
    <main className={"px-20 py-16 text-blue-900"}>
      <h1 className={"py-7 text-4xl font-semibold italic"}>{dictionary.tutor.title}</h1>
      <section>
        <CustomTable columns={column} data={data} dictionary={dictionary} />
      </section>
      <section>
        <h2 className={"py-4 text-2xl underline"}>Preview</h2>
        <StudentPreview studentName={"John Doe"} studentYear={"M2 APP LSI"} />
      </section>
    </main>
  );
}
