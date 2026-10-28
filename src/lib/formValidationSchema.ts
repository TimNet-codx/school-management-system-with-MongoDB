import z from "zod";

// Subject Schema
export const subjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
  teachers: z.array(z.string()),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

// Class Schema
export const classSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Class name is required" }),
  capacity: z.coerce
    .number()
    .min(1, { message: "Capacity must be at least 1" }),
  gradeId: z.string().min(1, { message: "Select a grade" }),
  supervisorId: z.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

// Exam Schema
export const examSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
  lessonId: z.string().min(1, { message: "Lesson is required" }),
  // results: z.array(z.string()),
});
export type ExamSchema = z.infer<typeof examSchema>;

// Lesson Schema
export const Day = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

export const lessonSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Lesson is required" }),
  day: Day.optional(),
  subjectId: z.string().min(1, { message: "Subject is required" }),
  classId: z.string().min(1, { message: "Class is required" }),
  teacherId: z.string().min(1, { message: "Teacher is required" }), // String ID matches Teacher model
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
});
export type LessonSchema = z.infer<typeof lessonSchema>;

// Assignment Schema
export const assignmentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  startDate: z.coerce.date({ message: "Start time is required" }),
  dueDate: z.coerce.date({ message: "End time is required" }),
  lessonId: z.string().min(1, { message: "Lesson is required" }),
});
export type AssignmentSchema = z.infer<typeof assignmentSchema>;

// Result Schema
// export const resultSchema = z.object({
//   id: z.coerce.number().optional(),
//   score: z.coerce.number({ message: "Score is required" }),
//   studentId: z.coerce.number({ message: "Student is required" }),
//   examId: z.coerce.number().optional(),
//   assignmentId: z.coerce.number().optional(),
// });
// export type ResultSchema = z.infer<typeof resultSchema>;
export const resultSchema = z
  .object({
    id: z.string().optional(),
    score: z.coerce.number().min(0, { message: "Score must be non-negative" }),
    studentId: z.string().min(1, { message: "Student is required" }),
    examId: z.string().optional(),
    assignmentId: z.string().optional(),
  })
  .refine((data) => data.examId || data.assignmentId, {
    message: "Either an Exam or an Assignment must be selected",
    path: ["examId"],
  });

export type ResultSchema = z.infer<typeof resultSchema>;

// Event Schema
export const eventSchema = z.object({
  id: z.string().optional,
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
  // classId: z.coerce.number({ message: "Class is required" }),
  classId: z.string().min(1, { message: "Class is required" }),
});
export type EventSchema = z.infer<typeof eventSchema>;

// Announcement Schema
export const announcementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.coerce.date({ message: "Date is required" }),
  classId: z.string().optional(),
});
export type AnnouncementSchema = z.infer<typeof announcementSchema>;

// Attendance Schema
export const attendanceSchema = z.object({
  id: z.string().optional(),
  date: z.coerce.date({ message: "Date is required" }),
  present: z.coerce.boolean(),
  studentId: z.string().min(1, { message: "Student is required" }),
  lessonId: z.string().min(1, { message: "Lesson is required" }),
});
export type AttendanceSchema = z.infer<typeof attendanceSchema>;

// Teacher Schema
export const teacherSchema = z.object({
  id: z.string().optional(),
  // username: z
  //   .string()
  //   .min(3, { message: "Username must be at least 3 characters long!" })
  //   .max(20, { message: "Username must be at most 20 characters long!" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Username can only contain letters, numbers, - or _",
    }),
  // password: z
  //   .string()
  //   .min(8, { message: "Password must be at least 8 characters long!" })
  //   .regex(/^[a-zA-Z0-9]+$/, {
  //     message: "Password must contain numbers, least one uppercase, and uppercase letter",
  //   })
  //   .regex(/[0-9]/, { message: "Password must contain at least one number" }).optional(),
  // password: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (val) => {
  //       if (!val || val === "") return true; // Pass if empty (optional on update)
  //       return (
  //         val.length >= 8 &&
  //         /[a-z]/.test(val) &&
  //         /[A-Z]/.test(val) &&
  //         /[0-9]/.test(val)
  //       );
  //     },
  //     {
  //       message:
  //         "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!",
  //     },
  //   ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter!",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter!",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number!" })
    .or(z.literal(""))
    .optional(),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  // phone: z.string().min(1, { message: "Phone is required!" }),
  // address: z.string().min(1, { message: "Address is required!" }),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  // img: z.instanceof(File, { message: "Image is required" }),
  // img: z.string().optional(),
  // img: z.string().nullish().or(z.literal("")),
  img: z.string().optional().nullable().or(z.literal("")),
  subjects: z.array(z.string()).optional(), // store the subject IDs as strings in the subjects array
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

