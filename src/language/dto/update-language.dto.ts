import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLanguageDto } from './create-language.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  @ApiProperty({ example: 'English', description: 'Language name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Its British English',
    description: 'Description to the language',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
