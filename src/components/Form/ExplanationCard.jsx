import React from "react";

function ExplanationCard() {
  return (
    <div className="card shadow p-4">
      <h3 className="text-success fw-bold mb-3">Why Share?</h3>
      <p>
        Sharing your destination helps other explorers learn more about Kurdistan's hidden gems.
      </p>
      <ul>
        <li>Help promote tourism in your city.</li>
        <li>Highlight unique places.</li>
        <li>Contribute to a community-driven guide.</li>
      </ul>
      <p className="text-muted mt-3 small">
        We only require basic info. Images and location help others discover better!
      </p>
    </div>
  );
}

export default ExplanationCard;
