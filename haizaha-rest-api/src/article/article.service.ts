import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, Category, User } from 'src/output';
import { Repository } from 'typeorm';
import { ArticleByUserDto, ArticleCreateDto } from './dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>
    ) {}

    async findAll(): Promise<Article[]> {
        return await this.articleRepository
            .createQueryBuilder("a")
            .select([
                "a.id as id", "a.name as name", "a.label as label_article", 
                "a.category_id as category_id", "c.label as category_label",
                "a.user_id as user_id", "u.nom as nom_user", "u.email as email_user",
                "u.role  as role_user",
                "a.created_at as created_at", "a.updated_at as updated_at",
                "a.deleted_at as deleted_at"
            ])
            .innerJoin(User, "u", "u.id = a.user_id")
            .innerJoin(Category, "c", "c.id = a.category_id")
            .getRawMany()
    }

    async findOne(donnees: ArticleByUserDto):Promise<Article[]> {
        return await this.articleRepository
        .createQueryBuilder("a")
        .select([
            "a.id as id", "a.name as name", "a.label as label_article", 
            "a.category_id as category_id", "c.label as category_label",
            "a.user_id as user_id", "u.nom as nom_user", "u.email as email_user",
            "u.role  as role_user",
            "a.created_at as created_at", "a.updated_at as updated_at",
            "a.deleted_at as deleted_at"
        ])
        .innerJoin(User, "u", "u.id = a.user_id")
        .innerJoin(Category, "c", "c.id = a.category_id")
        .where(`a.user_id = :user_id`, 
            {
                user_id: donnees.user_id
            })
        .getRawMany()
    }

    async create(user_id: number, donnees: ArticleCreateDto): Promise<void> {
        await this.articleRepository
        .createQueryBuilder()
        .insert()
        .into(Article)
        .values({
            name: donnees.name,
            label: donnees.label,
            categoryId: donnees.category_id,
            userId: user_id,
            createdAt: () => "NOW()",
            updatedAt: null,
            deletedAt: null
        })
        .execute();
    }
}
