import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookAuthorDto } from './dto/create-book_author.dto';
import { UpdateBookAuthorDto } from './dto/update-book_author.dto';
import { BookAuthor } from './models/book_author.model';

@Injectable()
export class BookAuthorService {
  constructor(
    @InjectModel(BookAuthor) private book_authorRepo: typeof BookAuthor,
  ) {}

  async createBookAuthor(
    createBookAuthorDto: CreateBookAuthorDto,
  ): Promise<BookAuthor> {
    const book_author = await this.book_authorRepo.create(createBookAuthorDto);
    return book_author;
  }

  async getAllBookAuthors(): Promise<BookAuthor[]> {
    const book_authors = await this.book_authorRepo.findAll({
      include: { all: true },
    });

    if (!book_authors || book_authors.length === 0) {
      throw new NotFoundException(`No book_authors were found.`);
    }

    return book_authors;
  }

  async getBookAuthorById(id: number): Promise<BookAuthor> {
    const book_author = await this.book_authorRepo.findByPk(id);
    if (!book_author) {
      throw new NotFoundException(`BookAuthor with id ${id} not found.`);
    }
    return book_author;
  }

  async deleteBookAuthorById(id: number) {
    const book_author = await this.book_authorRepo.destroy({ where: { id } });
    if (!book_author) {
      throw new NotFoundException(`BookAuthor with id ${id} not found.`);
    }
    return book_author;
  }

  async updateBookAuthor(id: number, updateBookAuthorDto: UpdateBookAuthorDto) {
    const existingBookAuthor = await this.book_authorRepo.findByPk(id);

    if (!existingBookAuthor) {
      throw new NotFoundException(`BookAuthor with id ${id} not found.`);
    }
    const [affectedRows, [updatedBookAuthor]] =
      await this.book_authorRepo.update(updateBookAuthorDto, {
        where: { id },
        returning: true,
      });

    if (affectedRows === 0 || !updatedBookAuthor) {
      throw new Error(`Update operation failed for book_author with id ${id}.`);
    }

    return updatedBookAuthor;
  }
}
