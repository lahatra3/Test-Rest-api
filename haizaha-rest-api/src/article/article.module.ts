import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article, Category, User } from 'src/output';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User, Category]),
    MailerModule.forRootAsync({
      useFactory: () => ({
          transport: {
              host: 'smtp.gmail.com',
              auth: {
                  user: process.env.GMAIL_USER,
                  pass: process.env.GMAIL_PASSWORD
              }
          }
      })
  })
  ],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
