import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Green', description: 'User last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: "male", description: 'User gender' })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'User photo' })
  @IsString()
  user_photo: string;

  @ApiProperty({ example: 'Just booklover boy', description: 'User bio' })
  @IsString()
  short_bio: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'User email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'User confirm password' })
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({ example: '+998998887766', description: 'User phone number' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ example: '2000-12-12', description: 'User birth date' })
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty({ example: 'false', description: 'Is user active' })
  is_active: boolean;
}
