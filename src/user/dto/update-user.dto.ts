import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @ApiProperty({ example: 'Green', description: 'User last name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name?: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'User photo' })
  @IsOptional()
  @IsString()
  user_photo?: string;

  @ApiProperty({ example: 'Just booklover boy', description: 'User bio' })
  @IsOptional()
  @IsString()
  short_bio?: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'User email' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+998998887766', description: 'User phone number' })
  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number?: string;

  @ApiProperty({ example: '2000-12-12', description: 'User birth date' })
  @IsOptional()
  @IsNotEmpty()
  birthdate?: Date;
}
