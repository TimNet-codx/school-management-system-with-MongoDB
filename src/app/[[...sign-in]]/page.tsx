// "use client";

// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const LoginPage = () => {
//   const { isSignedIn, user, isLoaded } = useUser();

//   console.log(user);

//   const router = useRouter();

//   useEffect(() => {
//     const role = user?.publicMetadata.role;

//     if (role) {
//       router.push(`/${role}`);
//     }
//   }, [user, router]);

//   return (
//     <div className="h-screen flex items-center justify-center bg-[#EDF9FD]">
//       <SignIn.Root>
//         <SignIn.Step
//           name="start"
//           className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 "
//         >
//           <h1 className="text-xl font-bold flex items-center gap-2">
//             <img src="/logo.png" alt="Logo" className="w-8 h-8" />
//             School TimNet
//           </h1>

//           <h2 className="text-gray-400">Sign In to your account</h2>

//           {/* <Clerk.Connection name="google">Sign in with Google</Clerk.Connection> */}

//           <Clerk.GlobalError className="text-sm text-red-400" />

//           <Clerk.Field name="identifier" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Username
//             </Clerk.Label>
//             <Clerk.Input
//               type="text"
//               required
//               className="ring-gray-300 ring-1  rounded-md p-2"
//             />
//             <Clerk.FieldError className="text-sm text-red-400" />
//           </Clerk.Field>

//           <Clerk.Field name="password" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Password
//             </Clerk.Label>
//             <Clerk.Input
//               type="password"
//               required
//               className="ring-gray-300 ring-1 rounded-md p-2"
//             />
//             <Clerk.FieldError className="text-sm text-red-400" />
//           </Clerk.Field>

//           <SignIn.Action
//             submit
//             className="bg-blue-500 text-white my-1 py-2 px-4 rounded-md hover:bg-blue-600"
//           >
//             Sign In
//           </SignIn.Action>
//         </SignIn.Step>
//       </SignIn.Root>
//     </div>
//   );
// };

// export default LoginPage;

// "use client";

// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// type IconProps = { className?: string };

// const InlineIcon = ({ name, className }: IconProps & { name: string }) => (
//   <svg
//     aria-hidden="true"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     {name === "arrow" && (
//       <>
//         <path d="M5 12h14" />
//         <path d="m12 5 7 7-7 7" />
//       </>
//     )}
//     {name === "calendar" && (
//       <>
//         <rect x="3" y="5" width="18" height="16" rx="2" />
//         <path d="M16 3v4M8 3v4M3 11h18" />
//         <path d="M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01" />
//       </>
//     )}
//     {name === "eye" && (
//       <>
//         <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
//         <circle cx="12" cy="12" r="3" />
//       </>
//     )}
//     {name === "eyeOff" && (
//       <>
//         <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
//         <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1 0 1.9-.2 2.8-.5" />
//       </>
//     )}
//     {name === "graduation" && (
//       <>
//         <path d="m2 10 10-5 10 5-10 5-10-5Z" />
//         <path d="M6 12v5c3.5 2.5 8.5 2.5 12 0v-5M22 10v6" />
//       </>
//     )}
//     {name === "lock" && (
//       <>
//         <rect x="4" y="10" width="16" height="11" rx="2" />
//         <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
//       </>
//     )}
//     {name === "megaphone" && (
//       <>
//         <path d="m3 11 18-6v14L3 13v-2Z" />
//         <path d="M7 14l2 6h4l-2-8M21 10v4" />
//       </>
//     )}
//     {name === "school" && (
//       <>
//         <path d="m2 10 10-6 10 6M4 10v10h16V10M9 20v-6h6v6M2 20h20" />
//       </>
//     )}
//     {name === "shield" && (
//       <>
//         <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
//         <path d="m9 12 2 2 4-4" />
//       </>
//     )}
//     {name === "users" && (
//       <>
//         <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
//       </>
//     )}
//     {name === "at" && (
//       <>
//         <circle cx="12" cy="12" r="10" />
//         <path d="M16 12v2a2 2 0 0 0 4 0v-2a8 8 0 1 0-3 6.2" />
//         <circle cx="12" cy="12" r="3" />
//       </>
//     )}
//     {name === "buoy" && (
//       <>
//         <circle cx="12" cy="12" r="9" />
//         <circle cx="12" cy="12" r="3" />
//         <path d="m5.6 5.6 4.3 4.3M14.1 14.1l4.3 4.3M18.4 5.6l-4.3 4.3M9.9 14.1l-4.3 4.3" />
//       </>
//     )}
//   </svg>
// );

