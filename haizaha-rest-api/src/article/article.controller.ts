import { Body, Controller, ForbiddenException, Get, NotAcceptableException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { ArticleCreateDto } from './dto';

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

}
