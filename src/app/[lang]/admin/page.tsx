import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@actions/isAdmin";
import { getAllInternshipsWithStudentName } from "@db/prepared/internships";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import { SectionInfo } from "@src/app/modules/sectionInfo";
import { Button } from "@ui/Button";

export const metadata: Metadata = {
  title: "Madle - Admin part",
  description: "Madle administration platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale } }>) {
  // Admin check
  const session = await auth();
  const admin = await isAdmin(session!.user!.email!);
  if (!admin) return redirect("/");

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
    studentName:
      internship.studentFirstName && internship.studentLastName
        ? `${internship.studentFirstName} ${internship.studentLastName}`
        : "",
    studentFirstName: internship.studentFirstName ?? "",
    studentLastName: internship.studentLastName ?? "",
  }));

  return (
    <main className="px-20 py-16 text-blue-900">
      <h1 className="py-7 text-4xl font-semibold italic">{dictionary.adm.title}</h1>
      <SectionInfo dictionary={dictionary} />
      <section>
        <h2 className="py-4 text-2xl underline">{dictionary.adm.internshiptitle}</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              {Object.entries(column).map(([_, value], index) => (
                <th key={index} className="border p-2">
                  {value}
                </th>
              ))}
              <th className="border p-2">{dictionary.customtable.preview}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => {
              return (
                <tr key={rowIndex} className="text-center">
                  {Object.keys(column).map((columnKey, columnIndex) => (
                    <td key={columnIndex} className="border p-2">
                      {columnKey == "status"
                        ? (dictionary.adm.form as Record<string, string>)[item[columnKey]]
                        : (item as Record<string, string | number>)[columnKey]}
                    </td>
                  ))}
                  <td className="border p-2">
                    <Link href={`/admin/${item.id}`}>
                      <Button type="submit" color="blue">
                        {dictionary.customtable.preview}
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