// Student Schema
export const studentSchema = z.object({
  id: z.string().optional(),
  // username: z
  //   .string()
  //   .min(3, { message: "Username must be at least 3 characters long!" })
  //   .max(20, { message: "Username must be at most 20 characters long!" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Username can only contain letters, numbers, - or _",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter!",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter!",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number!" })
    .or(z.literal(""))
    .optional(),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  // phone: z.string().min(1, { message: "Phone is required!" }),
  // address: z.string().min(1, { message: "Address is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  // img: z.instanceof(File, { message: "Image is required" }),
  // img: z.string().optional(),
  img: z.string().optional().nullable().or(z.literal("")),
  // gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  gradeId: z.string().min(1, { message: "Grade is required" }),
  // classId: z.coerce.number().min(1, { message: "Class is required!" }),
  classId: z.string().min(1, { message: "Class is required" }),
  parentId: z.string().min(1, { message: "Parent ID is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

// Parent Schema
export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Username can only contain letters, numbers, - or _",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter!",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter!",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number!" })
    .or(z.literal(""))
    .optional(),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string(),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  students: z.array(z.string()).optional(),
});

export type ParentSchema = z.infer<typeof parentSchema>;

export const messageSchema = z.object({
  // id: z.coerce.number().optional(),
  id: z.string().optional(),
  subject: z.string().min(1, { message: "Subject is required" }),
  content: z.string().min(1, { message: "Message content is required" }),
  senderId: z.string().min(1, { message: "Sender is required" }),
  receiverId: z.string().min(1, { message: "Recipient is required" }),
});

export type MessageSchema = z.infer<typeof messageSchema>;

export const profileSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, { message: "User ID is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  avatarUrl: z.string().optional().or(z.literal("")),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const adminSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  // "" is allowed so an update without a new password still validates
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter!",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter!",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number!" })
    .or(z.literal(""))
    .optional(),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  // img: z.string().optional(),
  img: z.string().optional().nullable().or(z.literal("")),
});

export type   AdminSchema = z.infer<typeof adminSchema>;

export const gradeSchema = z.object({
  // id: z.coerce.number().optional(),
  id: z.string().optional(),
  level: z.string().min(1, { message: "Grade level string is required!" }),
});

export type GradeSchema = z.infer<typeof gradeSchema>;

// export const feeSchema = z.object({
//   title: z.string().trim().min(2, "Enter a fee name"),
//   // classId: z.coerce.number().int().min(0), // 0 = every class
//   classId: z.string().min(1, "Select a class"),
//   term: z.string().min(1),
//   session: z
//     .string()
//     .trim()
//     .regex(/^\d{4}\/\d{4}$/, "Session must look like 2026/2027"),
//   amount: z.coerce.number().int().positive("Amount must be greater than 0"),
// });

export const feeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  classId: z.string().min(1, { message: "Class is required!" }), // was z.coerce.number()
  term: z.string().min(1, { message: "Term is required!" }),
  session: z.string().min(1, { message: "Session is required!" }),
  amount: z.coerce
    .number()
    .positive({ message: "Amount must be greater than 0!" }),
});

export type FeeSchema = z.infer<typeof feeSchema>;

export const paymentSchema = z.object({
  studentId: z.string().min(1, { message: "Select a student" }),
  feeStructureId: z.string().min(1, { message: "Fee is required" }),
  plan: z.enum(["FULL", "HALF", "QUARTER", "CUSTOM"]),
  method: z.enum(["CASH", "TRANSFER", "POS", "CHEQUE"]),
  amount: z.coerce
    .number()
    .int()
    .positive({ message: "Amount must be greater than 0" }),
  reference: z.string().trim().max(80).optional().or(z.literal("")),
  note: z.string().trim().max(200).optional().or(z.literal("")),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
