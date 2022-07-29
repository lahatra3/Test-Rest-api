import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, Category, User } from 'src/output';
import { Repository } from 'typeorm';

@Injectable()
export class RecherchesService {
    constructor(
        @InjectRepository(Article)
        private rechercheRepository: Repository<Article>
    ) {}

    async findByCategorie(donnees: { category: string }): Promise<Article[]> {
        return await this.rechercheRepository
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
        .where(`c.label = :category`, {
            category: donnees.category
        })
        .getRawMany();
    }
}
