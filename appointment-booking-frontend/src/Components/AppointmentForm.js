import React, { useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import './AppointmentForm.css';
import Calendar from './Calendar'; // Import the Calendar component

const BOOK_APPOINTMENT_MUTATION = gql`
  mutation BookAppointment($name: String!, $email: String!, $date: String!, $time: String!) {
    bookAppointment(name: $name, email: $email, date: $date, time: $time) {
      id
    }
  }
`;

function AppointmentForm() {
  const [formState, setFormState] = useState({ name: '', email: '', date: '', time: '' });
  const [mutate] = useMutation(BOOK_APPOINTMENT_MUTATION, {
    context: {
      fetchOptions: {
        credentials: 'include',
      },
    },
  });

  const bookAppointment = useCallback(async () => {
    await mutate({
      variables: formState,
    });
  }, [mutate, formState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  const handleDateSelect = (date) => {
    setFormState({ ...formState, date }); // Update form state with selected date
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          bookAppointment();
        }}
      >
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formState.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          {/* Render the Calendar component and pass handleDateSelect as a prop */}
          <Calendar onDateSelect={handleDateSelect} />
        </div>
        <div className="form-group">
          <input
            type="time"
            name="time"
            placeholder="Time"
            value={formState.time}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentForm;