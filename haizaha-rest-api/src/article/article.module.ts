import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/output';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article])
  ],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
