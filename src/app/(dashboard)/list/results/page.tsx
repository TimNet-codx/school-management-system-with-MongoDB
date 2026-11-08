// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import { Prisma } from "@/generated/prisma/client";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import Image from "next/image";
// import { title } from "process";
// import { getAuthUser } from "@/lib/utils";
// import FormContainer from "@/components/FormContainer";

// type ResultList = {
//   id: number;
//   title: string;
//   studentName: string;
//   teacherName: string;
//   score: number;
//   className: string;
//   startTime: Date;
// };

// const ResultListPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }) => {
// const { role, currentUserId } = await getAuthUser();
// const columns = [
//   {
//     header: "Assessment Type",
//     accessor: "title",
//   },
//   {
//     header: "Student",
//     accessor: "student",
//   },
//   {
//     header: "Score",
//     accessor: "score",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Teacher",
//     accessor: "teacher",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Class",
//     accessor: "class",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Date",
//     accessor: "date",
//     className: "hidden md:table-cell",
//   },
//   ...(role === "admin" || role == "teacher"
//     ? [
//         {
//           header: "Actions",
//           accessor: "action",
//         },
//       ]
//     : []),
// ];

//   const { page, ...queryParams } = await searchParams;
//   const pageNumber = page ? parseInt(page) : 1;

//   const query: Prisma.ResultWhereInput = {};
//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "studentId":
//             query.studentId = value;
//             break;
//           case "search":
//             query.OR = [
//               { exam: { title: { contains: value, mode: "insensitive" } } },
//               { student: { name: { contains: value, mode: "insensitive" } } },
//             ];
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   // ROLE CONDITIONS of the data to get base on the role

//   switch (role) {
//     case "admin":
//       break;
//     case "teacher":
//       query.OR = [
//         { exam: { lesson: { teacherId: currentUserId! } } },
//         { assignment: { lesson: { teacherId: currentUserId! } } },
//       ];
//       break;
//     case "student":
//       query.studentId = currentUserId!;
//       break;
//     case "parent":
//       query.student = {
//         parentId: currentUserId!,
//       };
//       break;
//     default:
//       break;
//   }

//   const [dataResponse, count] = await prisma.$transaction([
//     prisma.result.findMany({
//       where: query,
//       include: {
//         student: { select: { name: true, surname: true } },
//         exam: {
//           include: {
//             lesson: {
//               select: {
//                 class: { select: { name: true } },
//                 teacher: { select: { name: true, surname: true } },
//               },
//             },
//           },
//         },
//         assignment: {
//           include: {
//             lesson: {
//               select: {
//                 class: { select: { name: true } },
//                 teacher: { select: { name: true, surname: true } },
//               },
//             },
//           },
//         },
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (pageNumber - 1),
//     }),
//     prisma.result.count({ where: query }),
//   ]);

//   const data = dataResponse.map((item) => {
//     const assessment = item.exam || item.assignment;

//     if (!assessment) return null;
//     const isExam = "startTime" in assessment;

//     return {
//       id: item.id,
//       title: assessment.title,
//       studentName: `${item.student.name} ${item.student.surname}`,
//       score: item.score,
//       teacherName: `${assessment.lesson.teacher.name} ${assessment.lesson.teacher.surname}`,
//       className: assessment.lesson.class.name,
//       startTime: isExam ? assessment.startTime : assessment.startDate,
//     };
//   });

//   const renderRow = (item: ResultList) => (
//     <tr
//       key={item.id}
//       className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
//     >
//       <td className="flex items-center gap-4 p-4">{item.title}</td>
//       <td>{item.studentName}</td>
//       <td className="hidden md:table-cell">{item.score}</td>
//       <td className="hidden md:table-cell">{item.teacherName}</td>
//       <td className="hidden md:table-cell">{item.className}</td>
//       <td className="hidden md:table-cell">
//         {new Intl.DateTimeFormat("en-NG").format(item.startTime)}
//       </td>
//       <td>
//         <div className="flex items-center gap-2">
//           {(role === "admin" || role === "teacher") && (
//             <>
//               <FormContainer table="result" type="update" data={item} />
//               <FormContainer table="result" type="delete" id={item.id} />
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
//         <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {(role === "admin" || role === "teacher") && (
//               <FormContainer table="result" type="create" />
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

