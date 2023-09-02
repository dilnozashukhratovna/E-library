import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookLanguageDto } from './create-book_language.dto';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateBookLanguageDto extends PartialType(CreateBookLanguageDto) {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  book_id?: number;

  @ApiProperty({ example: 1, description: 'Language id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  language_id?: number;
}
