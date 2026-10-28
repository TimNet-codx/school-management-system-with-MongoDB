"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { adminSchema, AdminSchema } from "@/lib/formValidationSchema";
import { createAdmin, updateAdmin } from "@/lib/serverAction";
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

const AdminForm = ({ type, data, setOpen }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const formattedBirthday = data?.birthday
    ? new Date(data.birthday).toISOString().split("T")[0]
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSchema>({
    resolver: zodResolver(adminSchema) as any,
    defaultValues: {
      ...data,
      password: "",
      birthday: formattedBirthday,
    },
  });

  const [img, setImg] = useState<any>();

  const [state, formAction, pending] = useActionState<
    { success: boolean; error: boolean; message?: string | undefined },
    AdminSchema
  >(type === "create" ? createAdmin : updateAdmin, {
    success: false,
    error: false,
    message: undefined,
  });

  const onSubmit = handleSubmit(
    (values) => {
      startTransition(() => {
        // keep the existing photo if no new one was uploaded
        formAction({ ...values, img: img?.secure_url ?? data?.img });
      });
    },
    (errs) => {
      console.log("Admin form validation errors:", errs);
      toast.error("Please check the form fields.");
    },
  );

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Admin has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  return (
    <FormShell
      title={type === "create" ? "Create a new admin" : "Update the admin"}
      subtitle="Administrator account and profile details"
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
          {/* Password Input with Show/Hide Toggle */}
          <div className="relative">
            <InputField
              label={
                type === "create"
                  ? "Password(Admin2255@)"
                  : "New password(leave blank to keep current Admin2255@)"
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

export default AdminForm;
