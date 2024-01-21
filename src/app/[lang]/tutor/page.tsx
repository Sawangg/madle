import type React from "react";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { CustomTable } from "@src/app/modules/CustomTable";
import StudentPreview from "@src/app/modules/StudentPreview";

export default async function Page({ params }: Readonly<{ params: { lang: string } }>) {
  const dictionary = await getDictionnary(params.lang as Locale);
  console.log(dictionary);

  /*CustomTable data + column name*/
  const column = ["Date", "Company", "Contact", "Internship", "Document", "Content", "Status"];
  const data = [
    {
      Date: "2022-01-01",
      Company: "DBA inc",
      Contact: "John Doe",
      Internship: "Architect",
      Document: "Resume",
      Content: "...",
      Status: "check",
    },
    {
      Date: "2022-02-01",
      Company: "ZAB com",
      Contact: "Emily Dupont",
      Internship: "Marketing digital",
      Document: "Cover Letter",
      Content: "...",
      Status: "not check",
    },
  ];

  return (
    <main className={"px-20 py-16 text-blue-900"}>
      <h1 className={"py-7 text-4xl font-semibold italic"}>Tutor</h1>
      <section>
        <CustomTable columns={column} data={data} />
      </section>
      <section>
        <h2 className={"py-4 text-2xl underline"}>Preview</h2>
        <StudentPreview studentName={"John Doe"} studentYear={"M2 APP LSI"} />
      </section>
    </main>
  );
}
