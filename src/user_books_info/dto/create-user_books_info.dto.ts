import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserBooksInfoDto {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1, description: 'Book id' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 1, description: 'Started page number' })
  @IsNotEmpty()
  @IsNumber()
  started_page: number;

  @ApiProperty({ example: 5, description: 'Stopped page number' })
  @IsNotEmpty()
  @IsNumber()
  stopped_page: number;

  @ApiProperty({ example: '2023-12-12', description: 'Started date' })
  @IsNotEmpty()
  @IsString()
  started_date: Date;

  @ApiProperty({ example: 'STILL READING', description: 'Book status' })
  @IsNotEmpty()
  @IsString()
  book_status: string;

  @ApiProperty({
    example: 'Most interesting quote',
    description: 'Notes for book',
  })
  @IsNotEmpty()
  @IsString()
  notes: string;

  @ApiProperty({
    example: false,
    description: 'If user liked that book or not.',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_liked: boolean;
}
