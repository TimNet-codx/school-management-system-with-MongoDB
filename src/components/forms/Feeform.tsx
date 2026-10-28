"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { feeSchema, FeeSchema } from "@/lib/formValidationSchema";
import { createFeeStructure, updateFeeStructure } from "@/lib/serverAction";
import { TERMS, currentSession } from "@/lib/Accounting";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormGrid, FormProps, FormShell, SelectField } from "../FormParts";
import InputField from "../InputField";

const FeeForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeeSchema>({
    resolver: zodResolver(feeSchema) as any,
    defaultValues: {
      title: data?.title ?? "School Fees",
      // "0" = every class (only offered when creating)
      classId: data?.classId ?? "0",
      term: data?.term ?? TERMS[0],
      session: data?.session ?? currentSession(),
      amount: data?.amount,
    },
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createFeeStructure : updateFeeStructure,
    { success: false, error: false } as {
      success: boolean;
      error: boolean;
      message?: string;
    },
  );

  const onSubmit = handleSubmit(
    (data) => {
      startTransition(() => formAction(data));
    },
    (errs) => console.log("Fee form validation errors:", errs),
  );

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast(`Fee has been ${type === "create" ? "added" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  const { classFee = [] } = relatedData || {};

  return (
    <FormShell
      title={type === "create" ? "Add a fee" : "Update the fee"}
      subtitle="What a class pays for a term"
      onSubmit={onSubmit}
      error={state.error && (state.message || "Something went wrong!")}
      submitLabel={type === "create" ? "Add fee" : "Update"}
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
          label="Fee name"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        {/* <SelectField
          label="Class"
          name="classId"
          register={register}
          defaultValue={data?.classId}
          error={errors.classId}
        >
          <option value="">General (All Classes)</option>
          {classFee.map((c: { id: number; name: string }) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </SelectField> */}
          <SelectField label="Class (optional)" name="classId" register={register} error={errors.classId}>
                  <option value="">General (All Classes)</option>
                  {classFee.map((c: { id: number; name: string }) => (
                    <option value={String(c.id)} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </SelectField>
        <SelectField
          label="Term"
          name="term"
          register={register}
          error={errors.term}
        >
          {TERMS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectField>
        <InputField
          label="Session (e.g. 2026/2027)"
          name="session"
          defaultValue={data?.session}
          register={register}
          error={errors?.session}
        />
        <InputField
          label="Amount (₦)"
          name="amount"
          type="number"
          defaultValue={data?.amount}
          register={register}
          error={errors?.amount}
        />
      </FormGrid>
    </FormShell>
  );
};

export default FeeForm;
