// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import { Teacher, Subject, Class, Prisma } from "@/generated/prisma/client";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// // import { console } from "inspector/promises";
// import Image from "next/image";
// import Link from "next/link";
// //type Teacher = { id: number; teacherId: string; name: string; email?: string; photo: string; phone: string; subjects: string[]; classes: string[]; address: string; };
// import { getAuthUser } from "@/lib/utils";
// import FormContainer from "@/components/FormContainer";

// type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };


// // const TeacherListPage = async ({searchParams,}: {searchParams: {[key: string]: string | undefined};}) => {
// //      const {page, ...queryParams} = searchParams;
// //      const p = page ? parseInt(page) : 1;

// const TeacherListPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }) => {
// const { role } = await getAuthUser();
// const columns = [
//   {
//     header: "Info",
//     accessor: "info",
//   },
//   {
//     header: "Teacher ID",
//     accessor: "teacherId",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Username",
//     accessor: "username",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Subjects",
//     accessor: "subjects",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Classes",
//     accessor: "classes",
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

//   // const teachers = await prisma.teacher.findMany();

//   // const data = await prisma.teacher.findMany({
//   //   include: {
//   //     subjects: true,
//   //     classes: true,
//   //   },
//   //   take: ITEM_PER_PAGE,
//   //   skip: ITEM_PER_PAGE * (p - 1),
//   // });

//   // URL Params for filtering and searching
//   const query: Prisma.TeacherWhereInput = {};
//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "classId":
//             query.lessons = {
//               some: {
//                 classId: parseInt(value),
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
//     prisma.teacher.findMany({
//       // where:queryParams
//       where: query,
//       include: {
//         subjects: true,
//         classes: true,
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (pageNumber - 1),
//     }),
//     prisma.teacher.count({ where: query }),
//   ]);
//   //const count = await prisma.teacher.count()
//   console.log(count);

//   const renderRow = (item: TeacherList) => (
//     <tr
//       key={item.id}
//       className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[]"
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
//           <p className="text-xs text-gray-500">{item?.email}</p>
//         </div>
//       </td>
//       <td className="hidden md:table-cell">{item.id}</td>
//       <td className="hidden md:table-cell">{item.username}</td>
//       <td className="hidden md:table-cell">
//         {item.subjects.map((subject) => subject.name).join(",")}
//       </td>
//       <td className="hidden md:table-cell">
//         {item.classes.map((classItem) => classItem.name).join(",")}
//       </td>
//       <td className="hidden md:table-cell">{item.phone}</td>
//       <td className="hidden md:table-cell">{item.address}</td>
//       <td>
//         <div className="flex items-center gap-2">
//           <Link href={`/list/teachers/${item.id}`}>
//             <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
//               <Image src="/view.png" alt="" width={16} height={16} />
//             </button>
//           </Link>

//           {role === "admin" && (
//             // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CFCEFF]">
//             //   <Image src="/delete.png" alt="" width={16} height={16} />
//             // </button>
//             <FormContainer table="teacher" type="delete" id={item.id} />
//           )}
//         </div>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//       {/* TOP */}
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full  bg-[#FAE27C]">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {role === "admin" && (
//               //    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
//               //  <Image src="/plus.png" alt="" width={14} height={14} />
//               //  </button>
//               <FormContainer table="teacher" type="create" />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* LIST */}
//       <div className=""></div>
//       <Table columns={columns} renderRow={renderRow} data={data} />
//       {/* PAGINATION */}
//       <Pagination page={pageNumber} count={count} />
//     </div>
//   );
// };

// export default TeacherListPage;



import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Class, Prisma, Subject, Teacher } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthUser } from "@/lib/utils";
import { Eye, ListFilter, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role } = await getAuthUser();

  const columns = [
    { header: "Teacher", accessor: "info" },
    { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
    { header: "Username", accessor: "username", className: "hidden md:table-cell" },
    { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
    { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
    { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
    { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
    ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  // URL params for filtering and searching
  const query: Prisma.TeacherWhereInput = {};
  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined) continue;
    switch (key) {
      case "classId":
        query.lessons = { some: { classId: value } };
        break;
      case "search":
        query.name = { contains: value, mode: "insensitive" };
        break;
      default:
        break;
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: { subjects: true, classes: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  const renderRow = (item: TeacherList) => (
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
        <div className="flex flex-wrap gap-1">
          {item.subjects.map((s) => (
            <span
              key={s.id}
              className="text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5"
            >
              {s.name}
            </span>
          ))}
        </div>
      </td>

      <td className="hidden md:table-cell px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {item.classes.map((c) => (
            <span
              key={c.id}
              className="text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5"
            >
              {c.name}
            </span>
          ))}
        </div>
      </td>

      <td className="hidden lg:table-cell px-4 py-3">{item.phone}</td>
      <td className="hidden lg:table-cell px-4 py-3 max-w-[200px] truncate">
        {item.address}
      </td>

      {role === "admin" && (
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <Link
              href={`/list/teachers/${item.id}`}
              aria-label="View teacher"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
            <FormContainer table="teacher" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <div className="p-4 bg-[#F6F8FB] min-h-full">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-sm font-semibold text-gray-900">All Teachers</h1>
            <p className="text-[11px] text-gray-500">
              {count.toLocaleString()} faculty member{count === 1 ? "" : "s"}
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
              {role === "admin" && <FormContainer table="teacher" type="create" />}
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

export default TeacherListPage;
