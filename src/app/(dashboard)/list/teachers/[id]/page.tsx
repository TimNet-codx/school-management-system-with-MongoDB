// import Announcements from "@/components/Announcements";
// import BigCalendar from "@/components/BigCalender";
// import BigCalenderContainer from "@/components/BigCalenderContainer";
// import Performance from "@/components/Performance";
// import Image from "next/image";
// import Link from "next/link";
// import { Teacher } from "@/generated/prisma/client";
// import prisma from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import FormContainer from "@/components/FormContainer";
// import { getAuthUser } from "@/lib/utils";

// const SingleTeacherPage = async ({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) => {
//   const { id } = await params;
//   const { role } = await getAuthUser();
//   const teacher: | Teacher & { _count: { subjects: number; lessons: number; classes: number } } | null = await prisma.teacher.findUnique({
//     where: { id },
//     include:{
//       subjects: true,
//       _count:{
//         select:{
//           subjects:true,
//           lessons:true,
//           classes:true,
//         }
//       }
//     }
//   });

//   if (!teacher) {
//     return notFound();
//   }

//   return (
//     <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
//       {/* LEFT */}
//       <div className="w-full xl:w-2/3">
//         {/* TOP */}
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* USER INFO CRAD */}
//           <div className="bg-[#C3EBFA] py-6 px-4 rounded-md flex-1 flex gap-4">
//             <div className="w-1/3">
//               <Image
//                 src={teacher.img || "/noAvatar.png"}
//                 alt=""
//                 width={144}
//                 height={144}
//                 className="w-36 h-36 rounded-full object-cover"
//               />
//             </div>
//             <div className="w-2/3 flex flex-col justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <h1 className="text-xl font-semibold">
//                   {teacher.name + " " + teacher.surname}
//                 </h1>
//                 {role === "admin" && (
//                   <FormContainer
//                     table="teacher"
//                     type="update"
//                     data={teacher}
//                   />
//                 )}
//               </div>

//               <p className="text-sm text-gray-500">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
//                 asperiores.
//               </p>
//               <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
//                 <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
//                   <Image src="/blood.png" alt="" width={14} height={14} />
//                   <span>{teacher.bloodType}</span>
//                 </div>
//                 <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
//                   <Image src="/date.png" alt="" width={14} height={14} />
//                   <span>{teacher.birthday.toLocaleDateString()}</span>
//                 </div>
//                 <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
//                   <Image src="/mail.png" alt="" width={14} height={14} />
//                   <span>{teacher.email || "-"}</span>
//                 </div>
//                 <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
//                   <Image src="/phone.png" alt="" width={14} height={14} />
//                   <span>{teacher.phone || "-"}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* SMALL CARDS */}
//           <div className="flex-1 flex gap-4 justify-between flex-wrap">
//             {/* CARD */}
//             <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
//               <Image
//                 src="/singleAttendance.png"
//                 alt=""
//                 width={24}
//                 height={24}
//                 className="w-6 h-6"
//               />
//               <div className="">
//                 <h1 className="text-xl font-semibold">90%</h1>
//                 <span className="text-sm text-gray-400">Attendance</span>
//               </div>
//             </div>
//             {/* CARD */}
//             <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
//               <Image
//                 src="/singleBranch.png"
//                 alt=""
//                 width={24}
//                 height={24}
//                 className="w-6 h-6"
//               />
//               <div className="">
//                 <h1 className="text-xl font-semibold">{teacher?._count.subjects || "-"}</h1>
//                 <span className="text-sm text-gray-400">Branches</span>
//               </div>
//             </div>
//             {/* CARD */}
//             <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
//               <Image
//                 src="/singleLesson.png"
//                 alt=""
//                 width={24}
//                 height={24}
//                 className="w-6 h-6"
//               />
//               <div className="">
//                 <h1 className="text-xl font-semibold">{teacher?._count.lessons || "-"}</h1>
//                 <span className="text-sm text-gray-400">Lessons</span>
//               </div>
//             </div>
//             {/* CARD */}
//             <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
//               <Image
//                 src="/singleClass.png"
//                 alt=""
//                 width={24}
//                 height={24}
//                 className="w-6 h-6"
//               />
//               <div className="">
//                 <h1 className="text-xl font-semibold">{teacher?._count.classes || "-"}</h1>
//                 <span className="text-sm text-gray-400">Classes</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* BOTTOM */}
//         <div className="mt-4 bg-white rounded-md p-4 h-[80%]">
//           <h1>Teacher&apos;s Schedule</h1>
//           <BigCalenderContainer type="teacherId" id={teacher?.id} />
//         </div>
//       </div>
//       {/* RIGHT */}
//       <div className="w-full xl:w-1/3 flex flex-col gap-4">
//         <div className="bg-white p-4 rounded-md">
//           <h1 className="text-xl font-semibold">Shortcuts:</h1>
//           <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
//             <Link
//               className="p-3 rounded-md bg-[#EDF9FD]"
//               href={`/list/classes?supervisorId=${"teacher2"}`}
//             >
//               Teacher&apos;s Classes
//             </Link>
//             <Link
//               className="p-3 rounded-md bg-[#F1F0FF]"
//               href={`/list/students?teacherId=${"teacher2"}`}
//             >
//               Teacher&apos;s Students
//             </Link>
//             <Link
//               className="p-3 rounded-md bg-[#FEFCE8]"
//               href={`/list/lessons?teacherId=${"teacher2"}`}
//             >
//               Teacher&apos;s Lessons
//             </Link>
//             <Link
//               className="p-3 rounded-md bg-pink-50"
//               href={`/list/exams?teacherId=${"teacher2"}`}
//             >
//               Teacher&apos;s Exams
//             </Link>
//             <Link
//               className="p-3 rounded-md bg-[#EDF9FD]"
//               href={`/list/assignments?teacherId=${"teacher2"}`}
//             >
//               Teacher&apos;s Assignments
//             </Link>
//             <Link
//               className="p-3 rounded-md bg-[#F1F0FF]"
//               href={`/list/subjects?teacherId=${"teacher2"}`}
//             >
//               Teacher&apos;s Subject
//             </Link>
//           </div>
//         </div>
//         <Performance />
//         <Announcements />
//       </div>
//     </div>
//   );
// };

