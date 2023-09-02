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
  IsNumber,
} from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 1, description: 'User id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'NOT BOUGHT', description: 'Status' })
  @IsNotEmpty()
  @IsString()
  status: string;
}
