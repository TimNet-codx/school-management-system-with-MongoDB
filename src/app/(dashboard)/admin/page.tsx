// import Announcements from "@/components/Announcements";
// import AttendanceChartContainer from "@/components/AttendanceChartContainer";
// import CountChartContainer from "@/components/CountChartContainer";
// import EventCalendarContainer from "@/components/EventCalendarContainer";
// import FinanceChart from "@/components/FinanceChart";
// import UserCard from "@/components/UserCard";

// const AdminPage = ({
//   searchParams
// } :{
//   searchParams: {[keys:string]: string | undefined};
// }) => {
//   return (
//     <div className="p-4 flex gap-4 flex-col md:flex-row">
//       {/* LEFT */}
//       <div className="w-full lg:w-2/3 flex flex-col gap-8">
//         {/* User Card */}
//         <div className="flex gap-4 justify-between flex-wrap">
//           <UserCard type="admin" />
//           <UserCard type="student" />
//           <UserCard type="teacher" />
//           <UserCard type="parent" />
//         </div>
//         {/* MIDDLE CHART */}
//         <div className="flex gap-4 flex-col lg:flex-row">
//           {/* COUNT CHART */}
//           <div className="w-full lg:w-1/3 h-[450px]">
//             <CountChartContainer/>
//           </div>
//           {/* ATTENDANCE CHART */}
//           <div className="w-full lg:w-2/3 h-[450px]">
//             <AttendanceChartContainer />
//           </div>
//         </div>

//         {/* BOTTOM CHART */}
//         <div className="w-full h-[500px]">
//           <FinanceChart />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="w-full lg:w-1/3 flex flex-col gap-8">
//         <EventCalendarContainer searchParams={searchParams}  />
//         <Announcements />
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import FinanceChartContainer from "@/components/Financechartcontainer";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ReactNode } from "react";

type IconProps = { className?: string };

const Icon = ({ className, children }: IconProps & { children: ReactNode }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const Download = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5M12 15V3" />
  </Icon>
);
const GraduationCap = (props: IconProps) => (
  <Icon {...props}>
    <path d="m2 10 10-5 10 5-10 5-10-5Z" />
    <path d="M6 12v5c4 3 8 3 12 0v-5M22 10v6" />
  </Icon>
);
const Bell = (props: IconProps) => (
  <Icon {...props}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
  </Icon>
);
const Users = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6" />
  </Icon>
);
const UserPlus = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6" />
  </Icon>
);
const ShieldCheck = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
const Briefcase = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="7" width="18" height="14" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
  </Icon>
);
const CalendarDays = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </Icon>
);

/* ---------- Small presentational pieces ---------- */

