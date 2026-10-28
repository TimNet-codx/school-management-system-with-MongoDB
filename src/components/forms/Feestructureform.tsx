"use client";

import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FEE_TITLES, TERMS, currentSession } from "@/lib/Accounting";
import { createFeeStructure } from "@/lib/serverAction";

const initial = { success: false, error: false } as {
  success: boolean;
  error: boolean;
  message?: string;
};

const field =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-700/30 focus:border-blue-700";
const lbl = "text-[10px] font-semibold uppercase tracking-wider text-gray-500";

const FeeStructureForm = ({ classes }: { classes: { id: string; name: string }[] }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(createFeeStructure, initial);

  const [title, setTitle] = useState("School Fees");
  const [classId, setClassId] = useState<string>("0");
  const [term, setTerm] = useState<string>(TERMS[0]);
  const [session, setSession] = useState(currentSession());
  const [amount, setAmount] = useState<number | "">("");

  useEffect(() => {
    if (state.success) {
      toast.success("Fee saved");
      setAmount("");
      router.refresh();
    } else if (state.error) {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => action({ title, classId, term, session, amount: Number(amount) }));
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4"
    >
      <div>
        <h2 className="text-sm font-semibold text-gray-900">Add a fee</h2>
        <p className="text-xs text-gray-500">
          Set what a class pays for a term. Choose &quot;All classes&quot; to apply it to every class at once.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={lbl}>Fee name</span>
          <input
            list="fee-titles"
            className={field}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <datalist id="fee-titles">
            {FEE_TITLES.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={lbl}>Class</span>
          <select className={field} value={classId} onChange={(e) => setClassId(e.target.value)}>
            <option value={0}>All classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={lbl}>Term</span>
          <select className={field} value={term} onChange={(e) => setTerm(e.target.value)}>
            {TERMS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={lbl}>Session</span>
          <input className={field} value={session} onChange={(e) => setSession(e.target.value)} placeholder="2026/2027" />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={lbl}>Amount (₦)</span>
          <input
            type="number"
            min={1}
            className={field}
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending || !amount}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {pending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Add fee
        </button>
      </div>
    </form>
  );
};

export default FeeStructureForm;