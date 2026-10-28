// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import InputField from "../InputField";
// import {
//   classSchema,
//   ClassSchema,
//   subjectSchema,
//   SubjectSchema,
// } from "@/lib/formValidationSchema";
// import { createClass, updateClass } from "@/lib/serverAction";
// import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const ClassForm = ({
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
//   } = useForm<ClassSchema>({
//     resolver: zodResolver(classSchema) as any,
//     defaultValues: data || { name: "" },
//   });

//   const [state, formAction] = useActionState(
//     type === "create" ? createClass : updateClass,
//     { success: false, error: false },
//   );

//   const onSubmit = handleSubmit((data) => {
//     // console.log(data);
//     formAction(data);
//   });

//   const router = useRouter();
//   useEffect(() => {
//     if (state.success) {
//       toast(`Class has been ${type === "create" ? "created" : "updated"}!`);
//       setOpen(false);
//       router.refresh();
//     }
//   });

//   // destructure the relatedData to get the teachers array
//   // const {teachers} = relatedData.teacher || { teachers: [] };
//   const { teachers, grades } = relatedData || [];
//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create a new class" : "Update the class"}
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
//           label="Class Name"
//           name="name"
//           defaultValue={data?.name}
//           register={register}
//           error={errors?.name}
//         />
//         <InputField
//           label="Capacity"
//           name="capacity"
//           defaultValue={data?.capacity}
//           register={register}
//           error={errors?.capacity}
//         />
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Supervisor</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("supervisorId")}
//             defaultValue={data?.teachers}
//           >
//             {teachers.map(
//               (teacher: { id: string; name: string; surname: string }) => (
//                 <option value={teacher.id} key={teacher.id} selected={data && teacher.id === data.supervisorId}>
//                   {teacher.name + " " + teacher.surname}
//                 </option>
//               ),
//             )}
//           </select>
//           {errors.supervisorId?.message && (
//             <p className="text-xs text-red-400">
//               {errors.supervisorId.message.toString()}
//             </p>
//           )}
//         </div>
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Grades</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("gradeId")}
//             defaultValue={data?.gradeId}
//           >
//             {grades.map((grade: { id: number; level: number }) => (
//               <option value={grade.id} key={grade.id} selected={data && grade.id === data.gradeId}>
//                 {grade.level}
//               </option>
//             ))}
//           </select>
//           {errors.gradeId?.message && (
//             <p className="text-xs text-red-400">
//               {errors.gradeId.message.toString()}
//             </p>
//           )}
//         </div>
//       </div>
//       {state.error && (
//         <span className="text-red-500">Something went wrong!</span>
//       )}
//       <button className="bg-blue-400 text-white p-2 rounded-md">
//         {type === "create" ? "Create" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default ClassForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { classSchema, ClassSchema } from "@/lib/formValidationSchema";
import { createClass, updateClass } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormGrid, FormProps, FormShell, SelectField } from "../FormParts";
import InputField from "../InputField";

const ClassForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema) as any,
    // supervisorId / gradeId pre-select the right <option> on edit
    defaultValues: data || { name: "" },
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createClass : updateClass,
    { success: false, error: false },
  );

  const onSubmit = handleSubmit((values) => {
    startTransition(() => formAction(values));
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Class has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  const { teachers = [], grades = [] } = relatedData || {};

  return (
    <FormShell
      title={type === "create" ? "Create a new class" : "Update the class"}
      onSubmit={onSubmit}
      error={state.error && "Something went wrong!"}
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
        <InputField
          label="Class Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          type="number"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />
        <SelectField
          label="Supervisor"
          name="supervisorId"
          register={register}
          error={errors.supervisorId}
        >
          {teachers.map((t: { id: string; name: string; surname: string }) => (
            <option value={t.id} key={t.id}>
              {t.name} {t.surname}
            </option>
          ))}
        </SelectField>
        <SelectField
          label="Grade"
          name="gradeId"
          register={register}
          error={errors.gradeId}
        >
          {grades.map((g: { id: number; level: number }) => (
            <option value={g.id} key={g.id}>
              Grade {g.level}
            </option>
          ))}
        </SelectField>
      </FormGrid>
    </FormShell>
  );
};

export default ClassForm;