const StatCard = ({
  icon,
  tag,
  tagTone = "blue",
  label,
  value,
  suffix,
  progress,
  footLeft,
  footRight,
  footHref,
}: {
  icon: ReactNode;
  tag: string;
  tagTone?: "blue" | "green" | "gray";
  label: string;
  value: number;
  suffix?: string;
  progress?: number; // 0 - 100
  footLeft: string;
  footRight: string;
  footHref: string;
}) => {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2 flex-1 min-w-[220px]">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          {icon}
        </div>
        <span
          className={`text-[10px] font-semibold rounded px-2 py-0.5 ${tones[tagTone]}`}
        >
          {tag}
        </span>
      </div>

      <p className="text-[10px] font-semibold tracking-wider text-gray-500 mt-1">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-blue-700">
          {value.toLocaleString()}
        </span>
        {suffix && <span className="text-xs text-gray-400">{suffix}</span>}
      </div>

      {progress !== undefined && (
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-auto pt-2">
        <span>{footLeft}</span>
        <Link href={footHref} className="text-blue-600 hover:underline">
          {footRight} ›
        </Link>
      </div>
    </div>
  );
};

const HeaderPill = ({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) => (
  <span className="flex items-center gap-1.5 text-[11px] text-gray-600 bg-white border border-gray-200 rounded-md px-2.5 py-1.5">
    {icon}
    {children}
  </span>
);

/* ---------- Page ---------- */

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  // Live counts (same Prisma models the old UserCard used)
  const [studentCount, teacherCount, parentCount, adminCount, boys, girls] =
    await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.parent.count(),
      prisma.admin.count(),
      prisma.student.count({ where: { sex: "MALE" } }),
      prisma.student.count({ where: { sex: "FEMALE" } }),
    ]);

  const CAPACITY = 1500; // adjust to your school's capacity
  const ratio = teacherCount ? Math.round(studentCount / teacherCount) : 0;
  const sp = await searchParams;
  return (
    <div className="p-4 flex flex-col gap-4 bg-[#F6F8FB] min-h-screen">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5 mb-2">
            EXECUTIVE OVERVIEW
            <span className="text-gray-400 font-normal">
              • Campus System v4.8
            </span>
          </span>
          <h1 className="text-2xl font-bold text-gray-900">
            Grace School Portal Administration
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-md">
            Real-time institutional diagnostics, academic operations, and
            enrollment management.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <HeaderPill
              icon={<CalendarDays className="w-3.5 h-3.5 text-blue-500" />}
            >
              Spring 2025 • Wk 8
            </HeaderPill>
            <button className="flex items-center gap-1.5 text-[11px] text-gray-600 bg-white border border-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-50">
              <Download className="w-3.5 h-3.5" />
              Export Data
            </button>
            <button className="flex items-center gap-1.5 text-[11px] text-gray-600 bg-white border border-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-50">
              <Bell className="w-3.5 h-3.5" />
              New Notice
            </button>
          </div>
          <Link
            href="/list/students"
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md px-4 py-2 transition"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register Student
          </Link>
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="flex flex-wrap gap-4">
        <StatCard
          icon={<GraduationCap className="w-4 h-4" />}
          tag="↗ +2.8%"
          label="TOTAL STUDENTS"
          value={studentCount}
          suffix={`/ ${CAPACITY.toLocaleString()} capacity`}
          progress={(studentCount / CAPACITY) * 100}
          footLeft={`${boys} Boys • ${girls} Girls`}
          footRight="Rosters"
          footHref="/list/students"
        />
        <StatCard
          icon={<Briefcase className="w-4 h-4" />}
          tag="ID On Campus"
          tagTone="gray"
          label="FACULTY & STAFF"
          value={teacherCount}
          suffix={`1:${ratio} Ratio`}
          progress={90}
          footLeft="Teaching staff"
          footRight="Faculty Directory"
          footHref="/list/teachers"
        />
        <StatCard
          icon={<Users className="w-4 h-4" />}
          tag="Linked"
          tagTone="blue"
          label="ACTIVE GUARDIANS"
          value={parentCount}
          suffix="Accounts"
          progress={85}
          footLeft="Portal accounts"
          footRight="Portal Logs"
          footHref="/list/parents"
        />
        <StatCard
          icon={<ShieldCheck className="w-4 h-4" />}
          tag="All Active"
          tagTone="green"
          label="SYSTEM OFFICERS"
          value={adminCount}
          suffix="Admin Seats"
          progress={100}
          footLeft="Principal & VP Online"
          footRight="Security Audit"
          footHref="#"
        />
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Attendance (wide) */}
        <div className="lg:col-span-2 h-[420px]">
          <AttendanceChartContainer />
        </div>

        {/* Academic calendar */}
        <div className="h-auto lg:h-[420px] overflow-auto">
          <EventCalendarContainer searchParams={sp} />
        </div>

        {/* Demographics */}
        <div className="h-[420px]">
          <CountChartContainer />
        </div>

        {/* Tuition & finance */}
        <div className="h-[420px]">
          <FinanceChartContainer />
        </div>

        {/* Announcements */}
        <div className="h-auto lg:h-[420px] overflow-auto">
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
