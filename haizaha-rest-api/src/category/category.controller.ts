import { Body, Controller, Delete, ForbiddenException, Get, NotAcceptableException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Get('all')
    async getAllCategory() {
        return await this.categoryService.findAll();
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Get(':id')
    async getCategory(@Param() id_category: number) {
        return await this.categoryService.findOne(id_category);
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Post('create')
    async createCategory(@Body() donnees: { label: string }, @Request() req: any) {
        if(req.user.role === "Viewer") throw new ForbiddenException("Credentials incorrects !");
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.categoryService.create(donnees);
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Put('update')
    async updateCategory(@Body() donnees: CategoryDto, @Request() req: any) {
        if(req.user.role === "Viewer") throw new ForbiddenException("Credentials incorrects !");
        if(!donnees) throw new ForbiddenException("Credentials incorrects !");
        return await this.categoryService.update(donnees);
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Delete('delete')
    async deleteCategory(@Body() donnees: { id_category: number }, @Request() req: any) {
        if(req.user.role === "Viewer") throw new ForbiddenException("Credentials incorrects !");
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.categoryService.remove(donnees);
    }
}
