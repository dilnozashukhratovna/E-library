import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty({ example: 1, description: 'Book id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  book_id?: number;

  @ApiProperty({ example: 1, description: 'User id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ example: 'NOT BOUGHT', description: 'Status' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?: string;
}
