import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import { Lesson } from "@prisma/client";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId" | "studentId";
  id: string | number;
}) => {
  let lessons: Lesson[] = [];

  if (type === "teacherId") {
    lessons = await prisma.lesson.findMany({
      where: { teacherId: id as string },
    });
  } else if (type === "classId") {
    lessons = await prisma.lesson.findMany({
      where: { classId: id as number },
    });
  } else if (type === "studentId") {
    const student = await prisma.student.findUnique({
      where: { id: id as string },
      select: {
        classId: true,
      },
    });

    if (student?.classId) {
      lessons = await prisma.lesson.findMany({
        where: { classId: student.classId },
      });
    }
  }

  const data = lessons.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
