import React, { useState } from 'react';

const TimeSlotSelector = ({ selectedDate, onSelectSlot, selectedSlot, onBookSlot }) => {
  const [bookingLength, setBookingLength] = useState(30); // Default booking length is 30 minutes
  const [isBookingPending, setIsBookingPending] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
  const generateTimeSlots = () => {
    const timeSlots = [];
    const startTime = new Date(selectedDate);
    startTime.setHours(12, 0, 0, 0);
    const endTime = new Date(selectedDate);
    endTime.setHours(24, 0, 0, 0);
    const interval = bookingLength * 60 * 1000; // Convert booking length to milliseconds

    while (startTime < endTime) {
      timeSlots.push(new Date(startTime));
      startTime.setTime(startTime.getTime() + interval);
    }
    return timeSlots;
  };

  const handleBookingLengthChange = (length) => {
    setBookingLength(length);
  };

  const handleBookSlot = async () => {
    setIsBookingPending(true);

    // Construct the API request data
    const bookingData = {
        "eventTypeId": 373009, 
          eventType: 373009,
          start: selectedSlot.toISOString(),
          responses: {
            name: "Hello Hello",
            email: "ahassan2102@gmail.com",
            location: "Calcom HQ",
            metadata: {},
          },
          metadata: {},
          timeZone: "Europe/London",
          language: "en",
        
      };
      console.log("bookingData",bookingData);
    try {
      const response = await fetch('https://api.cal.com/v1/bookings?apiKey=cal_live_133ab530e7189387cff734fc79522505', {
        method: 'POST',
        body: JSON.stringify({
            "responses": {
                "email": "ahassan2102@gmail.com",
                "name": "parlaxz asaraxz",
                "guests": [],
                "phone": "66232123114"
            },
            "start": selectedSlot.toISOString(),
            "eventTypeId": 373009,
            "timeZone": "America/Mazatlan",
            "language": "en",
            "location": "",
            "metadata": {},
        }),headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
      });

      if (response.ok) {
        setIsBooked(true);
      } else {
        alert('Booking failed. Please try again.');
        console.log("res",response);
      }
    } catch (error) {
      alert('An error occurred while booking. Please try again later.');
    }

    setIsBookingPending(false);
  };

  return (
    <div className="mt-4">
      <p>Select the length of booking:</p>
      <div className="flex mb-2">
        <button
          className={`mr-2 px-3 py-1 rounded ${
            bookingLength === 30 ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleBookingLengthChange(30)}
        >
          30 min
        </button>
        <button
          className={`mr-2 px-3 py-1 rounded ${
            bookingLength === 60 ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleBookingLengthChange(60)}
        >
          1 hr
        </button>
        <button
          className={`mr-2 px-3 py-1 rounded ${
            bookingLength === 90 ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleBookingLengthChange(90)}
        >
          1.5 hrs
        </button>
        <button
          className={`px-3 py-1 rounded ${
            bookingLength === 120 ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleBookingLengthChange(120)}
        >
          2 hrs
        </button>
      </div>
      <p>Select a time slot for booking on {selectedDate.toDateString()}</p>
      <div className="flex flex-wrap">
        {generateTimeSlots().map((slot) => {
        

          return (
            <div
              key={slot.getTime()}
              className={`bg-green-500 text-white px-4 py-2 rounded-md mt-2 cursor-pointer ${
                selectedSlot && selectedSlot.getTime() === slot.getTime()
                  ? "bg-blue-600"
                  : isBooked
                  ? "bg-gray-300"
                  : ""
              }`}
              onClick={() => !isBooked && onSelectSlot(slot)}
            >
              {slot.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          );
        })}
      </div>
      {selectedSlot && !isBookingPending && (
        <div className="mt-2">
          {/* ... (unchanged) */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={handleBookSlot}
          >
            Book Slot
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
