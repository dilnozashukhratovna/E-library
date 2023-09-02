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
    const allowedProperties = ['rating_value', 'comment'];

    const invalidProperties = Object.keys(updateRatingDto).filter(
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

    const [numAffectedRows, updatedRatings] = await this.ratingRepo.update(
      updateRatingDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (numAffectedRows === 0) {
      throw new BadRequestException(
        `Rating with ID ${id} was not found or no changes were made.`,
      );
    }

    return updatedRatings[0].dataValues;
  }
}
