import TimeSlotSelector from "./TimeSlotSelector";
import React, { useState } from 'react';
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();


const MonthCalendar = ({ bookings }) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date();
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const monthName = months[currentMonth];
    const numDays = daysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
    const handleCellClick = (day) => {
      setSelectedDate(new Date(currentYear, currentMonth, day + 1));
      setSelectedSlot(null);
    };
  
    const handleSlotSelect = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleBookSlot = () => {
      const userName = prompt("Please enter your name:");
      if (userName) {
        alert(`Thank you, ${userName}! You have successfully booked a slot for ${selectedSlot.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })} on ${selectedDate.toDateString()}. The price is $10.`);
      }
    };
  
    const days = [...Array(numDays).keys()].map((day) => (
      <td
        key={day}
        className={`border p-4 cursor-pointer ${
          selectedDate &&
          selectedDate.getFullYear() === currentYear &&
          selectedDate.getMonth() === currentMonth &&
          selectedDate.getDate() === day + 1
            ? "bg-yellow-200"
            : ""
        }`}
        onClick={() => handleCellClick(day)}
      >
        {day + 1}
        {bookings.map((booking) => {
          const bookingDate = new Date(booking.startTime);
          if (
            bookingDate.getFullYear() === currentYear &&
            bookingDate.getMonth() === currentMonth &&
            bookingDate.getDate() === day + 1
          ) {
            return (
              <div
                key={booking.id}
                className="bg-blue-300 rounded-md p-1 text-xs"
              >
                {`${bookingDate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })} - ${booking.title}`}
              </div>
            );
          }
          return null;
        })}
      </td>
    ));
  
    const emptyDays = [...Array(firstDayOfMonth).keys()].map((day) => (
      <td key={`empty-${day}`} className="border p-4">
        &nbsp;
      </td>
    ));
  
    const allDays = [...emptyDays, ...days];
  
    const rows = [];
    for (let i = 0; i < allDays.length; i += 7) {
      rows.push(
        <tr key={i}>
          {allDays.slice(i, i + 7)}
        </tr>
      );
    }
  
    const goToPreviousMonth = () => {
      setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
      setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
      setSelectedDate(null);
      setSelectedSlot(null);
    };
  
    const goToNextMonth = () => {
      setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
      setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
      setSelectedDate(null);
      setSelectedSlot(null);
    };
  
    return (
      <div className="mx-auto w-3/4 p-4">
        <div className="flex justify-between mb-4">
          <button onClick={goToPreviousMonth} className="border p-2">
            &lt;
          </button>
          <h2 className="text-2xl">{monthName} {currentYear}</h2>
          <button onClick={goToNextMonth} className="border p-2">
            &gt;
          </button>
        </div>
        <table className="table-auto border">
          <thead>
            <tr>
              <th className="border p-4">Sun</th>
              <th className="border p-4">Mon</th>
              <th className="border p-4">Tue</th>
              <th className="border p-4">Wed</th>
              <th className="border p-4">Thu</th>
              <th className="border p-4">Fri</th>
              <th className="border p-4">Sat</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        {selectedDate && (
          <TimeSlotSelector
            selectedDate={selectedDate}
            onSelectSlot={handleSlotSelect}
            selectedSlot={selectedSlot}
            onBookSlot={handleBookSlot}
          />
        )}
      </div>
    );
  };

  export default MonthCalendar;