import React, { useState, useCallback } from 'react';

interface CalendarProps {
  onDateSelect?: (date: Date) => void | undefined;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  }, [onDateSelect]);

  
  const today = new Date();
  const minDate = today.toISOString().split('T')[0]; // Get today's date in "yyyy-MM-dd" format
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]; // Get last day of the current month

  return (
    <input 
      type="date" 
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} 
      min={minDate} 
      max={maxDate}
      onChange={(e) => handleDateSelect(new Date(e.target.value))} 
    />
  );
}

export default Calendar;
