import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import MenuLinks from "./MenuLinks";

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string | undefined;
  const roleLabel = role ? role.charAt(0).toUpperCase() + role.slice(1) : "";

  return (
    <div className="flex flex-col gap-4">
      {/* BRAND */}
      <Link
        href="/"
        className="flex items-center justify-center lg:justify-start gap-2.5"
      >
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Image src="/logo.png" alt="Grace School Portal" width={24} height={24} />
        </div>
        <div className="hidden lg:block leading-tight">
          <p className="text-sm font-bold text-gray-900">Grace School Portal</p>
          {roleLabel && (
            <p className="text-[10px] text-gray-500">{roleLabel} Portal</p>
          )}
        </div>
      </Link>

      {/* ACADEMIC SESSION */}
      <div className="hidden lg:block rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2">
        <p className="text-[9px] font-bold tracking-wider text-blue-600">
          ACADEMIC SESSION
        </p>
        <p className="text-xs font-semibold text-gray-900 mt-0.5">
          Spring Term 2026–2027
        </p>
      </div>

      {/* LINKS */}
      <MenuLinks role={role} />
    </div>
  );
};

export default Menu;
