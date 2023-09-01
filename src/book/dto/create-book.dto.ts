import { ApiProperty } from '@nestjs/swagger';
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

export class CreateBookDto {
  @ApiProperty({ example: 'Little prince', description: 'Book name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'Book genre' })
  @IsNotEmpty()
  @IsInt()
  genre_id: number;

  @ApiProperty({ example: 6, description: 'Min age category' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  min_age: number;

  @ApiProperty({ example: 13, description: 'Popular age category' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  popular_age: number;

  @ApiProperty({ example: "females", description: 'Popular gender category' })
  @IsNotEmpty()
  @IsString()
  popular_gender: string;

  @ApiProperty({ example: 1, description: 'Book category id' })
  @IsNotEmpty()
  @IsInt()
  category_id: number;

  @ApiProperty({ example: 1, description: 'Book rating' })
  @IsNotEmpty()
  @IsInt()
  rating_id: number;

  @ApiProperty({ example: 'false', description: 'Is it a free book' })
  @IsNotEmpty()
  @IsBoolean()
  is_paid: boolean;

  @ApiProperty({ example: 182, description: 'Book page count' })
  @IsNotEmpty()
  @IsInt()
  @Min(0) 
  page_count: number;

  @ApiProperty({
    example:
      'The story follows a young prince who visits various planets,\
 including Earth, and addresses themes of loneliness, friendship, love,\
 and loss.',
    description: 'Brief information about what the book is about',
  })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({
    example: 1,
    description: 'Admin ID who added the book',
  })
  created_admin_id: number;
}
