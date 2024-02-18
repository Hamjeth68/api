import React, { useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import './AppointmentForm.css';
import Calendar from './Calendar';
import TimePicker from 'react-time-picker';

const BOOK_APPOINTMENT_MUTATION = gql`
  mutation BookAppointment($name: String!, $email: String!, $date: String!, $time: String!) {
    bookAppointment(name: $name, email: $email, date: $date, time: $time) {
      id
    }
  }
`;

/**
 * Renders a form for booking appointments.
 * @returns {JSX.Element} The rendered AppointmentForm component.
 */
function AppointmentForm() {
  const [formState, setFormState] = useState({ name: '', email: '', date: '', time: '' });
  const [mutate] = useMutation(BOOK_APPOINTMENT_MUTATION, {
    context: {
      fetchOptions: {
        credentials: 'include',
      },
    },
  });

  /**
   * Handles the booking of an appointment.
   * Calls the mutate function to perform the mutation and logs a success message if successful, or an error message if there is an error.
   */
  const bookAppointment = useCallback(async () => {
    try {
      await mutate({
        variables: formState,
      });
      console.log('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  }, [mutate, formState]);

  /**
   * Updates the form state with the selected date.
   * @param {string} date - The selected date.
   */
  const handleDateSelect = (date) => {
    setFormState({ ...formState, date });
  };

  /**
   * Updates the form state with the selected time.
   * @param {string} time - The selected time.
   */
  const handleTimeSelect = (time) => {
    setFormState({ ...formState, time });
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
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <Calendar onDateSelect={handleDateSelect} />
        </div>
        <div className="form-group">
          <input
            type="time"
            name="time"
            placeholder="Time"
            value={formState.time}
            onChange={(e) => setFormState({ ...formState, time: e.target.value })}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
