import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ChangeUserPasswordDto {
  @ApiProperty({ example: 'Pa$$w0rd', description: 'User old password' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'Uzbeki$t0n', description: 'User new password' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  newPassword?: string;
}
