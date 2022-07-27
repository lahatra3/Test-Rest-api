import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/output';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository
        .createQueryBuilder("c")
        .select([
            "c.id as id", "c.label as label_category"
        ])
        .getRawMany();
    }

    async findOne(id_category: number): Promise<Category> {
        return await this.categoryRepository
        .createQueryBuilder("c")
        .select([
            "c.id as id", "c.label as label_category"
        ])
        .where(`c.id = identifiant`, {
            identifiant: id_category
        })
        .getRawOne();
    }

    async create(donnees: { label: string }): Promise<void> {
        await this.categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({
            label: donnees.label
        })
        .execute();
    }

    async update(donnees: CategoryDto): Promise<void> {
        await this.categoryRepository
        .createQueryBuilder()
        .update(Category)
        .set({
            label: donnees.label
        })
        .where(`id = :identifiant`, {
            identifiant: donnees.id
        })
        .execute();
    }

    async remove(donnees: { id_category: number }): Promise<void> {
        await this.categoryRepository.delete(donnees.id_category);
    }
}
