import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaidBooksDto } from './dto/create-paid_books.dto';
import { UpdatePaidBooksDto } from './dto/update-paid_books.dto';
import { PaidBooks } from './models/paid_books.model';
import { Book } from '../book/models/book.model';

@Injectable()
export class PaidBooksService {
  constructor(
    @InjectModel(PaidBooks) private paid_booksRepo: typeof PaidBooks,
    @InjectModel(Book) private bookRepo: typeof Book,
  ) {}

  async createPaidBooks(
    createPaidBooksDto: CreatePaidBooksDto,
  ): Promise<PaidBooks | BadRequestException> {
    const associatedBook = await this.bookRepo.findByPk(
      createPaidBooksDto.book_id,
    );
    if (associatedBook && associatedBook.is_paid) {
      const paid_books = await this.paid_booksRepo.create(createPaidBooksDto);
      return paid_books;
    } else {
      throw new BadRequestException('You are trying to add free book!');
    }
  }

  async getAllPaidBookss(): Promise<PaidBooks[]> {
    const paid_bookss = await this.paid_booksRepo.findAll({
      include: { all: true },
    });

    if (!paid_bookss || paid_bookss.length === 0) {
      throw new NotFoundException(`No paid_bookss were found.`);
    }

    return paid_bookss;
  }

  async getPaidBooksById(id: number): Promise<PaidBooks> {
    const paid_books = await this.paid_booksRepo.findByPk(id);
    if (!paid_books) {
      throw new NotFoundException(`PaidBooks with id ${id} not found.`);
    }
    return paid_books;
  }

  async deletePaidBooksById(id: number) {
    const paid_books = await this.paid_booksRepo.destroy({ where: { id } });
    if (!paid_books) {
      throw new NotFoundException(`PaidBooks with id ${id} not found.`);
    }
    return paid_books;
  }

  async updatePaidBooks(id: number, updatePaidBooksDto: UpdatePaidBooksDto) {
    const allowedProperties = [
      'added_date',
      'price',
      'discount',
      'purchase_date',
      'status',
    ];

    const invalidProperties = Object.keys(updatePaidBooksDto).filter(
      (property) => !allowedProperties.includes(property),
    );

    if (invalidProperties.length > 0) {
      const invalidPropsList = invalidProperties.join(', ');
      const allowedPropsList = allowedProperties.join(', ');
      const errorMessage = `Invalid change: ${invalidPropsList}.\
 Only the following properties are allowed to be updated:\
 ${allowedPropsList}.`;

      throw new BadRequestException(errorMessage);
    }

    const [numAffectedRows, updatedBooks] = await this.paid_booksRepo.update(
      updatePaidBooksDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (numAffectedRows === 0) {
      throw new BadRequestException(
        `PaidBook with ID ${id} was not found or no changes were made.`,
      );
    }

    return updatedBooks[0].dataValues;
  }
}
