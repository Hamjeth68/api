import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AppointmentForm, { BOOK_APPOINTMENT_MUTATION } from '../AppointmentForm';

// Mock Apollo mutation response
const mocks = [
  {
    request: {
      query: BOOK_APPOINTMENT_MUTATION,
      variables: { name: 'John Doe', email: 'john@example.com', date: '2024-02-25', time: '10:00' },
    },
    result: {
      data: { bookAppointment: { id: '1' } },
    },
  },
];

describe('AppointmentForm', () => {
  it('submits the form with correct data', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppointmentForm />
      </MockedProvider>
    );

    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByPlaceholderText('Time'), { target: { value: '10:00' } });

    // You may need to adjust the selector based on your component structure
    fireEvent.click(getByText('Book Appointment'));

    // Wait for the component to finish the mutation
    await waitFor(() => expect(getByText('Appointment booked:')).toBeInTheDocument());
  });
});