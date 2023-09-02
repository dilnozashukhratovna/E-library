import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class CreateUserPreferencesDto {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred genres' })
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Each element of preferred_genres should be a number',
    },
  )
  preferred_genres: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred languages' })
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Each element of preferred_language should be a number',
    },
  )
  preferred_language: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred authors' })
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Each element of preferred_author should be a number',
    },
  )
  preferred_author: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred categories' })
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Each element of preferred_categories should be a number',
    },
  )
  preferred_categories: number[];

  @ApiProperty({ example: true, description: 'Allow recommendations' })
  @IsBoolean()
  @IsNotEmpty()
  allow_recommendations: boolean;

  @ApiProperty({ example: true, description: 'Allow notifications' })
  @IsBoolean()
  @IsNotEmpty()
  notification_preferences: boolean;
}
