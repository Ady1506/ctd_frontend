// src/components/UpcomingCard.jsx
import React, { useMemo } from 'react';
import dayjs from 'dayjs';

const weekMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const nextDateFor = (weekday) => {
  const target = weekMap[weekday];
  let date = dayjs();
  while (date.day() !== target || date.isBefore(dayjs(), 'day')) {
    date = date.add(1, 'day');
  }
  return date;
};

const UpcomingCard = ({ course }) => {
  if (!course) return null;
  const { days, start_time, end_time } = course.schedule;

  // compute next occurring day
  const next = useMemo(() => {
    const dates = days.map((d) => nextDateFor(d));
    return dates.sort((a, b) => a.valueOf() - b.valueOf())[0];
  }, [days]);

  const dateLabel = next.format('D MMM'); // e.g. "5 Nov"

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full w-full bg-[#DAE1EC] text-dblue">
      <div className="font-bold text-xl">{dateLabel}</div>
      <div className="text-sm text-center">
        {start_time}
        <br />
        {end_time}
      </div>
    </div>
  );
};

export default UpcomingCard;
