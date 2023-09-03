import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaidBooksDto {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: '2023-12-12', description: 'Book added date' })
  @IsNotEmpty()
  @IsString()
  added_date: Date;

  @ApiProperty({ example: 34.9, description: 'Book price' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 3.0, description: 'Book discount' })
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiProperty({ example: '2023-12-12', description: 'Book purchase date' })
  @IsNotEmpty()
  @IsString()
  purchase_date: Date;

  @ApiProperty({ example: 1, description: 'BOUGHT' })
  @IsNotEmpty()
  @IsString()
  status: string;
}
