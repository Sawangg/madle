"use client";

// TODO: move to page
import { addInternship } from "@actions/addInternship";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";
import { Option, Select } from "@ui/Select";

type FormProps = {
  studentId: string;
  tutorsList: { userId: string; username: string | null; email: string }[];
};

export default function AddInternshipForm({ studentId, tutorsList }: Readonly<FormProps>) {
  const addInternshipWithStudentId = async (formData: FormData) => {
    formData.append("studentId", studentId);
    await addInternship(formData);
  };

  return (
    <form className="rounded border bg-gray-50 p-4" action={addInternshipWithStudentId}>
      {/* Company Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Company</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="companyName">Company Name:</Label>
            <Input name="companyName" type="text" id="companyName" className="border" required />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="companyAddress">Company Address:</Label>
            <Input name="companyAddress" type="text" id="companyAddress" className="border" required />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="city">City:</Label>
            <Input name="companyCity" type="text" id="companyCity" className="border" required />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="postalCode">Postal Code:</Label>
            <Input name="companyPostalCode" type="number" min="0" id="companyPostalCode" className="border" required />
          </div>
        </section>
      </div>
      {/* Tutor Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Tutor</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="contactEmail">Select Tutor:</Label>
            <Select name="tutorId" id="tutorId" label="tutorId" isRequired>
              {tutorsList.map((tutor) => (
                <Option key={tutor.userId} value={tutor.userId}>
                  {tutor.username} ({tutor.email})
                </Option>
              ))}
            </Select>
          </div>
        </section>
      </div>

      {/* Internship Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Internship</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="dateStart">Start Date:</Label>
            <Input name="dateStart" type="date" id="dateStart" required />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="dateEnd">End Date:</Label>
            <Input name="dateEnd" type="date" id="dateEnd" required />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="title">Title:</Label>
            <Input name="title" id="title" required />
          </div>
        </section>
      </div>

      {/* Document Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Documents</h2>
        <div className="grid grid-cols-2">
          <Label htmlFor="files">Drag and drop zone for documents:</Label>
          <Input name="files" type="file" id="files" className="border" />
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
