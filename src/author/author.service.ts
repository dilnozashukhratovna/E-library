import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './models/author.model';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author) private authorRepo: typeof Author) {}

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = await this.authorRepo.create(createAuthorDto);
    return author;
  }

  async getAllAuthors(): Promise<Author[]> {
    const authors = await this.authorRepo.findAll({
      include: { all: true },
    });

    if (!authors || authors.length === 0) {
      throw new NotFoundException(`No authors were found.`);
    }

    return authors;
  }

  async getAuthorById(id: number): Promise<Author> {
    const author = await this.authorRepo.findByPk(id);
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found.`);
    }
    return author;
  }

  async deleteAuthorById(id: number) {
    const author = await this.authorRepo.destroy({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found.`);
    }
    return author;
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
    const existingAuthor = await this.authorRepo.findByPk(id);

    if (!existingAuthor) {
      throw new NotFoundException(`Author with id ${id} not found.`);
    }
    const [affectedRows, [updatedAuthor]] = await this.authorRepo.update(
      updateAuthorDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedAuthor) {
      throw new Error(`Update operation failed for author with id ${id}.`);
    }

    return updatedAuthor;
  }
}
