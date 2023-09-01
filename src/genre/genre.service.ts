import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './models/genre.model';

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre) private genreRepo: typeof Genre) {}

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = await this.genreRepo.create(createGenreDto);
    return genre;
  }

  async getAllGenres(): Promise<Genre[]> {
    const genres = await this.genreRepo.findAll({
      include: { all: true },
    });

    if (!genres || genres.length === 0) {
      throw new NotFoundException(`No genres were found.`);
    }

    return genres;
  }

  async getGenreById(id: number): Promise<Genre> {
    const genre = await this.genreRepo.findByPk(id);
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found.`);
    }
    return genre;
  }

  async deleteGenreById(id: number) {
    const genre = await this.genreRepo.destroy({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found.`);
    }
    return genre;
  }

  async updateGenre(id: number, updateGenreDto: UpdateGenreDto) {
    const existingGenre = await this.genreRepo.findByPk(id);

    if (!existingGenre) {
      throw new NotFoundException(`Genre with id ${id} not found.`);
    }
    const [affectedRows, [updatedGenre]] = await this.genreRepo.update(
      updateGenreDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedGenre) {
      throw new Error(`Update operation failed for genre with id ${id}.`);
    }

    return updatedGenre;
  }
}
