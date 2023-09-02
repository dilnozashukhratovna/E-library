import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookAuthorService } from './book_author.service';
import { CreateBookAuthorDto } from './dto/create-book_author.dto';
import { UpdateBookAuthorDto } from './dto/update-book_author.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('BookAuthor')
@Controller('book_author')
export class BookAuthorController {
  constructor(private readonly book_authorService: BookAuthorService) {}

  @ApiOperation({ summary: 'Create book_author' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createBookAuthor(@Body() createBookAuthorDto: CreateBookAuthorDto) {
    const book_author = this.book_authorService.createBookAuthor(createBookAuthorDto);
    return book_author;
  }

  @ApiOperation({ summary: 'Get all book_authors' })
  @Get('all')
  async getAllBookAuthors() {
    return this.book_authorService.getAllBookAuthors();
  }

  @ApiOperation({ summary: 'Get book_author by id' })
  @Get(':id')
  async getBookAuthorById(@Param('id') id: string) {
    return this.book_authorService.getBookAuthorById(+id);
  }

  @ApiOperation({ summary: 'Delete book_author' })
  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteBookAuthorById(@Param('id') id: string) {
    return this.book_authorService.deleteBookAuthorById(+id);
  }

  @ApiOperation({ summary: 'Update book_author' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateBookAuthor(
    @Param('id') id: string,
    @Body() updateBookAuthorDto: UpdateBookAuthorDto,
  ) {
    return this.book_authorService.updateBookAuthor(+id, updateBookAuthorDto);
  }
}
