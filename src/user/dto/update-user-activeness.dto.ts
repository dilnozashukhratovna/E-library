import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserActivenessDto {
  @ApiProperty({ example: 'false', description: 'Update user activeness' })
  @IsOptional()
  is_active?: boolean;
}
