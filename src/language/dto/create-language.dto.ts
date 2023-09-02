import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  Min,
  Max,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'English', description: 'Language name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Its British English',
    description: 'Description to the language',
  })
  @IsString()
  description: string;
}
