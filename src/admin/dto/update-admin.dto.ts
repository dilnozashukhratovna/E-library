import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'John', description: 'Admin first name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @ApiProperty({ example: 'Green', description: 'Admin last name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name?: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Admin photo' })
  @IsOptional()
  admin_photo?: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Admin email' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+998998887755', description: 'Admin phone number' })
  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number?: string;

  @ApiProperty({ example: '2000-12-12', description: 'Admin birth date' })
  @IsOptional()
  @IsNotEmpty()
  birthdate?: Date;
}
