import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/output';
import { Repository } from 'typeorm';
import { authDataSign, authPostDto, ResponseToken } from './dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    private async signAuth(donnees: authDataSign): Promise<string> {
        return await this.jwtService.signAsync({
            id: donnees.id,
            nom: donnees.nom,
            email: donnees.email,
            role: donnees.role
        });
    }

    async authentification(donnees: authPostDto): Promise<ResponseToken> {
        const reponse = await this.authRepository
            .createQueryBuilder("u")
            .select([
                "u.id", "u.nom", "u.email", "u.role"
            ])
            .where(`u.email = :email AND role = :role`, 
                { 
                    email: donnees.email,
                    role: donnees.role
                })
            .getRawOne();
        
        if(!reponse) throw new UnauthorizedException('Credentials incorrects !');
        return {
            access_token: await this.signAuth(reponse)
        };
    }
}
