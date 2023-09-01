import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ChangeAdminPasswordDto {
  @ApiProperty({ example: 'Pa$$w0rd', description: 'Admin old password' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'Uzbeki$t0n', description: 'Admin new password' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  newPassword?: string;
}
