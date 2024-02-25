import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AppointmentForm, { BOOK_APPOINTMENT_MUTATION } from './AppointmentForm';

// Mock Apollo mutation response
const mocks = [
  {
    request: {
      query: BOOK_APPOINTMENT_MUTATION,
      variables: { name: 'John Doe', email: 'john@example.com', date: '2024-02-22', time: '10:00' },
    },
    result: { data: { bookAppointment: { id: 'abc123' } } },
  },
];

describe('AppointmentForm', () => {
  it('submits form with correct data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppointmentForm />
      </MockedProvider>
    );

    // Fill in form inputs
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Time'), { target: { value: '10:00' } });

    // Simulate date selection (assuming a Calendar component is integrated)
    fireEvent.click(screen.getByText('22')); // Simulate selecting 22nd day of the month

    // Submit form
    fireEvent.click(screen.getByText('Book Appointment'));

    // Wait for mutation to complete
    await waitFor(() => expect(screen.getByText('Appointment booked:')).toBeInTheDocument());
  });
 



});
