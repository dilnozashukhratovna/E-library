import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ example: 1, description: 'Cart id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  cart_id?: number;

  @ApiProperty({ example: '2023-12-12', description: 'Payment date' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  payment_date?: Date;

  @ApiProperty({ example: 102.98, description: 'Payment amount' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  amount?: number;

  @ApiProperty({ example: 1, description: 'User card id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  user_card_id?: number;

  @ApiProperty({ example: 'NOT PAID', description: 'Payment status' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?: string;
}
