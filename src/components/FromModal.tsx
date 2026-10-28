// "use client";

// import {
//   deleteAnnouncement,
//   deleteAssignment,
//   deleteAttendance,
//   deleteClass,
//   deleteEvent,
//   deleteExam,
//   deleteLesson,
//   deleteMessage,
//   deleteParent,
//   deleteResult,
//   deleteStudent,
//   deleteSubject,
//   deleteTeacher,
// } from "@/lib/serverAction";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   Dispatch,
//   JSX,
//   SetStateAction,
//   useActionState,
//   useEffect,
//   useState,
// } from "react";
// import { toast } from "react-toastify";
// import { FormContainerProps } from "./FormContainer";

// // USE LAZY LOADING

// // import TeacherForm from "./forms/TeacherForm";
// // import StudentForm from "./forms/StudentForm";

// const deleteActionMap = {
//   subject: deleteSubject,
//   class: deleteClass,
//   teacher: deleteTeacher,
//   student: deleteStudent,
//   parent: deleteParent,
//   lesson: deleteLesson,
//   exam: deleteExam,
//   assignment: deleteAssignment,
//   result: deleteResult,
//   attendance: deleteAttendance,
//   event: deleteEvent,
//   announcement: deleteAnnouncement,
//   message: deleteMessage,
// };

// const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const StudentForm = dynamic(() => import("./forms/StudentForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ParentForm = dynamic(() => import("./forms/ParentForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ClassForm = dynamic(() => import("./forms/ClassForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ExamForm = dynamic(() => import("./forms/ExamForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const LessonForm = dynamic(() => import("./forms/LessonForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ResultForm = dynamic(() => import("./forms/ResultForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const EventForm = dynamic(() => import("./forms/EventForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
//   loading: () => <h1>Loading...</h1>,
//   ssr: false,
// });
// const MessageForm = dynamic(() => import("./forms/MessageForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ProfileForm = dynamic(() => import("./forms/ProfileForm"), {
//   loading: () => <h1>Loading...</h1>,
// });

// const forms: {
//   [key: string]: (
//     setOpen: Dispatch<SetStateAction<boolean>>,
//     type: "create" | "update",
//     data?: any,
//     relatedData?: any,
//   ) => JSX.Element;
// } = {
//   announcement: (setOpen, type, data, relatedData) => (
//     <AnnouncementForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   teacher: (setOpen, type, data, relatedData) => (
//     <TeacherForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   student: (setOpen, type, data, relatedData) => (
//     <StudentForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   parent: (setOpen, type, data, relatedData) => (
//     <ParentForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   subject: (setOpen, type, data, relatedData) => (
//     <SubjectForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   class: (setOpen, type, data, relatedData) => (
//     <ClassForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   exam: (setOpen, type, data, relatedData) => (
//     <ExamForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   assignment: (setOpen, type, data, relatedData) => (
//     <AssignmentForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   lesson: (setOpen, type, data, relatedData) => (
//     <LessonForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   result: (setOpen, type, data, relatedData) => (
//     <ResultForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   event: (setOpen, type, data, relatedData) => (
//     <EventForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   attendance: (setOpen, type, data, relatedData) => (
//     <AttendanceForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   message: (setOpen, type, data, relatedData) => (
//     <MessageForm
//       setOpen={setOpen}
//       type={type}
//       data={data}
//       relatedData={relatedData}
//     />
//   ),
//   profile: (setOpen, type, data, relatedData) => (
//     <ProfileForm setOpen={setOpen} data={data} relatedData={relatedData} />
//   ),
// };

// const FormModal = ({
//   table,
//   type,
//   data,
//   id,
//   relatedData,
// }: FormContainerProps & { relatedData?: any }) => {
//   const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
//   const bgColor =
//     type === "create"
//       ? "bg-[#FAE27C]"
//       : type === "update"
//         ? "bg-[#E0E7FF]"
//         : "bg-[#C4B5FD]";

//   const [open, setOpen] = useState(false);

//   const Form = () => {
//     const [state, formAction] = useActionState(
//       deleteActionMap[table as keyof typeof deleteActionMap],
//       {
//         success: false,
//         error: false,
//       },
//     );

//     const router = useRouter();
//     useEffect(() => {
//       if (state.success) {
//         toast(`${table} has been deleted! `);
//         setOpen(false);
//         router.refresh();
//       }
//     });

//     // return type === "delete" && id ? (
//     //   <form action={formAction} className="p-4 flex flex-col gap-4">
//     //     <input type="text" name="id" value={String(id)} hidden />
//     //     <span className="text-center font-medium">
//     //       All data will be lost. Are you sure you want to delete this {table}?
//     //     </span>
//     //     <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
//     //       Delete
//     //     </button>
//     //   </form>
//     // ) : type === "create" || type === "update" ? (
//     //   forms[table](setOpen, type, data, relatedData)
//     // ) : (
//     //   "Form not found!"
//     // );
//     return type === "delete" && id ? (
//       <form action={formAction} className="p-4 flex flex-col gap-4">
//         <input type="text" name="id" value={String(id)} hidden readOnly />
//         <span className="text-center font-medium">
//           All data will be lost. Are you sure you want to delete this {table}?
//         </span>
//         <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
//           Delete
//         </button>
//       </form>
//     ) : type === "create" || type === "update" ? (
//       forms[table] ? (
//         forms[table](setOpen, type, data, relatedData)
//       ) : (
//         <span className="text-red-500 font-semibold p-4">
//           Form not found for table: "{table}"
//         </span>
//       )
//     ) : (
//       "Form not found!"
//     );
//   };

