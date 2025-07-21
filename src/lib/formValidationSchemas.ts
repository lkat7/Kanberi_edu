import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Nom de la matiere est obligatoire!" }),
  teachers: z.array(z.string()), //teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Nom de la matiere est obligatoire!" }),
  capacity: z.coerce.number().min(1, { message: "Capacite est obligatoire!" }),
  gradeId: z.coerce.number().min(1, { message: "Niveau est obligatoire!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Le nom d'utilisateur doit avoir au moins 3 caractères!" })
    .max(20, { message: "Le nom d'utilisateur doit avoir au plus 20 caractères!" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit avoir au moins 8 caractères!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "Le prenom est obligatoire!" }),
  surname: z.string().min(1, { message: "Le nom est obligatoire!" }),
  email: z
    .string()
    .email({ message: "L'adresse email est invalide!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Le type de sang est obligatoire!" }),
  birthday: z.coerce.date({ message: "La date de naissance est obligatoire!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Le sexe est obligatoire!" }),
  subjects: z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Le nom d'utilisateur doit avoir au moins 3 caractères!" })
    .max(20, { message: "Le nom d'utilisateur doit avoir au plus 20 caractères!" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit avoir au moins 8 caractères!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "Le prenom est obligatoire!" }),
  surname: z.string().min(1, { message: "Le nom est obligatoire!" }),
  email: z
    .string()
    .email({ message: "L'adresse email est invalide!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Le type de sang est obligatoire!" }),
  birthday: z.coerce.date({ message: "La date de naissance est obligatoire!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Le sexe est obligatoire!" }),
  gradeId: z.coerce.number().min(1, { message: "Le niveau est obligatoire!" }),
  classId: z.coerce.number().min(1, { message: "La classe est obligatoire!" }),
  parentId: z.string().min(1, { message: "L'ID du parent est obligatoire!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Le titre est requis"),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  lessonId: z.coerce.number().min(1, "Sélectionnez une leçon"),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Le nom d'utilisateur doit avoir au moins 3 caractères!" })
    .max(20, { message: "Le nom d'utilisateur doit avoir au plus 20 caractères!" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit avoir au moins 8 caractères!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "Le prénom est obligatoire!" }),
  surname: z.string().min(1, { message: "Le nom est obligatoire!" }),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1, { message: "Le numéro est obligatoire!" }),
  address: z.string().min(1, { message: "L'adresse est obligatoire!" }),
  children: z.array(z.string()).optional(),
});

export type ParentSchema = z.infer<typeof parentSchema>;

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Le nom du cours est obligatoire!" }),
  subjectId: z.coerce.number().min(1, { message: "La matière est obligatoire!" }),
  teacherIds: z.array(z.string()).min(1, { message: "Au moins un enseignant est obligatoire!" }),
  startTime: z.coerce.date({ message: "L'heure de début est obligatoire!" }),
  endTime: z.coerce.date({ message: "L'heure de fin est obligatoire!" }),
  room: z.string().optional(),
});

export type LessonSchema = z.infer<typeof lessonSchema>;

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Le titre est obligatoire!" }),
  description: z.string().optional(),
  dueDate: z.coerce.date({ message: "La date d'échéance est obligatoire!" }),
  lessonId: z.coerce.number({ message: "Le cours est obligatoire!" }),
  studentIds: z.array(z.string()).min(1, { message: "Au moins un étudiant doit être assigné!" }),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Le titre est obligatoire!" }),
  description: z.string().optional(),
  startTime: z.coerce.date({ message: "La date et l'heure de début sont obligatoires!" }),
  endTime: z.coerce.date({ message: "La date et l'heure de fin sont obligatoires!" }),
  location: z.string().optional(),
});

export type EventSchema = z.infer<typeof eventSchema>;

export const announcementSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Le titre est obligatoire!" }),
  content: z.string().min(1, { message: "Le contenu est obligatoire!" }),
  postedAt: z.coerce.date({ message: "La date de publication est obligatoire!" }),
  authorId: z.string().optional(), // user or admin id
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;