// export default SingleTeacherPage;


import Announcements from "@/components/Announcements";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import { Teacher } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/utils";
import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Droplets,
  GraduationCap,
  Mail,
  Phone,
  Presentation,
  School,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const InfoItem = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <div className="flex items-center gap-2 text-xs text-gray-600 min-w-0">
    <span className="text-blue-500 shrink-0">{icon}</span>
    <span className="truncate">{children}</span>
  </div>
);

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
}) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
      <p className="text-[10px] font-semibold tracking-wider text-gray-500 mt-1 uppercase">
        {label}
      </p>
    </div>
  </div>
);

const SHORTCUTS = [
  { label: "Classes", path: "classes", param: "supervisorId", tone: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Students", path: "students", param: "teacherId", tone: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  { label: "Lessons", path: "lessons", param: "teacherId", tone: "bg-amber-50 text-amber-700 border-amber-100" },
  { label: "Exams", path: "exams", param: "teacherId", tone: "bg-rose-50 text-rose-700 border-rose-100" },
  { label: "Assignments", path: "assignments", param: "teacherId", tone: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  { label: "Subjects", path: "subjects", param: "teacherId", tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
];

const SingleTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { role } = await getAuthUser();

  const teacher:
    | (Teacher & {
        subjects: { id: string; name: string }[];
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      subjects: true,
      _count: { select: { subjects: true, lessons: true, classes: true } },
    },
  });

  if (!teacher) return notFound();

  return (
    <div className="p-4 flex flex-col xl:flex-row gap-4 bg-[#F6F8FB] min-h-full">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* PROFILE CARD */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-4">
            <Image
              src={teacher.img || "/noAvatar.png"}
              alt=""
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-50 shrink-0"
            />

            <div className="flex-1 min-w-0 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[9px] font-bold tracking-wider text-blue-600 bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5">
                    FACULTY
                  </span>
                  <h1 className="text-lg font-bold text-gray-900 mt-1.5 truncate">
                    {teacher.name} {teacher.surname}
                  </h1>
                  <p className="text-[11px] text-gray-500">@{teacher.username}</p>
                </div>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
              </div>

              {teacher.subjects.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects.map((s) => (
                    <span
                      key={s.id}
                      className="text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <InfoItem icon={<Droplets className="w-3.5 h-3.5" />}>
                  {teacher.bloodType || "-"}
                </InfoItem>
                <InfoItem icon={<CalendarDays className="w-3.5 h-3.5" />}>
                  {teacher.birthday.toLocaleDateString()}
                </InfoItem>
                <InfoItem icon={<Mail className="w-3.5 h-3.5" />}>
                  {teacher.email || "-"}
                </InfoItem>
                <InfoItem icon={<Phone className="w-3.5 h-3.5" />}>
                  {teacher.phone || "-"}
                </InfoItem>
              </div>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="flex-1 grid grid-cols-2 gap-4 content-start">
            {/* TODO: replace with real attendance data */}
            <StatCard icon={<CalendarCheck className="w-5 h-5" />} value="90%" label="Attendance" />
            <StatCard icon={<BookOpen className="w-5 h-5" />} value={teacher._count.subjects || "-"} label="Subjects" />
            <StatCard icon={<Presentation className="w-5 h-5" />} value={teacher._count.lessons || "-"} label="Lessons" />
            <StatCard icon={<School className="w-5 h-5" />} value={teacher._count.classes || "-"} label="Classes" />
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-[720px] flex flex-col">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Teacher&apos;s Schedule
          </h2>
          <div className="flex-1 min-h-0">
            <BigCalenderContainer type="teacherId" id={teacher.id} />
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-900">Shortcuts</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {SHORTCUTS.map(({ label, path, param, tone }) => (
              <Link
                key={label}
                href={`/list/${path}?${param}=${teacher.id}`}
                className={`text-[11px] font-medium border rounded-lg px-3 py-2 transition hover:opacity-80 ${tone}`}
              >
                Teacher&apos;s {label}
              </Link>
            ))}
          </div>
        </div>

        <Performance />

        <div className="min-h-[380px]">
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default SingleTeacherPage;
