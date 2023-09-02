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
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: 'Create rating' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createRating(@Body() createRatingDto: CreateRatingDto) {
    const rating = this.ratingService.createRating(createRatingDto);
    return rating;
  }

  @ApiOperation({ summary: 'Get all ratings' })
  @Get('all')
  async getAllRatings() {
    return this.ratingService.getAllRatings();
  }

  @ApiOperation({ summary: 'Get rating by id' })
  @Get(':id')
  async getRatingById(@Param('id') id: string) {
    return this.ratingService.getRatingById(+id);
  }

  @ApiOperation({ summary: 'Delete rating' })
  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteRatingById(@Param('id') id: string) {
    return this.ratingService.deleteRatingById(+id);
  }

  @ApiOperation({ summary: 'Update rating' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateRating(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.ratingService.updateRating(+id, updateRatingDto);
  }
}
