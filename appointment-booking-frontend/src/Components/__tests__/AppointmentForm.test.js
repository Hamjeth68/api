import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import AppointmentForm from './AppointmentForm';

test('updates form state for name and email', () => {
  const { getByPlaceholderText } = render(<AppointmentForm />);
  const nameInput = getByPlaceholderText('Name');
  const emailInput = getByPlaceholderText('Email');

  act(() => {
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  });

  expect(nameInput.value).toBe('John Doe');
  expect(emailInput.value).toBe('john.doe@example.com');
});

test('updates form state for date and time', () => {
  const { getByPlaceholderText } = render(<AppointmentForm />);
  const dateInput = getByPlaceholderText('Date');
  const timeInput = getByPlaceholderText('Time');

  act(() => {
    fireEvent.change(dateInput, { target: { value: '2022-12-25' } });
    fireEvent.change(timeInput, { target: { value: '10:00' } });
  });

  expect(dateInput.value).toBe('2022-12-25');
  expect(timeInput.value).toBe('10:00');
});

test('calls bookAppointment function when form is submitted', () => {
  const { getByText } = render(<AppointmentForm />);
  const submitButton = getByText('Book Appointment');

  act(() => {
    fireEvent.click(submitButton);
  });

  // Add assertion for calling the bookAppointment function
});

// Add more tests for bookAppointment function behavior