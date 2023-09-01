import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGenreDto } from './create-genre.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @ApiProperty({ example: 'Fantasy', description: 'Genre name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Its based on fantasy',
    description: 'Description to the genre',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
