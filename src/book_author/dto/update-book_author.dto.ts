import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookAuthorDto } from './create-book_author.dto';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateBookAuthorDto extends PartialType(CreateBookAuthorDto) {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 1, description: 'Author id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  author_id: number;
}
