import { Body, Controller, Delete, ForbiddenException, Get, NotAcceptableException, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { ArticleCreateDto, ArticleUpdateDto } from './dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Get()
    async getAllArticles(@Request() req: any) {
        if(req.user.role !== "Viewer") throw new ForbiddenException('Credentials incorrects !')
        return await this.articleService.findAll();
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Get('user')
    async getArticles(@Request() req: any) {
        const donnees = { user_id: parseInt(req.user.id) }
        return await this.articleService.findOne(donnees);
    }

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Post()
    async createArticle(@Body() donnees: ArticleCreateDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.articleService.create(parseInt(req.user.id), donnees);
    }


    @Put()
    async updateArticle(@Body() donnees: ArticleUpdateDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return this.articleService.update(parseInt(req.user.id), donnees);
    }

    @Delete()
    async removeArticle(@Body() donnees: { id: number }) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.articleService.remove(donnees);
    }
}