// const ArrowRight = (props: IconProps) => <InlineIcon name="arrow" {...props} />;
// const CalendarDays = (props: IconProps) => (
//   <InlineIcon name="calendar" {...props} />
// );
// const Eye = (props: IconProps) => <InlineIcon name="eye" {...props} />;
// const EyeOff = (props: IconProps) => <InlineIcon name="eyeOff" {...props} />;
// const GraduationCap = (props: IconProps) => (
//   <InlineIcon name="graduation" {...props} />
// );
// const Lock = (props: IconProps) => <InlineIcon name="lock" {...props} />;
// const Megaphone = (props: IconProps) => (
//   <InlineIcon name="megaphone" {...props} />
// );
// const School = (props: IconProps) => <InlineIcon name="school" {...props} />;
// const ShieldCheck = (props: IconProps) => (
//   <InlineIcon name="shield" {...props} />
// );
// const Users = (props: IconProps) => <InlineIcon name="users" {...props} />;
// const AtSign = (props: IconProps) => <InlineIcon name="at" {...props} />;
// const LifeBuoy = (props: IconProps) => <InlineIcon name="buoy" {...props} />;

// const ROLES = [
//   { key: "teacher", label: "Teacher", Icon: School },
//   { key: "student", label: "Student", Icon: GraduationCap },
//   { key: "parent", label: "Parent", Icon: Users },
//   { key: "admin", label: "Admin", Icon: ShieldCheck },
// ] as const;

// const LoginPage = () => {
//   const { user } = useUser();
//   const router = useRouter();

//   const [selectedRole, setSelectedRole] =
//     useState<(typeof ROLES)[number]["key"]>("teacher");
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     const role = user?.publicMetadata.role;
//     if (role) {
//       router.push(`/${role}`);
//     }
//   }, [user, router]);

//   return (
//     <div className="min-h-screen bg-[#F3F5F9] flex flex-col items-center px-4 py-4 sm:px-8">
//       {/* ===== TOP BAR ===== */}
//       <header className="w-full max-w-6xl flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-2.5 mb-4">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="w-6 h-6 object-contain"
//             />
//           </div>
//           <div className="leading-tight">
//             <div className="flex items-center gap-2">
//               <span className="font-bold text-gray-900">School TimNet</span>
//               <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 rounded px-1.5 py-0.5">
//                 v4.2
//               </span>
//             </div>
//             <p className="text-[10px] text-gray-500">
//               Academic Information &amp; Unified School Portal
//             </p>
//           </div>
//         </div>

//         <div className="hidden sm:flex items-center gap-2">
//           <span className="flex items-center gap-1.5 text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1">
//             <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
//             Academic Year 2024 - 2025
//           </span>
//           <span className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2.5 py-1">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
//             256-Bit SSL Secured
//           </span>
//         </div>
//       </header>

//       {/* ===== MAIN CARD ===== */}
//       <main className="w-full max-w-6xl flex-1 bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-[1fr_1.15fr] min-h-[600px]">
//         {/* ---------- LEFT: FORM ---------- */}
//         <div className="flex items-center justify-center p-6 sm:p-10">
//           <SignIn.Root>
//             <SignIn.Step name="start" className="w-full max-w-sm flex flex-col">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-[10px] font-semibold tracking-wide text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-1">
//                   UNIFIED SIGN IN
//                 </span>
//                 <span className="text-[10px] text-gray-400">
//                   • Institutional Access
//                 </span>
//               </div>

//               <h1 className="text-3xl font-bold text-gray-900">
//                 Welcome back!
//               </h1>
//               <p className="text-xs text-gray-500 mt-1 mb-5">
//                 Please enter your verified credentials or SSO account to
//                 continue.
//               </p>

