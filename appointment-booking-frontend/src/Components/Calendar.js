import React, { useState } from 'react';
import './Calendar.css';

function Calendar({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0]; // Get date in "yyyy-MM-dd" format
    onDateSelect(formattedDate); // Pass selected date to parent component
  };

  return (
    <input 
      type="date" 
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} 
      onChange={(e) => handleDateSelect(new Date(e.target.value))} 
    />
  );
}

export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Calendar onDateSelect={handleDateSelect} />
    </div>
  );
}
