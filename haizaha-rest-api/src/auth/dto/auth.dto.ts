export class authPostDto {
    email: string;
    role: string;
}

export class authDataSign {
    id: number;
    nom: string;
    email: string;
    role: string;
}

export class ResponseToken {
    access_token: string;
}
