import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/output';
import { Repository } from 'typeorm';
import { UserCreateDto, UserUpdateDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository
        .createQueryBuilder("u")
        .select([
            "u.id as id", "u.nom as nom", "u.email as email", "u.role as role", 
            "u.created_at as created_at", "u.updated_at as updated_at", 
            "u.deleted_at as deleted_at"
        ])
        .getRawMany()
    }

    async findOne(user_id: number): Promise<User> {
        return await this.userRepository
        .createQueryBuilder("u")
        .select([
            "u.id as id", "u.nom as nom", "u.email as email", "u.role as role", 
            "u.created_at as created_at", "u.updated_at as updated_at", 
            "u.deleted_at as deleted_at"
        ])
        .where(`u.id = identifiant`, { identifiant: user_id })
        .getRawOne()
    }

    async create(donnees: UserCreateDto): Promise<void> {
        await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
            nom: donnees.nom,
            email: donnees.email,
            role: donnees.role,
            updatedAt: null,
            deletedAt: null
        })
        .execute();
    }

    async update(user_id: number, donnees: UserUpdateDto): Promise<void> {
        await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
            email: donnees.email,
            role: donnees.role,
            updatedAt: () => "NOW()"
        })
        .where(`id =:identifiant`, {
            identifiant: user_id
        })
        .execute();
    }

    async remove(donnees: { user_id: number }): Promise<void> {
        await this.userRepository.delete(donnees.user_id);
    }
}
