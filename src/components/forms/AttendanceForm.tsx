// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { attendanceSchema, AttendanceSchema } from "@/lib/formValidationSchema";
// import { createAttendance, updateAttendance } from "@/lib/serverAction";
// import {
//   Dispatch,
//   SetStateAction,
//   startTransition,
//   useActionState,
//   useEffect,
// } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import InputField from "@/components/InputField";

// const formatDateForInput = (dateStr?: string | Date) => {
//   if (!dateStr) return "";
//   const d = new Date(dateStr);
//   return d.toISOString().split("T")[0];
// };

// const AttendanceForm = ({
//   type,
//   data,
//   setOpen,
//   relatedData,
// }: {
//   type: "create" | "update";
//   data?: any;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   relatedData?: any;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AttendanceSchema>({
//     resolver: zodResolver(attendanceSchema) as any,
//     defaultValues: {
//       id: data?.id,
//       date: formatDateForInput(data?.date) as any,
//       present: data?.present ?? true,
//       studentId: data?.studentId || "",
//       lessonId: data?.lessonId != null ? Number(data.lessonId) : undefined,
//     },
//   });

//   const [state, formAction] = useActionState(
//     type === "create" ? createAttendance : updateAttendance,
//     { success: false, error: false },
//   );

//   const onSubmit = handleSubmit((formData) => {
//     startTransition(() => {
//       formAction(formData);
//     });
//   });

//   const router = useRouter();

//   useEffect(() => {
//     if (state.success) {
//       toast(
//         `Attendance record has been ${
//           type === "create" ? "created" : "updated"
//         }!`,
//       );
//       setOpen(false);
//       router.refresh();
//     }
//   }, [state.success, type, setOpen, router]);

//   const students = relatedData?.students || [];
//   const lessons = relatedData?.lessons || [];

//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Mark New Attendance" : "Update Attendance"}
//       </h1>

//       <div className="flex justify-between flex-wrap gap-4">
//         {data?.id && (
//           <InputField
//             label="Id"
//             name="id"
//             defaultValue={data?.id}
//             register={register}
//             error={errors?.id}
//             hidden
//           />
//         )}

//         <InputField
//           label="Date"
//           name="date"
//           defaultValue={formatDateForInput(data?.date)}
//           register={register}
//           error={errors?.date}
//           type="date"
//         />

//         {/* Student Select */}
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Student</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("studentId")}
//             defaultValue={data?.studentId || ""}
//           >
//             <option value="">Select Student</option>
//             {students.map(
//               (item: { id: string; name: string; surname: string }) => (
//                 <option value={item.id} key={item.id}>
//                   {item.name} {item.surname}
//                 </option>
//               ),
//             )}
//           </select>
//           {errors.studentId?.message && (
//             <p className="text-xs text-red-400">
//               {errors.studentId.message.toString()}
//             </p>
//           )}
//         </div>

//         {/* Lesson Select */}
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Lesson</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("lessonId")}
//             defaultValue={data?.lessonId || ""}
//           >
//             <option value="">Select Lesson</option>
//             {lessons.map((item: { id: number; name: string }) => (
//               <option value={String(item.id)} key={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//           {errors.lessonId?.message && (
//             <p className="text-xs text-red-400">
//               {errors.lessonId.message.toString()}
//             </p>
//           )}
//         </div>

//         {/* Present Checkbox */}
//         <div className="flex items-center gap-2 w-full md:w-1/4 pt-6">
//           <input
//             type="checkbox"
//             id="present"
//             className="w-4 h-4 cursor-pointer"
//             {...register("present")}
//             defaultChecked={data?.present ?? true}
//           />
//           <label
//             htmlFor="present"
//             className="text-sm font-medium cursor-pointer"
//           >
//             Present
//           </label>
//           {errors.present?.message && (
//             <p className="text-xs text-red-400">
//               {errors.present.message.toString()}
//             </p>
//           )}
//         </div>
//       </div>

//       {state.error && (
//         <span className="text-red-500">
//           {state.message || "Something went wrong!"}
//         </span>
//       )}

//       <button className="bg-blue-400 text-white p-2 rounded-md">
//         {type === "create" ? "Submit" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default AttendanceForm;


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { attendanceSchema, AttendanceSchema } from "@/lib/formValidationSchema";
import { createAttendance, updateAttendance } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CheckboxField, FormGrid, FormProps, FormShell, SelectField } from "../FormParts";
import InputField from "../InputField";

const formatDateForInput = (dateStr?: string | Date) => {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().split("T")[0];
};

const AttendanceForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendanceSchema>({
    resolver: zodResolver(attendanceSchema) as any,
    defaultValues: {
      id: data?.id,
      date: formatDateForInput(data?.date) as any,
      present: data?.present ?? true,
      studentId: data?.studentId || "",
      lessonId: data?.lessonId != null ? (data.lessonId) : undefined,
    },
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createAttendance : updateAttendance,
    { success: false, error: false },
  );

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => formAction(formData));
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Attendance record has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  const students = relatedData?.students || [];
  const lessons = relatedData?.lessons || [];

  return (
    <FormShell
      title={type === "create" ? "Mark new attendance" : "Update attendance"}
      onSubmit={onSubmit}
      error={state.error && (state.message || "Something went wrong!")}
      submitLabel={type === "create" ? "Submit" : "Update"}
      pending={pending}
    >
      <FormGrid>
        {data?.id && (
          <InputField label="Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} hidden />
        )}
        <InputField label="Date" name="date" type="date" defaultValue={formatDateForInput(data?.date)} register={register} error={errors?.date} />

        <SelectField label="Student" name="studentId" defaultValue={data?.studentId || ""} register={register} error={errors.studentId}>
          <option value="">Select student</option>
          {students.map((s: { id: string; name: string; surname: string }) => (
            <option value={s.id} key={s.id}>
              {s.name} {s.surname}
            </option>
          ))}
        </SelectField>

        <SelectField label="Lesson" name="lessonId" defaultValue={data?.lessonId || ""} register={register} error={errors.lessonId}>
          <option value="">Select lesson</option>
          {lessons.map((l: { id: number; name: string }) => (
            <option value={String(l.id)} key={l.id}>
              {l.name}
            </option>
          ))}
        </SelectField>

        <CheckboxField label="Present" name="present" defaultChecked={data?.present ?? true} register={register} error={errors.present} />
      </FormGrid>
    </FormShell>
  );
};

export default AttendanceForm;
