import React from 'react';

function AppointmentFormStep1({ formData, onChange, onNext }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div>
      <h2>Step 1: Select Date & Time</h2>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default AppointmentFormStep1;
