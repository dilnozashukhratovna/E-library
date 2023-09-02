import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserPreferencesDto } from './create-user_preferences.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class UpdateUserPreferencesDto extends PartialType(
  CreateUserPreferencesDto,
) {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred genres' })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Each element of preferred_genres should be a number',
    },
  )
  preferred_genres?: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred languages' })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Each element of preferred_language should be a number',
    },
  )
  preferred_language?: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred authors' })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Each element of preferred_author should be a number',
    },
  )
  preferred_author?: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred categories' })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Each element of preferred_categories should be a number',
    },
  )
  preferred_categories?: number[];

  @ApiProperty({ example: true, description: 'Allow recommendations' })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  allow_recommendations?: boolean;

  @ApiProperty({ example: true, description: 'Allow notifications' })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  notification_preferences?: boolean;
}
