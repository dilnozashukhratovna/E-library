import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import {
  IsString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  Min,
  Max,
  Length, 
  IsOptional,
} from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ example: 1, description: 'Book genre' })
  @IsOptional()
  @IsInt()
  genre_id?: number;

  @ApiProperty({ example: 6, description: 'Min age category' })
  @IsOptional()
  @IsInt()
  @Min(0)
  min_age?: number;

  @ApiProperty({ example: 13, description: 'Popular age category' })
  @IsOptional()
  @IsInt()
  @Min(0)
  popular_age?: number;

  @ApiProperty({ example: "females", description: 'Popular gender category' })
  @IsOptional()
  @IsString()
  popular_gender?: string;

  @ApiProperty({ example: 1, description: 'Book category id' })
  @IsOptional()
  @IsInt()
  category_id?: number;

  @ApiProperty({ example: 'false', description: 'Is it a free book' })
  @IsOptional()
  @IsBoolean()
  is_paid?: boolean;

  @ApiProperty({
    example:
      'The story follows a young prince who visits various planets,\
   including Earth, and addresses themes of loneliness, friendship, love,\
   and loss.',
    description: 'Brief information about what the book is about',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  about?: string;
}
