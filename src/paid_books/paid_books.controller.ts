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
import { PaidBooksService } from './paid_books.service';
import { CreatePaidBooksDto } from './dto/create-paid_books.dto';
import { UpdatePaidBooksDto } from './dto/update-paid_books.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('PaidBooks')
@Controller('paid_books')
export class PaidBooksController {
  constructor(private readonly paid_booksService: PaidBooksService) {}

  @ApiOperation({ summary: 'Create paid_books' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createPaidBooks(@Body() createPaidBooksDto: CreatePaidBooksDto) {
    const paid_books = this.paid_booksService.createPaidBooks(createPaidBooksDto);
    return paid_books;
  }

  @ApiOperation({ summary: 'Get all paid_bookss' })
  @Get('all')
  async getAllPaidBookss() {
    return this.paid_booksService.getAllPaidBookss();
  }

  @ApiOperation({ summary: 'Get paid_books by id' })
  @Get(':id')
  async getPaidBooksById(@Param('id') id: string) {
    return this.paid_booksService.getPaidBooksById(+id);
  }

  @ApiOperation({ summary: 'Delete paid_books' })
  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deletePaidBooksById(@Param('id') id: string) {
    return this.paid_booksService.deletePaidBooksById(+id);
  }

  @ApiOperation({ summary: 'Update paid_books' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updatePaidBooks(
    @Param('id') id: string,
    @Body() updatePaidBooksDto: UpdatePaidBooksDto,
  ) {
    return this.paid_booksService.updatePaidBooks(+id, updatePaidBooksDto);
  }
}
