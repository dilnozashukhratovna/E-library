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
import { BookLanguageService } from './book_language.service';
import { CreateBookLanguageDto } from './dto/create-book_language.dto';
import { UpdateBookLanguageDto } from './dto/update-book_language.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('BookLanguage')
@Controller('book_language')
export class BookLanguageController {
  constructor(private readonly book_languageService: BookLanguageService) {}

  @ApiOperation({ summary: 'Create book_language' })
  @UseGuards(AdminGuard)
  @Post('create')
  async createBookLanguage(@Body() createBookLanguageDto: CreateBookLanguageDto) {
    const book_language = this.book_languageService.createBookLanguage(createBookLanguageDto);
    return book_language;
  }

  @ApiOperation({ summary: 'Get all book_languages' })
  @Get('all')
  async getAllBookLanguages() {
    return this.book_languageService.getAllBookLanguages();
  }

  @ApiOperation({ summary: 'Get book_language by id' })
  @Get(':id')
  async getBookLanguageById(@Param('id') id: string) {
    return this.book_languageService.getBookLanguageById(+id);
  }

  @ApiOperation({ summary: 'Delete book_language' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteBookLanguageById(@Param('id') id: string) {
    return this.book_languageService.deleteBookLanguageById(+id);
  }

  @ApiOperation({ summary: 'Update book_language' })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateBookLanguage(
    @Param('id') id: string,
    @Body() updateBookLanguageDto: UpdateBookLanguageDto,
  ) {
    return this.book_languageService.updateBookLanguage(+id, updateBookLanguageDto);
  }
}
