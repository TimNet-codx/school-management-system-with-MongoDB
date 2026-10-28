// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import InputField from "../InputField";
// import { resultSchema, ResultSchema } from "@/lib/formValidationSchema";
// import { createResult, updateResult } from "@/lib/serverAction";
// import {
//   Dispatch,
//   SetStateAction,
//   startTransition,
//   useActionState,
//   useEffect,
//   useState,
// } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const ResultForm = ({
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
//   const [assessmentType, setAssessmentType] = useState<"exam" | "assignment">(
//     data?.examId ? "exam" : "assignment"
//   );

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ResultSchema>({
//     resolver: zodResolver(resultSchema) as any,
//     defaultValues: {
//       id: data?.id,
//       score: data?.score,
//       studentId: data?.studentId ? String(data.studentId) : "",
//       examId: data?.examId ? data.examId : undefined,
//       assignmentId: data?.assignmentId ? data.assignmentId : undefined,
//     },
//   });

//   const [state, formAction] = useActionState(
//     type === "create" ? createResult : updateResult,
//     { success: false, error: false }
//   );

//   const handleAssessmentTypeChange = (type: "exam" | "assignment") => {
//     setAssessmentType(type);
//     if (type === "exam") {
//       setValue("assignmentId", undefined);
//     } else {
//       setValue("examId", undefined);
//     }
//   };

//   const onSubmit = handleSubmit((formData) => {
//     startTransition(() => {
//       formAction(formData);
//     });
//   });

//   const router = useRouter();

//   useEffect(() => {
//     if (state.success) {
//       toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
//       setOpen(false);
//       router.refresh();
//     }
//   }, [state.success, type, setOpen, router]);

//   const students = relatedData?.students || [];
//   const exams = relatedData?.exams || [];
//   const assignments = relatedData?.assignments || [];

//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create new Result" : "Update the result"}
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
//           label="Score"
//           name="score"
//           defaultValue={data?.score}
//           register={register}
//           error={errors?.score}
//           type="number"
//         />

//         {/* Student Select */}
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Student</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("studentId")}
//           >
//             <option value="">Select Student</option>
//             {students.map(
//               (student: { id: string; name: string; surname: string }) => (
//                 <option value={student.id} key={student.id}>
//                   {student.name} {student.surname}
//                 </option>
//               )
//             )}
//           </select>
//           {errors.studentId?.message && (
//             <p className="text-xs text-red-400">
//               {errors.studentId.message.toString()}
//             </p>
//           )}
//         </div>

//         {/* Assessment Type Selector Switch */}
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Assessment Type</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             value={assessmentType}
//             onChange={(e) =>
//               handleAssessmentTypeChange(
//                 e.target.value as "exam" | "assignment"
//               )
//             }
//           >
//             <option value="exam">Exam</option>
//             <option value="assignment">Assignment</option>
//           </select>
//         </div>

//         {/* Conditional Exam or Assignment Selector */}
//         {assessmentType === "exam" ? (
//           <div className="flex flex-col gap-2 w-full md:w-1/4">
//             <label className="text-xs text-gray-500">Exam</label>
//             <select
//               className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//               {...register("examId")}
//             >
//               <option value="">Select Exam</option>
//               {exams.map((exam: { id: number; title: string }) => (
//                 <option value={String(exam.id)} key={exam.id}>
//                   {exam.title}
//                 </option>
//               ))}
//             </select>
//             {errors.examId?.message && (
//               <p className="text-xs text-red-400">
//                 {errors.examId.message.toString()}
//               </p>
//             )}
//           </div>
//         ) : (
//           <div className="flex flex-col gap-2 w-full md:w-1/4">
//             <label className="text-xs text-gray-500">Assignment</label>
//             <select
//               className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//               {...register("assignmentId")}
//             >
//               <option value="">Select Assignment</option>
//               {assignments.map(
//                 (assignment: { id: number; title: string }) => (
//                   <option value={String(assignment.id)} key={assignment.id}>
//                     {assignment.title}
//                   </option>
//                 )
//               )}
//             </select>
//             {errors.assignmentId?.message && (
//               <p className="text-xs text-red-400">
//                 {errors.assignmentId.message.toString()}
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {state.error && (
//         <span className="text-red-500">
//           {state.message || "Something went wrong!"}
//         </span>
//       )}

//       <button className="bg-blue-400 text-white p-2 rounded-md">
//         {type === "create" ? "Create" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default ResultForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchema";
import { createResult, updateResult } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormGrid, FormProps, FormShell, SelectField } from "../FormParts";
import InputField from "../InputField";

const ResultForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const [assessmentType, setAssessmentType] = useState<"exam" | "assignment">(
    data?.examId ? "exam" : "assignment",
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema) as any,
    defaultValues: {
      id: data?.id,
      score: data?.score,
      studentId: data?.studentId ? String(data.studentId) : "",
      examId: data?.examId ? data.examId : undefined,
      assignmentId: data?.assignmentId ? data.assignmentId : undefined,
    },
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createResult : updateResult,
    { success: false, error: false },
  );

  const handleAssessmentTypeChange = (next: "exam" | "assignment") => {
    setAssessmentType(next);
    if (next === "exam") setValue("assignmentId", undefined);
    else setValue("examId", undefined);
  };

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => formAction(formData));
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  const students = relatedData?.students || [];
  const exams = relatedData?.exams || [];
  const assignments = relatedData?.assignments || [];

  return (
    <FormShell
      title={type === "create" ? "Create new result" : "Update the result"}
      onSubmit={onSubmit}
      error={state.error && (state.message || "Something went wrong!")}
      submitLabel={type === "create" ? "Create" : "Update"}
      pending={pending}
    >
      <FormGrid>
        {data?.id && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}

        <SelectField
          label="Student"
          name="studentId"
          register={register}
          error={errors.studentId}
          className="sm:col-span-2"
        >
          <option value="">Select student</option>
          {students.map((s: { id: string; name: string; surname: string }) => (
            <option value={s.id} key={s.id}>
              {s.name} {s.surname}
            </option>
          ))}
        </SelectField>

        <InputField
          label="Score"
          name="score"
          type="number"
          defaultValue={data?.score}
          register={register}
          error={errors?.score}
        />

        {/* Not registered with the form: it only decides which field below shows */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="assessmentType"
            className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase"
          >
            Assessment Type
          </label>
          <select
            id="assessmentType"
            value={assessmentType}
            onChange={(e) =>
              handleAssessmentTypeChange(
                e.target.value as "exam" | "assignment",
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20"
          >
            <option value="exam">Exam</option>
            <option value="assignment">Assignment</option>
          </select>
        </div>

        {assessmentType === "exam" ? (
          <SelectField
            label="Exam"
            name="examId"
            register={register}
            error={errors.examId}
            className="sm:col-span-2"
          >
            <option value="">Select exam</option>
            {exams.map((e: { id: string; title: string }) => (
              <option value={String(e.id)} key={e.id}>
                {e.title}
              </option>
            ))}
          </SelectField>
        ) : (
          <SelectField
            label="Assignment"
            name="assignmentId"
            register={register}
            error={errors.assignmentId}
            className="sm:col-span-2"
          >
            <option value="">Select assignment</option>
            {assignments.map((a: { id: string; title: string }) => (
              <option value={String(a.id)} key={a.id}>
                {a.title}
              </option>
            ))}
          </SelectField>
        )}
      </FormGrid>
    </FormShell>
  );
};

export default ResultForm;
