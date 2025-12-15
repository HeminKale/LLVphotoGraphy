import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

const bookedDates = [
  '2025-06-15',
  '2025-07-20',
  '2025-08-10',
  '2025-09-05',
  '2025-10-12',
];

export default function AvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateBooked = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookedDates.includes(dateString);
  };

  const isDatePast = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isBooked = isDateBooked(day);
    const isPast = isDatePast(day);

    days.push(
      <div
        key={day}
        className={`aspect-square flex items-center justify-center text-sm relative ${
          isPast
            ? 'text-sand-300 cursor-not-allowed'
            : isBooked
            ? 'bg-rose-100 text-rose-700 font-semibold'
            : 'text-slate-700 hover:bg-cream-200'
        } transition-colors rounded-sm`}
      >
        {day}
        {isBooked && !isPast && (
          <X className="w-3 h-3 absolute top-1 right-1 text-rose-500" />
        )}
        {!isBooked && !isPast && (
          <Check className="w-3 h-3 absolute top-1 right-1 text-green-500 opacity-0 hover:opacity-100" />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-sm shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-sand-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h3 className="font-serif text-xl text-slate-800">
          {monthName} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-sand-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-slate-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{days}</div>

      <div className="mt-6 pt-6 border-t border-sand-200 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-rose-100 rounded-sm" />
          <span className="text-slate-600">Date booked</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-white border border-sand-300 rounded-sm" />
          <span className="text-slate-600">Date available</span>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Calendar shows general availability. Specific dates confirmed after inquiry.
        </p>
      </div>
    </div>
  );
}
