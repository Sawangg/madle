"use client";

// TODO: move to page
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";
import { TextArea } from "@ui/TextArea";

export default function AddInternshipFrom() {
  return (
    <form className="rounded border bg-gray-50 p-4">
      {/* Company Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Company</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="companyName">Company Name:</Label>
            <Input type="text" id="companyName" className="border" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="companyAddress">Company Address:</Label>
            <Input type="text" id="companyAddress" className="border" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="city">City:</Label>
            <Input type="text" id="city" className="border" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="postalCode">Postal Code:</Label>
            <Input type="text" id="postalCode" className="border" />
          </div>
        </section>
      </div>
      {/* Contact Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Contact</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="companyTutorName">Company Tutor Name:</Label>
            <Input type="text" id="companyTutorName" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="tutorEmail">Tutor Email:</Label>
            <Input type="email" id="tutorEmail" />
          </div>
        </section>
      </div>

      {/* Internship Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Internship</h2>
        <section className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2">
            <Label htmlFor="startDate">Start Date:</Label>
            <Input type="date" id="startDate" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="endDate">End Date:</Label>
            <Input type="date" id="endDate" />
          </div>
          <div className="grid grid-cols-2">
            <Label htmlFor="mission">Mission Description:</Label>
            <TextArea id="mission" />
          </div>
        </section>
      </div>

      {/* Document Section */}
      <div className="mb-5 rounded border p-5">
        <h2 className="text-2xl font-semibold italic">Documents</h2>
        <div className="grid grid-cols-2">
          <Label htmlFor="files">Drag and drop zone for documents:</Label>
          <Input type="file" id="files" className="border" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button className="w-40" type="submit">
          Send
        </Button>
      </div>
    </form>
  );
}
