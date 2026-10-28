// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import InputField from "../InputField";
// import Image from "next/image";
// import { studentSchema, StudentSchema } from "@/lib/formValidationSchema";
// import {
//   Dispatch,
//   SetStateAction,
//   startTransition,
//   useActionState,
//   useEffect,
//   useState,
// } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { createStudent, updateStudent } from "@/lib/serverAction";
// import { CldUploadWidget } from "next-cloudinary";

// const StudentForm = ({
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
//   const formattedBirthday = data?.birthday
//     ? new Date(data.birthday).toISOString().split("T")[0]
//     : "";

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<StudentSchema>({
//     resolver: zodResolver(studentSchema) as any,
//     defaultValues: {
//       ...data,
//       birthday: formattedBirthday,
//       sex: data?.sex || "MALE",
//       gradeId: data?.gradeId,
//       classId: data?.classId,
//     },
//   });

//   const [img, setImg] = useState<any>();

//   const [state, formAction] = useActionState<
//     { success: boolean; error: boolean; message?: string | undefined },
//     StudentSchema
//   >(type === "create" ? createStudent : updateStudent, {
//     success: false,
//     error: false,
//     message: undefined,
//   });

//   // Log validation errors to console if form fails client validation
//   const onSubmit = handleSubmit(
//     (formData) => {
//       const payload = {
//         ...formData,
//         id: data?.id,
//         img: img?.secure_url || data?.img || null,
//         gradeId: Number(formData.gradeId),
//         classId: Number(formData.classId),
//       };

//       startTransition(() => {
//         formAction(payload as any);
//       });
//     },
//     (invalidErrors) => {
//       console.error("Form Validation Errors:", invalidErrors);
//     },
//   );

//   const router = useRouter();

//   useEffect(() => {
//     if (state.success) {
//       toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
//       setOpen(false);
//       router.refresh();
//     }
//   }, [state.success, type, setOpen, router]);

//   const { grades = [], classes = [] } = relatedData || {};

//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create a new student" : "Update the student"}
//       </h1>

//       <span className="text-xs text-gray-400 font-medium">
//         Authentication Information
//       </span>
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
//           label="Username"
//           name="username"
//           defaultValue={data?.username}
//           register={register}
//           error={errors?.username}
//         />
//         <InputField
//           label="Email"
//           name="email"
//           defaultValue={data?.email}
//           register={register}
//           error={errors?.email}
//         />
//         <InputField
//           label="Password (Demo1234)"
//           name="password"
//           type="password"
//           register={register}
//           error={errors?.password}
//         />
//       </div>

//       <span className="text-xs text-gray-400 font-medium">
//         Personal Information
//       </span>

//       <CldUploadWidget
//         uploadPreset="schoolImg"
//         onSuccess={(result, { widget }) => {
//           setImg(result.info);
//           widget.close();
//         }}
//       >
//         {({ open }) => {
//           return (
//             <div
//               className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer w-max"
//               onClick={() => open()}
//             >
//               <Image src="/upload.png" alt="" width={28} height={28} />
//               <span>
//                 {img?.secure_url || data?.img
//                   ? "Change photo"
//                   : "Upload a photo"}
//               </span>
//             </div>
//           );
//         }}
//       </CldUploadWidget>

//       <div className="flex justify-between flex-wrap gap-4">
//         <InputField
//           label="First Name"
//           name="name"
//           defaultValue={data?.name}
//           register={register}
//           error={errors.name}
//         />
//         <InputField
//           label="Last Name"
//           name="surname"
//           defaultValue={data?.surname}
//           register={register}
//           error={errors.surname}
//         />
//         <InputField
//           label="Phone"
//           name="phone"
//           defaultValue={data?.phone}
//           register={register}
//           error={errors.phone}
//         />
//         <InputField
//           label="Address"
//           name="address"
//           defaultValue={data?.address}
//           register={register}
//           error={errors.address}
//         />
//         <InputField
//           label="Blood Type"
//           name="bloodType"
//           defaultValue={data?.bloodType}
//           register={register}
//           error={errors.bloodType}
//         />
//         <InputField
//           label="Birthday"
//           name="birthday"
//           defaultValue={formattedBirthday}
//           register={register}
//           error={errors.birthday}
//           type="date"
//         />
//         <InputField
//           label="Parent ID"
//           name="parentId"
//           defaultValue={data?.parentId}
//           register={register}
//           error={errors.parentId}
//         />

//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Sex</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("sex")}
//             defaultValue={data?.sex}
//           >
//             <option value="MALE">Male</option>
//             <option value="FEMALE">Female</option>
//           </select>
//           {errors.sex?.message && (
//             <p className="text-xs text-red-400">
//               {errors.sex.message.toString()}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Grade</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("gradeId")}
//             defaultValue={data?.gradeId}
//           >
//             {grades.map((grade: { id: number; level: number }) => (
//               <option value={grade.id} key={grade.id}>
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

//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Class</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("classId")}
//             defaultValue={data?.classId}
//           >
//             {classes.map(
//               (classItem: {
//                 id: number;
//                 name: string;
//                 capacity: number;
//                 _count: { students: number };
//               }) => (
//                 <option value={classItem.id} key={classItem.id}>
//                   {classItem.name} - ({classItem._count.students}/
//                   {classItem.capacity} Capacity)
//                 </option>
//               ),
//             )}
//           </select>
//           {errors.classId?.message && (
//             <p className="text-xs text-red-400">
//               {errors.classId.message.toString()}
//             </p>
//           )}
//         </div>
//       </div>

//       {state.error && (
//         <span className="text-red-500">
//           {state.message || "Something went wrong!"}
//         </span>
//       )}

//       <button className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500">
//         {type === "create" ? "Create" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default StudentForm;


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchema";
import { createStudent, updateStudent } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import {
  FormGrid,
  FormProps,
  FormSection,
  FormShell,
  PhotoUpload,
  SelectField,
} from "../FormParts";
import InputField from "../InputField";

const StudentForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const formattedBirthday = data?.birthday
    ? new Date(data.birthday).toISOString().split("T")[0]
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema) as any,
    defaultValues: {
      ...data,
      birthday: formattedBirthday,
      sex: data?.sex || "MALE",
      gradeId: data?.gradeId,
      classId: data?.classId,
    },
  });

  const [img, setImg] = useState<any>();

  const [state, formAction, pending] = useActionState<
    { success: boolean; error: boolean; message?: string | undefined },
    StudentSchema
  >(type === "create" ? createStudent : updateStudent, {
    success: false,
    error: false,
    message: undefined,
  });

  const onSubmit = handleSubmit(
    (formData) => {
      const payload = {
        ...formData,
        id: data?.id,
        img: img?.secure_url || data?.img || null,
      };

      startTransition(() => {
        formAction(payload as any);
      });
    },
    (invalidErrors) => {
      console.error("Form Validation Errors:", invalidErrors);
      toast.error("Please check the form fields.");
    },
  );

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  const { grades = [], classes = [] } = relatedData || {};

  return (
    <FormShell
      title={type === "create" ? "Create a new student" : "Update the student"}
      subtitle="Student account, profile and class placement"
      onSubmit={onSubmit}
      error={state.error && (state.message || "Something went wrong!")}
      submitLabel={type === "create" ? "Create" : "Update"}
      pending={pending}
    >
      <FormSection title="Authentication Information">
        <FormGrid>
          {data?.id && (
            <InputField label="Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} hidden />
          )}
          <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
          <InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
                 {/* Password Input with Show/Hide Toggle */}
          <div className="relative">
            <InputField
              label={
                type === "create"
                  ? "Password(Demo1234)"
                  : "New password (leave blank to keep current Demo1234)"
              }
              name="password"
              type={showPassword ? "text" : "password"}
              register={register}
              error={errors?.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700 transition"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </FormGrid>
      </FormSection>

      <FormSection title="Personal Information">
        <PhotoUpload uploaded={!!img} hasExisting={!!data?.img} onUploaded={setImg} />
        <FormGrid>
          <InputField label="First Name" name="name" defaultValue={data?.name} register={register} error={errors.name} />
          <InputField label="Last Name" name="surname" defaultValue={data?.surname} register={register} error={errors.surname} />
          <InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
          <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />
          <InputField label="Blood Type" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType} />
          <InputField label="Birthday" name="birthday" type="date" defaultValue={formattedBirthday} register={register} error={errors.birthday} />
          <InputField label="Parent ID" name="parentId" defaultValue={data?.parentId} register={register} error={errors.parentId} />
          <SelectField label="Sex" name="sex" defaultValue={data?.sex} register={register} error={errors.sex}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </SelectField>
        </FormGrid>
      </FormSection>

      <FormSection title="Class Placement">
        <FormGrid>
          <SelectField label="Grade" name="gradeId" defaultValue={data?.gradeId} register={register} error={errors.gradeId}>
            {grades.map((g: { id: string; level: string }) => (
              <option value={g.id} key={g.id}>
                Grade {g.level}
              </option>
            ))}
          </SelectField>
          <SelectField label="Class" name="classId" defaultValue={data?.classId} register={register} error={errors.classId} className="sm:col-span-2">
            {classes.map(
              (c: { id: string; name: string; capacity: number; _count: { students: number } }) => (
                <option value={c.id} key={c.id}>
                  {c.name} — ({c._count.students}/{c.capacity} capacity)
                </option>
              ),
            )}
          </SelectField>
        </FormGrid>
      </FormSection>
    </FormShell>
  );
};

export default StudentForm;
