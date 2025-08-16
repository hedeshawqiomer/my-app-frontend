import React from "react";

function BasicInfo({ name, setName, email, setEmail }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Your Name
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="eg: Ahmed Muhammed"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

  

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Your Email <small className="text-body-secondary">(Optional)</small>
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="eg: ahmad.muhamed@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
       
        />
      </div>
    </>
  );
}

export default BasicInfo;