//               {/* Role selector */}
//               <p className="text-[10px] font-semibold tracking-wider text-gray-500 mb-2">
//                 SELECT USER ROLE
//               </p>
//               <div className="grid grid-cols-4 gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1 mb-4">
//                 {ROLES.map(({ key, label, Icon }) => {
//                   const active = selectedRole === key;
//                   return (
//                     <button
//                       key={key}
//                       type="button"
//                       onClick={() => setSelectedRole(key)}
//                       className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition ${
//                         active
//                           ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
//                           : "text-gray-500 hover:text-gray-800"
//                       }`}
//                     >
//                       <Icon className="w-3.5 h-3.5" />
//                       {label}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* SSO buttons */}
//               {/* <div className="flex flex-col gap-2.5">
//                 <Clerk.Connection
//                   name="google"
//                   className="flex items-center justify-center gap-2.5 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
//                 >
//                   <svg className="w-4 h-4" viewBox="0 0 48 48">
//                     <path
//                       fill="#EA4335"
//                       d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
//                     />
//                     <path
//                       fill="#4285F4"
//                       d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
//                     />
//                   </svg>
//                   Continue with Google Workspace
//                 </Clerk.Connection>

//                 <Clerk.Connection
//                   name="microsoft"
//                   className="flex items-center justify-center gap-2.5 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
//                 >
//                   <svg className="w-4 h-4" viewBox="0 0 23 23">
//                     <rect x="1" y="1" width="10" height="10" fill="#F25022" />
//                     <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
//                     <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
//                     <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
//                   </svg>
//                   Sign in with Microsoft 365 Education
//                 </Clerk.Connection>
//               </div> */}

//               {/* Divider */}
//               {/* <div className="flex items-center gap-3 my-4">
//                 <span className="flex-1 h-px bg-gray-200" />
//                 <span className="text-[10px] tracking-wider text-gray-400">
//                   OR SIGN IN WITH SCHOOL ID
//                 </span>
//                 <span className="flex-1 h-px bg-gray-200" />
//               </div> */}

//               <Clerk.GlobalError className="text-sm text-red-500 mb-2" />

//               {/* Identifier */}
//               <Clerk.Field
//                 name="identifier"
//                 className="flex flex-col gap-1.5 mb-3"
//               >
//                 <Clerk.Label className="text-[10px] font-semibold tracking-wider text-gray-500">
//                   INSTITUTIONAL USERNAME
//                 </Clerk.Label>
//                 <div className="relative">
//                   <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Clerk.Input
//                     type="text"
//                     required
//                     placeholder="e.g. username or tim8492"
//                     className="w-full border border-gray-300 rounded-lg py-2.5 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
//                   />
//                 </div>
//                 <Clerk.FieldError className="text-xs text-red-500" />
//               </Clerk.Field>

//               {/* Password */}
//               <Clerk.Field
//                 name="password"
//                 className="flex flex-col gap-1.5 mb-3"
//               >
//                 <div className="flex items-center justify-between">
//                   <Clerk.Label className="text-[10px] font-semibold tracking-wider text-gray-500">
//                     PASSWORD
//                   </Clerk.Label>
//                   {/* <Link
//                     href="/forgot-password"
//                     className="text-[11px] font-medium text-blue-600 hover:underline"
//                   >
//                     Forgot password?
//                   </Link> */}
//                 </div>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Clerk.Input
//                     type={showPassword ? "text" : "password"}
//                     required
//                     placeholder="••••••••••••"
//                     className="w-full border border-gray-300 rounded-lg py-2.5 pl-9 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((s) => !s)}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//                 <Clerk.FieldError className="text-xs text-red-500" />
//               </Clerk.Field>

//               <label className="flex items-center gap-2 text-xs text-gray-600 mb-4 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="w-3.5 h-3.5 rounded border-gray-300 accent-blue-600"
//                 />
//                 Remember this workstation
//                 {/* <span className="text-gray-400">
//                   (Do not check on public computer labs)
//                 </span> */}
//               </label>

