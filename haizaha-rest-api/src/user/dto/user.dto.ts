export class UserCreateDto {
    nom: string;
    email: string;
    role: "Super Admin" | "Operateur" | "Supervisor" | "Viewer" | null;
}

export class UserUpdateDto {
    email: string;
    role: "Super Admin" | "Operateur" | "Supervisor" | "Viewer" | null;
}
