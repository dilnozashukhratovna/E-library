import { Module } from '@nestjs/common';
import { BookLanguageService } from './book_language.service';
import { BookLanguageController } from './book_language.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookLanguage } from './models/book_language.model';

@Module({
  imports: [SequelizeModule.forFeature([BookLanguage])],
  controllers: [BookLanguageController],
  providers: [BookLanguageService],
})
export class BookLanguageModule {}
