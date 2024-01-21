import React from "react";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import type { Dictionary } from "@public/locales/dictionary";
import { CustomTable } from "@src/app/modules/CustomTable";

export default async function Page({ params }: Readonly<{ params: { lang: string } }>) {
  const dictionary: Dictionary = await getDictionnary(params?.lang as Locale);

  /*CustomTable data + column name based on language*/
  const column = [
    dictionary.adm.column.date,
    dictionary.adm.column.company,
    dictionary.adm.column.student,
    dictionary.adm.column.internship,
    dictionary.adm.column.document,
    dictionary.adm.column.status,
  ];

  const data = [
    {
      Date: "2022-01-01",
      Company: "ABC Inc",
      Student: "John Doe",
      Internship: "Software Developer",
      Document: "Resume",
      Status: "Pending",
    },
    {
      Date: "2022-02-01",
      Company: "XYZ Ltd",
      Student: "Jane Smith",
      Internship: "Marketing Intern",
      Document: "Cover Letter",
      Status: "Ended",
    },
  ];

  return (
    <main className={"px-20 py-16 text-blue-900"}>
      <h1 className={"py-7 text-4xl font-semibold italic"}>{dictionary.adm.title}</h1>
      <section>
        <h2 className={"py-4 text-2xl underline"}>{dictionary.adm.internshiptitle}</h2>
        <CustomTable columns={column} data={data} dictionary={dictionary} adminPage />
      </section>
    </main>
  );
}
