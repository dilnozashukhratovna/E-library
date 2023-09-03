import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaidBooksDto } from './create-paid_books.dto';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdatePaidBooksDto extends PartialType(CreatePaidBooksDto) {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  book_id?: number;

  @ApiProperty({ example: '2023-12-12', description: 'Book added date' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  added_date?: Date;

  @ApiProperty({ example: 34.9, description: 'Book price' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 3.0, description: 'Book discount' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  discount?: number;

  @ApiProperty({ example: '2023-12-12', description: 'Book purchase date' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  purchase_date?: Date;

  @ApiProperty({ example: 1, description: 'BOUGHT' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?: string;
}
