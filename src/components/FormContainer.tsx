import prisma from "@/lib/prisma";
import FormModal from "./FromModal";
import { getAuthUser } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement"
    | "message"
    | "profile"
    | "admin"
    | "grade"
    | "fee"
    | "payment";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | String;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};
  let fetchedData = data;

  // 1. Fetch authentication once for the component
  const { userId, sessionClaims } = await auth();
  const role = (
    sessionClaims?.metadata as {
      role?: "admin" | "teacher" | "student" | "parent";
    }
  )?.role;

  // If the type is not delete, fetch related data based on the table type
  // 2. Fetch related data if performing create or update operations
  if (type !== "delete") {
    // condition for teacher should only add exams for their own subjects and classes, admin can add exams for all subjects and classes
    // const { userId, sessionClaims } = await auth();
    // const role = (
    //   sessionClaims?.metadata as {
    //     role?: "admin" | "teacher" | "student" | "parent";
    //   }
    // )?.role;
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { grades: classGrades, teachers: classTeachers };
        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { grades: studentGrades, classes: studentClasses };
        break;
      case "parent":
        // 1. Fetch ALL students for the dropdown options list
        const parentStudents = await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { students: parentStudents };

        // 2. If updating, fetch THIS specific parent and their existing linked students using "id"
        if (type === "update" && id) {
          fetchedData = await prisma.parent.findUnique({
            where: { id: String(id) },
            include: {
              students: {
                select: { id: true, name: true, surname: true },
              },
            },
          });
        }
        break;
      case "exam":
        // condition for teacher should only add exams for their own subjects and classes, admin can add exams for all subjects and classes
        // const { userId, sessionClaims } = await auth();
        // const role = (
        //   sessionClaims?.metadata as {
        //     role?: "admin" | "teacher" | "student" | "parent";
        //   }
        // )?.role;
        const examLessons = await prisma.lesson.findMany({
          where: {
            // if the user is a teacher, only show lessons for that teacher, userId is the lesson id, if the user is an admin, show all lessons
            ...(role === "teacher" ? { teacherId: userId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;
      case "assignment":
        // // condition for teacher should only add assignments for their own subjects and classes, admin can add assignments for all subjects and classes
        // const { userId, sessionClaims } = await auth();
        // const role = (
        //   sessionClaims?.metadata as {
        //     role?: "admin" | "teacher" | "student" | "parent";
        //   }
        // )?.role;
        const assignmentLessons = await prisma.lesson.findMany({
          where: {
            // if the user is a teacher, only show lessons for that teacher, userId is the lesson id, if the user is an admin, show all lessons
            ...(role === "teacher" ? { teacherId: userId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: assignmentLessons };
        break;
      case "lesson":
        const lessonSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        const lessonClasses = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        const lessonTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = {
          subjects: lessonSubjects,
          classes: lessonClasses,
          teachers: lessonTeachers,
        };
        break;
      case "result":
        const resultStudents = await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        });
        const resultExams = await prisma.exam.findMany({
          select: { id: true, title: true },
        });
        const resultAssignments = await prisma.assignment.findMany({
          select: { id: true, title: true },
        });
        relatedData = {
          students: resultStudents,
          exams: resultExams,
          assignments: resultAssignments,
        };
        break;
      case "event":
        const eventClasses = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        relatedData = { classes: eventClasses };
        break;
      case "announcement":
        const announcementClasses = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        relatedData = { classes: announcementClasses };
        break;
      case "attendance":
        const attendanceStudents = await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        });
        const attendanceLessons = await prisma.lesson.findMany({
          where: role === "teacher" ? { teacherId: userId! } : {},
          select: { id: true, name: true },
        });
        relatedData = {
          students: attendanceStudents,
          lessons: attendanceLessons,
        };
        break;
      case "message":
        const teachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        const students = await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        });
        const parents = await prisma.parent.findMany({
          select: { id: true, name: true, surname: true },
        });

        const formattedUsers = [
          ...teachers.map((teacher) => ({
            id: teacher.id,
            name: `${teacher.name} ${teacher.surname}`,
            role: "Teacher",
          })),
          ...students.map((student) => ({
            id: student.id,
            name: `${student.name} ${student.surname}`,
            role: "Student",
          })),
          ...parents.map((parent) => ({
            id: parent.id,
            name: `${parent.name} ${parent.surname}`,
            role: "Parent",
          })),
        ];
        relatedData = { users: formattedUsers, currentUserId: userId };
        break;
      case "fee":
        const classesFee = await prisma.class.findMany({
          select: { id: true, name: true },
          orderBy: { name: "asc" },
        });
        relatedData = { classFee: classesFee };
        break;
      case "payment": {
        const feeId = (data as any)?.feeStructureId;
        const fee = feeId
          ? await prisma.feeStructure.findUnique({
              where: { id: feeId },
              select: { classId: true, amount: true },
            })
          : null;
        const students = fee
          ? await prisma.student.findMany({
              where: { classId: fee.classId },
              orderBy: [{ surname: "asc" }, { name: "asc" }],
              select: {
                id: true,
                name: true,
                surname: true,
                payments: {
                  where: { feeStructureId: feeId },
                  select: { amount: true },
                },
              },
            })
          : [];
        relatedData = {
          studentList: students.map((s) => ({
            id: s.id,
            label: `${s.surname} ${s.name}`,
            paid: s.payments.reduce((t, p) => t + p.amount, 0),
          })),
        };
        break;
      }
      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