// export default ResultListPage;



import FormContainer from "@/components/FormContainer";
import ListCard from "@/components/ListCard";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthUser } from "@/lib/utils";

type ResultList = {
  id: string;
  title: string;
  studentName: string;
  teacherName: string;
  score: number;
  className: string;
  startTime: Date;
};

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role, currentUserId } = await getAuthUser();
  const canManage = role === "admin" || role === "teacher";

  const columns = [
    { header: "Assessment", accessor: "title" },
    { header: "Student", accessor: "student" },
    { header: "Score", accessor: "score", className: "hidden md:table-cell" },
    { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
    { header: "Class", accessor: "class", className: "hidden md:table-cell" },
    { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    ...(canManage ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  // AND-combine filters so URL search and role scoping never overwrite each other
  const filters: Prisma.ResultWhereInput[] = [];

  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined) continue;
    switch (key) {
      case "studentId":
        filters.push({ studentId: value });
        break;
      case "search":
        filters.push({
          OR: [
            { exam: { title: { contains: value, mode: "insensitive" } } },
            { student: { name: { contains: value, mode: "insensitive" } } },
          ],
        });
        break;
      default:
        break;
    }
  }

  switch (role) {
    case "teacher":
      filters.push({
        OR: [
          { exam: { lesson: { teacherId: currentUserId! } } },
          { assignment: { lesson: { teacherId: currentUserId! } } },
        ],
      });
      break;
    case "student":
      filters.push({ studentId: currentUserId! });
      break;
    case "parent":
      filters.push({ student: { parentId: currentUserId! } });
      break;
    default:
      break;
  }

  const query: Prisma.ResultWhereInput = { AND: filters };

  const [dataResponse, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  // Drop rows with no exam/assignment (the old code returned null here and
  // renderRow would crash on them)
  const data: ResultList[] = dataResponse.flatMap((item) => {
    const assessment = item.exam || item.assignment;
    if (!assessment) return [];
    const isExam = "startTime" in assessment;

    return [
      {
        id: item.id,
        title: assessment.title,
        studentName: `${item.student.name} ${item.student.surname}`,
        score: item.score,
        teacherName: `${assessment.lesson.teacher.name} ${assessment.lesson.teacher.surname}`,
        className: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : assessment.startDate,
      },
    ];
  });

  const renderRow = (item: ResultList) => (
    <tr key={item.id} className="text-xs text-gray-700 hover:bg-blue-50/40 transition-colors">
      <td className="px-4 py-3 font-semibold text-gray-900">{item.title}</td>
      <td className="px-4 py-3">{item.studentName}</td>
      <td className="hidden md:table-cell px-4 py-3">
        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
          {item.score}
        </span>
      </td>
      <td className="hidden md:table-cell px-4 py-3">{item.teacherName}</td>
      <td className="hidden md:table-cell px-4 py-3">
        <span className="text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">
          {item.className}
        </span>
      </td>
      <td className="hidden md:table-cell px-4 py-3 text-gray-500">
        {new Intl.DateTimeFormat("en-NG").format(item.startTime)}
      </td>
      {canManage && (
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <FormContainer table="result" type="update" data={item} />
            <FormContainer table="result" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <ListCard
      title="All Results"
      subtitle={`${count.toLocaleString()} result${count === 1 ? "" : "s"}`}
      action={canManage ? <FormContainer table="result" type="create" /> : null}
    >
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={pageNumber} count={count} />
    </ListCard>
  );
};

export default ResultListPage;