// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import {
//   Lesson,
//   Teacher,
//   Class,
//   Subject,
//   Prisma,
// } from "@/generated/prisma/client";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import Image from "next/image";
// import { getAuthUser } from "@/lib/utils";
// import FormContainer from "@/components/FormContainer";

// type LessonList = Lesson & { teacher: Teacher } & { class: Class } & {
//   subject: Subject;
// };

// const LessonListPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }) => {
//   const { role } = await getAuthUser();
//   const columns = [
//     {
//       header: "Subject Name",
//       accessor: "name",
//     },
//     {
//       header: "Class",
//       accessor: "class",
//     },
//     {
//       header: "Teacher",
//       accessor: "teacher",
//       className: "hidden md:table-cell",
//     },
//         {
//       header: "Day",
//       accessor: "day",
//       className: "hidden md:table-cell",
//     },
//     {
//       header: "Start Time",
//       accessor: "startTime",
//       className: "hidden md:table-cell",
//     },
//     {
//       header: "End Time",
//       accessor: "endTime",
//       className: "hidden md:table-cell",
//     },
//     ...(role === "admin"
//       ? [
//           {
//             header: "Actions",
//             accessor: "action",
//           },
//         ]
//       : []),
//   ];

//   const { page, ...queryParams } = await searchParams;
//   const pageNumber = page ? parseInt(page) : 1;

//   const query: Prisma.LessonWhereInput = {};
//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "teacherId":
//             query.teacherId = value;
//             break;
//           case "classId":
//             query.classId = parseInt(value);
//             break;
//           case "search":
//             query.OR = [
//               { teacher: { name: { contains: value, mode: "insensitive" } } },
//               { subject: { name: { contains: value, mode: "insensitive" } } },
//             ];
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   const [data, count] = await prisma.$transaction([
//     prisma.lesson.findMany({
//       where: query,
//       include: {
//         teacher: { select: { name: true, surname: true } },
//         class: { select: { name: true } },
//         subject: { select: { name: true } },
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (pageNumber - 1),
//     }),
//     prisma.lesson.count({ where: query }),
//   ]);

//   const renderRow = (item: LessonList) => (
//     <tr
//       key={item.id}
//       className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
//     >
//       <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
//       <td>{item.class.name}</td>
//       <td className="hidden md:table-cell">
//         {item.teacher.name + " " + item.teacher.surname}
//       </td>
//          <td className="hidden md:table-cell">
//         {item.day}
//       </td>
//       <td className="hidden md:table-cell">
//         {item.startTime.toLocaleTimeString("en-NG", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: false,
//         })}
//       </td>
//       <td className="hidden md:table-cell">
//         {item.endTime.toLocaleTimeString("en-NG", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: false,
//         })}
//       </td>
//       <td>
//         <div className="flex items-center gap-2">
//           {role === "admin" && (
//             <>
//               <FormContainer table="lesson" type="update" data={item} />
//               <FormContainer table="lesson" type="delete" id={item.id} />
//             </>
//           )}
//         </div>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//       {/* TOP */}
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {role === "admin" && <FormContainer table="lesson" type="create" />}
//           </div>
//         </div>
//       </div>
//       {/* LIST */}
//       <Table columns={columns} renderRow={renderRow} data={data} />
//       {/* PAGINATION */}
//       <Pagination page={pageNumber} count={count} />
//     </div>
//   );
// };

// export default LessonListPage;




import FormContainer from "@/components/FormContainer";
import ListCard from "@/components/ListCard";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Class, Lesson, Prisma, Subject, Teacher } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthUser } from "@/lib/utils";

type LessonList = Lesson & { teacher: Teacher; class: Class; subject: Subject };

const time = (d: Date) =>
  d.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", hour12: false });

const LessonListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role } = await getAuthUser();
  const isAdmin = role === "admin";

  const columns = [
    { header: "Subject", accessor: "name" },
    { header: "Class", accessor: "class" },
    { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
    { header: "Day", accessor: "day", className: "hidden md:table-cell" },
    { header: "Start", accessor: "startTime", className: "hidden md:table-cell" },
    { header: "End", accessor: "endTime", className: "hidden md:table-cell" },
    ...(isAdmin ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  const query: Prisma.LessonWhereInput = {};
  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined) continue;
    switch (key) {
      case "teacherId":
        query.teacherId = value;
        break;
      case "classId":
        query.classId = value;
        break;
      case "search":
        query.OR = [
          { teacher: { name: { contains: value, mode: "insensitive" } } },
          { subject: { name: { contains: value, mode: "insensitive" } } },
        ];
        break;
      default:
        break;
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        teacher: { select: { name: true, surname: true } },
        class: { select: { name: true } },
        subject: { select: { name: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.lesson.count({ where: query }),
  ]);

  const renderRow = (item: LessonList) => (
    <tr key={item.id} className="text-xs text-gray-700 hover:bg-blue-50/40 transition-colors">
      <td className="px-4 py-3 font-semibold text-gray-900">{item.subject.name}</td>
      <td className="px-4 py-3">
        <span className="text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">
          {item.class.name}
        </span>
      </td>
      <td className="hidden md:table-cell px-4 py-3">
        {item.teacher.name} {item.teacher.surname}
      </td>
      <td className="hidden md:table-cell px-4 py-3">
        <span className="text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5 capitalize">
          {String(item.day).toLowerCase()}
        </span>
      </td>
      <td className="hidden md:table-cell px-4 py-3 text-gray-500">{time(item.startTime)}</td>
      <td className="hidden md:table-cell px-4 py-3 text-gray-500">{time(item.endTime)}</td>
      {isAdmin && (
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <FormContainer table="lesson" type="update" data={item} />
            <FormContainer table="lesson" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <ListCard
      title="All Lessons"
      subtitle={`${count.toLocaleString()} lesson${count === 1 ? "" : "s"}`}
      action={isAdmin ? <FormContainer table="lesson" type="create" /> : null}
    >
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={pageNumber} count={count} />
    </ListCard>
  );
};

export default LessonListPage;