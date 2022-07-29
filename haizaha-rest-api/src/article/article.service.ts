import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, Category, User } from 'src/output';
import { Repository } from 'typeorm';
import { ArticleByUserDto, ArticleCreateDto, 
    ArticleUpdateDto } from './dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
        private mailerService: MailerService
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
        await this.mailerService.sendMail({
            to: process.env.GMAIL_DEST,
            from: process.env.GMAIL_USER,
            subject: "Mail de confirmation d' articles !",
            html: "<h1>Greeting citizens of the world.</h1>",
        });
    }

    async update(user_id: number, donnees: ArticleUpdateDto): Promise<void> {
        await this.articleRepository
        .createQueryBuilder()
        .update(Article)
        .set({
            name: donnees.name,
            label: donnees.label,
            categoryId: donnees.category_id,
            updatedAt: () => "NOW()"
        })
        .where(`id = :article_id AND user_id = :identifiant`, 
            {
                article_id: donnees.id,
                identifiant: user_id
            })
        .execute();
    }

    async remove(donnees: { id: number }) {
        await this.articleRepository.delete(donnees.id)
    }
}
