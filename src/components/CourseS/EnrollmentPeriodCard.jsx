import React from 'react';

// util to pick day & short month from ISO string
const dayMonth = iso => {
  const d = new Date(iso);
  return {
    day: d.getDate(),
    mon: d.toLocaleString('default', { month: 'short' }),
  };
};

const EnrollmentPeriodCard = ({ course }) => {
  if (!course) return null;

  const from = dayMonth(course.start_date);
  const to   = dayMonth(course.end_date);

  return (
    <div className="mt-2 flex bg-[#DAE1EC] p-2">
      {/* duration */}
      <div className="flex flex-col flex-[1] items-center">
        <div className="text-sm font-bold text-dblue pb-1">Period</div>
        <div className="text-2xl font-bold text-dblue">{course.duration_weeks}</div>
        <div className="text-sm font-bold text-dblue">weeks</div>
      </div>

      {/* dates */}
      <div className="flex-[2] flex border-l-2 border-[#999999b2]">
        {/* from */}
        <div className="flex flex-col flex-[1] items-center">
          <div className="text-sm text-dblue pb-1">From</div>
          <div className="text-2xl font-bold text-dblue">{from.day}</div>
          <div className="text-sm font-bold text-dblue">{from.mon}</div>
        </div>
        <div className="flex items-center text-3xl text-[#999999b2]">-</div>
        {/* to */}
        <div className="flex flex-col flex-[1] items-center">
          <div className="text-sm text-dblue pb-1">To</div>
          <div className="text-2xl font-bold text-dblue">{to.day}</div>
          <div className="text-sm font-bold text-dblue">{to.mon}</div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPeriodCard;
