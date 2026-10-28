"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, PaymentSchema } from "@/lib/formValidationSchema";
import { METHODS, PLANS, naira, planAmount } from "@/lib/Accounting";
import { recordPayment } from "@/lib/serverAction";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormGrid, FormProps, FormShell, SelectField } from "../FormParts";

/**
 * Opened from the Accounting page through <FormContainer table="payment" type="create" data={...} />
 * `data` is built on the page, so no extra database query is needed here:
 *   {
 *     feeStructureId: string,
 *     feeLabel: string,            // "School Fees · First Term 2026/2027"
 *     fee: number,                 // what one student must pay
 *     studentId?: string,          // pre-selected student (row button)
 *     students: { id: string; label: string; paid: number }[],
 *   }
 */


const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 read-only:bg-gray-50";
const labelCls = "text-[10px] font-semibold tracking-wider text-gray-500 uppercase";

const PaymentForm = ({ setOpen, data }: FormProps) => {
  const students: { id: string; label: string; paid: number }[] = data?.students ?? [];
  const fee: number = data?.fee ?? 0;
console.log("payment modal:", { fee: data?.fee, count: data?.students?.length, data });
   console.log( "students found:", students.length);

const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema) as any,
    defaultValues: {
      studentId: data?.studentId ?? "",
      feeStructureId: data?.feeStructureId,
      plan: "FULL",
      method: "CASH",
      reference: "",
      note: "",
    } as any,
  });

  const studentId = watch("studentId");
  const plan = watch("plan");
  const amount = Number(watch("amount")) || 0;

  const student = students.find((s) => s.id === studentId);
  const balance = student ? fee - student.paid : 0;

  // fill the amount from the payment type (full / half / quarter)
  useEffect(() => {
    if (!student) {
      setValue("amount", "" as any);
      return;
    }
    if (plan !== "CUSTOM") setValue("amount", planAmount(plan, fee, balance) as any);
  }, [studentId, plan, balance]); // eslint-disable-line react-hooks/exhaustive-deps

  const [state, formAction, pending] = useActionState(recordPayment, {
    success: false,
    error: false,
  } as { success: boolean; error: boolean; message?: string });

  const onSubmit = handleSubmit(
    (values) => {
      startTransition(() =>
        formAction({ ...values, feeStructureId: data?.feeStructureId }),
      );
    },
    (errs) => console.log("Payment form validation errors:", errs),
  );

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast("Payment has been recorded!");
      setOpen(false);
      router.refresh();
    }
  }, [state.success, setOpen, router]);

  const overBalance = student && amount > balance;

  // const { studentList = [] } = relatedData || {};

  return (
    <FormShell
      title="Record payment"
      subtitle={data?.feeLabel ? `${data.feeLabel} · ${naira(fee)}` : undefined}
      onSubmit={onSubmit}
      error={state.error && (state.message || "Something went wrong!")}
      submitLabel="Save payment"
      pending={pending}
    >
      <FormGrid>
        <SelectField
          label="Student"
          name="studentId"
          register={register}
          error={errors.studentId}
          className="sm:col-span-2"
        >
          <option value="">Select student…</option>
          {students.map((s) => (
            <option key={s.id} value={s.id} disabled={fee - s.paid <= 0}>
              {s.label}
              {fee - s.paid <= 0
                ? " — fully paid"
                : s.paid > 0
                ? ` — owes ${naira(fee - s.paid)}`
                : ""}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Payment type"
          name="plan"
          register={register}
          error={errors.plan}
        >
          {PLANS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </SelectField>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="amount" className={labelCls}>
            Amount (₦)
          </label>
          <input
            id="amount"
            type="number"
            min={1}
            readOnly={plan !== "CUSTOM"}
            {...register("amount")}
            className={inputCls}
          />
          {student && (
            <p className={`text-[11px] ${overBalance ? "text-red-500" : "text-gray-400"}`}>
              Balance: {naira(balance)}
            </p>
          )}
          {errors.amount?.message && (
            <p className="text-[11px] text-red-500">{errors.amount.message.toString()}</p>
          )}
        </div>

        <SelectField
          label="Method"
          name="method"
          register={register}
          error={errors.method}
        >
          {METHODS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </SelectField>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="reference" className={labelCls}>
            Reference (optional)
          </label>
          <input id="reference" {...register("reference")} className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:col-span-2">
          <label htmlFor="note" className={labelCls}>
            Note (optional)
          </label>
          <input id="note" {...register("note")} className={inputCls} />
        </div>
      </FormGrid>
    </FormShell>
  );
};

export default PaymentForm;