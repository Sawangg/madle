import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getInternshipByIdWithStudentName } from "@db/prepared/internships";
import { preparedUserEmail } from "@db/prepared/preparedUserEmail";
import { auth } from "@lib/auth";
import { getDictionary, type Locale } from "@lib/getDictionnary";
import TutorPreviewForm from "@src/app/modules/TutorPreviewForm";
import { Button } from "@ui/Button";

export const metadata: Metadata = {
  title: "Madle - Tutor review",
  description: "Madle administration platform",
};

export default async function Page({ params }: Readonly<{ params: { lang: Locale; id: string } }>) {
  // Tutor check
  const session = await auth();
  if (session?.user?.email !== undefined) {
    const user = await preparedUserEmail.execute({ email: session?.user?.email });
    if (user.length === 0) redirect("/");
    if (user[0].role !== "tutor") redirect("/");
  }
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
      <Link href={`/tutor`}>
        <Button color="blue">Back</Button>
      </Link>
      <h1 className="py-7 text-4xl font-semibold italic"> Tutor review</h1>
      <TutorPreviewForm dictionary={dictionary} data={data[0]} />
    </main>
  );
}