//               <SignIn.Action
//                 submit
//                 className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg py-3 transition shadow-sm"
//               >
//                 Sign In to Portal
//                 <ArrowRight className="w-4 h-4" />
//               </SignIn.Action>

//               {/* Support */}
//               <div className="flex items-center justify-between mt-6 text-[11px] text-gray-500">
//                 <p className="flex items-center gap-2.5">
//                   <LifeBuoy className="w-3.5 h-3.5 text-blue-500" />
//                   IT Support <b className="text-gray-700"></b> or{" "}
//                   <a
//                     href="https://timnetporfolio.netlify.app"
//                     className="text-blue-600 hover:underline"
//                   >
//                     timot@schooltimnet.edu
//                   </a>
//                 </p>
//                 {/* <p className="flex gap-3 shrink-0">
//                   <Link href="/privacy" className="hover:underline">
//                     Privacy Policy
//                   </Link>
//                   <Link href="/terms" className="hover:underline">
//                     Terms of Use
//                   </Link>
//                 </p> */}
//               </div>
//             </SignIn.Step>
//           </SignIn.Root>
//         </div>

//         {/* ---------- RIGHT: HERO ---------- */}
//         <div
//           className="relative hidden lg:flex flex-col justify-between p-6 text-white bg-cover bg-center"
//           style={{ backgroundImage: "url('/primarysch.jpg')" }}
//         >
//           {/* Overlays (also serve as fallback if image is missing) */}
//           <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 -z-10" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

//           {/* Top badges */}
//           <div className="relative flex items-center justify-between">
//             <span className="flex items-center gap-2 text-[11px] bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//               System Operational
//               <span className="text-white/40">|</span>
//               99.98% Uptime
//             </span>
//             <span className="flex items-center gap-2 text-[11px] bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
//               <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
//               Spring Term Active
//             </span>
//           </div>

//           {/* Bottom content */}
//           <div className="relative flex flex-col gap-5">
//             <div className="bg-black/45 backdrop-blur-md border border-white/20 rounded-xl p-4">
//               <div className="flex items-center justify-between mb-3">
//                 <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-amber-300 bg-amber-400/15 border border-amber-300/40 rounded px-2 py-0.5">
//                   <Megaphone className="w-3 h-3" />
//                   CAMPUS BULLETIN
//                 </span>
//                 <span className="text-[10px] text-white/60">Updated today</span>
//               </div>

//               <ul className="flex flex-col gap-2.5 text-xs leading-relaxed">
//                 <li className="flex gap-2">
//                   <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
//                   <p>
//                     <b>Term 2 Midterm Evaluations:</b>{" "}
//                     <span className="text-white/80">
//                       Student reports &amp; progress grades have been released
//                       to the portal.
//                     </span>
//                   </p>
//                 </li>
//                 <li className="flex gap-2">
//                   <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
//                   <p>
//                     <b>Routine Server Maintenance:</b>{" "}
//                     <span className="text-white/80">
//                       Scheduled for Sunday at 02:00 AM UTC (approx. 20 min).
//                     </span>
//                   </p>
//                 </li>
//               </ul>
//             </div>

//             <blockquote className="text-xs italic text-amber-100/90 leading-relaxed">
//               “Empowering educators, fostering curious minds, and connecting
//               digital learning communities in one unified space.”
//               <footer className="not-italic text-[11px] text-white/60 mt-1">
//                 — School TimNet Academic Governance Council
//               </footer>
//             </blockquote>
//           </div>
//         </div>
//       </main>

//       {/* ===== FOOTER ===== */}
//       <footer className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] text-gray-500 mt-4 px-1">
//         <p>
//           <a
//             href="https://timnetporfolio.netlify.app"
//             className="text-blue-600 hover:underline"
//           >
//             © 2026 Tim.Net Educational Systems, Inc. All rights reserved.
//           </a>
//         </p>
//         <p className="flex gap-4">
//           <span>Accessibility Standard WCAG 2.1 AA</span>
//           <span>Server Region: NG-Center (Kwara)</span>
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default LoginPage;

"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type IconProps = { className?: string };

