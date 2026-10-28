// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import InputField from "../InputField";
// import Image from "next/image";
// import {
//   Dispatch,
//   SetStateAction,
//   useActionState,
//   useEffect,
//   useState,
//   startTransition,
// } from "react";
// import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchema";
// import { createTeacher, updateTeacher } from "@/lib/serverAction";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { CldUploadWidget } from "next-cloudinary";

// const TeacherForm = ({
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
//   } = useForm<TeacherSchema>({
//     resolver: zodResolver(teacherSchema) as any,
//     defaultValues: {
//       ...data,
//       birthday: formattedBirthday,
//     },
//   });

//   const [img, setImg] = useState<any>();

//   const [state, formAction] = useActionState<{ success: boolean; error: boolean; message?: string | undefined },TeacherSchema>(
//     type === "create" ? createTeacher : updateTeacher, {
//     success: false,
//     error: false,
//     message: undefined,
//   });

//   const onSubmit = handleSubmit((data) => {
//     // formAction({ ...data, img: img?.secure_url });
//     startTransition(() => {
//       formAction({ ...data, img: img?.secure_url });
//     });
//   });

//   const router = useRouter();
//   useEffect(() => {
//     if (state.success) {
//       toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
//       setOpen(false);
//       router.refresh();
//     }
//   });

//   const { subjects = [] } = relatedData || {};

//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create a new teacher" : "Update the teacher"}
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
//           defaultValue={data?.password}
//           register={register}
//           error={errors?.password}
//         />
//       </div>
//       <span className="text-xs text-gray-400 font-medium">
//         Personal Information
//       </span>
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
//           defaultValue={data?.birthday.toISOString().split("T")[0]}
//           register={register}
//           error={errors.birthday}
//           type="date"
//         />
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Sex</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("sex")}
//             defaultValue={data?.sex}
//           >
//             <option value="MALE">MALE</option>
//             <option value="FEMALE">FEMALE</option>
//           </select>
//           {errors.sex?.message && (
//             <p className="text-xs text-red-400">
//               {errors.sex.message.toString()}
//             </p>
//           )}
//         </div>
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Subject</label>
//           <select
//             multiple
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("subjects")}
//             defaultValue={data?.subjectId}
//           >
//             {subjects.map((subject: { id: number; name: string }) => (
//               <option value={subject.id} key={subject.id}>
//                 {subject.name}
//               </option>
//             ))}
//           </select>
//           {errors.subjects?.message && (
//             <p className="text-xs text-red-400">
//               {errors.subjects.message.toString()}
//             </p>
//           )}
//         </div>
//         {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
//           <label
//             className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
//             htmlFor="img"
//           >
//             <Image src="/upload.png" alt="" width={28} height={28} />
//             <span>Upload a photo</span>
//           </label>
//           <input type="file" id="img" {...register("img")} className="hidden" />
//           {errors.img?.message && (
//             <p className="text-xs text-red-400">
//               {errors.img.message.toString()}
//             </p>
//           )}
//         </div> */}
//         <CldUploadWidget
//           uploadPreset="schoolImg"
//           onSuccess={(result, { widget }) => {
//             setImg(result.info);
//             widget.close();
//           }}
//         >
//           {({ open }) => {
//             return (
//               <div
//                 className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
//                 onClick={() => open()}
//               >
//                 <Image src="/upload.png" alt="" width={28} height={28} />
//                 <span>Upload a photo</span>
//               </div>
//             );
//           }}
//         </CldUploadWidget>
//       </div>
//       {/* {state.error && (
//         <span className="text-red-500">Something went wrong!</span>
//       )} */}
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

// export default TeacherForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchema";
import { createTeacher, updateTeacher } from "@/lib/serverAction";
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

const TeacherForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const formattedBirthday = data?.birthday
    ? new Date(data.birthday).toISOString().split("T")[0]
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema) as any,
    defaultValues: {
      ...data,
      birthday: formattedBirthday,
      // list/detail pages pass subject objects; the <select> needs their ids
      subjects: data?.subjects?.map((s: { id: number } | string) =>
        String(typeof s === "object" ? s.id : s),
      ),
    },
  });

  const [img, setImg] = useState<any>();

  const [state, formAction, pending] = useActionState<
    { success: boolean; error: boolean; message?: string | undefined },
    TeacherSchema
  >(type === "create" ? createTeacher : updateTeacher, {
    success: false,
    error: false,
    message: undefined,
  });

  // const onSubmit = handleSubmit((data) => {
  //   startTransition(() => {
  //     // keep the existing photo if no new one was uploaded
  //     // formAction({ ...values, img: img?.secure_url ?? data?.img });

  //     formAction({ ...data, img: img?.secure_url });
  //   });
  // });

  const onSubmit = handleSubmit(
  (values) => {
    startTransition(() => {
      // new upload wins, otherwise keep the existing photo
      formAction({ ...values, img: img?.secure_url ?? data?.img ?? "" });
    });
  },
  (errs) => {
    console.log("Teacher form validation errors:", errs);
    toast.error("Please check the form fields.");
  },
);

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  const { subjects = [] } = relatedData || {};

  return (
    <FormShell
      title={type === "create" ? "Create a new teacher" : "Update the teacher"}
      subtitle="Faculty account and profile details"
      onSubmit={onSubmit}
      error={state.error && (state.message || "Something went wrong!")}
      submitLabel={type === "create" ? "Create" : "Update"}
      pending={pending}
    >
      <FormSection title="Authentication Information">
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
            label="Username"
            name="username"
            defaultValue={data?.username}
            register={register}
            error={errors?.username}
          />
          <InputField
            label="Email"
            name="email"
            defaultValue={data?.email}
            register={register}
            error={errors?.email}
          />
          {/* <InputField label="Password (Demo1234)"  name="password" type="password" defaultValue={data?.password} register={register} error={errors?.password} /> */}
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
        <FormGrid>
          <InputField
            label="First Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors.name}
          />
          <InputField
            label="Last Name"
            name="surname"
            defaultValue={data?.surname}
            register={register}
            error={errors.surname}
          />
          <InputField
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
            register={register}
            error={errors.phone}
          />
          <InputField
            label="Address"
            name="address"
            defaultValue={data?.address}
            register={register}
            error={errors.address}
          />
          <InputField
            label="Blood Type"
            name="bloodType"
            defaultValue={data?.bloodType}
            register={register}
            error={errors.bloodType}
          />
          <InputField
            label="Birthday"
            name="birthday"
            type="date"
            defaultValue={formattedBirthday}
            register={register}
            error={errors.birthday}
          />
          <SelectField
            label="Sex"
            name="sex"
            defaultValue={data?.sex}
            register={register}
            error={errors.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </SelectField>
          <SelectField
            label="Subjects"
            name="subjects"
            multiple
            register={register}
            error={errors.subjects as any}
            hint="Hold Ctrl / Cmd to select several"
          >
            {subjects.map((s: { id: number; name: string }) => (
              <option value={s.id} key={s.id}>
                {s.name}
              </option>
            ))}
          </SelectField>
        </FormGrid>

        <PhotoUpload
          uploaded={!!img}
          hasExisting={!!data?.img}
          onUploaded={setImg}
        />
      </FormSection>
    </FormShell>
  );
};

export default TeacherForm;
