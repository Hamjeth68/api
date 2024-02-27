import React, { useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import './AppointmentForm.css';
import Calendar from './Calendar';
import { apiCalendar } from '../config';

const BOOK_APPOINTMENT_MUTATION = gql`
  mutation BookAppointment(
    $name: String!
    $email: String!
    $date: String!
    $time: String!
    $build: String!
    $whatToBuild: String!
    $website: String!
    $contactNumber: String!
  ) {
    bookAppointment(
      name: $name
      email: $email
      date: $date
      time: $time
      build: $build
      whatToBuild: $whatToBuild
      website: $website
      contactNumber: $contactNumber
    ) {
      id
    }
  }
`;

function AppointmentForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    build: '',
    whatToBuild: '',
    website: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [bookAppointment] = useMutation(BOOK_APPOINTMENT_MUTATION);

  const onSubmit = useCallback(async () => {
    setLoading(true); // Set loading to true before mutation call
    try {
      const { data } = await bookAppointment({ variables: { ...formState } });
      console.log('Appointment booked:', data);
  
      // Create event object
      const event = {
        summary: `Appointment with ${formState.name}`,
        start: {
          dateTime: `${formState.date}T${formState.time}:00`, // Add ":00" to format time as HH:mm:ss
          timeZone: 'Europe/Paris', // Update with your time zone
        },
        end: {
          dateTime: `${formState.date}T${formState.time}:00`, // Add ":00" to format time as HH:mm:ss
          timeZone: 'Europe/Paris', // Update with your time zone
        },
      };
  
      // Create Google Calendar event
      const calendarEventResult = await apiCalendar.createEventFromNow(event);
      console.log('Calendar event created:', calendarEventResult);
  
    } catch (error) {
      console.error('Appointment booking error:', error);
    } finally {
      setLoading(false); // Reset loading to false after mutation call
    }
  }, [bookAppointment, formState]);
  

  const handleInputChange = useCallback((e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleDateSelect = useCallback((date: any) => {
    setFormState(prevState => ({ ...prevState, date }));
  }, []);

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
        <div className="form-group">
          <input
            type="text"
            name="build"
            placeholder="Build"
            value={formState.build}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="whatToBuild"
            placeholder="What to Build"
            value={formState.whatToBuild}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formState.website}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formState.contactNumber}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-submit" disabled={loading}>
          {loading ? 'Loading...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
