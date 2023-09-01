import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateAdminRolesDto {
  @ApiProperty({ example: 'false', description: 'Update admin role' })
  @IsOptional()
  is_creator?: boolean;

  @ApiProperty({ example: 'false', description: 'Update admin activeness' })
  @IsOptional()
  is_active?: boolean;
}
