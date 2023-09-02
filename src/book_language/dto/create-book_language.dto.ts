import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookLanguageDto {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 1, description: 'Language id' })
  @IsNotEmpty()
  @IsNumber()
  language_id: number;
}
