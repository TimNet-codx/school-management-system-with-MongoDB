// import Image from "next/image";
// import AttendanceChart from "./AttendanceChart";
// import prisma from "@/lib/prisma";

// const AttendanceChartContainer = async () => {
//   const today = new Date();
//   const dayOfWeek = today.getDay();
//   const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

//   const lastMonday = new Date(today);

//   lastMonday.setDate(today.getDate() - daysSinceMonday);
//   const responseData = await prisma.attendance.findMany({
//     where: {
//       date: {
//         gte: lastMonday,
//       },
//     },
//     select: {
//       date: true,
//       present: true,
//     },
//   });

//   console.log(responseData);
//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

//   const attendanceMap: { [key: string]: { present: number; absent: number } } =
//     {
//       Mon: { present: 0, absent: 0 },
//       Tue: { present: 0, absent: 0 },
//       Wed: { present: 0, absent: 0 },
//       Thu: { present: 0, absent: 0 },
//       Fri: { present: 0, absent: 0 },
//     };

//   responseData.forEach((item) => {
//     const itemDate = new Date(item.date);

//     // Monday - Friday
//     if (dayOfWeek >= 1 && dayOfWeek <= 5) {
//       const dayName = daysOfWeek[dayOfWeek - 1];

//       if (item.present) {
//         attendanceMap[dayName].present += 1;
//       } else {
//         attendanceMap[dayName].absent += 1;
//       }
//     }
//   });

//   console.log(attendanceMap);
//   const data = daysOfWeek.map((day) =>({
//     name: day,
//     present: attendanceMap[day].present,
//     absent: attendanceMap[day].absent,
//   }));

//   return (
//     <div className="bg-white rounded-lg p-4 h-full w-full">
//       <div className="flex justify-between items-center">
//         <h1 className="text-lg font-semibold">Attendance</h1>
//         <Image src="/moreDark.png" alt="" width={20} height={20} />
//       </div>
//       <AttendanceChart data={data} />
//     </div>
//   );
// };
// export default AttendanceChartContainer;

import prisma from "@/lib/prisma";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import AttendanceChart from "./AttendanceChart";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sun
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);
  lastMonday.setHours(0, 0, 0, 0);

  const records = await prisma.attendance.findMany({
    where: { date: { gte: lastMonday } },
    select: {
      date: true,
      present: true,
      student: { select: { grade: { select: { level: true } } } },
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const attendanceMap: Record<string, { present: number; absent: number }> = {};
  daysOfWeek.forEach((d) => (attendanceMap[d] = { present: 0, absent: 0 }));

  // Per-grade numbers for today
  const gradeMap: Record<string, { present: number; total: number }> = {};
  let weekPresent = 0;
  let weekTotal = 0;

  records.forEach((item) => {
    const d = new Date(item.date);
    const idx = d.getDay(); // use the RECORD's weekday, not today's
    if (idx < 1 || idx > 5) return;

    const dayName = daysOfWeek[idx - 1];
    if (item.present) attendanceMap[dayName].present += 1;
    else attendanceMap[dayName].absent += 1;

    weekTotal += 1;
    if (item.present) weekPresent += 1;

    if (d.toDateString() === today.toDateString()) {
      const level = item.student?.grade?.level;
      if (level !== undefined) {
        gradeMap[level] ??= { present: 0, total: 0 };
        gradeMap[level].total += 1;
        if (item.present) gradeMap[level].present += 1;
      }
    }
  });

  const todayName =
    dayOfWeek >= 1 && dayOfWeek <= 5 ? daysOfWeek[dayOfWeek - 1] : null;

  const data = daysOfWeek.map((day) => ({
    name: day === todayName ? "Today" : day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  const presentPct = weekTotal ? (weekPresent / weekTotal) * 100 : 0;
  const absentPct = weekTotal ? 100 - presentPct : 0;
  const todayAbsent = todayName ? attendanceMap[todayName].absent : 0;

  const grades = Object.entries(gradeMap)
    .sort(([a], [b]) => Number(a) - Number(b))
    .slice(0, 4);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-full w-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            Daily Attendance Overview
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5">
              Live Feed
            </span>
          </h1>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Consolidated student check-ins across all grades
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-700" />
            Present ({presentPct.toFixed(1)}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-200" />
            Absent / Excused ({absentPct.toFixed(1)}%)
          </span>
        </div>
      </div>

      {/* CHART */}
      <div className="flex-1 min-h-0 mt-3">
        <AttendanceChart data={data} />
      </div>

      {/* GRADE BREAKDOWN */}
      {grades.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          {grades.map(([level, g]) => (
            <div
              key={level}
              className="border border-gray-100 rounded-lg p-2 bg-gray-50/60"
            >
              <p className="text-[10px] text-gray-500">Grade {level}</p>
              <p className="text-base font-bold text-gray-900">
                {((g.present / g.total) * 100).toFixed(1)}%
              </p>
              <p className="text-[10px] text-gray-400">
                {g.present}/{g.total} Present
              </p>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-3 text-[11px]">
        <span className="flex items-center gap-1.5 text-amber-600">
          <AlertTriangle className="w-3.5 h-3.5" />
          {todayAbsent} unexcused absences flagged for review today
        </span>
        <Link
          href="/list/attendance"
          className="font-medium text-blue-600 hover:underline"
        >
          Open Daily Roll ›
        </Link>
      </div>
    </div>
  );
};

export default AttendanceChartContainer;
