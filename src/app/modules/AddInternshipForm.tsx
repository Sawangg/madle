"use client";

// TODO: move to page
import { addInternship } from "@actions/addInternship";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";

export default function AddInternshipForm({ studentId }) {
  const addInternshipWithStudentId = async () => {
    const data = {
      companyName: (document.getElementById("companyName") as HTMLInputElement).value,
      companyAddress: (document.getElementById("companyAddress") as HTMLInputElement).value,
      companyCity: (document.getElementById("companyCity") as HTMLInputElement).value,
      companyPostalCode: (document.getElementById("companyPostalCode") as HTMLInputElement).value,
      contactName: (document.getElementById("contactName") as HTMLInputElement).value,
      contactEmail: (document.getElementById("contactEmail") as HTMLInputElement).value,
      dateStart: (document.getElementById("dateStart") as HTMLInputElement).value,
      dateEnd: (document.getElementById("dateEnd") as HTMLInputElement).value,
      title: (document.getElementById("title") as HTMLInputElement).value,
      studentId: studentId as string,
    };
    await addInternship(data);
  };

  return (
    <form className="rounded border bg-gray-50 p-4" action={addInternshipWithStudentId}>
      {/* Company Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Company</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="companyName">Company Name:</Label>
            <Input name="companyName" type="text" id="companyName" className="border" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="companyAddress">Company Address:</Label>
            <Input name="companyAddress" type="text" id="companyAddress" className="border" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="city">City:</Label>
            <Input name="companyCity" type="text" id="companyCity" className="border" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="postalCode">Postal Code:</Label>
            <Input name="companyPostalCode" type="text" id="companyPostalCode" className="border" />
          </div>
        </section>
      </div>
      {/* Contact Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Contact</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="contactName">Contact Name:</Label>
            <Input name="contactName" type="text" id="contactName" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="contactEmail">Contact Email:</Label>
            <Input name="contactEmail" type="email" id="contactEmail" />
          </div>
        </section>
      </div>

      {/* Internship Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Internship</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="dateStart">Start Date:</Label>
            <Input name="dateStart" type="date" id="dateStart" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="dateEnd">End Date:</Label>
            <Input name="dateEnd" type="date" id="dateEnd" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="title">Title:</Label>
            <Input name="title" id="title" />
          </div>
        </section>
      </div>

      {/* Document Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Documents</h2>
        <div className="grid grid-cols-2">
          <Label htmlFor="files">Drag and drop zone for documents:</Label>
          <Input name="files" type="files" id="files" className="border" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button className="w-40" type="submit" color="blue">
          Send
        </Button>
      </div>
    </form>
  );
}
