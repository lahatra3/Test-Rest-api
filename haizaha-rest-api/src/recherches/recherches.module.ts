import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article, Category } from 'src/output';
import { RecherchesController } from './recherches.controller';
import { RecherchesService } from './recherches.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Article, Category
    ])
  ],
  controllers: [RecherchesController],
  providers: [RecherchesService]
})
export class RecherchesModule {}
