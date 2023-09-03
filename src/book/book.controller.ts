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
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Create book' })
  @UseGuards(AdminGuard)
  @Post('create')
  async createBook(@Body() createBookDto: CreateBookDto) {
    const book = this.bookService.createBook(createBookDto);
    return book;
  }

  @ApiOperation({ summary: 'Get all books' })
  @Get('all')
  async getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @ApiOperation({ summary: 'Get book by id' })
  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(+id);
  }

  @ApiOperation({ summary: 'Delete book' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteBookById(@Param('id') id: string) {
    return this.bookService.deleteBookById(+id);
  }

  @ApiOperation({ summary: 'Update book' })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.updateBook(+id, updateBookDto);
  }
}
