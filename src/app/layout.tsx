// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ToastContainer } from "react-toastify";
// import { ThemeProvider } from "next-themes";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Tim.Net School Management System",
//   description: "Next.js School Management System",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body className={inter.className} suppressHydrationWarning>
//           <ThemeProvider>
//             {children}
//             <ToastContainer position="bottom-right" theme="dark" />
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ToastContainer } from "react-toastify";
// import { ThemeProvider } from "@/components/Themeprovider";
// import ThemeScript from "@/components/Themeprovider";
// import Script from "next/script";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Tim.Net School Management System",
//   description: "Next.js School Management System",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         {/* <head>
//           <ThemeScript />
//         </head> */}
//         <head>
//           <Script
//             id="theme-script"
//             strategy="beforeInteractive"
//             dangerouslySetInnerHTML={{
//               __html: `
//         try {
//           if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//             document.documentElement.classList.add('dark')
//           } else {
//             document.documentElement.classList.remove('dark')
//           }
//         } catch (_) {}
//       `,
//             }}
//           />
//         </head>
//         <body className={inter.className} suppressHydrationWarning>
//           <ThemeProvider>
//             {children}
//             <ToastContainer position="bottom-right" />
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ToastContainer } from "react-toastify";
// import { ThemeProvider } from "@/components/Themeprovider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Tim.Net School Management System",
//   description: "Next.js School Management System",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         <head>
//           <script
//             id="theme-script"
//             dangerouslySetInnerHTML={{
//               __html: `
//                 try {
//                   if (
//                     localStorage.theme === 'dark' ||
//                     (!('theme' in localStorage) &&
//                       window.matchMedia('(prefers-color-scheme: dark)').matches)
//                   ) {
//                     document.documentElement.classList.add('dark');
//                   } else {
//                     document.documentElement.classList.remove('dark');
//                   }
//                 } catch (_) {}
//               `,
//             }}
//           />
//         </head>
//         <body className={inter.className} suppressHydrationWarning>
//           <ThemeProvider>
//             {children}
//             <ToastContainer position="bottom-right" />
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/Themeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grace School Management System",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider>
            {children}
            <ToastContainer position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
