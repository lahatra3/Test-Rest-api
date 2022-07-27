import { Controller, ForbiddenException, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @UseGuards(AuthGuard('jwt_haizaha'))
    @Get()
    async getAllArticles(@Request() req: any) {
        if(req.user.role !== "Viewer") throw new ForbiddenException('Credentials incorrects !')
        return await this.articleService.findAll();
    }

    
    @Get('user')
    async getArticles(@Request() req: any) {
        const donnees = { user_id: parseInt(req.user.id) }
        return await this.articleService.findOne(donnees);
    }
}
