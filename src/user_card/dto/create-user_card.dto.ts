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

export class CreateUserCardDto {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: '1234565789', description: 'User card number' })
  @IsNotEmpty()
  @IsString()
  card_number: string;

  @ApiProperty({ example: 'John Green', description: 'Card holder name' })
  @IsNotEmpty()
  @IsString()
  cardholder_name: string;

  @ApiProperty({ example: '03/26', description: 'Card expiration date' })
  @IsNotEmpty()
  @IsString()
  expiration_date: string;

  @ApiProperty({ example: 'Visa', description: 'Card type' })
  @IsNotEmpty()
  @IsString()
  card_type: string;

  @ApiProperty({ example: '2023-12-12', description: 'Last used date' })
  @IsNotEmpty()
  last_used: Date;
}
