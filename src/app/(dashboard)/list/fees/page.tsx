// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import prisma from "@/lib/prisma";
// import { getAuthUser } from "@/lib/utils";
// import { naira } from "@/lib/Accounting";
// import FeeStructureForm from "@/components/forms/Feestructureform";
// import DeleteButton from "@/components/Deletebutton";

// // Place at: app/(dashboard)/list/accounting/fees/page.tsx
// const FeesPage = async () => {
//   const { role } = await getAuthUser();

//   if (role !== "admin") {
//     return (
//       <div className="p-6">
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-sm text-gray-500">
//           Only an admin can manage fees.
//         </div>
//       </div>
//     );
//   }

//   const [classes, fees] = await Promise.all([
//     prisma.class.findMany({
//       orderBy: { name: "asc" },
//       select: { id: true, name: true },
//     }),
//     prisma.feeStructure.findMany({
//       orderBy: [
//         { session: "desc" },
//         { term: "asc" },
//         { class: { name: "asc" } },
//       ],
//       take: 300,
//       select: {
//         id: true,
//         title: true,
//         term: true,
//         session: true,
//         amount: true,
//         class: { select: { name: true } },
//         _count: { select: { payments: true } },
//       },
//     }),
//   ]);

//   return (
//     <div className="p-4 md:p-6 flex flex-col gap-5">
//       <div>
//         <Link
//           href="/list/accounting"
//           className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-700"
//         >
//           <ArrowLeft size={13} /> Back to payments
//         </Link>
//         <h1 className="mt-2 text-lg font-semibold text-gray-900">
//           Manage fees
//         </h1>
//       </div>

//       <FeeStructureForm classes={classes} />

//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">
//               <th className="px-4 py-3">Class</th>
//               <th className="px-4 py-3">Fee</th>
//               <th className="px-4 py-3">Term</th>
//               <th className="px-4 py-3">Session</th>
//               <th className="px-4 py-3">Amount</th>
//               <th className="px-4 py-3">Payments</th>
//               <th className="px-4 py-3 text-right">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {fees.map((f) => (
//               <tr key={f.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3 font-medium text-gray-900">
//                   {f.class.name}
//                 </td>
//                 <td className="px-4 py-3 text-gray-700">{f.title}</td>
//                 <td className="px-4 py-3 text-gray-600">{f.term}</td>
//                 <td className="px-4 py-3 text-gray-600">{f.session}</td>
//                 <td className="px-4 py-3 text-gray-700">{naira(f.amount)}</td>
//                 <td className="px-4 py-3 text-gray-500">{f._count.payments}</td>
//                 <td className="px-4 py-3">
//                   <div className="flex justify-end">
//                     {f._count.payments === 0 ? (
//                       <DeleteButton kind="fee" id={f.id} />
//                     ) : (
//                       <span className="text-xs text-gray-400">In use</span>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {fees.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="px-4 py-10 text-center text-gray-500"
//                 >
//                   No fees yet. Add the first one above.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FeesPage;

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FormContainer from "@/components/FormContainer";
import ListCard from "@/components/ListCard";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Prisma } from "@/generated/prisma/client";
import { naira } from "@/lib/Accounting";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthUser } from "@/lib/utils";

// Place at: app/(dashboard)/list/accounting/fees/page.tsx
type FeeList = {
  id: string;
  title: string;
  classId: string;
  term: string;
  session: string;
  amount: number;
  class: { name: string };
  _count: { payments: number };
};

const columns = [
  { header: "Class", accessor: "class" },
  { header: "Fee", accessor: "title" },
  { header: "Term", accessor: "term", className: "hidden md:table-cell" },
  { header: "Session", accessor: "session", className: "hidden md:table-cell" },
  { header: "Amount", accessor: "amount" },
  {
    header: "Payments",
    accessor: "payments",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

const FeesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role } = await getAuthUser();

  if (role !== "admin") {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-sm text-gray-500">
          Only an admin can manage fees.
        </div>
      </div>
    );
  }

  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  const query: Prisma.FeeStructureWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined) continue;
    switch (key) {
      case "classId":
        query.classId = value;
        break;
      case "search":
        query.OR = [
          { title: { contains: value, mode: "insensitive" } },
          { class: { name: { contains: value, mode: "insensitive" } } },
        ];
        break;
      default:
        break;
    }
  }

  const [data, count] = await Promise.all([
    prisma.feeStructure.findMany({
      where: query,
      orderBy: [{ session: "desc" }, { term: "asc" }],
      select: {
        id: true,
        title: true,
        classId: true,
        term: true,
        session: true,
        amount: true,
        class: { select: { name: true } },
        _count: { select: { payments: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.feeStructure.count({ where: query }),
  ]);

  const renderRow = (item: FeeList) => (
    <tr
      key={item.id}
      className="text-xs text-gray-700 hover:bg-blue-50/40 transition-colors"
    >
      <td className="px-4 py-3">
        <span className="text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">
          {item.class.name}
        </span>
      </td>
      <td className="px-4 py-3 font-semibold text-gray-900">{item.title}</td>
      <td className="hidden md:table-cell px-4 py-3 text-gray-500">
        {item.term}
      </td>
      <td className="hidden md:table-cell px-4 py-3 text-gray-500">
        {item.session}
      </td>
      <td className="px-4 py-3 font-medium">{naira(item.amount)}</td>
      <td className="hidden md:table-cell px-4 py-3 text-gray-500">
        {item._count.payments}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {item._count.payments === 0 ? (
            <>
              <FormContainer table="fee" type="update" data={item} />
              <FormContainer table="fee" type="delete" id={item.id} />
            </>
          ) : (
            <span className="text-[10px] font-medium text-gray-400">
              In use
            </span>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <ListCard
      title="Manage Fees"
      subtitle={`${count.toLocaleString()} fee${count === 1 ? "" : "s"}`}
      action={
        <div className="flex items-center gap-2">
          <Link
            href="/list/accounting"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:text-blue-700"
          >
            <ArrowLeft size={13} /> Payments
          </Link>
          <FormContainer table="fee" type="create" />
        </div>
      }
    >
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={pageNumber} count={count} />
    </ListCard>
  );
};

export default FeesPage;
