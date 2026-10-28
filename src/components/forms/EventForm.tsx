// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import InputField from "../InputField";
// import { eventSchema, EventSchema } from "@/lib/formValidationSchema";
// import { createEvent, updateEvent } from "@/lib/serverAction";
// import {
//   Dispatch,
//   SetStateAction,
//   startTransition,
//   useActionState,
//   useEffect,
// } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const formatDateForInput = (dateStr?: string | Date) => {
//   if (!dateStr) return "";
//   const d = new Date(dateStr);
//   return d.toISOString().slice(0, 16);
// };

// const EventForm = ({
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
//   } = useForm<EventSchema>({
//     resolver: zodResolver(eventSchema) as any,
//     defaultValues: {
//       id: data?.id,
//       title: data?.title || "",
//       description: data?.description || "",
//       startTime: formatDateForInput(data?.startTime) as any,
//       endTime: formatDateForInput(data?.endTime) as any,
//       classId: data?.classId ? Number(data.classId) : undefined,
//     },
//   });

//   const [state, formAction] = useActionState(
//     type === "create" ? createEvent : updateEvent,
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
//       toast(`Event has been ${type === "create" ? "created" : "updated"}!`);
//       setOpen(false);
//       router.refresh();
//     }
//   }, [state.success, type, setOpen, router]);

//   const classes = relatedData?.classes || [];

//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create new Event" : "Update the event"}
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
//           label="Event Title"
//           name="title"
//           defaultValue={data?.title}
//           register={register}
//           error={errors?.title}
//         />

//         <InputField
//           label="Description"
//           name="description"
//           defaultValue={data?.description}
//           register={register}
//           error={errors?.description}
//         />

//         <InputField
//           label="Start Time"
//           name="startTime"
//           defaultValue={formatDateForInput(data?.startTime)}
//           register={register}
//           error={errors?.startTime}
//           type="datetime-local"
//         />

//         <InputField
//           label="End Time"
//           name="endTime"
//           defaultValue={formatDateForInput(data?.endTime)}
//           register={register}
//           error={errors?.endTime}
//           type="datetime-local"
//         />

//         {/* Class Select */}
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Class (Optional)</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("classId")}
//           >
//             <option value="">General (All Classes)</option>
//             {classes.map((item: { id: number; name: string }) => (
//               <option value={String(item.id)} key={item.id}>
//                 {item.name}
//               </option>
//             ))}
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

//       <button className="bg-blue-400 text-white p-2 rounded-md">
//         {type === "create" ? "Create" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default EventForm;


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventSchema } from "@/lib/formValidationSchema";
import { createEvent, updateEvent } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormGrid, FormProps, FormShell, SelectField, TextAreaField } from "../FormParts";
import InputField from "../InputField";

const formatDateForInput = (dateStr?: string | Date) => {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().slice(0, 16);
};

const EventForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema) as any,
    defaultValues: {
      id: data?.id,
      title: data?.title || "",
      description: data?.description || "",
      startTime: formatDateForInput(data?.startTime) as any,
      endTime: formatDateForInput(data?.endTime) as any,
      classId: data?.classId ? (data.classId) : undefined,
    },
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createEvent : updateEvent,
    { success: false, error: false },
  );

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => formAction(formData));
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Event has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  const classes = relatedData?.classes || [];

  return (
    <FormShell
      title={type === "create" ? "Create new event" : "Update the event"}
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
            error={errors?.id as any}
            hidden
          />
        )}
        <InputField label="Event Title" name="title" defaultValue={data?.title} register={register} error={errors?.title} className="sm:col-span-2" />
        <SelectField label="Class (optional)" name="classId" register={register} error={errors.classId}>
          <option value="">General (All Classes)</option>
          {classes.map((c: { id: number; name: string }) => (
            <option value={String(c.id)} key={c.id}>
              {c.name}
            </option>
          ))}
        </SelectField>
        <InputField label="Start Time" name="startTime" type="datetime-local" defaultValue={formatDateForInput(data?.startTime)} register={register} error={errors?.startTime} />
        <InputField label="End Time" name="endTime" type="datetime-local" defaultValue={formatDateForInput(data?.endTime)} register={register} error={errors?.endTime} />
        <TextAreaField label="Description" name="description" rows={3} defaultValue={data?.description} register={register} error={errors?.description} className="sm:col-span-2 xl:col-span-3" />
      </FormGrid>
    </FormShell>
  );
};

export default EventForm;
