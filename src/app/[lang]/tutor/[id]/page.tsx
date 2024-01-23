import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isTutor } from "@actions/isTutor";
import { getInternshipByIdWithStudentName } from "@db/prepared/internships";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import TutorPreviewForm from "@src/app/modules/TutorPreviewForm";

export const metadata: Metadata = {
  title: "Madle - Tutor review",
  description: "Madle administration platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale; id: string } }>) {
  // Tutor check
  const session = await auth();
  const tutor = await isTutor(session!.user!.email!);
  if (!tutor) return redirect("/");
  const dictionary = await getDictionary(params.lang);

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
      <h1 className="py-7 text-4xl font-semibold italic"> Tutor review</h1>
      <TutorPreviewForm dictionary={dictionary} data={data[0]} />
    </main>
  );
}
