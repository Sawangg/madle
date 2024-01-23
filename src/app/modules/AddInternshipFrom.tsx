"use client";

// TODO: move to page
import { Button } from "@ui/Button";

export default function AddInternshipFrom() {
  return (
    <form className={"rounded border bg-gray-50 p-4"}>
      {/* Company Section */}
      <div className={"mb-5 rounded border p-5"}>
        <h2 className={"text-2xl font-semibold italic"}>Company</h2>
        <section className={"grid grid-cols-2 gap-4"}>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"companyName"}>Company Name:</label>
            <input type="text" id={"companyName"} className={"border"} />
          </div>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"companyAddress"}>Company Address:</label>
            <input type="text" id={"companyAddress"} className={"border"} />
          </div>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"city"}>City:</label>
            <input type="text" id={"city"} className={"border"} />
          </div>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"postalCode"}>Postal Code:</label>
            <input type="text" id={"postalCode"} className={"border"} />
          </div>
        </section>
      </div>
      {/* Contact Section */}
      <div className={"mb-5 rounded border p-5"}>
        <h2 className={"text-2xl font-semibold italic"}>Contact</h2>
        <section className={"grid grid-cols-2 gap-4"}>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"companyTutorName"}>Company Tutor Name:</label>
            <input type="text" id={"companyTutorName"} className={"border"} />
          </div>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"tutorEmail"}>Tutor Email:</label>
            <input type="email" id={"tutorEmail"} className={"border"} />
          </div>
        </section>
      </div>

      {/* Internship Section */}
      <div className={"mb-5 rounded border p-5"}>
        <h2 className={"text-2xl font-semibold italic"}>Internship</h2>
        <section className={"grid grid-cols-2 gap-4"}>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"startDate"}>Start Date:</label>
            <input type="date" id={"startDate"} className={"border"} />
          </div>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"endDate"}>End Date:</label>
            <input type="date" id={"endDate"} className={"border"} />
          </div>
          <div className={"grid grid-cols-2"}>
            <label htmlFor={"mission"}>Mission Description:</label>
            <textarea className={"border"} />
          </div>
        </section>
      </div>

      {/* Document Section */}
      <div className={"mb-5 rounded border p-5"}>
        <h2 className={"text-2xl font-semibold italic"}>Documents</h2>
        <div className={"grid grid-cols-2"}>
          <label htmlFor={"files"}>Drag and drop zone for documents:</label>
          <input type="file" id={"files"} className={"border"} />
        </div>
      </div>

      {/* Submit Button */}
      <div className={"text-center"}>
        <Button className="w-40" type="submit">
          Send
        </Button>
      </div>
    </form>
  );
}
