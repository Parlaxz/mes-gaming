import React, { useEffect, useState } from "react";
import MonthCalendar from "./MonthCalendar";

const API_ENDPOINT = "https://api.cal.com/v1/bookings?apiKey=cal_live_133ab530e7189387cff734fc79522505";

interface Booking {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const currentMonth = new Date();

      try {
        const response = await fetch(API_ENDPOINT);
        if (response.ok) {
          const data = await response.json();
          console.log("data", data.bookings);
          setBookings(data.bookings);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Bookings for Current Month</h1>
      {bookings.length === 0 ? (
        <p>No bookings found for the current month.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
                {console.log(booking)}
              <h2>{booking.title}</h2>
              <p>Start Time: {booking.startTime}</p>
              <p>End Time: {booking.endTime}</p>
            </li>
          ))}
        </ul>
      )}
      <MonthCalendar bookings={bookings}/>
    </div>
  );
};

export default Bookings;
