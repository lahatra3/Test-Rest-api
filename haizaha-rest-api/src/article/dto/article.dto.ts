export class ArticleByUserDto {
    user_id: number
}

export class ArticleCreateDto {
    name: string;
    label: string;
    category_id: number;
}

export class ArticleUpdateDto {
    id: number;
    name: string;
    label: string;
    category_id: number
}
