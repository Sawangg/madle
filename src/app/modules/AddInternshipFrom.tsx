export default function AddInternshipFrom() {
  return (
    <form>
      {/* Company Section */}
      <div className={"border"}>
        <h2>Company</h2>
        <label>
          Company Name:
          <input type="text" />
        </label>
        <label>
          Company Address:
          <input type="text" />
        </label>
        <label>
          City:
          <input type="text" />
        </label>
        <label>
          Postal Code:
          <input type="text" />
        </label>
      </div>
      {/* Contact Section */}
      <div className={"border"}>
        <h2>Contact</h2>
        <label>
          Company Tutor Name:
          <input type="text" />
        </label>
        <label>
          Tutor Email:
          <input type="email" />
        </label>
      </div>

      {/* Internship Section */}
      <div className={"border"}>
        <h2>Internship</h2>
        <label>
          Mission Description:
          <textarea />
        </label>
        <label>
          Start Date:
          <input type="date" />
        </label>
        <label>
          End Date:
          <input type="date" />
        </label>
      </div>

      {/* Document Section */}
      <div className={"border"}>
        <h2>Documents</h2>
        <label>
          Drag and drop zone for documents:
          <input type="file" />
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit">Send and Save</button>
    </form>
  );
}
