// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import { Class, Prisma, Student } from "@/generated/prisma/client";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import Image from "next/image";
// import Link from "next/link";
// import { getAuthUser } from "@/lib/utils";
// import FormContainer from "@/components/FormContainer";

// type StudentList = Student & { class: Class };



// const StudentListPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }) => {
//    const { role } = await getAuthUser();
//    const columns = [
//   {
//     header: "Info",
//     accessor: "info",
//   },
//   {
//     header: "Student ID",
//     accessor: "studentId",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Surname",
//     accessor: "surname",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Username",
//     accessor: "username",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Class",
//     accessor: "classId",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Grade",
//     accessor: "grade",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Phone",
//     accessor: "phone",
//     className: "hidden lg:table-cell",
//   },
//   {
//     header: "Address",
//     accessor: "address",
//     className: "hidden lg:table-cell",
//   },
//   ...(role === "admin"
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
//   const query: Prisma.StudentWhereInput = {};

//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "teacherId":
//             query.class = {
//               lessons: {
//                 some: {
//                   teacherId: value,
//                 },
//               },
//             };
//             break;
//           case "search":
//             query.name = { contains: value, mode: "insensitive" };
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   const [data, count] = await prisma.$transaction([
//     prisma.student.findMany({
//       where: query,
//       include: {
//         class: true,
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (pageNumber - 1),
//     }),
//     prisma.student.count({ where: query }),
//   ]);

//   const renderRow = (item: StudentList) => (
//     <tr
//       key={item.id}
//       className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
//     >
//       <td className="flex items-center gap-4 p-4">
//         <Image
//           src={item.img || "/noAvatar.png"}
//           alt=""
//           width={40}
//           height={40}
//           className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
//         />
//         <div className="flex flex-col">
//           <h3 className="font-semibold">{item.name}</h3>
//           <p className="text-xs text-gray-500">{item.email}</p>
//         </div>
//       </td>
//       <td className="hidden md:table-cell">{item.id}</td>
//       <td className="hidden md:table-cell">{item.surname}</td>
//       <td className="hidden md:table-cell">{item.username}</td>
//       <td className="hidden md:table-cell">{item.classId}</td>
//       <td className="hidden md:table-cell">{item.gradeId}</td>
//       <td className="hidden md:table-cell">{item.phone}</td>
//       <td className="hidden md:table-cell">{item.address}</td>
//       <td>
//         <div className="flex items-center gap-2">
//           <Link href={`/list/students/${item.id}`}>
//             <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
//               <Image src="/view.png" alt="" width={16} height={16} />
//             </button>
//           </Link>
//           {role === "admin" && (
//             // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
//             //   <Image src="/delete.png" alt="" width={16} height={16} />
//             // </button>
//             <FormContainer table="student" type="delete" id={item.id} />
//           )}
//         </div>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//       {/* TOP */}
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {role === "admin" && (
//               // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               //   <Image src="/plus.png" alt="" width={14} height={14} />
//               // </button>
//               <FormContainer table="student" type="create" />
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

// export default StudentListPage;



import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Class, Grade, Prisma, Student } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthUser } from "@/lib/utils";
import { ArrowUpDown, Eye, ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type StudentList = Student & { class: Class; grade: Grade | null };

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role } = await getAuthUser();

  const columns = [
    { header: "Student", accessor: "info" },
    { header: "Student ID", accessor: "studentId", className: "hidden md:table-cell" },
    { header: "Username", accessor: "username", className: "hidden md:table-cell" },
    { header: "Class", accessor: "classId", className: "hidden md:table-cell" },
    { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
    { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
    { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
    { header: "Actions", accessor: "action" },
  ];

  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  const query: Prisma.StudentWhereInput = {};
  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined) continue;
    switch (key) {
      case "teacherId":
        query.class = { lessons: { some: { teacherId: value } } };
        break;
      case "classId":
        query.classId = value;
        break;
      case "search":
        query.name = { contains: value, mode: "insensitive" };
        break;
      default:
        break;
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: { class: true, grade: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="text-xs text-gray-700 hover:bg-blue-50/40 transition-colors"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={item.img || "/noAvatar.png"}
            alt=""
            width={36}
            height={36}
            className="hidden sm:block w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          <div className="flex flex-col min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {item.name} {item.surname}
            </h3>
            <p className="text-[11px] text-gray-500 truncate">{item.email}</p>
          </div>
        </div>
      </td>

      <td className="hidden md:table-cell px-4 py-3 text-gray-500">
        <span className="font-mono text-[11px]">{item.id}</span>
      </td>
      <td className="hidden md:table-cell px-4 py-3">{item.username}</td>

      <td className="hidden md:table-cell px-4 py-3">
        <span className="text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">
          {item.class?.name ?? "-"}
        </span>
      </td>
      <td className="hidden md:table-cell px-4 py-3">
        <span className="text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5">
          {item.grade ? `Grade ${item.grade.level}` : "-"}
        </span>
      </td>

      <td className="hidden lg:table-cell px-4 py-3">{item.phone}</td>
      <td className="hidden lg:table-cell px-4 py-3 max-w-[200px] truncate">
        {item.address}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            href={`/list/students/${item.id}`}
            aria-label="View student"
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
          {role === "admin" && (
            <FormContainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-4 bg-[#F6F8FB] min-h-full">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-sm font-semibold text-gray-900">All Students</h1>
            <p className="text-[11px] text-gray-500">
              {count.toLocaleString()} enrolled student{count === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                type="button"
                aria-label="Filter"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
              >
                <ListFilter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Sort"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
              {role === "admin" && <FormContainer table="student" type="create" />}
            </div>
          </div>
        </div>

        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={data} />

        {/* PAGINATION */}
        <Pagination page={pageNumber} count={count} />
      </div>
    </div>
  );
};

export default StudentListPage;
