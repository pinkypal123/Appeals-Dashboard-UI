import { useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import CalendarPopup from './models/CalenderPopup';
const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const events = useSelector((state: RootState) => state.calendar.entries);

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);
    setShowPopup(true);
  };

  return (
    <>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date }) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayEvents = events.filter(e => e.date === dateStr);
          if (dayEvents.find(e => e.type === 'event')) return 'bg-success text-white';
          if (dayEvents.find(e => e.type === 'reminder')) return 'bg-danger text-white';
          return '';
        }}
      />
      {showPopup && selectedDate && (
        <CalendarPopup
          selectedDate={selectedDate}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default CustomCalendar;
