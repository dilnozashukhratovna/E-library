import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserCardDto } from './create-user_card.dto';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserCardDto extends PartialType(CreateUserCardDto) {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ example: '1234565789', description: 'User card number' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  card_number?: string;

  @ApiProperty({ example: 'John Green', description: 'Card holder name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  cardholder_name?: string;

  @ApiProperty({ example: '03/26', description: 'Card expiration date' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  expiration_date?: string;

  @ApiProperty({ example: 'Visa', description: 'Card type' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  card_type?: string;

  @ApiProperty({ example: '2023-12-12', description: 'Last used date' })
  @IsOptional()
  @IsNotEmpty()
  last_used?: Date;
}
