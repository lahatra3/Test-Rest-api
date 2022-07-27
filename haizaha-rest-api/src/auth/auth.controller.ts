import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authPostDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('user')
    async authentifier(@Body() donnees: authPostDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !')
        return this.authService.authentification(donnees);
    }
}
