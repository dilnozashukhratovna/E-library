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
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({ summary: 'Create genre' })
  @UseGuards(AdminGuard)
  @Post('create')
  async createGenre(@Body() createGenreDto: CreateGenreDto) {
    const genre = this.genreService.createGenre(createGenreDto);
    return genre;
  }

  @ApiOperation({ summary: 'Get all genres' })
  @Get('all')
  async getAllGenres() {
    return this.genreService.getAllGenres();
  }

  @ApiOperation({ summary: 'Get genre by id' })
  @Get(':id')
  async getGenreById(@Param('id') id: string) {
    return this.genreService.getGenreById(+id);
  }

  @ApiOperation({ summary: 'Delete genre' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteGenreById(@Param('id') id: string) {
    return this.genreService.deleteGenreById(+id);
  }

  @ApiOperation({ summary: 'Update genre' })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateGenre(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genreService.updateGenre(+id, updateGenreDto);
  }
}
