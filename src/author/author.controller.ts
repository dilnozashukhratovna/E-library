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
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'Create author' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    const author = this.authorService.createAuthor(createAuthorDto);
    return author;
  }

  @ApiOperation({ summary: 'Get all authors' })
  @Get('all')
  async getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @ApiOperation({ summary: 'Get author by id' })
  @Get(':id')
  async getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(+id);
  }

  @ApiOperation({ summary: 'Delete author' })
  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteAuthorById(@Param('id') id: string) {
    return this.authorService.deleteAuthorById(+id);
  }

  @ApiOperation({ summary: 'Update author' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(+id, updateAuthorDto);
  }
}
