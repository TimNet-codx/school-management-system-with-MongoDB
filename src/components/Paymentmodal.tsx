"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import PaymentForm from "./forms/PaymentForm";

/**
 * Self-contained "Record payment" modal.
 * The accounting page passes `data` (fee, students, balances) as plain props,
 * so it does not depend on FormContainer / FromModal at all.
 *
 *   <PaymentModal variant="header" data={paymentData(all)} />
 *   <PaymentModal variant="row" data={paymentData([item], item.id)} />
 */
const PaymentModal = ({
  data,
  variant = "row",
}: {
  data: any;
  variant?: "header" | "row";
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {variant === "header" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          <Plus size={14} /> Record payment
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          title="Record payment"
          aria-label="Record payment"
          className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-100 transition-colors"
        >
          <Plus size={14} />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <PaymentForm type="create" data={data} setOpen={setOpen} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;