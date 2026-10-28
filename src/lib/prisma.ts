//import { PrismaClient } from '@prisma/client';
// // import { PrismaClient } from '../prisma/generated/client';
// import {PrismaClient } from "@/src/generated/prisma/client";

//import { PrismaClient } from "@prisma/client/extension"

// const prismaClientSingleton = () => {
//   // return new PrismaClient()
//   return new PrismaClient({} as any);
// }

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

// import { PrismaClient } from '@/generated/prisma/client';
//  import { PrismaPg } from '@prisma/adapter-pg'

// const prismaClientSingleton = () => {
//   const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
//   return new PrismaClient({ adapter })
// }

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>
// } & typeof global

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

// import { PrismaClient } from '@/generated/prisma/client';
// import { PrismaPg } from "@prisma/adapter-pg";

// const prismaClientSingleton = () => {
//   const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
//   return new PrismaClient({ adapter });
// };

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
