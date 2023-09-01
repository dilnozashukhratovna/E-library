import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'john01@gmail.com', description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
