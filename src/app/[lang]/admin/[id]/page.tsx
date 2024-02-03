import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@actions/isAdmin";
import { getInternshipByIdWithStudentName } from "@db/prepared/internships";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import AdminPreviewForm from "@src/app/modules/AdminPreviewForm";

export const metadata: Metadata = {
  title: "Madle - Admin part",
  description: "Madle administration platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale; id: number } }>) {
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
  };

  const data = (await getInternshipByIdWithStudentName(params.id).execute()).map((internship) => ({
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
      <h1 className="py-7 text-4xl font-semibold italic">{dictionary.adm.managetitle}</h1>
      <AdminPreviewForm dictionary={dictionary} selectedItem={data[0]} columns={column} />
    </main>
  );
}
