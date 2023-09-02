import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1, description: 'Book id' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: '2023-12-12', description: 'Payment date' })
  @IsNotEmpty()
  @IsString()
  payment_date: Date;

  @ApiProperty({ example: 102.98, description: 'Payment amount' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 1, description: 'User card id' })
  @IsNotEmpty()
  @IsNumber()
  user_card_id: number;

  @ApiProperty({ example: 'NOT PAID', description: 'Payment status' })
  @IsNotEmpty()
  @IsString()
  status: string;
}
