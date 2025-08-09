// src/pages/SubmissionSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

function SubmissionSuccess() {
  return (
    <div className="container py-5 text-center">
      <h2 className="text-success mb-3">✅ Submission Received!</h2>
      <p>Your post has been submitted successfully and is awaiting review.</p>
      <Link to="/" className="btn btn-success mt-4">
        Back to Home
      </Link>
    </div>
  );
}

export default SubmissionSuccess;