//   return (
//     <>
//       <button
//         className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
//         onClick={() => setOpen(true)}
//       >
//         <Image src={`/${type}.png`} alt="" width={16} height={16} />
//       </button>
//       {open && (
//         <div className="w-screen h-screen absolute left-0 top-0 bg-black/60 z-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
//             <Form />
//             <div
//               className="absolute top-4 right-4 cursor-pointer"
//               onClick={() => setOpen(false)}
//             >
//               <Image src="/close.png" alt="" width={14} height={14} />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FormModal;

"use client";

import {
  deleteAdmin,
  deleteAnnouncement,
  deleteAssignment,
  deleteAttendance,
  deleteClass,
  deleteEvent,
  deleteExam,
  deleteGrade,
  deleteLesson,
  deleteMessage,
  deleteParent,
  deleteResult,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
  deleteFeeStructure,
  deletePayment,
} from "@/lib/serverAction";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import FeeStructureForm from "./forms/Feestructureform";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  parent: deleteParent,
  lesson: deleteLesson,
  exam: deleteExam,
  assignment: deleteAssignment,
  result: deleteResult,
  attendance: deleteAttendance,
  event: deleteEvent,
  announcement: deleteAnnouncement,
  message: deleteMessage,
  admin: deleteAdmin,
  grade: deleteGrade,
  fee: deleteFeeStructure,
  payment: deletePayment,
};

const Loading = () => (
  <div className="flex items-center justify-center gap-2 py-10 text-xs text-gray-500">
    <Loader2 className="w-4 h-4 animate-spin" />
    Loading form...
  </div>
);

// Lazy-loaded forms
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: Loading,
});
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: Loading,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: Loading,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: Loading,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: Loading,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: Loading,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: Loading,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: Loading,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: Loading,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: Loading,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: Loading,
});
const AdminForm = dynamic(() => import("./forms/AdminForm"), {
  loading: Loading,
});
const GradeForm = dynamic(() => import("./forms/GradeForm"), {
  loading: Loading,
});
const FeeForm = dynamic(() => import("./forms/Feeform"), { loading: Loading });

const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
  loading: Loading,
  ssr: false,
});
const MessageForm = dynamic(() => import("./forms/MessageForm"), {
  loading: Loading,
});
const ProfileForm = dynamic(() => import("./forms/ProfileForm"), {
  loading: Loading,
});
const PaymentForm = dynamic(() => import("./forms/PaymentForm"), {
  loading: Loading,
});

const formComponents: Record<string, ComponentType<any>> = {
  announcement: AnnouncementForm,
  teacher: TeacherForm,
  student: StudentForm,
  parent: ParentForm,
  subject: SubjectForm,
  class: ClassForm,
  exam: ExamForm,
  assignment: AssignmentForm,
  lesson: LessonForm,
  result: ResultForm,
  event: EventForm,
  attendance: AttendanceForm,
  message: MessageForm,
  profile: ProfileForm,
  admin: AdminForm,
  grade: GradeForm,
  fee: FeeForm,
  payment: PaymentForm,
};

/**
 * Defined OUTSIDE FormModal on purpose. When it lived inside, React saw a new
 * component type on every render and remounted it, which wiped form state.
 */
const DeleteForm = ({
  table,
  id,
  setOpen,
}: {
  table: string;
  id: number | string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    deleteActionMap[table as keyof typeof deleteActionMap],
    { success: false, error: false },
  );

  useEffect(() => {
    if (state.success) {
      toast(`${table} has been deleted!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, table, setOpen, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-4 py-2 text-center"
    >
      <input type="hidden" name="id" value={String(id)} readOnly />

      <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
        <Trash2 className="w-5 h-5" />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900">
          Delete this {table}?
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          All related data will be lost. This action cannot be undone.
        </p>
      </div>

      {state.error && (
        <p className="text-xs text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-lg px-4 py-2 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-lg px-4 py-2 transition"
        >
          {pending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Delete
        </button>
      </div>
    </form>
  );
};

const TRIGGER = {
  create: {
    size: "w-8 h-8",
    tone: "bg-blue-700 text-white hover:bg-blue-800",
    label: "Create",
    Icon: Plus,
  },
  update: {
    size: "w-7 h-7",
    tone: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
    label: "Edit",
    Icon: Pencil,
  },
  delete: {
    size: "w-7 h-7",
    tone: "bg-red-50 text-red-600 hover:bg-red-100",
    label: "Delete",
    Icon: Trash2,
  },
} as const;

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const [open, setOpen] = useState(false);
  const { size, tone, label, Icon } = TRIGGER[type];

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const renderBody = () => {
    if (type === "delete") {
      return id ? (
        <DeleteForm table={table} id={String(id)} setOpen={setOpen} />
      ) : (
        <p className="text-xs text-red-500 p-2">Missing id for delete.</p>
      );
    }

    const FormComp = formComponents[table];
    if (!FormComp) {
      return (
        <p className="text-xs font-semibold text-red-500 p-2">
          Form not found for table: &quot;{table}&quot;
        </p>
      );
    }

    return (
      <FormComp
        setOpen={setOpen}
        data={data}
        relatedData={relatedData}
        {...(table !== "profile" ? { type } : {})}
      />
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label={`${label} ${table}`}
        title={`${label} ${table}`}
        className={`${size} ${tone} flex items-center justify-center rounded-lg transition`}
        onClick={() => setOpen(true)}
      >
        <Icon className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className={`relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto p-5 ${
              type === "delete"
                ? "w-full max-w-sm"
                : "w-full md:w-[80%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%]"
            }`}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {renderBody()}
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;



