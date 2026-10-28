// import FormContainer from "@/components/FormContainer";
// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import {
//   Assignment,
//   Teacher,
//   Subject,
//   Class,
//   Prisma,
// } from "@/generated/prisma/client";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import { getAuthUser } from "@/lib/utils";
// import Image from "next/image";

// type AssignmentList = Assignment & {
//   lesson: { teacher: Teacher; subject: Subject; class: Class };
// };

// const AssignmentListPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }) => {
//   const { currentUserId, role } = await getAuthUser();

//   const columns = [
//     {
//       header: "Title",
//       accessor: "title",
//     },
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
//     {
//       header: "Lesson",
//       accessor: "lessonId",
//       className: "hidden md:table-cell",
//     },
//     {
//       header: "Start Date",
//       accessor: "startDate",
//       className: "hidden md:table-cell",
//     },
//     {
//       header: "Due Date",
//       accessor: "dueDate",
//       className: "hidden md:table-cell",
//     },
//     ...(role === "admin" || role === "teacher"
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

//   const query: Prisma.AssignmentWhereInput = {};

//   query.lesson = {};

//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "classId":
//             query.lesson.classId = parseInt(value);
//             break;
//           case "teacherId":
//             query.lesson.teacherId = value;
//             break;
//           case "search":
//             query.lesson.subject = {
//               name: { contains: value, mode: "insensitive" },
//             };
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   // ROLE CONDITIONS
//   switch (role) {
//     case "admin":
//       break;
//     case "teacher":
//       query.lesson.teacherId = currentUserId!;
//       break;
//     case "student":
//       query.lesson.class = {
//         students: {
//           some: {
//             id: currentUserId!,
//           },
//         },
//       };
//       break;
//     case "parent":
//       query.lesson.class = {
//         students: {
//           some: {
//             parentId: currentUserId!,
//           },
//         },
//       };
//       break;
//     default:
//       break;
//   }

//   const [data, count] = await prisma.$transaction([
//     prisma.assignment.findMany({
//       where: query,
//       include: {
//         lesson: {
//           select: {
//             teacher: { select: { name: true, surname: true } },
//             class: { select: { name: true } },
//             subject: { select: { name: true } },
//           },
//         },
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (pageNumber - 1),
//     }),
//     prisma.assignment.count({ where: query }),
//   ]);

//   const renderRow = (item: AssignmentList) => (
//     <tr
//       key={item.id}
//       className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
//     >
//       <td className="p-4">{item.title}</td>
//       <td>{item.lesson.subject.name}</td>
//       <td>{item.lesson.class.name}</td>
//       <td className="hidden md:table-cell">
//         {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
//       </td>
//       <td className="hidden md:table-cell">{item.lessonId}</td>
//       <td className="hidden md:table-cell">
//         {new Intl.DateTimeFormat("en-NG").format(item.startDate)}
//       </td>
//       <td className="hidden md:table-cell">
//         {new Intl.DateTimeFormat("en-NG").format(item.dueDate)}
//       </td>
//       <td>
//         <div className="flex items-center gap-2">
//           {(role === "admin" || role === "teacher") && (
//             <>
//               <FormContainer table="assignment" type="update" data={item} />
//               <FormContainer table="assignment" type="delete" id={item.id} />
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
//         <h1 className="hidden md:block text-lg font-semibold">
//           All Assignments
//         </h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/filter.png" alt="filter" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/sort.png" alt="sort" width={14} height={14} />
//             </button>
//             {(role === "admin" || role === "teacher") && (
//               <FormContainer table="assignment" type="create" />
//             )}
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

// export default AssignmentListPage;


import FormContainer from "@/components/FormContainer";
import ListCard from "@/components/ListCard";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Assignment, Class, Prisma, Subject, Teacher } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthUser } from "@/lib/utils";

type AssignmentList = Assignment & {
  lesson: { teacher: Teacher; subject: Subject; class: Class };
};

const date = (d: Date) => new Intl.DateTimeFormat("en-NG").format(d);

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { currentUserId, role } = await getAuthUser();
  const canManage = role === "admin" || role === "teacher";

  const columns = [
    { header: "Assignment", accessor: "title" },
    { header: "Subject", accessor: "name" },
    { header: "Class", accessor: "class" },
    { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
    { header: "Start", accessor: "startDate", className: "hidden md:table-cell" },
    { header: "Due", accessor: "dueDate", className: "hidden md:table-cell" },
    ...(canManage ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  const lessonFilter: Prisma.LessonWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined) continue;
    switch (key) {
      case "classId":
        lessonFilter.classId = (value);
        break;
      case "teacherId":
        lessonFilter.teacherId = value;
        break;
      case "search":
        lessonFilter.subject = { name: { contains: value, mode: "insensitive" } };
        break;
      default:
        break;
    }
  }

  // Role scoping
  switch (role) {
    case "teacher":
      lessonFilter.teacherId = currentUserId!;
      break;
    case "student":
      lessonFilter.class = { students: { some: { id: currentUserId! } } };
      break;
    case "parent":
      lessonFilter.class = { students: { some: { parentId: currentUserId! } } };
      break;
    default:
      break;
  }

  const query: Prisma.AssignmentWhereInput = { lesson: lessonFilter };

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
            subject: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  const renderRow = (item: AssignmentList) => {
    const overdue = item.dueDate < new Date();
    return (
      <tr key={item.id} className="text-xs text-gray-700 hover:bg-blue-50/40 transition-colors">
        <td className="px-4 py-3 font-semibold text-gray-900">{item.title}</td>
        <td className="px-4 py-3">{item.lesson.subject.name}</td>
        <td className="px-4 py-3">
          <span className="text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">
            {item.lesson.class.name}
          </span>
        </td>
        <td className="hidden md:table-cell px-4 py-3">
          {item.lesson.teacher.name} {item.lesson.teacher.surname}
        </td>
        <td className="hidden md:table-cell px-4 py-3 text-gray-500">{date(item.startDate)}</td>
        <td className="hidden md:table-cell px-4 py-3">
          <span
            className={`text-[10px] font-medium border rounded px-1.5 py-0.5 ${
              overdue
                ? "text-gray-500 bg-gray-50 border-gray-200"
                : "text-amber-700 bg-amber-50 border-amber-100"
            }`}
          >
            {date(item.dueDate)}
          </span>
        </td>
        {canManage && (
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <FormContainer table="assignment" type="update" data={item} />
              <FormContainer table="assignment" type="delete" id={item.id} />
            </div>
          </td>
        )}
      </tr>
    );
  };

  return (
    <ListCard
      title="All Assignments"
      subtitle={`${count.toLocaleString()} assignment${count === 1 ? "" : "s"}`}
      action={canManage ? <FormContainer table="assignment" type="create" /> : null}
    >
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={pageNumber} count={count} />
    </ListCard>
  );
};

export default AssignmentListPage;