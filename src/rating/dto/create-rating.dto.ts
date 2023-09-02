import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, Max, IsDecimal, isNumber, IsNumber } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsNotEmpty()
  @IsInt()
  book_id: number;

  @ApiProperty({ example: 1, description: 'User id' })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 4.9, description: 'Rating value' })
  @IsNotEmpty()
  @IsNumber()
  @Max(5.0)
  rating_value: number;

  @ApiProperty({
    example: 'Absolutely great book!',
    description: 'User comment',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
