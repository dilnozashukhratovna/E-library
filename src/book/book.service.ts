import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './models/book.model';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book) private bookRepo: typeof Book) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.bookRepo.create(createBookDto);
    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepo.findAll({
      include: { all: true },
    });

    if (!books || books.length === 0) {
      throw new NotFoundException(`No books were found.`);
    }

    return books;
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepo.findByPk(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found.`);
    }
    return book;
  }

  async deleteBookById(id: number) {
    const book = await this.bookRepo.destroy({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found.`);
    }
    return book;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
    const existingBook = await this.bookRepo.findByPk(id);

    if (!existingBook) {
      throw new NotFoundException(`Book with id ${id} not found.`);
    }
    const [affectedRows, [updatedBook]] = await this.bookRepo.update(
      updateBookDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedBook) {
      throw new Error(`Update operation failed for book with id ${id}.`);
    }

    return updatedBook;
  }
}
