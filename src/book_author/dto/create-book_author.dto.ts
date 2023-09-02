import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateBookAuthorDto {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 1, description: 'Author id' })
  @IsNotEmpty()
  @IsNumber()
  author_id: number;
}
