import { Body, Controller, Delete, ForbiddenException, Get, NotAcceptableException, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDto, UserUpdateDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Get('all')
    async getAllUser(@Request() req: any) {
        if(req.user.role !== "Viewer") throw new ForbiddenException('Credentials incorrects !');
        return await this.userService.findAll();
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Get()
    async getUser(@Request() req: any) {
        if(req.user.role !== "Viewer") throw new ForbiddenException('Credentials incorrects !');
        return await this.userService.findOne(parseInt(req.user.id));
    }

    @Post('create')
    async createUser(@Body() donnees: UserCreateDto) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.userService.create(donnees);
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Patch('update')
    async updateUser(@Body() donnees: UserUpdateDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.userService.update(parseInt(req.user.id), donnees);
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Delete('delete')
    async removeUser(@Body() donnees: { user_id: number }) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.userService.remove(donnees);
    }
}
