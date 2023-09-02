import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRatingDto } from './create-rating.dto';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDecimal,
  Max,
} from 'class-validator';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  book_id?: number;

  @ApiProperty({ example: 1, description: 'User id' })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  user_id?: number;

  @ApiProperty({ example: 4.9, description: 'Rating value' })
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  @Max(5.0)
  rating_value?: number;

  @ApiProperty({
    example: 'Absolutely great book!',
    description: 'User comment',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  comment?: string;
}
