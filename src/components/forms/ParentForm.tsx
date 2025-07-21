"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParentSchema, parentSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createParent, updateParent } from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import InputField from "../InputField";
import { useRouter } from "next/navigation";

const ParentForm = ({
  type,
  data,
  setOpen,
  students,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  students?: { id: string; name: string; surname: string }[];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentSchema>({
    resolver: zodResolver(parentSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createParent : updateParent,
    { success: false, error: false }
  );

  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    const children = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[name="children[]"]:checked')
    ).map((el) => el.value);

    formAction({ ...formData, children });
  });

  useEffect(() => {
    if (state.success) {
      toast(`Le parent a bien été ${type === "create" ? "créé" : "modifié"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, type, setOpen, router]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Créer un nouveau parent" : "Modifier un parent"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">Compte</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom d'utilisateur"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Mot de passe"
          name="password"
          type="password"
          defaultValue=""
          register={register}
          error={errors.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">Informations personnelles</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Prénom"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Nom de famille"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Téléphone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Adresse"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
      </div>

      {students && students.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Enfants (élèves)</label>
          <div className="flex flex-wrap gap-2">
            {students.map((student) => (
              <label key={student.id} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  name="children[]"
                  value={student.id}
                  defaultChecked={data?.students?.some((s: any) => s.id === student.id)}
                />
                {student.name} {student.surname}
              </label>
            ))}
          </div>
        </div>
      )}

      {state.error && (
        <span className="text-red-500">Une erreur s'est produite!</span>
      )}

      {data?.id && (
        <input type="hidden" value={data.id} {...register("id")} />
      )}

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Créer" : "Mettre à jour"}
      </button>
    </form>
  );
};

export default ParentForm;
