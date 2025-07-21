"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { examSchema, ExamSchema } from "@/lib/formValidationSchemas";
import { createExam, updateExam } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ExamForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((formData) => {
    formAction(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `L'examen a bien été ${type === "create" ? "créé" : "mis à jour"} !`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { exams } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Créer un examen" : "Modifier l'examen"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Titre de l'examen"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />

        <InputField
          label="Date de début"
          name="startTime"
          type="datetime-local"
          defaultValue={data?.startTime ? new Date(data.startTime).toISOString().slice(0, 16) : ""}
          register={register}
          error={errors?.startTime}
        />

        <InputField
          label="Date de fin"
          name="endTime"
          type="datetime-local"
          defaultValue={data?.endTime ? new Date(data.endTime).toISOString().slice(0, 16) : ""}
          register={register}
          error={errors?.endTime}
        />

        {data?.id && (
          <InputField
            label="ID"
            name="id"
            defaultValue={data.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}

        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-xs text-gray-500">Matière - Classe - Enseignant</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            {...register("lessonId")}
            defaultValue={data?.examId}
          >
            {exams.map((exam: any) => (
              <option
                key={exam.id}
                value={exam.id}
                selected={data && exam.id === data.examId}
              >
                {exam.subject} — {exam.className} — {exam.teacherName}
              </option>
            ))}
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">{errors.lessonId.message.toString()}</p>
          )}
        </div>
      </div>

      {state.error && (
        <span className="text-red-500">Une erreur s'est produite !</span>
      )}

      <button className="bg-blue-500 text-white p-2 rounded-md">
        {type === "create" ? "Créer" : "Mettre à jour"}
      </button>
    </form>
  );
};

export default ExamForm;