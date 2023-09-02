import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookLanguageDto } from './dto/create-book_language.dto';
import { UpdateBookLanguageDto } from './dto/update-book_language.dto';
import { BookLanguage } from './models/book_language.model';

@Injectable()
export class BookLanguageService {
  constructor(@InjectModel(BookLanguage) private book_languageRepo: typeof BookLanguage) {}

  async createBookLanguage(createBookLanguageDto: CreateBookLanguageDto): Promise<BookLanguage> {
    const book_language = await this.book_languageRepo.create(createBookLanguageDto);
    return book_language;
  }

  async getAllBookLanguages(): Promise<BookLanguage[]> {
    const book_languages = await this.book_languageRepo.findAll({
      include: { all: true },
    });

    if (!book_languages || book_languages.length === 0) {
      throw new NotFoundException(`No book_languages were found.`);
    }

    return book_languages;
  }

  async getBookLanguageById(id: number): Promise<BookLanguage> {
    const book_language = await this.book_languageRepo.findByPk(id);
    if (!book_language) {
      throw new NotFoundException(`BookLanguage with id ${id} not found.`);
    }
    return book_language;
  }

  async deleteBookLanguageById(id: number) {
    const book_language = await this.book_languageRepo.destroy({ where: { id } });
    if (!book_language) {
      throw new NotFoundException(`BookLanguage with id ${id} not found.`);
    }
    return book_language;
  }

  async updateBookLanguage(id: number, updateBookLanguageDto: UpdateBookLanguageDto) {
    const existingBookLanguage = await this.book_languageRepo.findByPk(id);

    if (!existingBookLanguage) {
      throw new NotFoundException(`BookLanguage with id ${id} not found.`);
    }
    const [affectedRows, [updatedBookLanguage]] = await this.book_languageRepo.update(
      updateBookLanguageDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedBookLanguage) {
      throw new Error(`Update operation failed for book_language with id ${id}.`);
    }

    return updatedBookLanguage;
  }
}
