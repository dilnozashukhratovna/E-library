import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John', description: 'Admin first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Green', description: 'Admin last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Admin photo' })
  @IsString()
  admin_photo: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Admin email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Admin password' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Admin confirm password' })
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({ example: '+998998887766', description: 'Admin phone number' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ example: '2000-12-12', description: 'Admin birth date' })
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty({ example: 'false', description: 'Is admin creator' })
  is_creator: boolean;

  @ApiProperty({ example: 'false', description: 'Is admin active' })
  is_active: boolean;
}
