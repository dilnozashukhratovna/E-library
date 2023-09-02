import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './models/rating.model';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating) private ratingRepo: typeof Rating) {}

  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = await this.ratingRepo.create(createRatingDto);
    return rating;
  }

  async getAllRatings(): Promise<Rating[]> {
    const ratings = await this.ratingRepo.findAll({
      include: { all: true },
    });

    if (!ratings || ratings.length === 0) {
      throw new NotFoundException(`No ratings were found.`);
    }

    return ratings;
  }

  async getRatingById(id: number): Promise<Rating> {
    const rating = await this.ratingRepo.findByPk(id);
    if (!rating) {
      throw new NotFoundException(`Rating with id ${id} not found.`);
    }
    return rating;
  }

  async deleteRatingById(id: number) {
    const rating = await this.ratingRepo.destroy({ where: { id } });
    if (!rating) {
      throw new NotFoundException(`Rating with id ${id} not found.`);
    }
    return rating;
  }

  async updateRating(id: number, updateRatingDto: UpdateRatingDto) {
    const existingRating = await this.ratingRepo.findByPk(id);

    if (!existingRating) {
      throw new NotFoundException(`Rating with id ${id} not found.`);
    }
    const [affectedRows, [updatedRating]] = await this.ratingRepo.update(
      updateRatingDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedRating) {
      throw new Error(`Update operation failed for rating with id ${id}.`);
    }

    return updatedRating;
  }
}
