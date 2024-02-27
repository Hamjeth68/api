// AppointmentForm.js

import React, { useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import './AppointmentForm.css';
import Calendar from './Calendar';
import AppointmentScheduler from './Calendar';

const BOOK_APPOINTMENT_MUTATION = gql`
  mutation BookAppointment($name: String!, $email: String!, $date: String!, $time: String!) {
    bookAppointment(name: $name, email: $email, date: $date, time: $time) {
      id
    }
  }
`;

function AppointmentForm() {
  const [formState, setFormState] = useState({ name: '', email: '', date: '', time: '' });
  const [bookAppointment] = useMutation(BOOK_APPOINTMENT_MUTATION);

  const onSubmit = async () => {
    try {
      const { data } = await bookAppointment({ variables: { ...formState } });
      console.log('Appointment booked:', data);
      // Optionally, display a success message to the user
    } catch (error) {
      console.error('Appointment booking error:', error);
      // Optionally, display an error message to the user
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }, [setFormState]);

  const handleDateSelect = useCallback((date) => {
    setFormState({ ...formState, date });
  }, [formState, setFormState]);

  return (
    <div className="form-container">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
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
          <AppointmentScheduler onChange={handleDateSelect}  />
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
