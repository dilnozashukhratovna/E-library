import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRatingDto } from './create-rating.dto';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Max,
  IsNumber,
} from 'class-validator';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
  @ApiProperty({ example: 4.9, description: 'Rating value' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
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
