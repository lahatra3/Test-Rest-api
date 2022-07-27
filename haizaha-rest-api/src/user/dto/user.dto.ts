export class UserCreateDto {
    nom: string;
    email: string;
    role: "Super Admin" | "Operateur" | "Supervisor" | "Viewer" | null;
}
