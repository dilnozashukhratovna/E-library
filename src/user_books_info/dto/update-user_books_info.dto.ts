import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserBooksInfoDto } from './create-user_books_info.dto';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UpdateUserBooksInfoDto extends PartialType(
  CreateUserBooksInfoDto,
) {
  @ApiProperty({ example: 1, description: 'Started page number' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  started_page?: number;

  @ApiProperty({ example: 5, description: 'Stopped page number' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  stopped_page?: number;

  @ApiProperty({ example: '2024-12-12', description: 'Finished date' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  finished_date?: Date;

  @ApiProperty({ example: 'STILL READING', description: 'Book status' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  book_status?: string;

  @ApiProperty({
    example: 'Most interesting quote',
    description: 'Notes for book',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  notes?: string;

  @ApiProperty({
    example: false,
    description: 'If user liked that book or not.',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_liked?: boolean;
}
