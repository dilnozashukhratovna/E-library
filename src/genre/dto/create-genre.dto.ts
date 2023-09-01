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

export class CreateGenreDto {
  @ApiProperty({ example: 'Fantasy', description: 'Genre name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Its based on fantasy',
    description: 'Description to the genre',
  })
  @IsString()
  description: string;
}