const InlineIcon = ({ name, className }: IconProps & { name: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {name === "arrow" && (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    )}
    {name === "calendar" && (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
        <path d="M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01" />
      </>
    )}
    {name === "eye" && (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
    {name === "eyeOff" && (
      <>
        <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1 0 1.9-.2 2.8-.5" />
      </>
    )}
    {name === "graduation" && (
      <>
        <path d="m2 10 10-5 10 5-10 5-10-5Z" />
        <path d="M6 12v5c3.5 2.5 8.5 2.5 12 0v-5M22 10v6" />
      </>
    )}
    {name === "lock" && (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    )}
    {name === "megaphone" && (
      <>
        <path d="m3 11 18-6v14L3 13v-2Z" />
        <path d="M7 14l2 6h4l-2-8M21 10v4" />
      </>
    )}
    {name === "school" && (
      <>
        <path d="m2 10 10-6 10 6M4 10v10h16V10M9 20v-6h6v6M2 20h20" />
      </>
    )}
    {name === "shield" && (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    )}
    {name === "users" && (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    )}
    {name === "at" && (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 12v2a2 2 0 0 0 4 0v-2a8 8 0 1 0-3 6.2" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
    {name === "buoy" && (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="m5.6 5.6 4.3 4.3M14.1 14.1l4.3 4.3M18.4 5.6l-4.3 4.3M9.9 14.1l-4.3 4.3" />
      </>
    )}
  </svg>
);

const ArrowRight = (props: IconProps) => <InlineIcon name="arrow" {...props} />;
const CalendarDays = (props: IconProps) => (
  <InlineIcon name="calendar" {...props} />
);
const Eye = (props: IconProps) => <InlineIcon name="eye" {...props} />;
const EyeOff = (props: IconProps) => <InlineIcon name="eyeOff" {...props} />;
const GraduationCap = (props: IconProps) => (
  <InlineIcon name="graduation" {...props} />
);
const Lock = (props: IconProps) => <InlineIcon name="lock" {...props} />;
const Megaphone = (props: IconProps) => (
  <InlineIcon name="megaphone" {...props} />
);
const School = (props: IconProps) => <InlineIcon name="school" {...props} />;
const ShieldCheck = (props: IconProps) => (
  <InlineIcon name="shield" {...props} />
);
const Users = (props: IconProps) => <InlineIcon name="users" {...props} />;
const AtSign = (props: IconProps) => <InlineIcon name="at" {...props} />;
const LifeBuoy = (props: IconProps) => <InlineIcon name="buoy" {...props} />;

/* ------------------------------------------------------------------ */
/* LOADING UI                                                          */
/* ------------------------------------------------------------------ */

const Spinner = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    className={`animate-spin motion-reduce:animate-none ${className}`}
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="3"
      className="opacity-25"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Full-screen branded loader. Used in two moments:
 *  1. while Clerk is still initialising (`isLoaded === false`)
 *  2. after a successful sign-in, until the dashboard route takes over
 */
const LoadingScreen = ({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle?: string;
  steps: string[];
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  // Cycle through the status lines so the screen feels alive
  useEffect(() => {
    const id = setInterval(
      () => setStepIndex((i) => Math.min(i + 1, steps.length - 1)),
      1400,
    );
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F3F5F9] px-6 text-center"
    >
      <style>{`
        @keyframes tn-slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        @keyframes tn-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Logo with pulsing ring */}
      <div className="relative mb-6">
        <span className="absolute inset-0 rounded-2xl bg-blue-500/30 animate-ping motion-reduce:animate-none" />
        <div className="relative w-16 h-16 rounded-2xl bg-blue-600 shadow-lg flex items-center justify-center">
          <img src="/logo.png" alt="" className="w-10 h-10 object-contain" />
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}

      {/* Indeterminate progress bar */}
      <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-blue-100">
        <div
          className="h-full w-1/3 rounded-full bg-blue-600"
          style={{ animation: "tn-slide 1.2s ease-in-out infinite" }}
        />
      </div>

      {/* Rotating status line */}
      <p
        key={stepIndex}
        className="mt-4 flex items-center gap-2 text-[11px] font-medium text-gray-600"
        style={{ animation: "tn-fade-up 0.35s ease-out" }}
      >
        <Spinner className="w-3.5 h-3.5 text-blue-600" />
        {steps[stepIndex]}
      </p>

      <p className="absolute bottom-6 text-[10px] text-gray-400">
        Secured by 256-bit SSL encryption
      </p>
    </div>
  );
};

const ROLES = [
  { key: "teacher", label: "Teacher", Icon: School },
  { key: "student", label: "Student", Icon: GraduationCap },
  { key: "parent", label: "Parent", Icon: Users },
  { key: "admin", label: "Admin", Icon: ShieldCheck },
] as const;

const LoginPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [selectedRole, setSelectedRole] =
    useState<(typeof ROLES)[number]["key"]>("teacher");
  const [showPassword, setShowPassword] = useState(false);

  const role = user?.publicMetadata.role as string | undefined;

  useEffect(() => {
    if (role) {
      router.push(`/${role}`);
    }
  }, [role, router]);

  // 1) Clerk still starting up → branded splash instead of a blank/flashing form
  if (!isLoaded) {
    return (
      <LoadingScreen
        title="Grace School Portal"
        subtitle="Academic Information & Unified School Portal"
        steps={["Starting secure session…", "Loading the portal…"]}
      />
    );
  }

  // 2) Signed in (just now, or already) → keep a loader up until redirect completes
  if (role) {
    const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
    const firstName = user?.firstName || user?.username;

    return (
      <LoadingScreen
        title={firstName ? `Welcome back, ${firstName}!` : "Welcome back!"}
        subtitle={`Preparing your ${roleLabel} dashboard`}
        steps={[
          "Verifying your credentials…",
          "Loading your workspace…",
          "Syncing schedules & announcements…",
          "Almost there…",
        ]}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F5F9] flex flex-col items-center px-4 py-4 sm:px-8">
      {/* ===== TOP BAR ===== */}
      <header className="w-full max-w-6xl flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-2.5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">Grace School Portal</span>
              <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 rounded px-1.5 py-0.5">
                v4.2
              </span>
            </div>
            <p className="text-[10px] text-gray-500">
              Academic Information &amp; Unified School Portal
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1">
            <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
            Academic Year 2026 - 2027
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            256-Bit SSL Secured
          </span>
        </div>
      </header>

      {/* ===== MAIN CARD ===== */}
      <main className="w-full max-w-6xl flex-1 bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-[1fr_1.15fr] min-h-[600px]">
        {/* ---------- LEFT: FORM ---------- */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <SignIn.Root>
            <SignIn.Step name="start" className="w-full max-w-sm flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold tracking-wide text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-1">
                  UNIFIED SIGN IN
                </span>
                <span className="text-[10px] text-gray-400">
                  • Institutional Access
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back!
              </h1>
              <p className="text-xs text-gray-500 mt-1 mb-5">
                Please enter your verified credentials or SSO account to
                continue.
              </p>

              {/* Role selector */}
              <p className="text-[10px] font-semibold tracking-wider text-gray-500 mb-2">
                SELECT USER ROLE
              </p>
              <div className="grid grid-cols-4 gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1 mb-4">
                {ROLES.map(({ key, label, Icon }) => {
                  const active = selectedRole === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedRole(key)}
                      className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition ${
                        active
                          ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* SSO buttons (disabled for now)
              <div className="flex flex-col gap-2.5">
                <Clerk.Connection name="google" ...>Continue with Google Workspace</Clerk.Connection>
                <Clerk.Connection name="microsoft" ...>Sign in with Microsoft 365 Education</Clerk.Connection>
              </div>
              <div className="flex items-center gap-3 my-4"> ...OR SIGN IN WITH SCHOOL ID... </div>
              */}

              <Clerk.GlobalError className="text-sm text-red-500 mb-2" />

              {/* Identifier */}
              <Clerk.Field
                name="identifier"
                className="flex flex-col gap-1.5 mb-3"
              >
                <Clerk.Label className="text-[10px] font-semibold tracking-wider text-gray-500">
                  INSTITUTIONAL USERNAME
                </Clerk.Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Clerk.Input
                    type="text"
                    required
                    placeholder="e.g. username or tim8492"
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              {/* Password */}
              <Clerk.Field
                name="password"
                className="flex flex-col gap-1.5 mb-3"
              >
                <div className="flex items-center justify-between">
                  <Clerk.Label className="text-[10px] font-semibold tracking-wider text-gray-500">
                    PASSWORD
                  </Clerk.Label>
                  {/* Forgot password link (disabled for now) */}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Clerk.Input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-9 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              <label className="flex items-center gap-2 text-xs text-gray-600 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-gray-300 accent-blue-600"
                />
                Remember this workstation
              </label>

              {/* SUBMIT — shows a spinner and locks while Clerk verifies */}
              <Clerk.Loading scope="submit">
                {(isSubmitting) => (
                  <SignIn.Action
                    submit
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 disabled:cursor-wait disabled:hover:bg-blue-500 text-white text-sm font-semibold rounded-lg py-3 transition shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="w-4 h-4" />
                        Signing you in…
                      </>
                    ) : (
                      <>
                        Sign In to Portal
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </SignIn.Action>
                )}
              </Clerk.Loading>

              {/* Support */}
              <div className="flex items-center justify-between mt-6 text-[11px] text-gray-500">
                <p className="flex items-center gap-2.5">
                  <LifeBuoy className="w-3.5 h-3.5 text-blue-500" />
                  IT Support <b className="text-gray-700"></b> or{" "}
                  <a
                    href="https://timnetporfolio.netlify.app"
                    className="text-blue-600 hover:underline"
                  >
                    timot@schooltimnet.edu
                  </a>
                </p>
              </div>
            </SignIn.Step>
          </SignIn.Root>
        </div>

        {/* ---------- RIGHT: HERO ---------- */}
        <div
          className="relative hidden lg:flex flex-col justify-between p-6 text-white bg-cover bg-center"
          style={{ backgroundImage: "url('/primarysch.jpg')" }}
        >
          {/* Overlays (also serve as fallback if image is missing) */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 -z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

          {/* Top badges */}
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              System Operational
              <span className="text-white/40">|</span>
              99.98% Uptime
            </span>
            <span className="flex items-center gap-2 text-[11px] bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Spring Term Active
            </span>
          </div>

          {/* Bottom content */}
          <div className="relative flex flex-col gap-5">
            <div className="bg-black/45 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-amber-300 bg-amber-400/15 border border-amber-300/40 rounded px-2 py-0.5">
                  <Megaphone className="w-3 h-3" />
                  CAMPUS BULLETIN
                </span>
                <span className="text-[10px] text-white/60">Updated today</span>
              </div>

              <ul className="flex flex-col gap-2.5 text-xs leading-relaxed">
                <li className="flex gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <p>
                    <b>Term 2 Midterm Evaluations:</b>{" "}
                    <span className="text-white/80">
                      Student reports &amp; progress grades have been released
                      to the portal.
                    </span>
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <p>
                    <b>Routine Server Maintenance:</b>{" "}
                    <span className="text-white/80">
                      Scheduled for Sunday at 02:00 AM UTC (approx. 20 min).
                    </span>
                  </p>
                </li>
              </ul>
            </div>

            <blockquote className="text-xs italic text-amber-100/90 leading-relaxed">
              “Empowering educators, fostering curious minds, and connecting
              digital learning communities in one unified space.”
              <footer className="not-italic text-[11px] text-white/60 mt-1">
                — Grace School Academic Governance Council
              </footer>
            </blockquote>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] text-gray-500 mt-4 px-1">
        <p>
          <a
            href="https://timnetporfolio.netlify.app"
            className="text-blue-600 hover:underline"
          >
            © 2026 Tim.Net Educational Systems, Inc. All rights reserved.
          </a>
        </p>
        <p className="flex gap-4">
          <span>Accessibility Standard WCAG 2.1 AA</span>
          <span>Server Region: NG-Center (Kwara)</span>
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
