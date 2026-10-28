"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const field =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-700/30 focus:border-blue-700";
const lbl = "text-[10px] font-semibold uppercase tracking-wider text-gray-500";

const AccountingFilters = ({
  classes,
  structures,
  classId,
  structureId,
  status,
  q,
}: {
  classes: { id: string; name: string }[];
  structures: { id: string; label: string }[];
  classId?: number;
  structureId?: number;
  status: string;
  q: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [search, setSearch] = useState(q);

  const push = (patch: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === "") p.delete(k);
      else p.set(k, String(v));
    });
    router.push(`${pathname}?${p.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <label className="flex flex-col gap-1.5">
        <span className={lbl}>Class</span>
        <select
          className={field}
          value={classId ?? ""}
          onChange={(e) =>
            push({ classId: e.target.value, structureId: undefined, status: undefined, studentId: undefined })
          }
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={lbl}>Fee</span>
        <select
          className={field}
          value={structureId ?? ""}
          onChange={(e) => push({ structureId: e.target.value, studentId: undefined })}
        >
          {structures.length === 0 && <option value="">No fees set for this class</option>}
          {structures.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={lbl}>Payment type</span>
        <select
          className={field}
          value={status}
          onChange={(e) => push({ status: e.target.value || undefined })}
        >
          <option value="">All students</option>
          <option value="PAID">Has paid (any amount)</option>
          <option value="FULL">Full payment</option>
          <option value="HALF">Half payment</option>
          <option value="QUARTER">Quarter payment</option>
          <option value="PARTIAL">Part payment (under 25%)</option>
          <option value="UNPAID">Not yet paid</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={lbl}>Search student</span>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className={`${field} pl-8`}
            value={search}
            placeholder="Name…"
            onChange={(e) => setSearch(e.target.value)}
            onBlur={() => search !== q && push({ q: search.trim() || undefined })}
            onKeyDown={(e) => e.key === "Enter" && push({ q: search.trim() || undefined })}
          />
        </div>
      </label>
    </div>
  );
};

export default AccountingFilters;