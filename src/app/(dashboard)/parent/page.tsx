import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const ParentPage = async () => {
  const { userId } = auth();

  // Récupère le premier enfant du parent connecté
  const student = await prisma.student.findFirst({
    where: { parentId: userId! },
    select: {
      id: true,
    },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Emploi du temps de votre enfant</h1>
          {student ? (
            <BigCalendarContainer type="studentId" id={student.id} />
          ) : (
            <p className="text-gray-600 mt-4">Aucun enfant associé à ce compte.</p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
